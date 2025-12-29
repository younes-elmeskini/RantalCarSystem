import CarFilterForm from "./formFilter";
import SectionAnimation from "./animations/SectionAnimation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function heroFilter() {
  return (
    <SectionAnimation direction="up" delay={0.2}>
    <section className="bg-[url(/images/Hero.png)] bg-cover bg-center h-[auto] md:h-[600px] flex justify-center items-center gap-6 p-4 md:p-[72px] mx-[30px] md:mx-[80px] my-4 md:my-[40px] rounded-[32px] flex-col md:flex-row">
      <SectionAnimation direction="left" delay={0.2}>
        <div className="text-white space-y-6 text-center md:text-left">
          <motion.h1
            className="font-bold text-[28px] md:text-[60px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Location de Voitures à Casablanca, Maroc
          </motion.h1>
          <motion.p
            className="md:text-[16px] text-[12px] max-w-[460px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Découvrez notre large gamme de véhicules de location à Casablanca et dans tout le Maroc.
            Des voitures fiables et confortables pour tous vos déplacements. Réservez en ligne facilement.
          </motion.p>
          <motion.button
            className="px-4 py-2 md:px-6 md:py-3 bg-[#FF9E0C] text-white rounded-[12px] hover:bg-[#7c5dfa] transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/cars">Voir toutes les voitures</Link>
          </motion.button>
        </div>
      </SectionAnimation>
      <SectionAnimation direction="right" delay={0.4}>
        <div className="bg-white p-[20px] md:p-[40px] rounded-[16px] w-[200px]] md:w-[500px]">
          <h2 className="md:text-[24px] text-[18px] font-bold mb-4 text-center">
            Réservez votre voiture
          </h2>
          <CarFilterForm />
        </div>
      </SectionAnimation>
    </section>
    </SectionAnimation>
  );
}
