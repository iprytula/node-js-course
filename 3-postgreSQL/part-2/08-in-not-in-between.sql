SELECT name, category, price FROM products WHERE category IN ('Electronics', 'Furniture');

SELECT name, category, price FROM products WHERE category NOT IN ('Electronics', 'Furniture');

SELECT name, category, price FROM products WHERE price BETWEEN 200 AND 5000;

SELECT name, price, category, stock FROM products WHERE category IN ('Electronics', 'Furniture') AND price BETWEEN 200 AND 5000;