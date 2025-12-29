"use client";
import { useState, useEffect } from "react";
import HeroFilter from "@/components/heroFilter";
import InfoBlock from "@/components/infoBlock";
import MenuCars from "@/components/menuCars";
import { HomeSkeleton } from "@/components/skeletons/HomeSkeleton";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroContact from "@/components/heroContact";
import SectionAnimation from "@/components/animations/SectionAnimation";
import { team } from "@/lib/constantes";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div>
      <HeroFilter />
      <InfoBlock />
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 lg:px-8 xl:mx-[140px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[38px] font-bold leading-tight">
          Choisissez la voiture qui vous convient
        </h2>
        <Link
          href="/cars"
          className="text-blue-600 hover:text-blue-800 font-medium hidden md:block text-sm sm:text-base transition-colors duration-200 whitespace-nowrap"
        >
          Voir tout →
        </Link>
      </motion.div>
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <MenuCars
          filter={{ gamme: "All", type: "All", brand: "All" }}
          limit={6}
        />
      </motion.div>
      <div className="flex justify-center mt-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/cars"
            className="relative text-blue-600 text-center font-medium md:hidden text-sm sm:text-base w-full transition-colors duration-300 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-1/2 after:transition-all after:duration-300"
          >
            Voir tout →
          </Link>
        </motion.div>
      </div>
      <HeroContact />
            {/* Team Section */}
            <SectionAnimation direction="up" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés à votre service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionAnimation>
    </div>
  );
}
