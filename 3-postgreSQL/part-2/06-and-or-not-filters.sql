SELECT name, category, price FROM products WHERE category = 'Electronics' AND price > 1000;

SELECT name, category, price FROM products WHERE (category = 'Electronics' OR category = 'Furniture');

SELECT name, category, price FROM products WHERE NOT category = 'Electronics';

SELECT name, category, price, is_active FROM products WHERE stock > 20 OR stock < 40 AND NOT category = 'Electronics';