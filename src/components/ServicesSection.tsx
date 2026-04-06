import { motion } from "framer-motion";
import { Heart, Sparkles, Music, BookOpen, Camera, Flower2, Mic } from "lucide-react";

const mainServices = [
  {
    icon: Heart,
    title: "Cerimônia Clássica",
    description: "Uma celebração atemporal com votos emocionantes, rituais simbólicos e toda a elegância que o seu amor merece.",
  },
  {
    icon: Sparkles,
    title: "Cerimônia Personalizada",
    description: "Criada sob medida para a história de vocês. Cada palavra, cada ritual, pensado para refletir o amor único do casal.",
  },
  {
    icon: BookOpen,
    title: "Cerimônia Espiritual",
    description: "Para casais que buscam uma conexão espiritual personalizada, sem vínculo com uma religião específica.",
  },
];

const addOnServices = [
  {
    icon: Mic,
    title: "Ensaio da Cerimônia",
    description: "Preparação completa para que tudo flua naturalmente no grande dia.",
  },
  {
    icon: Music,
    title: "Curadoria Musical",
    description: "Seleção musical personalizada para cada momento da cerimônia.",
  },
  {
    icon: Flower2,
    title: "Consultoria de Rituais",
    description: "Escolha dos rituais simbólicos perfeitos — vela da unidade, caixa do vinho, cerimônia da areia e mais.",
  },
  {
    icon: Camera,
    title: "Roteiro Fotográfico",
    description: "Planejamento dos momentos-chave para que nenhuma emoção passe despercebida pelas lentes.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 md:py-32 bg-gradient-rose">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="divider-ornament mb-6 max-w-[200px] mx-auto">
            <Heart className="text-primary shrink-0" size={16} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Cerimônias feitas com amor, para todos os tipos de amor.
          </p>
        </motion.div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50 text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Add-on Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
            Serviços Adicionais
          </h3>
          <p className="text-muted-foreground">
            Agregue ainda mais magia à sua cerimônia.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {addOnServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/60 backdrop-blur rounded-xl p-6 border border-border/30 hover:border-primary/30 transition-colors group"
            >
              <service.icon className="text-gold mb-4" size={24} strokeWidth={1.5} />
              <h4 className="text-base font-display font-semibold text-foreground mb-2">
                {service.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
