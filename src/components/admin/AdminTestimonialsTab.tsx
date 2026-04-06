import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Quote, MessageSquare } from "lucide-react";
import { toast } from "sonner";

type Testimonial = {
  id: string;
  names: string;
  detail: string | null;
  quote: string;
  wedding_id: string | null;
  is_visible: boolean | null;
};

type Wedding = { id: string; title: string };

const AdminTestimonialsTab = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    names: "", detail: "", quote: "", wedding_id: "", is_visible: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const [{ data: t }, { data: w }] = await Promise.all([
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      supabase.from("weddings").select("id, title").order("title"),
    ]);
    if (t) setTestimonials(t);
    if (w) setWeddings(w);
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => {
    setEditingId(null);
    setFormData({ names: "", detail: "", quote: "", wedding_id: "", is_visible: true });
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setFormData({
      names: t.names,
      detail: t.detail || "",
      quote: t.quote,
      wedding_id: t.wedding_id || "",
      is_visible: t.is_visible ?? true,
    });
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      names: formData.names,
      detail: formData.detail || null,
      quote: formData.quote,
      wedding_id: formData.wedding_id || null,
      is_visible: formData.is_visible,
    };

    if (editingId) {
      const { error } = await supabase.from("testimonials").update(payload).eq("id", editingId);
      if (error) { toast.error("Erro ao atualizar"); setSaving(false); return; }
      toast.success("Depoimento atualizado!");
    } else {
      const { error } = await supabase.from("testimonials").insert(payload);
      if (error) { toast.error("Erro ao criar"); setSaving(false); return; }
      toast.success("Depoimento criado!");
    }
    setSaving(false);
    setDialogOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este depoimento?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast.success("Depoimento excluído");
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl text-foreground">Depoimentos</h2>
        <Button size="sm" onClick={openNew} className="flex items-center gap-1.5">
          <Plus size={14} /> Novo Depoimento
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingId ? "Editar Depoimento" : "Novo Depoimento"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body">Nomes do Casal</Label>
              <Input value={formData.names} onChange={(e) => setFormData({ ...formData, names: e.target.value })} placeholder="Ex: Ana & Beatriz" required />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Detalhe (tipo de cerimônia)</Label>
              <Input value={formData.detail} onChange={(e) => setFormData({ ...formData, detail: e.target.value })} placeholder="Ex: Casamento na praia" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Depoimento</Label>
              <Textarea value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} placeholder="O depoimento do casal..." rows={4} required />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Vincular a um Casamento (opcional)</Label>
              <Select value={formData.wedding_id} onValueChange={(v) => setFormData({ ...formData, wedding_id: v === "none" ? "" : v })}>
                <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {weddings.map((w) => (
                    <SelectItem key={w.id} value={w.id}>{w.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={formData.is_visible} onCheckedChange={(v) => setFormData({ ...formData, is_visible: v })} />
              <Label className="font-body">Visível no site</Label>
            </div>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {testimonials.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
          <MessageSquare className="mx-auto text-muted-foreground mb-3" size={40} />
          <p className="text-muted-foreground font-body">Nenhum depoimento cadastrado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-4 flex flex-col sm:flex-row sm:items-start gap-4">
              <Quote className="text-primary/30 shrink-0 mt-1" size={24} />
              <div className="flex-1 min-w-0">
                <p className="text-foreground/80 italic font-body text-sm leading-relaxed line-clamp-2">"{t.quote}"</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-display font-semibold text-foreground text-sm">{t.names}</span>
                  {t.detail && <span className="text-muted-foreground text-xs">• {t.detail}</span>}
                  {!t.is_visible && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">Oculto</span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                  <Pencil size={14} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}>
                  <Trash2 size={14} className="text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialsTab;
