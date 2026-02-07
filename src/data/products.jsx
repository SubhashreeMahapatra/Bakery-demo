const products = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 450,
    image: "/images/cake1.jpeg",
    description: "Delicious chocolate cake with rich frosting.",
    variants: [
      { label: "500 g", price: 450 },
      { label: "1 kg", price: 850 },
      { label: "2 kg", price: 1600 }
    ]
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    price: 500,
    image: "/images/cake2.jpeg",
    description: "Moist red velvet cake topped with cream cheese icing.",
    variants: [
      { label: "500 g", price: 500 },
      { label: "1 kg", price: 900 }
    ]
  },
  {
    id: 3,
    name: "Cupcakes (Box of 6)",
    price: 360,
    image: "/images/cupcakes.jpeg",
    description: "Assorted cupcakes with various flavors and frostings.",
    variants: [
      { label: "Family Pack", price: 360 },
      { label: "Festive Offer", price: 1000 }
    ]
  },
  {
    id: 4,
    name:"Black Forest Cake",
    price: 480,
    image: "/images/cake3.jpeg",
    description: "Classic black forest cake with cherries and chocolate shavings.",
    variants: [
      { label: "500 g", price: 480 },
      { label: "1 kg", price: 900 }
    ]
  },
  {
    id:5,
    name:"Pineapple Cake",
    price: 400,
    image: "/images/cake4.jpeg",
    description: "Tropical pineapple cake with a tangy twist.",
    variants: [
      { label: "500 g", price: 400 },
      { label: "1 kg", price: 750 }
    ]
  },
  {
    id:6,
    name:"Strawberry Cake",
    price: 420,
    image: "/images/cake5.jpeg",
    description: "Fresh strawberry cake with a light, airy texture.",
    variants: [
      { label: "500 g", price: 420 },
      { label: "1 kg", price: 800 }
    ]
  },
  {id:7,
    name:"Blueberry Chesse Cake",
    price: 850,
    image: "/images/cake6.jpeg",
    description: "Creamy cheesecake topped with fresh blueberries.",
    variants: [
      { label: "500 g", price: 850 },
      { label: "1 kg", price: 1600 }
    ]
  },
  {
    id:8,
    name:"Oreo Cake",
    price: 550,
    image: "/images/cake7.jpeg",
    description: "Decadent Oreo cake with layers of cookies and cream.",
    variants: [
      { label: "500 g", price: 550 },
      { label: "1 kg", price: 1000 }
    ]
  }
];

export default products;
