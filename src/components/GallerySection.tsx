import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Quote, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type WeddingPhoto = { id: string; photo_url: string; order_index: number | null };
type Testimonial = { id: string; names: string; detail: string | null; quote: string };
type Wedding = {
  id: string;
  title: string;
  location: string;
  description: string | null;
  cover_url: string;
  order_index: number | null;
  photos: WeddingPhoto[];
  testimonial: Testimonial | null;
};

const GallerySection = () => {
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWedding, setSelectedWedding] = useState<number | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: weddingsData } = await supabase
        .from("weddings")
        .select("*")
        .order("order_index", { ascending: true });

      if (!weddingsData || weddingsData.length === 0) {
        setLoading(false);
        return;
      }

      const enriched: Wedding[] = await Promise.all(
        weddingsData.map(async (w) => {
          const { data: photos } = await supabase
            .from("wedding_photos")
            .select("*")
            .eq("wedding_id", w.id)
            .order("order_index", { ascending: true });

          const { data: testimonials } = await supabase
            .from("testimonials")
            .select("*")
            .eq("wedding_id", w.id)
            .eq("is_visible", true)
            .limit(1);

          return {
            ...w,
            photos: photos || [],
            testimonial: testimonials && testimonials.length > 0 ? testimonials[0] : null,
          };
        })
      );
      setWeddings(enriched);
      setLoading(false);
    };
    fetchData();
  }, []);

  const openWedding = (index: number) => {
    setSelectedWedding(index);
    setCurrentPhoto(0);
  };

  const close = () => {
    setSelectedWedding(null);
    setCurrentPhoto(0);
  };

  const getAllPhotos = (w: Wedding) => {
    const photoUrls = w.photos.map((p) => p.photo_url);
    return photoUrls.length > 0 ? [w.cover_url, ...photoUrls] : [w.cover_url];
  };

  const nextPhoto = () => {
    if (selectedWedding === null) return;
    const allPhotos = getAllPhotos(weddings[selectedWedding]);
    setCurrentPhoto((p) => (p + 1) % allPhotos.length);
  };

  const prevPhoto = () => {
    if (selectedWedding === null) return;
    const allPhotos = getAllPhotos(weddings[selectedWedding]);
    setCurrentPhoto((p) => (p - 1 + allPhotos.length) % allPhotos.length);
  };

  if (loading) {
    return (
      <section id="galeria" className="py-24 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground font-body">Carregando galeria...</p>
        </div>
      </section>
    );
  }

  if (weddings.length === 0) {
    return (
      <section id="galeria" className="py-24 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase">
            Momentos Eternos
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">
            Galeria de Casamentos
          </h2>
          <div className="mt-12 py-12 bg-card rounded-2xl border border-border/50">
            <Image className="mx-auto text-muted-foreground mb-3" size={40} />
            <p className="text-muted-foreground font-body">Em breve, nossos momentos mais especiais estarão aqui.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="galeria" className="py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase">
            Momentos Eternos
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">
            Galeria de Casamentos
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Clique em cada cerimônia para ver mais fotos e ler a história de amor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {weddings.map((w, i) => (
            <motion.button
              key={w.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => openWedding(i)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <img
                src={w.cover_url}
                alt={w.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-left">
                <h3 className="font-display text-xl md:text-2xl text-white drop-shadow-lg">
                  {w.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <MapPin size={14} className="text-white/80" />
                  <span className="text-white/80 font-body text-sm">{w.location}</span>
                </div>
                {w.testimonial && (
                  <p className="text-white/60 text-xs mt-2 font-body">
                    {w.testimonial.names} — clique para ver mais
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedWedding !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const allPhotos = getAllPhotos(weddings[selectedWedding]);
                return (
                  <>
                    <div className="relative">
                      <img
                        src={allPhotos[currentPhoto]}
                        alt={`${weddings[selectedWedding].title} - foto ${currentPhoto + 1}`}
                        className="w-full rounded-xl shadow-2xl aspect-[4/3] object-cover"
                      />
                      {allPhotos.length > 1 && (
                        <>
                          <button
                            onClick={prevPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={nextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                          >
                            <ChevronRight size={24} />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {allPhotos.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentPhoto(idx)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                  idx === currentPhoto ? "bg-white" : "bg-white/40"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {allPhotos.length > 1 && (
                      <div className="flex gap-2 mt-4 justify-center">
                        {allPhotos.map((photo, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPhoto(idx)}
                            className={`w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                              idx === currentPhoto ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-80"
                            }`}
                          >
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 text-center">
                      <h3 className="font-display text-2xl text-white">
                        {weddings[selectedWedding].title}
                      </h3>
                      <p className="text-white/70 font-body mt-2 max-w-lg mx-auto">
                        {weddings[selectedWedding].description}
                      </p>

                      {weddings[selectedWedding].testimonial && (
                        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-lg mx-auto text-left">
                          <Quote className="text-primary/60 mb-3" size={24} />
                          <p className="text-white/90 italic font-body leading-relaxed">
                            "{weddings[selectedWedding].testimonial!.quote}"
                          </p>
                          <div className="mt-4">
                            <p className="font-display font-semibold text-white text-sm">
                              {weddings[selectedWedding].testimonial!.names}
                            </p>
                            <p className="text-white/50 text-xs">
                              {weddings[selectedWedding].testimonial!.detail}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
