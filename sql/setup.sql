-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS cats;

CREATE TABLE cats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cat_name TEXT NOT NULL,
  age INT NOT NULL CHECK (age > -1),
  favorite_toy TEXT
);

INSERT INTO
  cats (cat_name, age, favorite_toy)
VALUES
  ('Thor', 2, 'Socks'),
  ('Liam', 2, 'Catnip');