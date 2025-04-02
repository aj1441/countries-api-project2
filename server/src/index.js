//Importing modules

import express from "express";
import pg from "pg";
import cors from "cors"; // Importing CORS to handle cross-origin requests  
const { Client } = pg;

let config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true
}



const app = express();
const port = 3000;

//Enable CORS in your Express app
app.use(cors()); // This will allow all origins. You can also specify options to restrict it to certain domains if needed.  

// app.use(cors({
//   origin: 'http://localhost:5173',
// }));


//boilerplate code for express
app.use(express.json());

const client = new Client(config); //creating our database Client with our config values

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//helper functions

async function addUserData(obj) {
  const client = new Client(config); // Create a new database client
  try {
    await client.connect(); // Connect to the database

    // Insert the user data into the database
    await client.query(
      `INSERT INTO user_data (user_name, user_email, user_country, bio) 
         VALUES ($1, $2, $3, $4)`,
      [obj.user_name, obj.user_email, obj.user_country, obj.bio] // Use placeholders for dynamic values
    );
  } catch (error) {
    console.error("Error in addUserData:", error);
    throw error; // Re-throw the error to handle it in the calling function
  } finally {
    await client.end(); // Ensure the database connection is closed
  }
}

async function getUserData(user_id) {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect();
  let result = await client.query(
    `SELECT * FROM user_data WHERE user_id = '${user_id}'`
  );
  console.log(result.rows);
  await client.end();
  return result.rows;
}

//get country click count
// async function getCountryClickCount(country_code) {
//   const client = new Client(config);
//   await client.connect();

//   const result = await client.query(
//     `SELECT * FROM country_clicks WHERE country_code = $1`,
//     [country_code]
//   );

//   await client.end();
//   return result.rows.length > 0 ? result.rows[0].country_count : 0;
// }

//helper function to get all country clicks
async function getAllCountryClickCounts() {
  const client = new Client(config);
  await client.connect();

  const result = await client.query(
    `SELECT country_code, country_count FROM country_clicks`
  );

  await client.end();

  // Convert array of rows to an object map
  const counts = {};
  result.rows.forEach(row => {
    counts[row.country_code] = row.country_count;
  });

  return counts;
}


//helper function to check if country code exists in the database, if it does, increment the country_count by 1, if it doesn't, add the country code to the database with a country_count of 1
async function addCountryClick(country_code) {
  const client = new Client(config); // Creating our database Client with our config values
  await client.connect(); // Connecting to the database

  // Increment the country_count by 1, or initialize it with 1 if it doesn't exist; $1 placeholder for country_code and 1 for the first time it was clicked; ON CONFLICT is used to handle the case when the country_code already exists; DO UPDATE SET is used to increment the country_count by 1; [value]
  const result = await client.query(
    `INSERT INTO country_clicks (country_code, country_count) 
         VALUES ($1, 1) 
         ON CONFLICT (country_code) 
         DO UPDATE SET country_count = country_clicks.country_count + 1
         RETURNING country_count`, // Return the updated country_count
    [country_code]
  );
  await client.end(); // Ensure the database connection is closed
  // Return the updated country_count
  return result.rows[0].country_count;
}
//helper functions add saved countries per user id, checking first if the spcific userid and country_code already exsists. if it does I want to send a message back to the front about user has already saved this country. if it does not exist for that user id I want to add the country to the user_saved_countries table with the current user id.
async function addUserSavedCountries(user_id, country_code) {
  const client = new Client(config); // Creating our database Client with our config values
  await client.connect(); // Connecting to the database
  //check to see if the user_id and country_code already exists in the user_saved_countries table
  const result = await client.query(
    `SELECT * FROM user_saved_countries WHERE user_id = $1 AND country_code = $2`,
    [user_id, country_code]
  );
  console.log(result.rows);
  if (result.rows.length > 0) {
    //If the record exists, return a message to the front end
    console.log("User has already saved this country");
    return "User has already saved this country";
  }
  //If the record does not exist, insert the user_id and country_code into the user_saved_countries table
  await client.query(
    `INSERT INTO user_saved_countries (user_id, country_code) VALUES ($1, $2)`,
    [user_id, country_code]
  );
  await client.end(); // Ensure the database connection is closed
}

//helper function to get all countries that a specific user has saved
async function getUserSavedCountries(user_id) {
  const client = new Client(config); // Creating our database Client with our config values
  await client.connect(); // Connecting to the database
  // Get all the country_code values for the specified user_id
  const result = await client.query(
    `SELECT country_code FROM user_saved_countries WHERE user_id = $1`,
    [user_id]
  );
  await client.end(); // Ensure the database connection is closed
  return result.rows;
}

//API endpoint
// I need an end point to get & post country_clidks, post user data, get user data/:name, get & post user_saved_countries
// post user data
app.post("/add-user-data", async (req, res) => {
    const { user_name, user_email, user_country, bio } = req.body;
    try {
      await addUserData(req.body);
      res.send("User data added successfully");
    } catch (error) {
      console.error("Error adding user data:", error);
      res.status(500).json({ error: "Failed to add user data" });
    }
  });

// get user name from user data
app.get("/get-user-data/:user_id", async (req, res) => {
  let userData = await getUserData(req.params.user_id);
  res.json(userData); // this is the same as the above two lines??? I will tesst it.
});

//get country clicks
// app.get("/country-click/:country_code", async (req, res) => {
//   try {
//     const count = await getCountryClickCount(req.params.country_code);
//     res.json({ country_count: count });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

//get all country clicks
app.get("/country-clicks", async (req, res) => {
  try {
    const allCounts = await getAllCountryClickCounts();
    res.json(allCounts);
  } catch (error) {
    console.error("Error fetching all country click counts:", error);
    res.status(500).json({ error: "Failed to fetch click counts" });
  }
});


//adding and updateing country_clicks
app.post("/country-click/:country_code", async (req, res) => {
  const countryClicks = await addCountryClick(req.params.country_code);
  console.log(countryClicks);
  res.json({
    country_code: req.params.country_code,
    country_count: countryClicks,
  });
  //   res.json({ country_code, country_count: countryClicks });
});


//post user_saved_countries
app.post("/add-user-saved-countries", async (req, res) => {
  const { user_id, country_code } = req.body;
  await addUserSavedCountries(user_id, country_code);
  res.send("added user saved countries");
});

//get user_saved_countries
app.get("/get-user-saved-countries/:user_id", async (req, res) => {
  console.log(`Request received for user ID: ${req.params.user_id}`); // Debug log to check the user_id being requested
  let userSavedCountries = await getUserSavedCountries(req.params.user_id);
  //   let JSONuserSavedCountries = JSON.stringify(userSavedCountries);
  res.json(userSavedCountries);
});

