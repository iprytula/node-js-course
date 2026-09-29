DROP TABLE IF EXISTS basics.sales;

CREATE TABLE basics.sales (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO basics.sales (title, price)
VALUES
  ('Sale 1', 200),
  ('Sale 2', 500);

-- SELECT * FROM basics.sales;

INSERT INTO basics.sales (id, title, price)
VALUES
  (1, 'Sale 3', 200);