import { motion } from "framer-motion";
import { Heart, Mail, Phone, Instagram, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="py-24 md:py-32 bg-gradient-rose">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="divider-ornament mb-6 max-w-[200px] mx-auto">
            <Heart className="text-primary shrink-0" size={16} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Vamos conversar?
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Adoraria ouvir a história de vocês e criar juntos uma cerimônia que seja a cara do amor de vocês.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto mb-12">
            <a
              href="mailto:contato@cordeirocelebracoes.com.br"
              className="flex items-center justify-center gap-3 bg-card rounded-xl p-5 border border-border/50 hover:border-primary/40 transition-colors group"
            >
              <Mail className="text-primary group-hover:text-primary/80" size={20} />
              <span className="text-sm text-foreground">contato@cordeirocelebracoes.com.br</span>
            </a>
            <a
              href="tel:+5511999999999"
              className="flex items-center justify-center gap-3 bg-card rounded-xl p-5 border border-border/50 hover:border-primary/40 transition-colors group"
            >
              <Phone className="text-primary group-hover:text-primary/80" size={20} />
              <span className="text-sm text-foreground">(11) 99999-9999</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-primary/40 transition-colors"
            >
              <Instagram className="text-primary" size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-primary/40 transition-colors"
            >
              <MapPin className="text-primary" size={20} />
            </a>
          </div>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
          >
            Fale pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
