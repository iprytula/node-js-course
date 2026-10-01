SELECT name, description FROM products WHERE description IS NULL;

SELECT name, description FROM products WHERE description IS NOT NULL;

SELECT name, description, is_active FROM products WHERE description IS NULL AND is_active = TRUE;