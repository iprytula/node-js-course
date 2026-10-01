SELECT name, category, price, is_active FROM products WHERE category = 'Electronics';

UPDATE products SET price = ROUND(price * 1.10, 2) WHERE category = 'Electronics';

UPDATE products SET is_active = FALSE WHERE stock = 0;

UPDATE products SET is_active = TRUE WHERE NOT(stock = 0) AND is_active IS FALSE;

SELECT * FROM products;