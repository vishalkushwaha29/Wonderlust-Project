const sampleListings = [
  {
    title: "Cozy Cabin in Paris",
    description:
      "Escape to this cozy cabin for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Paris",
    country: "France",
    category: "Trending",
  },
  {
    title: "Modern Bungalow in Santorini",
    description:
      "Stay in the heart of Santorini in this modern bungalow, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 937,
    location: "Santorini",
    country: "Greece",
    category: "Rooms",
  },
  {
    title: "Charming Apartment in Cape Town",
    description:
      "Unplug and unwind in this charming apartment, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1074,
    location: "Cape Town",
    country: "South Africa",
    category: "Iconic Cities",
  },
  {
    title: "Luxurious Treehouse in Sydney",
    description:
      "Experience the charm of Sydney in this beautifully appointed treehouse, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 1211,
    location: "Sydney",
    country: "Australia",
    category: "Mountains",
  },
  {
    title: "Secluded Farmhouse in Reykjavik",
    description:
      "A true getaway paradise, this secluded farmhouse in Reykjavik offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 1348,
    location: "Reykjavik",
    country: "Iceland",
    category: "Castles",
  },
  {
    title: "Rustic Beach House in Lisbon",
    description:
      "Escape to this rustic beach house for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    },
    price: 1485,
    location: "Lisbon",
    country: "Portugal",
    category: "Amazing pools",
  },
  {
    title: "Elegant Studio in Barcelona",
    description:
      "Stay in the heart of Barcelona in this elegant studio, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
    },
    price: 1622,
    location: "Barcelona",
    country: "Spain",
    category: "Camping",
  },
  {
    title: "Sunny Penthouse in Marrakech",
    description:
      "Unplug and unwind in this sunny penthouse, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 1759,
    location: "Marrakech",
    country: "Morocco",
    category: "Farms",
  },
  {
    title: "Peaceful Chalet in Queenstown",
    description:
      "Experience the charm of Queenstown in this beautifully appointed chalet, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
    },
    price: 1896,
    location: "Queenstown",
    country: "New Zealand",
    category: "Arctic",
  },
  {
    title: "Stylish Retreat in Vancouver",
    description:
      "A true getaway paradise, this stylish retreat in Vancouver offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=60",
    },
    price: 2033,
    location: "Vancouver",
    country: "Canada",
    category: "Beachs",
  },
  {
    title: "Spacious Townhouse in Dubai",
    description:
      "Escape to this spacious townhouse for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60",
    },
    price: 2170,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Domes",
  },
  {
    title: "Quaint Cabana in Rio de Janeiro",
    description:
      "Stay in the heart of Rio de Janeiro in this quaint cabana, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    },
    price: 2307,
    location: "Rio de Janeiro",
    country: "Brazil",
    category: "Trending",
  },
  {
    title: "Breathtaking Cottage in Amsterdam",
    description:
      "Unplug and unwind in this breathtaking cottage, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60",
    },
    price: 2444,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Rooms",
  },
  {
    title: "Serene Loft in Bangkok",
    description:
      "Experience the charm of Bangkok in this beautifully appointed loft, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2581,
    location: "Bangkok",
    country: "Thailand",
    category: "Iconic Cities",
  },
  {
    title: "Chic Villa in Prague",
    description:
      "A true getaway paradise, this chic villa in Prague offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=60",
    },
    price: 2718,
    location: "Prague",
    country: "Czech Republic",
    category: "Mountains",
  },
  {
    title: "Cozy Cabin in Vienna",
    description:
      "Escape to this cozy cabin for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 2855,
    location: "Vienna",
    country: "Austria",
    category: "Castles",
  },
  {
    title: "Modern Bungalow in Costa Rica",
    description:
      "Stay in the heart of Costa Rica in this modern bungalow, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 2992,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Amazing pools",
  },
  {
    title: "Charming Apartment in Jaipur",
    description:
      "Unplug and unwind in this charming apartment, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=60",
    },
    price: 3129,
    location: "Jaipur",
    country: "India",
    category: "Camping",
  },
  {
    title: "Luxurious Treehouse in Goa",
    description:
      "Experience the charm of Goa in this beautifully appointed treehouse, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 3266,
    location: "Goa",
    country: "India",
    category: "Farms",
  },
  {
    title: "Secluded Farmhouse in Zurich",
    description:
      "A true getaway paradise, this secluded farmhouse in Zurich offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 3403,
    location: "Zurich",
    country: "Switzerland",
    category: "Arctic",
  },
  {
    title: "Rustic Beach House in Edinburgh",
    description:
      "Escape to this rustic beach house for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 3540,
    location: "Edinburgh",
    country: "United Kingdom",
    category: "Beachs",
  },
  {
    title: "Elegant Studio in Dublin",
    description:
      "Stay in the heart of Dublin in this elegant studio, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 3677,
    location: "Dublin",
    country: "Ireland",
    category: "Domes",
  },
  {
    title: "Sunny Penthouse in Copenhagen",
    description:
      "Unplug and unwind in this sunny penthouse, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 3814,
    location: "Copenhagen",
    country: "Denmark",
    category: "Trending",
  },
  {
    title: "Peaceful Chalet in Seoul",
    description:
      "Experience the charm of Seoul in this beautifully appointed chalet, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 3951,
    location: "Seoul",
    country: "South Korea",
    category: "Rooms",
  },
  {
    title: "Stylish Retreat in Nairobi",
    description:
      "A true getaway paradise, this stylish retreat in Nairobi offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 4088,
    location: "Nairobi",
    country: "Kenya",
    category: "Iconic Cities",
  },
  {
    title: "Spacious Townhouse in Buenos Aires",
    description:
      "Escape to this spacious townhouse for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    },
    price: 4225,
    location: "Buenos Aires",
    country: "Argentina",
    category: "Mountains",
  },
  {
    title: "Quaint Cabana in Havana",
    description:
      "Stay in the heart of Havana in this quaint cabana, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
    },
    price: 4362,
    location: "Havana",
    country: "Cuba",
    category: "Castles",
  },
  {
    title: "Breathtaking Cottage in Istanbul",
    description:
      "Unplug and unwind in this breathtaking cottage, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 4499,
    location: "Istanbul",
    country: "Turkey",
    category: "Amazing pools",
  },
  {
    title: "Serene Loft in Malibu",
    description:
      "Experience the charm of Malibu in this beautifully appointed loft, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
    },
    price: 4636,
    location: "Malibu",
    country: "United States",
    category: "Camping",
  },
  {
    title: "Chic Villa in New York City",
    description:
      "A true getaway paradise, this chic villa in New York City offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=60",
    },
    price: 4773,
    location: "New York City",
    country: "United States",
    category: "Farms",
  },
  {
    title: "Cozy Cabin in Aspen",
    description:
      "Escape to this cozy cabin for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60",
    },
    price: 4910,
    location: "Aspen",
    country: "United States",
    category: "Arctic",
  },
  {
    title: "Modern Bungalow in Florence",
    description:
      "Stay in the heart of Florence in this modern bungalow, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    },
    price: 5047,
    location: "Florence",
    country: "Italy",
    category: "Beachs",
  },
  {
    title: "Charming Apartment in Portland",
    description:
      "Unplug and unwind in this charming apartment, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60",
    },
    price: 5184,
    location: "Portland",
    country: "United States",
    category: "Domes",
  },
  {
    title: "Luxurious Treehouse in Kyoto",
    description:
      "Experience the charm of Kyoto in this beautifully appointed treehouse, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    },
    price: 5321,
    location: "Kyoto",
    country: "Japan",
    category: "Trending",
  },
  {
    title: "Secluded Farmhouse in Bali",
    description:
      "A true getaway paradise, this secluded farmhouse in Bali offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=60",
    },
    price: 5458,
    location: "Bali",
    country: "Indonesia",
    category: "Rooms",
  },
  {
    title: "Rustic Beach House in Paris",
    description:
      "Escape to this rustic beach house for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 895,
    location: "Paris",
    country: "France",
    category: "Iconic Cities",
  },
  {
    title: "Elegant Studio in Santorini",
    description:
      "Stay in the heart of Santorini in this elegant studio, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1032,
    location: "Santorini",
    country: "Greece",
    category: "Mountains",
  },
  {
    title: "Sunny Penthouse in Cape Town",
    description:
      "Unplug and unwind in this sunny penthouse, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=60",
    },
    price: 1169,
    location: "Cape Town",
    country: "South Africa",
    category: "Castles",
  },
  {
    title: "Peaceful Chalet in Sydney",
    description:
      "Experience the charm of Sydney in this beautifully appointed chalet, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 1306,
    location: "Sydney",
    country: "Australia",
    category: "Amazing pools",
  },
  {
    title: "Stylish Retreat in Reykjavik",
    description:
      "A true getaway paradise, this stylish retreat in Reykjavik offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 1443,
    location: "Reykjavik",
    country: "Iceland",
    category: "Camping",
  },
  {
    title: "Spacious Townhouse in Lisbon",
    description:
      "Escape to this spacious townhouse for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 1580,
    location: "Lisbon",
    country: "Portugal",
    category: "Farms",
  },
  {
    title: "Quaint Cabana in Barcelona",
    description:
      "Stay in the heart of Barcelona in this quaint cabana, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1717,
    location: "Barcelona",
    country: "Spain",
    category: "Arctic",
  },
  {
    title: "Breathtaking Cottage in Marrakech",
    description:
      "Unplug and unwind in this breathtaking cottage, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1854,
    location: "Marrakech",
    country: "Morocco",
    category: "Beachs",
  },
  {
    title: "Serene Loft in Queenstown",
    description:
      "Experience the charm of Queenstown in this beautifully appointed loft, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 1991,
    location: "Queenstown",
    country: "New Zealand",
    category: "Domes",
  },
  {
    title: "Chic Villa in Vancouver",
    description:
      "A true getaway paradise, this chic villa in Vancouver offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 2128,
    location: "Vancouver",
    country: "Canada",
    category: "Trending",
  },
  {
    title: "Cozy Cabin in Dubai",
    description:
      "Escape to this cozy cabin for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    },
    price: 2265,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Rooms",
  },
  {
    title: "Modern Bungalow in Rio de Janeiro",
    description:
      "Stay in the heart of Rio de Janeiro in this modern bungalow, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
    },
    price: 2402,
    location: "Rio de Janeiro",
    country: "Brazil",
    category: "Iconic Cities",
  },
  {
    title: "Charming Apartment in Amsterdam",
    description:
      "Unplug and unwind in this charming apartment, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 2539,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Mountains",
  },
  {
    title: "Luxurious Treehouse in Bangkok",
    description:
      "Experience the charm of Bangkok in this beautifully appointed treehouse, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
    },
    price: 2676,
    location: "Bangkok",
    country: "Thailand",
    category: "Castles",
  },
  {
    title: "Secluded Farmhouse in Prague",
    description:
      "A true getaway paradise, this secluded farmhouse in Prague offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=60",
    },
    price: 2813,
    location: "Prague",
    country: "Czech Republic",
    category: "Amazing pools",
  },
  {
    title: "Rustic Beach House in Vienna",
    description:
      "Escape to this rustic beach house for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60",
    },
    price: 2950,
    location: "Vienna",
    country: "Austria",
    category: "Camping",
  },
  {
    title: "Elegant Studio in Costa Rica",
    description:
      "Stay in the heart of Costa Rica in this elegant studio, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    },
    price: 3087,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Farms",
  },
  {
    title: "Sunny Penthouse in Jaipur",
    description:
      "Unplug and unwind in this sunny penthouse, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60",
    },
    price: 3224,
    location: "Jaipur",
    country: "India",
    category: "Arctic",
  },
  {
    title: "Peaceful Chalet in Goa",
    description:
      "Experience the charm of Goa in this beautifully appointed chalet, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    },
    price: 3361,
    location: "Goa",
    country: "India",
    category: "Beachs",
  },
  {
    title: "Stylish Retreat in Zurich",
    description:
      "A true getaway paradise, this stylish retreat in Zurich offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=60",
    },
    price: 3498,
    location: "Zurich",
    country: "Switzerland",
    category: "Domes",
  },
  {
    title: "Spacious Townhouse in Edinburgh",
    description:
      "Escape to this spacious townhouse for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 3635,
    location: "Edinburgh",
    country: "United Kingdom",
    category: "Trending",
  },
  {
    title: "Quaint Cabana in Dublin",
    description:
      "Stay in the heart of Dublin in this quaint cabana, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 3772,
    location: "Dublin",
    country: "Ireland",
    category: "Rooms",
  },
  {
    title: "Breathtaking Cottage in Copenhagen",
    description:
      "Unplug and unwind in this breathtaking cottage, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=60",
    },
    price: 3909,
    location: "Copenhagen",
    country: "Denmark",
    category: "Iconic Cities",
  },
  {
    title: "Serene Loft in Seoul",
    description:
      "Experience the charm of Seoul in this beautifully appointed loft, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 4046,
    location: "Seoul",
    country: "South Korea",
    category: "Mountains",
  },
  {
    title: "Chic Villa in Nairobi",
    description:
      "A true getaway paradise, this chic villa in Nairobi offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 4183,
    location: "Nairobi",
    country: "Kenya",
    category: "Castles",
  },
  {
    title: "Cozy Cabin in Buenos Aires",
    description:
      "Escape to this cozy cabin for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 4320,
    location: "Buenos Aires",
    country: "Argentina",
    category: "Amazing pools",
  },
  {
    title: "Modern Bungalow in Havana",
    description:
      "Stay in the heart of Havana in this modern bungalow, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 4457,
    location: "Havana",
    country: "Cuba",
    category: "Camping",
  },
  {
    title: "Charming Apartment in Istanbul",
    description:
      "Unplug and unwind in this charming apartment, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 4594,
    location: "Istanbul",
    country: "Turkey",
    category: "Farms",
  },
  {
    title: "Luxurious Treehouse in Malibu",
    description:
      "Experience the charm of Malibu in this beautifully appointed treehouse, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 4731,
    location: "Malibu",
    country: "United States",
    category: "Arctic",
  },
  {
    title: "Secluded Farmhouse in New York City",
    description:
      "A true getaway paradise, this secluded farmhouse in New York City offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 4868,
    location: "New York City",
    country: "United States",
    category: "Beachs",
  },
  {
    title: "Rustic Beach House in Aspen",
    description:
      "Escape to this rustic beach house for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    },
    price: 5005,
    location: "Aspen",
    country: "United States",
    category: "Domes",
  },
  {
    title: "Elegant Studio in Florence",
    description:
      "Stay in the heart of Florence in this elegant studio, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
    },
    price: 5142,
    location: "Florence",
    country: "Italy",
    category: "Trending",
  },
  {
    title: "Sunny Penthouse in Portland",
    description:
      "Unplug and unwind in this sunny penthouse, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 5279,
    location: "Portland",
    country: "United States",
    category: "Rooms",
  },
  {
    title: "Peaceful Chalet in Kyoto",
    description:
      "Experience the charm of Kyoto in this beautifully appointed chalet, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
    },
    price: 5416,
    location: "Kyoto",
    country: "Japan",
    category: "Iconic Cities",
  },
  {
    title: "Stylish Retreat in Bali",
    description:
      "A true getaway paradise, this stylish retreat in Bali offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=60",
    },
    price: 853,
    location: "Bali",
    country: "Indonesia",
    category: "Mountains",
  },
  {
    title: "Spacious Townhouse in Paris",
    description:
      "Escape to this spacious townhouse for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60",
    },
    price: 990,
    location: "Paris",
    country: "France",
    category: "Castles",
  },
  {
    title: "Quaint Cabana in Santorini",
    description:
      "Stay in the heart of Santorini in this quaint cabana, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    },
    price: 1127,
    location: "Santorini",
    country: "Greece",
    category: "Amazing pools",
  },
  {
    title: "Breathtaking Cottage in Cape Town",
    description:
      "Unplug and unwind in this breathtaking cottage, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60",
    },
    price: 1264,
    location: "Cape Town",
    country: "South Africa",
    category: "Camping",
  },
  {
    title: "Serene Loft in Sydney",
    description:
      "Experience the charm of Sydney in this beautifully appointed loft, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    },
    price: 1401,
    location: "Sydney",
    country: "Australia",
    category: "Farms",
  },
  {
    title: "Chic Villa in Reykjavik",
    description:
      "A true getaway paradise, this chic villa in Reykjavik offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=60",
    },
    price: 1538,
    location: "Reykjavik",
    country: "Iceland",
    category: "Arctic",
  },
  {
    title: "Cozy Cabin in Lisbon",
    description:
      "Escape to this cozy cabin for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 1675,
    location: "Lisbon",
    country: "Portugal",
    category: "Beachs",
  },
  {
    title: "Modern Bungalow in Barcelona",
    description:
      "Stay in the heart of Barcelona in this modern bungalow, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1812,
    location: "Barcelona",
    country: "Spain",
    category: "Domes",
  },
  {
    title: "Charming Apartment in Marrakech",
    description:
      "Unplug and unwind in this charming apartment, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=60",
    },
    price: 1949,
    location: "Marrakech",
    country: "Morocco",
    category: "Trending",
  },
  {
    title: "Luxurious Treehouse in Queenstown",
    description:
      "Experience the charm of Queenstown in this beautifully appointed treehouse, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 2086,
    location: "Queenstown",
    country: "New Zealand",
    category: "Rooms",
  },
  {
    title: "Secluded Farmhouse in Vancouver",
    description:
      "A true getaway paradise, this secluded farmhouse in Vancouver offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 2223,
    location: "Vancouver",
    country: "Canada",
    category: "Iconic Cities",
  },
  {
    title: "Rustic Beach House in Dubai",
    description:
      "Escape to this rustic beach house for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 2360,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Mountains",
  },
  {
    title: "Elegant Studio in Rio de Janeiro",
    description:
      "Stay in the heart of Rio de Janeiro in this elegant studio, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 2497,
    location: "Rio de Janeiro",
    country: "Brazil",
    category: "Castles",
  },
  {
    title: "Sunny Penthouse in Amsterdam",
    description:
      "Unplug and unwind in this sunny penthouse, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 2634,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Amazing pools",
  },
  {
    title: "Peaceful Chalet in Bangkok",
    description:
      "Experience the charm of Bangkok in this beautifully appointed chalet, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 2771,
    location: "Bangkok",
    country: "Thailand",
    category: "Camping",
  },
  {
    title: "Stylish Retreat in Prague",
    description:
      "A true getaway paradise, this stylish retreat in Prague offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 2908,
    location: "Prague",
    country: "Czech Republic",
    category: "Farms",
  },
  {
    title: "Spacious Townhouse in Vienna",
    description:
      "Escape to this spacious townhouse for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    },
    price: 3045,
    location: "Vienna",
    country: "Austria",
    category: "Arctic",
  },
  {
    title: "Quaint Cabana in Costa Rica",
    description:
      "Stay in the heart of Costa Rica in this quaint cabana, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
    },
    price: 3182,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Beachs",
  },
  {
    title: "Breathtaking Cottage in Jaipur",
    description:
      "Unplug and unwind in this breathtaking cottage, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 3319,
    location: "Jaipur",
    country: "India",
    category: "Domes",
  },
  {
    title: "Serene Loft in Goa",
    description:
      "Experience the charm of Goa in this beautifully appointed loft, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
    },
    price: 3456,
    location: "Goa",
    country: "India",
    category: "Trending",
  },
  {
    title: "Chic Villa in Zurich",
    description:
      "A true getaway paradise, this chic villa in Zurich offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=60",
    },
    price: 3593,
    location: "Zurich",
    country: "Switzerland",
    category: "Rooms",
  },
  {
    title: "Cozy Cabin in Edinburgh",
    description:
      "Escape to this cozy cabin for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60",
    },
    price: 3730,
    location: "Edinburgh",
    country: "United Kingdom",
    category: "Iconic Cities",
  },
  {
    title: "Modern Bungalow in Dublin",
    description:
      "Stay in the heart of Dublin in this modern bungalow, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    },
    price: 3867,
    location: "Dublin",
    country: "Ireland",
    category: "Mountains",
  },
  {
    title: "Charming Apartment in Copenhagen",
    description:
      "Unplug and unwind in this charming apartment, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60",
    },
    price: 4004,
    location: "Copenhagen",
    country: "Denmark",
    category: "Castles",
  },
  {
    title: "Luxurious Treehouse in Seoul",
    description:
      "Experience the charm of Seoul in this beautifully appointed treehouse, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    },
    price: 4141,
    location: "Seoul",
    country: "South Korea",
    category: "Amazing pools",
  },
  {
    title: "Secluded Farmhouse in Nairobi",
    description:
      "A true getaway paradise, this secluded farmhouse in Nairobi offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=60",
    },
    price: 4278,
    location: "Nairobi",
    country: "Kenya",
    category: "Camping",
  },
  {
    title: "Rustic Beach House in Buenos Aires",
    description:
      "Escape to this rustic beach house for a relaxing getaway with stunning views and easy access to local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 4415,
    location: "Buenos Aires",
    country: "Argentina",
    category: "Farms",
  },
  {
    title: "Elegant Studio in Havana",
    description:
      "Stay in the heart of Havana in this elegant studio, perfect for explorers seeking comfort and style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 4552,
    location: "Havana",
    country: "Cuba",
    category: "Arctic",
  },
  {
    title: "Sunny Penthouse in Istanbul",
    description:
      "Unplug and unwind in this sunny penthouse, surrounded by nature and the perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=60",
    },
    price: 4689,
    location: "Istanbul",
    country: "Turkey",
    category: "Beachs",
  },
  {
    title: "Peaceful Chalet in Malibu",
    description:
      "Experience the charm of Malibu in this beautifully appointed chalet, ideal for an unforgettable stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 4826,
    location: "Malibu",
    country: "United States",
    category: "Domes",
  },
  {
    title: "Stylish Retreat in New York City",
    description:
      "A true getaway paradise, this stylish retreat in New York City offers comfort, privacy, and unforgettable views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 4963,
    location: "New York City",
    country: "United States",
    category: "Trending",
  },
];

module.exports = { data: sampleListings };
