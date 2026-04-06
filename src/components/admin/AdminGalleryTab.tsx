import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, ArrowLeft, Upload, Image } from "lucide-react";
import { toast } from "sonner";

type Wedding = {
  id: string;
  title: string;
  location: string;
  description: string | null;
  cover_url: string;
  order_index: number | null;
};

type WeddingPhoto = {
  id: string;
  photo_url: string;
  order_index: number | null;
};

const AdminGalleryTab = () => {
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [selectedWedding, setSelectedWedding] = useState<Wedding | null>(null);
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", location: "", description: "" });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchWeddings = async () => {
    const { data } = await supabase
      .from("weddings")
      .select("*")
      .order("order_index", { ascending: true });
    if (data) setWeddings(data);
  };

  const fetchPhotos = async (weddingId: string) => {
    const { data } = await supabase
      .from("wedding_photos")
      .select("*")
      .eq("wedding_id", weddingId)
      .order("order_index", { ascending: true });
    if (data) setPhotos(data);
  };

  useEffect(() => { fetchWeddings(); }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("gallery").upload(path, file);
    if (error) { toast.error("Erro ao enviar imagem"); return null; }
    const { data } = supabase.storage.from("gallery").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleCreateWedding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverFile) { toast.error("Selecione uma foto de capa"); return; }
    setSaving(true);
    const coverUrl = await uploadImage(coverFile);
    if (!coverUrl) { setSaving(false); return; }
    const { error } = await supabase.from("weddings").insert({
      title: formData.title,
      location: formData.location,
      description: formData.description || null,
      cover_url: coverUrl,
      order_index: weddings.length,
    });
    setSaving(false);
    if (error) { toast.error("Erro ao criar casamento"); return; }
    toast.success("Casamento criado!");
    setShowNewForm(false);
    setFormData({ title: "", location: "", description: "" });
    setCoverFile(null);
    fetchWeddings();
  };

  const handleUpdateWedding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWedding) return;
    setSaving(true);
    let coverUrl = selectedWedding.cover_url;
    if (coverFile) {
      const url = await uploadImage(coverFile);
      if (url) coverUrl = url;
    }
    const { error } = await supabase.from("weddings").update({
      title: formData.title,
      location: formData.location,
      description: formData.description || null,
      cover_url: coverUrl,
    }).eq("id", selectedWedding.id);
    setSaving(false);
    if (error) { toast.error("Erro ao atualizar"); return; }
    toast.success("Atualizado!");
    setEditMode(false);
    setCoverFile(null);
    const updated = { ...selectedWedding, ...formData, cover_url: coverUrl };
    setSelectedWedding(updated);
    fetchWeddings();
  };

  const handleDeleteWedding = async () => {
    if (!selectedWedding) return;
    if (!confirm("Tem certeza que deseja excluir este casamento e todas as suas fotos?")) return;
    await supabase.from("weddings").delete().eq("id", selectedWedding.id);
    toast.success("Casamento excluído");
    setSelectedWedding(null);
    fetchWeddings();
  };

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedWedding || !e.target.files) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      if (url) {
        await supabase.from("wedding_photos").insert({
          wedding_id: selectedWedding.id,
          photo_url: url,
          order_index: photos.length + i,
        });
      }
    }
    setUploading(false);
    toast.success(`${files.length} foto(s) adicionada(s)`);
    fetchPhotos(selectedWedding.id);
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm("Excluir esta foto?")) return;
    await supabase.from("wedding_photos").delete().eq("id", photoId);
    toast.success("Foto excluída");
    if (selectedWedding) fetchPhotos(selectedWedding.id);
  };

  const openWeddingDetail = (w: Wedding) => {
    setSelectedWedding(w);
    setFormData({ title: w.title, location: w.location, description: w.description || "" });
    fetchPhotos(w.id);
    setEditMode(false);
  };

  // Detail view
  if (selectedWedding) {
    return (
      <div>
        <Button variant="ghost" onClick={() => setSelectedWedding(null)} className="mb-4 flex items-center gap-1.5">
          <ArrowLeft size={16} /> Voltar
        </Button>

        {!editMode ? (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="font-display text-2xl text-foreground">{selectedWedding.title}</h2>
                <p className="text-muted-foreground font-body text-sm">{selectedWedding.location}</p>
                {selectedWedding.description && (
                  <p className="text-muted-foreground font-body text-sm mt-1">{selectedWedding.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>Editar</Button>
                <Button variant="destructive" size="sm" onClick={handleDeleteWedding}>
                  <Trash2 size={14} className="mr-1" /> Excluir
                </Button>
              </div>
            </div>
            <img src={selectedWedding.cover_url} alt="Capa" className="w-full max-w-md rounded-xl object-cover aspect-[4/3]" />
          </div>
        ) : (
          <form onSubmit={handleUpdateWedding} className="bg-card rounded-2xl p-6 border border-border/50 space-y-4 mb-6 max-w-lg">
            <div className="space-y-2">
              <Label className="font-body">Título</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Localização</Label>
              <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Descrição</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Nova foto de capa (opcional)</Label>
              <Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
              <Button type="button" variant="ghost" onClick={() => setEditMode(false)}>Cancelar</Button>
            </div>
          </form>
        )}

        {/* Photos grid */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-foreground">Fotos do Casamento</h3>
            <label className="cursor-pointer">
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleAddPhotos} />
              <Button variant="outline" size="sm" asChild disabled={uploading}>
                <span><Upload size={14} className="mr-1" /> {uploading ? "Enviando..." : "Adicionar Fotos"}</span>
              </Button>
            </label>
          </div>
          {photos.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-2xl border border-border/50">
              <Image className="mx-auto text-muted-foreground mb-2" size={32} />
              <p className="text-muted-foreground font-body text-sm">Nenhuma foto adicionada</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative group rounded-xl overflow-hidden aspect-square">
                  <img src={p.photo_url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleDeletePhoto(p.id)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl text-foreground">Casamentos / Ambientes</h2>
        <Button size="sm" onClick={() => setShowNewForm(true)} className="flex items-center gap-1.5">
          <Plus size={14} /> Novo Casamento
        </Button>
      </div>

      {/* New wedding dialog */}
      <Dialog open={showNewForm} onOpenChange={setShowNewForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Novo Casamento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateWedding} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body">Título</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Cerimônia no Jardim" required />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Localização</Label>
              <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Ex: Jardim com arco de flores" required />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Descrição</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Descrição poética do ambiente..." />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Foto de Capa</Label>
              <Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} required />
            </div>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Salvando..." : "Criar Casamento"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {weddings.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
          <Image className="mx-auto text-muted-foreground mb-3" size={40} />
          <p className="text-muted-foreground font-body">Nenhum casamento cadastrado</p>
          <p className="text-muted-foreground font-body text-sm mt-1">Clique em "Novo Casamento" para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {weddings.map((w) => (
            <Card
              key={w.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openWeddingDetail(w)}
            >
              <img src={w.cover_url} alt={w.title} className="w-full aspect-[4/3] object-cover" />
              <div className="p-4">
                <h3 className="font-display font-semibold text-foreground">{w.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{w.location}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGalleryTab;
