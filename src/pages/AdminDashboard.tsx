import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ExternalLink, LogOut } from "lucide-react";
import AdminGalleryTab from "@/components/admin/AdminGalleryTab";
import AdminTestimonialsTab from "@/components/admin/AdminTestimonialsTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin");
        return;
      }
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/admin");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-primary" size={20} />
            <span className="font-display text-lg font-semibold text-foreground">
              Cordeiro Celebrações
            </span>
            <span className="text-muted-foreground text-sm font-body hidden sm:inline">— Painel Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Ver Site</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1.5">
              <LogOut size={14} />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="gallery" className="font-body">Galeria</TabsTrigger>
            <TabsTrigger value="testimonials" className="font-body">Depoimentos</TabsTrigger>
          </TabsList>
          <TabsContent value="gallery">
            <AdminGalleryTab />
          </TabsContent>
          <TabsContent value="testimonials">
            <AdminTestimonialsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
