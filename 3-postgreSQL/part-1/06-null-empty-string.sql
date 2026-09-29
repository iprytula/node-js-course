DROP TABLE IF EXISTS basics.value_examples;

CREATE TABLE basics.value_examples (
  id SERIAL PRIMARY KEY,
  nickname VARCHAR(255),
  bio TEXT,
  score INTEGER
);

INSERT INTO basics.value_examples (nickname, bio, score)
VALUES
  (null, 'Learning postgreSQL', 10),
  ('', 'empty nickname', 20),
  ('iprytula', '', 0),
  ('john_w', null, null);

SELECT * FROM basics.value_examples;
SELECT * FROM basics.value_examples WHERE nickname IS NULL;
SELECT * FROM basics.value_examples WHERE nickname = '';
SELECT * FROM basics.value_examples WHERE nickname IS NOT NULL;