import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Foi a cerimônia mais linda que já presenciamos. Cada palavra tocou nosso coração de uma forma que nunca vamos esquecer.",
    names: "Ana & Beatriz",
    detail: "Casamento na praia",
  },
  {
    quote: "Ela conseguiu traduzir em palavras tudo o que sentíamos. Os convidados não pararam de chorar de emoção!",
    names: "Carlos & Marina",
    detail: "Cerimônia ao ar livre",
  },
  {
    quote: "Uma celebrante que entende que o amor vai além de qualquer rótulo. Nossa cerimônia budista foi perfeita.",
    names: "Rafael & Thiago",
    detail: "Cerimônia espiritual",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="divider-ornament mb-6 max-w-[200px] mx-auto">
            <Heart className="text-primary shrink-0" size={16} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Histórias de Amor
          </h2>
          <p className="text-muted-foreground text-lg">
            O que dizem os casais que celebramos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.names}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card rounded-2xl p-8 border border-border/50 relative"
            >
              <Quote className="text-primary/20 absolute top-6 right-6" size={32} />
              <p className="text-foreground/80 italic leading-relaxed mb-6 font-body">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="text-primary" size={14} />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">
                    {t.names}
                  </p>
                  <p className="text-muted-foreground text-xs">{t.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
