USE Lab;

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    genre VARCHAR(50),
    release_year INT(4),
    rating DECIMAL(2,1),
    box_office DECIMAL(10,2)
);

INSERT INTO movies (title,genre,release_year,rating,box_office)
VALUES ('Inception', 'Sci-Fi', 2010, 8.8, 825),
('The Dark Knight', 'Action', 2008, 9.0, 1004),
('Interstellar', 'Sci-Fi', 2014, 8.6, 677),
('Joker', 'Drama', 2019, 8.4, 1074),
('Dunkirk', 'War', 2017, 7.9, 527);

SELECT * FROM movies;

-- Show only the movie title and its box_office collection but rename the column box_office as Earnings (in Cr).
    SELECT title, box_office AS 'box_office as Earnings (in Cr)' FROM movies;

-- Display the movie titles and rename them as Movie Title, along with their genre as Category.
    SELECT title AS 'Movie Title', genre AS 'Category' FROM movies;

-- Select all movies where genre is either 'Sci-Fi' or 'Action' using IN, and rename rating as IMDb Score.
    SELECT  title,genre, rating AS 'IMDb Rating' FROM movies WHERE genre IN ('Sci-Fi','Action');

-- Find movies released between 2008 and 2015 and rename the year column as Release.
    SELECT title, release_year AS 'Release' FROM movies WHERE release_year BETWEEN 2008 AND 2015;

-- Find out how many movies have a rating greater than 8.5 and rename the result as High Rated Movies
    SELECT title, rating FROM movies WHERE rating > 8.5;

