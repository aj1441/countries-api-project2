// Countries API Data: Build out 3 JavaScript collections (arrays of objects) that would store the following data for the information being collected in the Countries API application:
// Each User Profile's information that they submit via the form
// Each User's Saved Countries
// The Country Count (which is how many times any user has viewed a specific country's page)

/// So what is need is a table to collect the user profile information, a table to collect the user's saved countries, and a table to collect the country count both globally and per user. I do not want to repeat the same data in multiple tables so I will use the id from the user profile table and the country table to link the user's saved countries to the user profile and the country count to the country. I will also linke the country count to the user profile so that I can track how many times a user has viewed a specific country.

let userProfile = [
  {
    id: 1,
    dateJoined: "2021-10-01",
    fullName: "Test User",
    email: "test@test.com",
    country: "United States",
    bio: "This is a test user profile",
  },
  {
    id: 2,
    dateJoined: "2021-10-01",
    fullName: "Test User2",
    email: "test2@test.com",
    country: "United States",
    bio: "This is another test user profile",
  },
];

// This is not needed as we are pulling this from another api already
// let countries = [
//     {
//         id: 1,
//         countryId: "USA", // country.id
//     },
//     {
//         id: 2,
//         countryId: "CAN", // country.id
//     },
//     {
//         id: 3,
//         countryId: "MEX", // country.id
//     }
// ];

let userSavedCountries = {
  user: [
    {
      id: 1,
      countries: [USA, CAN],
    },
    {
      id: 2,
      countries: [USA, MEX],
    },
  ],
};
// or

let userSavedCountries2 = [
  {
    id: 1,
    countries: [USA, CAN],
  },
  {
    id: 2,
    countries: [USA, MEX],
  },
];

// let userSavedCountries = [
//     {
//         id: 1,
//         userId: 1, // userProfile.id
//         countryId: 1, // country.id
//     },
//     {
//         id: 2,
//         userId: 1, // userProfile.id
//         countryId: 2, // canada country.id
//     },
//     {
//         id: 3,
//         userId: 2, // userProfile.id
//         countryId: 1, //'United States'
//     },
//     {
//         id: 4,
//         userId: 2, // userProfile.id
//         countryId: 2, // 'Canada',
//     },
// ];

// how can you use the tally
let countryCountGlobal = [
  {
    id: 1, // country.id
    country: "USA", //'United States',
    count: 2, //global count across all users
  },
  {
    id: 2, // country.id
    country: "CAN", //'Canada',
    count: 1, //global count across all users
  },
];

let countryCounterUser = [
  {
    id: 1,
    userId: 1, // userProfile.id
    countryId: 1, // country.id
    countryCount: 1, // how many times user has viewed this country
  },
  {
    id: 2,
    userId: 1, // userProfile.id
    countryId: 2, // canada country.id
    countryCount: 1, // how many times user has viewed this country
  },
  {
    id: 3,
    userId: 2, // userProfile.id
    countryId: 1, //'United States'
    countryCount: 1, // how many times user has viewed this country
  },
  {
    id: 4,
    userId: 2, // userProfile.id
    countryId: 2, // 'Canada',
    countryCount: 1, // how many times user has viewed this country
  },
];

// Wix Cookie Page: Build out 3 JavaScript collections (arrays of objects) that would store the data for this Wix Cookie ShopLinks to an external site. page. Take some time to study the designs and think through the data you would need to store for the following:
// Products sold on the sites
// Orders placed on the site
// Customers who make a purchase on the site.

let products = [
  {
    id: 1,
    name: "Chocolate Chip Cookies",
    sku: "CC001",
    quantity: 10,
    price: 2.5,
    description: "A classic cookie with chocolate chips",
    productDetails: "Contains wheat, milk, and soy",
  },
  {
    id: 2,
    name: "Poppy Seed Cookies",
    sku: "CC002",
    quantity: 20,
    price: 4.5,
    description:
      "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
    productDetails: "Contains seeds, wheat, milk and soy",
  },
];
let customers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

let orders = [
  {
    id: 1,
    orderId: 1,
    userId: 1,
    orderDate: "2021-10-01",
    orderTotal: 5.0,
    orderItems: [
      {
        productId: 1,
        quantity: 2,
        price: 2.5,
      },
    ],
  },
  {
    id: 2,
    orderId: 2,
    userId: 2,
    orderDate: "2021-10-01",
    orderTotal: 4.5,
    orderItems: [
      {
        productId: 2,
        quantity: 1,
        price: 4.5,
      },
    ],
  },
];

let customersWhoPurchased = [
  {
    id: 1,
    userId: 1,
    orderId: 1,
    numberOfOrders: 1,
  },
  {
    id: 2,
    userId: 2,
    orderId: [1, 8, 9],
    numberOfOrders: 3,
  },
];

// FineArt Studio Page: Build out 1 JavaScript collection that would store the profile data from this FineArt Studio Page.Links to an external site.
// As you are thinking about how you'd store this data, ask yourself these questions:

// What is going to be coded on the frontend?
// What needs to be stored on the backend?
// How might different objects relate to one another?
// What are the different data types I should use?

let userArtistProfile = [
  {
    id: 1,
    name: "Jane Doe",
    role: "UI Designer",
    spotLightMessage:
      "Jane is a talented UI designer with a passion for creating beautiful and functional designs.",
    demographics: [
      {
        age: 25,
        status: "Single",
        location: "San Francisco, CA",
        archetype: "Frequent Flyer",
      },
    ],
    traits: [
      "Organized",
      "Protective",
      "Practical",
      "Hardworking",
      "Passionate",
      "Punctual",
    ],
    bio: "Jill is a Regional Director who travels 4-8 times each month for work. She has a specific region in which she travels, and she often visits the same cities and stays at the same hotel. She is frustrated by the fact that no matter how frequently she takes similar trips, she spends hours of her day booking travel. She expects her travel solutions to be as organized as she is.",
    personality: [
      {
        introvertToExtrovert: 30, // 0 = full introvert, 100 = full extrovert
        analyticalToCreative: 80, // 0 = full analytical, 100 = full creative
        loyalToFickle: 5, // 0 = full loyal, 100 = full fickle
        passiveToActive: 65, // 0 = full passive, 100 = full active
      },
    ],
    goals: [
      "To spend less time booking travel",
      "To narrow her options quickly",
    ],
    motivations: [
      {
        price: 4, // 0-10 scale 0 notimportant 10 very important
        comfort: 7,
        convenience: 9,
        speed: 3,
        loyaltyMiles: 4,
      },
    ],
    frustrations: [
      "Spending hours booking travel",
      "Lack of organization in travel solutions",
      "Repeating the same booking process",
    ],
    favoriteBrands: [
      //frontend would be select option, selecting the option or checkbox would store an array of objects with the key being the company name and the value being an link to the logo
      {
        adidas: "/img/adida.png",
        nike: "/img/nike.png",
        netflix: "/img/netflix.png",
        airbnb: "/img/airbnb.png",
        zara: "/img/zara.png",
      },
    ],
  },
];


// 
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   role VARCHAR(255),
//   spotLightMessage TEXT,
//   bio TEXT
// );

// CREATE TABLE demographics (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE,
//   age INT,
//   status VARCHAR(50),
//   location VARCHAR(255),
//   archetype VARCHAR(255)
// );

// CREATE TABLE traits (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE,
//   trait VARCHAR(100) NOT NULL
// );

// CREATE TABLE personality (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE,
//   introvertToExtrovert INT CHECK (introvertToExtrovert BETWEEN 0 AND 100),
//   analyticalToCreative INT CHECK (analyticalToCreative BETWEEN 0 AND 100),
//   loyalToFickle INT CHECK (loyalToFickle BETWEEN 0 AND 100),
//   passiveToActive INT CHECK (passiveToActive BETWEEN 0 AND 100)
// );

// CREATE TABLE goals (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE,
//   goal TEXT NOT NULL
// );

// CREATE TABLE motivations (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE,
//   price INT CHECK (price BETWEEN 0 AND 10),
//   comfort INT CHECK (comfort BETWEEN 0 AND 10),
//   convenience INT CHECK (convenience BETWEEN 0 AND 10),
//   speed INT CHECK (speed BETWEEN 0 AND 10),
//   loyaltyMiles INT CHECK (loyaltyMiles BETWEEN 0 AND 10)
// );

// CREATE TABLE frustrations (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE,
//   frustration TEXT NOT NULL
// );

// CREATE TABLE favorite_brands (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE,
//   brand_name VARCHAR(255) NOT NULL,
//   logo_url TEXT
// );

// -- Insert a user
// INSERT INTO users (name, role, spotLightMessage, bio)
// VALUES ('Jane Doe', 'UI Designer', 
//         'Jane is a talented UI designer with a passion for creating beautiful and functional designs.',
//         'Jill is a Regional Director who travels 4-8 times each month for work. She has a specific region in which she travels...');

// -- Get user ID
// SELECT id FROM users WHERE name = 'Jane Doe';

// -- Insert demographics
// INSERT INTO demographics (user_id, age, status, location, archetype)
// VALUES (1, 25, 'Single', 'San Francisco, CA', 'Frequent Flyer');

// -- Insert traits
// INSERT INTO traits (user_id, trait) VALUES 
// (1, 'Organized'), 
// (1, 'Protective'),
// (1, 'Practical'), 
// (1, 'Hardworking'), 
// (1, 'Passionate'), 
// (1, 'Punctual');

// -- Insert personality
// INSERT INTO personality (user_id, introvertToExtrovert, analyticalToCreative, loyalToFickle, passiveToActive)
// VALUES (1, 30, 80, 5, 65);

// -- Insert goals
// INSERT INTO goals (user_id, goal) VALUES 
// (1, 'To spend less time booking travel'), 
// (1, 'To narrow her options quickly');

// -- Insert motivations
// INSERT INTO motivations (user_id, price, comfort, convenience, speed, loyaltyMiles)
// VALUES (1, 4, 7, 9, 3, 4);

// -- Insert frustrations
// INSERT INTO frustrations (user_id, frustration) VALUES 
// (1, 'Spending hours booking travel'), 
// (1, 'Lack of organization in travel solutions'), 
// (1, 'Repeating the same booking process');

// -- Insert favorite brands
// INSERT INTO favorite_brands (user_id, brand_name, logo_url) VALUES 
// (1, 'Adidas', '/img/adida.png'),
// (1, 'Nike', '/img/nike.png'),
// (1, 'Netflix', '/img/netflix.png'),
// (1, 'Airbnb', '/img/airbnb.png'),
// (1, 'Zara', '/img/zara.png');
