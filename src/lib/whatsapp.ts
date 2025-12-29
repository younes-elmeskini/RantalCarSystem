// Fonction utilitaire pour envoyer un message WhatsApp avec les informations de la voiture
export const sendWhatsAppMessage = (car: {
  name: string;
  type: string;
  price: string;
  seats: number;
  dors: number;
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
}) => {
  const phoneNumber = "21266047412"; // Numéro WhatsApp sans le +
  
  // Génération du message avec les informations de la voiture
  const message = `🚗 *Demande de location de véhicule*

*Modèle :* ${car.name}
*Type :* ${car.type}
*Prix :* ${car.price}/jour

*Spécifications techniques :*
• 📦 Boîte de vitesses : ${car.transmission}
• ⛽ Carburant : ${car.fuelType}
• 🚪 Nombre de portes : ${car.dors}
• 🧊 Climatisation : ${car.airConditioning ? "Oui" : "Non"}
• 🪑 Nombre de places : ${car.seats}

Bonjour, je suis intéressé(e) par la location de ce véhicule. Pouvez-vous me donner plus d'informations sur la disponibilité et les conditions de location ?

Merci !`;

  // Encodage du message pour l'URL
  const encodedMessage = encodeURIComponent(message);
  
  // Création de l'URL WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Ouverture de WhatsApp dans un nouvel onglet
  window.open(whatsappUrl, '_blank');
};

// Fonction alternative pour envoyer un message simple
export const sendSimpleWhatsAppMessage = (carName: string, carPrice: string) => {
  const phoneNumber = "21266047412";
  
  const message = `Bonjour ! Je suis intéressé(e) par la location de la ${carName} (${carPrice}/jour). Pouvez-vous me donner plus d'informations ?`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};
