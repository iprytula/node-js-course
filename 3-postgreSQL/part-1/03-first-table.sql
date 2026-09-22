DROP TABLE IF EXISTS basics.students;

CREATE TABLE basics.students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER CHECK (age >= 18),
  created_at TIMESTAMP DEFAULT NOW()
);

--- INSERT DATA ---

INSERT INTO basics.students (name, email, age)
VALUES
  ('Iurii', 'iurii@example.com', 34),
  ('John', 'marston@example.com', 36);
  