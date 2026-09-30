CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS public.products;

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(300) NOT NULL,
  category VARCHAR(300) NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK(price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sku VARCHAR(300) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO public.products
  (name, category, price, stock, is_active, sku, description)
VALUES
  ('Wireless Mechanical Keyboard', 'Electronics', 89.99, 42, true, 'KB-WL-001',
    'Compact wireless mechanical keyboard with RGB backlighting.'),

  ('USB-C Hub 7-in-1', 'Electronics', 39.50, 75, true, 'HUB-USBC-007',
    'USB-C hub with HDMI, USB 3.0, SD card, and microSD card support.'),

  ('Ergonomic Office Chair', 'Furniture', 249.99, 18, true, 'CHAIR-ERG-001',
    'Adjustable ergonomic office chair with lumbar support and breathable mesh.'),

  ('Stainless Steel Water Bottle', 'Home & Kitchen', 24.95, 120, true, 'BOT-SS-750',
    '750ml insulated stainless steel water bottle.'),

  ('LED Desk Lamp', 'Home & Office', 34.99, 56, true, 'LAMP-LED-001',
    'Adjustable LED desk lamp with three brightness levels.'),

  ('Bluetooth Portable Speaker', 'Electronics', 59.99, 31, true, 'SPK-BT-002',
    'Portable Bluetooth speaker with up to 12 hours of battery life.'),

  ('Notebook A5 Hardcover', 'Stationery', 12.49, 200, true, 'NOTE-A5-HC-001',
    'A5 hardcover notebook with 192 lined pages.'),

  ('USB Flash Drive 128GB', 'Storage', 16.99, 0, false, 'USB-128GB-001',
    '128GB USB 3.0 flash drive. Currently out of stock.');

SELECT * FROM products;