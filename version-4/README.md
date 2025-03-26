# Bersion 4
-Countries-API Project Folder
    - version-1
    - version-2
    - version-3
    - version-4
    - server

- Frontend
1. Refactor the code (either localStorage or Firebase), so that the user actions are tied to calling an API fetch requests to the 'localhost:3000/end-point". Example, fetch - localhost: 3000/add-user-profile to send user profile data
2. If your browser is displaying, CORS issue in the console. let laura know/ checkin

- Web Server/Api
1. Creating a folder in the root countries-api folder, calling it 'server'
2. Inside the server folder, creat the web server instance:
    a. Adding npm + package.json, installing express, installing pg, adding your .gitignore, adding the src folder
3. Add the config file to connect to our database. This will be the same as the programming_languages project.
4. Build our express app (in our index.js file), starting with our imports and the Express boilerplate code.
5. Reference our API endpoint document, and creat the endpoints and helper functions for each user action. POST - user submit form, POST - user adds a saved country, GET - get user data, POST - updates country count, etc.
6. (Opstional) Test your endpoints using Postman


- Database
1. Creat the table schema for the tables that  I will need in my database.
    (CREATE TABLE commands, listing the colums + dat types)
        a. saved_countries, User, country_count
        b. you can reference your Airtable project fo rthe table structure + data types
2. Connect to our local database using PGadmin.
3. Run the commands to creat our data tables.

