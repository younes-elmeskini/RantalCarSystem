export const team = [
  {
    name: "Doha Wahaib",
    role: "Directeur Général",
    image: "/images/team1.jpg",
    description: "Expérimentée dans la location de voitures"
  },
  {
    name: "Amer Mohamed Fahd",
    role: "Responsable Commercial",
    image: "/images/team2.jpg",
    description: "Spécialiste en service client et satisfaction"
  },
  {
    name: "Amine Nemrany",
    role: "Responsable Technique",
    image: "/images/team3.jpg",
    description: "Expert en maintenance et sécurité automobile"
  }
];


export const Navlinks = [
  { href: "/", label: "Accueil" },
  { href: "/cars", label: "Voitures" },
  { href: "/About", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/add", label: "Gestion" },
];

// Transmission options
export const transmissionOptions = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automatic" },
];

// Fuel type options
export const fuelTypeOptions = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
];

export const filterTypes = [
  { label: "All", value: "" },
  { label: "Berline", value: "Berline" },
  { label: "Hatchback", value: "Hatchback" },
  { label: "SUV", value: "SUV" },
];
export const  Cars = [
  {
    id:1,
    name: "BMW M$",
    type: "Berline",
    cover: "/cars/M4.png",
    images: ["/cars/car1_1.png", "/cars/car1_2.png", "/cars/car1_3.png"],
    price: "1000 MAD",
    seats: 5,
    dors: 4,
    transmission: "Automat",
    fuelType: "Petrol",
    airConditioning: true,
  },
    {
    id:2,
    name: "Audi A3",
    type: "Hatchback",
    cover: "/cars/A3.png",
    images: ["/cars/car1_1.png", "/cars/car1_2.png", "/cars/car1_3.png"],
    price: "500 MAD",
    seats: 5,
    dors: 4,
    transmission: "Automat",
    fuelType: "Petrol",
    airConditioning: true,
  },
    {
    id:3,
    name: "Golf 8",
    type: "Hatchback",
    cover: "/cars/golf8.png",
    images: ["/cars/car1_1.png", "/cars/car1_2.png", "/cars/car1_3.png"],
    price: "800 MAD",
    seats: 5,
    dors: 4,
    transmission: "Automat",
    fuelType: "Petrol",
    airConditioning: true,
  },
    {
    id:4,
    name: "Mercedes Class A",
    type: "Hatchback",
    cover: "/cars/classA.png",
    images: ["/cars/car1_1.png", "/cars/car1_2.png", "/cars/car1_3.png"],
    price: "50 MAD",
    seats: 5,
    dors: 4,
    transmission: "Automat",
    fuelType: "Petrol",
    airConditioning: true,
  },
    {
    id:5,
    name: "troc",
    type: "SUV",
    cover: "/cars/troc.png",
    images: ["/cars/car1_1.png", "/cars/car1_2.png", "/cars/car1_3.png"],
    price: "500 MAD",
    seats: 5,
    dors: 4,
    transmission: "Automat",
    fuelType: "Petrol",
    airConditioning: true,
  },
    {
    id:6,
    name: "Porsche Buster",
    type: "Berline",
    cover: "/cars/porsheBuster.png",
    images: ["/cars/car1_1.png", "/cars/car1_2.png", "/cars/car1_3.png"],
    price: "1500 MAD",
    seats: 4,
    dors: 2,
    transmission: "Automat",
    fuelType: "Petrol",
    airConditioning: true,
  },
]