INSERT INTO products (name, category, price, stock, sku, description)
VALUES ('Temp product to be deleted', 'Electronics', 1001.26, 19, 'ELEC-KEY-100', 'Temp product description')
RETURNING *;

SELECT * FROM products;