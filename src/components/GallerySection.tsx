import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";

import galleryLake from "@/assets/gallery-lake.jpg";
import galleryBeach from "@/assets/gallery-beach.jpg";
import galleryForest from "@/assets/gallery-forest.jpg";
import galleryIndoor from "@/assets/gallery-indoor.jpg";

const photos = [
  {
    src: galleryLake,
    title: "Cerimônia no Lago",
    location: "Lago sereno com montanhas",
    description: "Uma cerimônia inesquecível diante de um lago cristalino, com as montanhas como testemunhas do amor.",
  },
  {
    src: galleryBeach,
    title: "Casamento na Praia",
    location: "Praia ao pôr do sol",
    description: "Pés na areia, brisa do mar e o pôr do sol como cenário para uma declaração de amor eterna.",
  },
  {
    src: galleryForest,
    title: "União na Floresta",
    location: "Floresta encantada",
    description: "Entre árvores centenárias e raios de sol, uma cerimônia mágica cercada pela natureza.",
  },
  {
    src: galleryIndoor,
    title: "Celebração em Ambiente Fechado",
    location: "Salão elegante com flores e velas",
    description: "Lustres, velas e arranjos florais exuberantes criam um cenário íntimo e sofisticado.",
  },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
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
            Cada cerimônia é única — conheça alguns dos cenários onde o amor foi celebrado
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => setSelected(i)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                width={1024}
                height={768}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-left">
                <h3 className="font-display text-xl md:text-2xl text-white drop-shadow-lg">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <MapPin size={14} className="text-white/80" />
                  <span className="text-white/80 font-body text-sm">
                    {photo.location}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selected].src}
                alt={photos[selected].title}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="font-display text-2xl text-white">
                  {photos[selected].title}
                </h3>
                <p className="text-white/70 font-body mt-2 max-w-lg mx-auto">
                  {photos[selected].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
