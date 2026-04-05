import { motion } from "framer-motion";
import aboutImage from "@/assets/about-wedding.jpg";
import celebrantImage from "@/assets/celebrant.jpg";
import { Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src={aboutImage}
                alt="Detalhes românticos de casamento"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
                loading="lazy"
                width={800}
                height={1000}
              />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background">
                <img
                  src={celebrantImage}
                  alt="Celebrante LoveWedding"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="divider-ornament mb-8 max-w-[200px]">
              <Heart className="text-primary shrink-0" size={16} strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
              Cada amor merece ser <span className="text-gradient-gold italic">celebrado</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              Sou celebrante de casamentos apaixonada por transformar o momento mais especial 
              da vida de um casal em uma cerimônia inesquecível. Com uma voz clara e amorosa, 
              conduzo cada celebração com emoção genuína.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Acredito que o amor não tem forma, cor ou crença. Celebro cerimônias para todos 
              — sejam budistas, ateus ou membros da comunidade LGBTQI+ — sempre com respeito, 
              inclusão e muito carinho.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Cada cerimônia é cuidadosamente personalizada para refletir a história única 
              de cada casal, criando memórias que durarão para sempre.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
