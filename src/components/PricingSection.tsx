import { motion } from "framer-motion";
import { Heart, Sparkles, Crown, Check } from "lucide-react";

const packages = [
  {
    icon: Heart,
    name: "Essencial",
    highlight: false,
    items: [
      "Reunião inicial com o casal",
      "Roteiro base da cerimônia",
      "Condução da cerimônia (~30 min)",
      "Suporte por WhatsApp",
    ],
  },
  {
    icon: Sparkles,
    name: "Personalizado",
    highlight: true,
    items: [
      "2 reuniões com o casal",
      "Roteiro 100% personalizado",
      "Assessoria nos votos dos noivos",
      "Ensaio prévio da cerimônia",
      "1 ritual simbólico incluso",
      "Condução da cerimônia (~45 min)",
    ],
  },
  {
    icon: Crown,
    name: "Premium",
    highlight: false,
    items: [
      "Tudo do Personalizado",
      "Acompanhamento no dia desde a preparação",
      "Coordenação do cortejo e padrinhos",
      "Curadoria musical da cerimônia",
      "Roteiro fotográfico dos momentos-chave",
      "Rituais simbólicos ilimitados",
      "Suporte prioritário",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pacotes" className="py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.2em] uppercase">
            Investimento
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3">
            Nossos Pacotes
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Escolha o pacote que combina com o seu momento e receba uma proposta sob medida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  pkg.highlight
                    ? "bg-background border-2 border-primary shadow-lg shadow-primary/10"
                    : "bg-background border border-border"
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-body tracking-wide px-4 py-1 rounded-full">
                    Mais Escolhido
                  </span>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    pkg.highlight ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">{pkg.name}</h3>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-body text-sm text-muted-foreground">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contato"
                  className={`block text-center font-body text-sm tracking-wide py-3 rounded-full transition-colors ${
                    pkg.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  Solicitar Proposta
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center font-body text-muted-foreground italic mt-12 max-w-lg mx-auto"
        >
          Cada cerimônia é única — entre em contato para receber uma proposta personalizada.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
