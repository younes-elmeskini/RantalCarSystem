import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sendSimpleWhatsAppMessage } from "@/lib/whatsapp";
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

export default function CarCard(car: Car) {
  const [showNotification, setShowNotification] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la navigation vers la page de détail
    sendSimpleWhatsAppMessage(car.name, car.price);
    setShowNotification(true);
  };

  return (
    <motion.div 
      className="relative p-6 rounded-[16px] bg-[#fafafa] shadow-lg max-w-[400px] cursor-pointer card-hover" 
      onClick={() => (window.location.href = `/cars/${car.id}`)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Image
          src={car.cover}
          alt="car"
          width={400}
          height={200}
          className="w-full h-[200px] object-cover rounded-[12px] shadow-lg"
        />
      </motion.div>
      <motion.div 
        className="flex justify-between w-full my-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="text-left">
          <h3 className="md:text-[24px] font-semibold">{car.name}</h3>
          <p>{car.type}</p>
        </div>
        <div className="text-right">
          <span>Apartir de</span>
          <p className="md:text-[24px] text-[#5937E0] font-bold">{car.price} MAD</p>
        </div>
      </motion.div>
      <motion.div 
        className="flex justify-between w-full text-[14px] md:text-[16px]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/gear.png"
            alt="gear"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>{car.transmission}</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/fuel.png"
            alt="fuel"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>{car.fuelType}</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/air.png"
            alt="air"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>{car.airConditioning?"A/C":"No A/C"}</p>
        </div>
      </motion.div>
      
      {/* Bouton WhatsApp rapide */}
      <motion.button
        className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </motion.button>
      
      {/* Notification WhatsApp */}
      <WhatsAppNotification
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        carName={car.name}
      />
    </motion.div>
  );
}
