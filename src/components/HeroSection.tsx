import { motion } from "framer-motion";
import heroImage from "@/assets/hero-wedding.jpg";
import { Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Cerimônia de casamento romântica com arco floral"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-foreground/20" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Heart className="mx-auto mb-6 text-primary-foreground" size={40} strokeWidth={1} />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold text-primary-foreground mb-6 tracking-tight">
            LoveWedding
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 font-body font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Celebrando o amor em todas as suas formas — cerimônias únicas, 
            emocionantes e feitas com o coração.
          </p>
          <a
            href="#contato"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
          >
            Agende sua cerimônia
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
