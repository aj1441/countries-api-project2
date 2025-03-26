--form data
CREATE TABLE user_data (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_country VARCHAR(50) NOT NULL,
    bio VARCHAR(500) NOT NULL
);

//code to alter table to not allow null values
ALTER TABLE user_data
ALTER COLUMN user_name SET NOT NULL,
ALTER COLUMN user_email SET NOT NULL,
ALTER COLUMN user_country SET NOT NULL;


INSERT INTO user_data (user_name, user_email, user_country, bio) VALUES
('John Doe', 'JDOE@GMAIL.COM', 'USA', 'I am a web developer who loves to learn about countries and their cultures'),    
('Jane Smith', 'jjdoe@gmail.com', 'Canada', 'I am a web developer who loves to travel and document where I go'),
('Jannie GottaGun', 'lovesareosmith@gmail.com', 'Mexico', 'I am a groupie who loves to travel with the band and document where we go');

--saved countries data & clicks
-- CREATE TABLE saved_countries (
--     country_id SERIAL PRIMARY KEY,
--     country_code VARCHAR(50),
-- );

INSERT INTO saved_countries (country_code) VALUES
('USA'),
('CAN'),
('MEX');

--country country clicks
CREATE TABLE country_clicks (
    click_id SERIAL PRIMARY KEY,
    country_code VARCHAR(50) UNIQUE,
    country_count INT
);

--used this to update country clicks
ALTER TABLE country_clicks
ADD CONSTRAINT unique_country_code UNIQUE (country_code);

INSERT INTO country_clicks (country_name, country_code, country_count) VALUES
('USA', 3),
('CAN', 5),
('MEX', 7);

--user saved countries
CREATE TABLE user_saved_countries (
    record_id SERIAL PRIMARY KEY,
    user_id INT,  --FOREIGN KEY (user_id) REFERENCES form_data(user_id),
    country_code VARCHAR(50) 
);

INSERT INTO user_saved_countries (user_id, country_code) VALUES
(1, 'USA'),
(1, 'CAN'),
(1, 'MEX'),
(2, 'USA'),
(2, 'CAN'),
(3, 'USA'),
(3, 'MEX');


--Below should return the selected user's name, the country code for countries the user has saved to be able to displacy back to the user

SELECT u.user_name, usc.country_code
FROM user_data AS u
JOIN user_saved_countries AS usc ON u.user_id = usc.user_id
WHERE u.user_id = 1;

---Below should return the number of clicks for each country that has been clicked on by the user
SELECT country_code, country_count  FROM country_clicks WHERE country_code = 'USA';
SELECT country_code, country_count FROM country_clicks WHERE country_code = 'CAN';
SELECT country_code, country_count FROM country_clicks WHERE country_code = 'MEX';