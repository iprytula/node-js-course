DROP TABLE IF EXISTS basics.products;

CREATE TABLE basics.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT DEFAULT '',
  stock INTEGER DEFAULT 0,
  total_views BIGINT DEFAULT 0,
  price NUMERIC(10, 2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT false
);

INSERT INTO basics.products
  (name, description, stock, total_views, price, is_active)
VALUES
(
  'Electric bike',
  'Very nice! Such electric! Totally bike!',
  100,
  1000,
  2455.65,
  true
),
(
  'Usual bike',
  'Kinda nice! Not electric! Totally bike!',
  100,
  1000,
  1455.00,
  false
);

SELECT * from basics.products WHERE is_active IS true;