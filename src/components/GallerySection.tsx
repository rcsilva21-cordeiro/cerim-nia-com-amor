import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import galleryCampoCover from "@/assets/gallery-campo-cover.jpg";

const weddings = [
  {
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1024&q=80",
    photos: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1024&q=80",
      "https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=1024&q=80",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1024&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1024&q=80",
    ],
    title: "Cerimônia no Jardim",
    location: "Jardim com arco de flores",
    description: "Sob a sombra gentil das árvores e o perfume das flores, o amor floresceu em uma cerimônia que parecia um sonho pintado pela natureza.",
    testimonial: {
      quote: "Ela conseguiu traduzir em palavras tudo o que sentíamos. Os convidados não pararam de chorar de emoção!",
      names: "Carlos & Marina",
      detail: "Cerimônia ao ar livre",
    },
  },
  {
    cover: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1024&q=80",
    photos: [
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1024&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1024&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1024&q=80",
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1024&q=80",
    ],
    title: "Casamento na Praia",
    location: "Praia ao pôr do sol",
    description: "Pés na areia, brisa do mar e o pôr do sol dourado como cenário para uma declaração de amor que ecoou com as ondas do oceano.",
    testimonial: {
      quote: "Foi a cerimônia mais linda que já presenciamos. Cada palavra tocou nosso coração de uma forma que nunca vamos esquecer.",
      names: "Ana & Beatriz",
      detail: "Casamento na praia",
    },
  },
  {
    cover: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1024&q=80",
    photos: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1024&q=80",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1024&q=80",
      "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=1024&q=80",
      "https://images.unsplash.com/photo-1470290378698-263fa7ca60ab?w=1024&q=80",
    ],
    title: "Celebração no Campo",
    location: "Fazenda com vista para o campo",
    description: "No coração do campo, entre colinas douradas e céu infinito, uma celebração rústica e cheia de alma que uniu dois corações apaixonados.",
    testimonial: {
      quote: "Uma celebrante que entende que o amor vai além de qualquer rótulo. Nossa cerimônia espiritual foi perfeita.",
      names: "Rafael & Thiago",
      detail: "Cerimônia espiritual",
    },
  },
  {
    cover: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1024&q=80",
    photos: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1024&q=80",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1024&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1024&q=80",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1024&q=80",
    ],
    title: "Cerimônia em Salão",
    location: "Salão decorado com flores e velas",
    description: "Lustres cintilantes, velas que dançam suavemente e arranjos florais exuberantes criam um cenário íntimo, sofisticado e repleto de magia.",
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
