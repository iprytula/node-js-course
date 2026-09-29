DROP TABLE IF EXISTS basics.accounts;

CREATE TABLE basics.accounts (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(300) NOT NULL,
  email VARCHAR(500) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  age INTEGER CHECK(age >= 18),
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO accounts (full_name, email, age)
VALUES
  ('Iurii Prytula', 'iuriip@gmail.com', 34),
  ('Iurii Partyman', 'iuriipa@gmail.com', 31);

SELECT * FROM accounts;