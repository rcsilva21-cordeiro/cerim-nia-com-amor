import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-primary-foreground/70">
      <div className="container max-w-6xl mx-auto px-6 text-center">
        <Heart className="mx-auto mb-4 text-primary" size={20} strokeWidth={1.5} />
        <p className="font-display text-lg text-primary-foreground mb-2">Cordeiro Celebrações</p>
        <p className="text-sm">
          Celebrando o amor em todas as suas formas.
        </p>
        <p className="text-xs mt-6 text-primary-foreground/40">
          © {new Date().getFullYear()} Cordeiro Celebrações. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
