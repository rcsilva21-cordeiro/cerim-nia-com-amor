import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Quote, ChevronLeft, ChevronRight } from "lucide-react";

import galleryLake from "@/assets/gallery-lake.jpg";
import galleryLake2 from "@/assets/gallery-lake-2.jpg";
import galleryLake3 from "@/assets/gallery-lake-3.jpg";
import galleryLake4 from "@/assets/gallery-lake-4.jpg";
import galleryBeach from "@/assets/gallery-beach.jpg";
import galleryBeach2 from "@/assets/gallery-beach-2.jpg";
import galleryBeach3 from "@/assets/gallery-beach-3.jpg";
import galleryBeach4 from "@/assets/gallery-beach-4.jpg";
import galleryFarm from "@/assets/gallery-farm.jpg";
import galleryFarm2 from "@/assets/gallery-farm-2.jpg";
import galleryFarm3 from "@/assets/gallery-farm-3.jpg";
import galleryFarm4 from "@/assets/gallery-farm-4.jpg";
import galleryIndoor from "@/assets/gallery-indoor.jpg";
import galleryIndoor2 from "@/assets/gallery-indoor-2.jpg";
import galleryIndoor3 from "@/assets/gallery-indoor-3.jpg";
import galleryIndoor4 from "@/assets/gallery-indoor-4.jpg";

const weddings = [
  {
    cover: galleryLake,
    photos: [galleryLake, galleryLake2, galleryLake3, galleryLake4],
    title: "Cerimônia no Lago",
    location: "Lago sereno com montanhas",
    description: "Uma cerimônia inesquecível diante de um lago cristalino, com as montanhas como testemunhas do amor.",
    testimonial: {
      quote: "Ela conseguiu traduzir em palavras tudo o que sentíamos. Os convidados não pararam de chorar de emoção!",
      names: "Carlos & Marina",
      detail: "Cerimônia ao ar livre",
    },
  },
  {
    cover: galleryBeach,
    photos: [galleryBeach, galleryBeach2, galleryBeach3, galleryBeach4],
    title: "Casamento na Praia",
    location: "Praia ao pôr do sol",
    description: "Pés na areia, brisa do mar e o pôr do sol como cenário para uma declaração de amor eterna.",
    testimonial: {
      quote: "Foi a cerimônia mais linda que já presenciamos. Cada palavra tocou nosso coração de uma forma que nunca vamos esquecer.",
      names: "Ana & Beatriz",
      detail: "Casamento na praia",
    },
  },
  {
    cover: galleryFarm,
    photos: [galleryFarm, galleryFarm2, galleryFarm3, galleryFarm4],
    title: "União na Fazenda",
    location: "Fazenda com campos verdes",
    description: "No coração do campo, entre flores silvestres e colinas douradas, uma celebração de amor autêntico.",
    testimonial: {
      quote: "Uma celebrante que entende que o amor vai além de qualquer rótulo. Nossa cerimônia espiritual foi perfeita.",
      names: "Rafael & Thiago",
      detail: "Cerimônia espiritual",
    },
  },
  {
    cover: galleryIndoor,
    photos: [galleryIndoor, galleryIndoor2, galleryIndoor3, galleryIndoor4],
    title: "Celebração em Ambiente Fechado",
    location: "Salão elegante com flores e velas",
    description: "Lustres, velas e arranjos florais exuberantes criam um cenário íntimo e sofisticado.",
    testimonial: null,
  },
];

const GallerySection = () => {
  const [selectedWedding, setSelectedWedding] = useState<number | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const openWedding = (index: number) => {
    setSelectedWedding(index);
    setCurrentPhoto(0);
  };

  const close = () => {
    setSelectedWedding(null);
    setCurrentPhoto(0);
  };

  const nextPhoto = () => {
    if (selectedWedding === null) return;
    setCurrentPhoto((p) => (p + 1) % weddings[selectedWedding].photos.length);
  };

  const prevPhoto = () => {
    if (selectedWedding === null) return;
    const len = weddings[selectedWedding].photos.length;
    setCurrentPhoto((p) => (p - 1 + len) % len);
  };

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
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => openWedding(i)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <img
                src={w.cover}
                alt={w.title}
                loading="lazy"
                width={1024}
                height={768}
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
              {/* Photo carousel */}
              <div className="relative">
                <img
                  src={weddings[selectedWedding].photos[currentPhoto]}
                  alt={`${weddings[selectedWedding].title} - foto ${currentPhoto + 1}`}
                  className="w-full rounded-xl shadow-2xl aspect-[4/3] object-cover"
                />
                {/* Nav buttons */}
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
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {weddings[selectedWedding].photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhoto(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        idx === currentPhoto ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 justify-center">
                {weddings[selectedWedding].photos.map((photo, idx) => (
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

              {/* Info + Testimonial */}
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
                      "{weddings[selectedWedding].testimonial.quote}"
                    </p>
                    <div className="mt-4">
                      <p className="font-display font-semibold text-white text-sm">
                        {weddings[selectedWedding].testimonial.names}
                      </p>
                      <p className="text-white/50 text-xs">
                        {weddings[selectedWedding].testimonial.detail}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
