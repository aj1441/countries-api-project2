// Countries API Data: Build out 3 JavaScript collections (arrays of objects) that would store the following data for the information being collected in the Countries API application: 
// Each User Profile's information that they submit via the form 
// Each User's Saved Countries
// The Country Count (which is how many times any user has viewed a specific country's page) 

/// So what is need is a table to collect the user profile information, a table to collect the user's saved countries, and a table to collect the country count both globally and per user. I do not want to repeat the same data in multiple tables so I will use the id from the user profile table and the country table to link the user's saved countries to the user profile and the country count to the country. I will also linke the country count to the user profile so that I can track how many times a user has viewed a specific country.

let userProfile = [
    {
        id: 1,
        dateJoined: '2021-10-01',
        fullName: 'Test User',
        email: 'test@test.com',
        country: 'United States',
        bio: 'This is a test user profile',
    },
    {
        id: 2,
        dateJoined: '2021-10-01',
        fullName: 'Test User2',
        email: 'test2@test.com',
        country: 'United States',
        bio: 'This is another test user profile',
    }
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
            id:1,
            countries: [ USA, CAN ]
        },
        {
            id:2,
            countries: [ USA, MEX ]
        }
    ]
};
 // or

 let userSavedCountries2 = [
    {
        id:1,
        countries: [ USA, CAN ]
    },
    {
        id:2,
        countries: [ USA, MEX ]
    }
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
    }
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
    ]




// Wix Cookie Page: Build out 3 JavaScript collections (arrays of objects) that would store the data for this Wix Cookie ShopLinks to an external site. page. Take some time to study the designs and think through the data you would need to store for the following:
// Products sold on the sites
// Orders placed on the site
// Customers who make a purchase on the site.

let products = [
    {
        id: 1,
        name: 'Chocolate Chip Cookies',
        sku: 'CC001',
        quantity: 10,
        price: 2.50,
        description: 'A classic cookie with chocolate chips',
        productDetails: 'Contains wheat, milk, and soy',
    },
    {
        id: 2,
        name: 'Poppy Seed Cookies',
        sku: 'CC002',
        quantity: 20,
        price: 4.50,
        description: "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
        productDetails: 'Contains seeds, wheat, milk and soy',
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
        orderDate: '2021-10-01',
        orderTotal: 5.00,
        orderItems: [
            {
                productId: 1,
                quantity: 2,
                price: 2.50,
            }
        ]
    },
    {
        id: 2,
        orderId: 2,
        userId: 2,
        orderDate: '2021-10-01',
        orderTotal: 4.50,
        orderItems: [
            {
                productId: 2,
                quantity: 1,
                price: 4.50,
            }
        ]
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
    }
];


// FineArt Studio Page: Build out 1 JavaScript collection that would store the profile data from this FineArt Studio Page.Links to an external site.
// As you are thinking about how you'd store this data, ask yourself these questions: 

// What is going to be coded on the frontend? 
// What needs to be stored on the backend?
// How might different objects relate to one another?
// What are the different data types I should use?
