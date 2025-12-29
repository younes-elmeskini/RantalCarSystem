"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import WhatsAppNotification from "./WhatsAppNotification";

type Car = {
  id: string;
  name: string;
  type: string;
  cover: string;
  price: string;
  seats: number;
  dors: number;
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
};

interface CarDetaisProps {
  car: Car;
}

export default function CarDetais({ car }: CarDetaisProps) {
  const [showNotification, setShowNotification] = useState(false);

  // Fonction pour gérer le clic sur le bouton Rent Now
  const handleRentNow = () => {
    sendWhatsAppMessage(car);
    setShowNotification(true);
  };

  if (!car) return <p>Car not found</p>;
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[100px] justify-center items-start px-4 lg:px-0">
      <motion.div
        className="w-full lg:w-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h2
          className="text-2xl md:text-[40px] font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {car.name}
        </motion.h2>
        <motion.p
          className="text-[#5937E0] text-xl md:text-[24px] font-bold flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {car.price} MAD<span className="text-sm md:text-[14px] font-normal text-[#00000060]">/day
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src={car.cover}
            alt="cars"
            width={600}
            height={260}
            className="rounded-[20px] mt-4 w-full  h-auto object-cover shadow-lg"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full lg:w-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.h3
          className="text-xl md:text-[24px] font-bold my-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Technical Specification
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            {
              icon: "/icons/gear.png",
              label: "Gear Box",
              value: car.transmission,
            },
            { icon: "/icons/fuel.png", label: "Fuel", value: car.fuelType },
            { icon: "/icons/dors.png", label: "Doors", value: car.dors },
            {
              icon: "/icons/air.png",
              label: "Air Conditioner",
              value: car.airConditioning ? "A/C" : "No A/C",
            },
            {
              icon: "/icons/seat.png",
              label: "Seats",
              value: car.seats,
              colSpan: "col-span-2 md:col-span-1",
            },
          ].map((spec, index) => (
            <motion.div
              key={spec.label}
              className={`bg-[#fafafa] p-3 md:p-4 rounded-[20px] w-full md:w-[150px] flex-col gap-2 md:gap-4 flex justify-center items-start shadow-md text-sm md:text-[16px] hover:shadow-lg transition-shadow duration-300 ${
                spec.colSpan || ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <Image src={spec.icon} alt="car" width={24} height={24} />
              </motion.div>
              <p>{spec.label}</p>
              <p className="font-semibold">{spec.value}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          className="bg-[#5937E0] w-full md:min-w-[290px] text-white py-3 rounded-[12px] hover:bg-[#7c5dfa] transition-colors duration-300 mt-6 md:mt-10 button-animation flex items-center justify-center gap-2 font-semibold"
          onClick={handleRentNow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          Louer maintenant
        </motion.button>
      </motion.div>

      {/* Notification WhatsApp */}
      <WhatsAppNotification
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        carName={car.name}
      />
    </div>
  );
}
