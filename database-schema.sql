--form data
CREATE TABLE user_data (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50),
    user_email VARCHAR(255),
    user_country VARCHAR(50),
    bio VARCHAR(500)
);

INSERT INTO user_data (user_name, user_email, user_country, bio) VALUES
('John Doe', 'JDOE@GMAIL.COM', 'USA', 'I am a web developer who loves to learn about countries and their cultures'),    
('Jane Smith', 'jjdoe@gmail.com', 'Canada', 'I am a web developer who loves to travel and document where I go'),
('Jannie GottaGun', 'lovesareosmith@gmail.com', 'Mexico', 'I am a groupie who loves to travel with the band and document where we go');

--saved countries data & clicks
CREATE TABLE saved_countries (
    country_id SERIAL PRIMARY KEY,
    country_image_url VARCHAR(2083),
    country_name VARCHAR(50),
    country_code VARCHAR(50),
    country_population INT,
    country_capital VARCHAR(50),
    country_region VARCHAR(50)
);

INSERT INTO saved_countries (country_image_url, country_name, country_code, country_population, country_capital, country_region) VALUES
('http://www.example.com/image.jpg', 'United States', 'USA', 327167434, 'Washington D.C.', 'North America'),
('http://www.example.com/image2.jpg', 'Canada', 'CAN', 37590000, 'Ottawa', 'North America'),
('http://www.example.com/image3.jpg', 'Mexico', 'MEX', 126200000, 'Mexico City', 'North America');

--country count clicks
CREATE TABLE country_clicks (
    click_id SERIAL PRIMARY KEY,
    country_name VARCHAR(50),
    country_code VARCHAR(50),
    country_count INT
);

INSERT INTO country_clicks (country_name, country_code, country_count) VALUES
('United States', 'USA', 3),
('Canada', 'CAN', 5),
('Mexico', 'MEX', 7);

--user saved countries
CREATE TABLE user_saved_countries (
    record_id SERIAL PRIMARY KEY,
    user_id INT,  --FOREIGN KEY (user_id) REFERENCES form_data(user_id),
    country_id INT --FOREIGN KEY (country_id) REFERENCES saved_countries(country_id)
);

INSERT INTO user_saved_countries (user_id, country_id) VALUES
(1, 1),
(2, 2),
(3, 3);

--Below should return the selected user's name, the country name, population, capital, and region of the countries they have saved in their profile. to be able to displacy back to the user
SELECT u.user_name, s.country_name, s.country_population, s.country_capital, s.country_region
FROM user_data AS u
JOIN user_saved_countries AS usc ON u.user_id = usc.user_id
JOIN saved_countries AS s ON s.country_id = usc.country_id
WHERE u.user_id = 1;

---Below should return the number of clicks for each country that has been clicked on by the user
SELECT * FROM country_clicks WHERE country_name = 'United States';
SELECT * FROM country_clicks WHERE country_name = 'Canada';
SELECT * FROM country_clicks WHERE country_name = 'Mexico';