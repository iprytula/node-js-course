CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255),
  status VARCHAR(10) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0)
);

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id),
  body TEXT NOT NULL
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
  post_id UUID NOT NULL REFERENCES posts(id),
  tag_id UUID NOT NULL REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

-- ==========================================
-- USERS
-- ==========================================

INSERT INTO users (name) VALUES
    ('John Smith'),
    ('Sarah Johnson'),
    ('Michael Brown'),
    ('Emily Davis'),
    ('David Wilson');


-- ==========================================
-- TAGS
-- ==========================================

INSERT INTO tags (name) VALUES
    ('PostgreSQL'),
    ('JavaScript'),
    ('TypeScript'),
    ('React'),
    ('Backend'),
    ('Frontend'),
    ('Database'),
    ('Programming'),
    ('DevOps'),
    ('Web Development');


-- ==========================================
-- POSTS
-- ==========================================

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Getting Started with PostgreSQL', 'PUBLISHED', 1250
FROM users
WHERE name = 'John Smith';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Building REST APIs with Node.js', 'PUBLISHED', 3420
FROM users
WHERE name = 'John Smith';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Understanding TypeScript Generics', 'PUBLISHED', 875
FROM users
WHERE name = 'Sarah Johnson';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'React Performance Optimization Techniques', 'PUBLISHED', 2180
FROM users
WHERE name = 'Sarah Johnson';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Database Indexing Explained', 'PUBLISHED', 4560
FROM users
WHERE name = 'Michael Brown';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Docker for Beginners', 'DRAFT', 0
FROM users
WHERE name = 'Michael Brown';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Modern JavaScript Features You Should Know', 'PUBLISHED', 3150
FROM users
WHERE name = 'Emily Davis';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Introduction to CI/CD Pipelines', 'DRAFT', 0
FROM users
WHERE name = 'David Wilson';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'How to Design a Scalable Backend', 'PUBLISHED', 5890
FROM users
WHERE name = 'David Wilson';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Understanding SQL Joins', 'PUBLISHED', 1740
FROM users
WHERE name = 'Emily Davis';


-- ==========================================
-- COMMENTS
-- ==========================================

INSERT INTO comments (post_id, body)
SELECT id, 'Great introduction to PostgreSQL. Very easy to follow!'
FROM posts
WHERE title = 'Getting Started with PostgreSQL';

INSERT INTO comments (post_id, body)
SELECT id, 'This helped me understand PostgreSQL much better.'
FROM posts
WHERE title = 'Getting Started with PostgreSQL';

INSERT INTO comments (post_id, body)
SELECT id, 'Could you write a follow-up about authentication?'
FROM posts
WHERE title = 'Building REST APIs with Node.js';

INSERT INTO comments (post_id, body)
SELECT id, 'The examples with generics were really useful.'
FROM posts
WHERE title = 'Understanding TypeScript Generics';

INSERT INTO comments (post_id, body)
SELECT id, 'React performance is often overlooked. Nice article.'
FROM posts
WHERE title = 'React Performance Optimization Techniques';

INSERT INTO comments (post_id, body)
SELECT id, 'The explanation of composite indexes was excellent.'
FROM posts
WHERE title = 'Database Indexing Explained';

INSERT INTO comments (post_id, body)
SELECT id, 'I would love to see a practical Docker example.'
FROM posts
WHERE title = 'Docker for Beginners';

INSERT INTO comments (post_id, body)
SELECT id, 'Very useful overview of modern JavaScript.'
FROM posts
WHERE title = 'Modern JavaScript Features You Should Know';

INSERT INTO comments (post_id, body)
SELECT id, 'The section about horizontal scaling was especially helpful.'
FROM posts
WHERE title = 'How to Design a Scalable Backend';

INSERT INTO comments (post_id, body)
SELECT id, 'Finally I understand the difference between LEFT JOIN and INNER JOIN.'
FROM posts
WHERE title = 'Understanding SQL Joins';


-- ==========================================
-- POST TAGS
-- ==========================================

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Getting Started with PostgreSQL'
  AND t.name IN ('PostgreSQL', 'Database', 'Programming');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Building REST APIs with Node.js'
  AND t.name IN ('Backend', 'JavaScript', 'Web Development');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Understanding TypeScript Generics'
  AND t.name IN ('TypeScript', 'Programming', 'Frontend');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'React Performance Optimization Techniques'
  AND t.name IN ('React', 'Frontend', 'JavaScript');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Database Indexing Explained'
  AND t.name IN ('Database', 'PostgreSQL', 'Backend');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Docker for Beginners'
  AND t.name IN ('DevOps', 'Backend', 'Programming');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Modern JavaScript Features You Should Know'
  AND t.name IN ('JavaScript', 'Frontend', 'Programming');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Introduction to CI/CD Pipelines'
  AND t.name IN ('DevOps', 'Programming');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'How to Design a Scalable Backend'
  AND t.name IN ('Backend', 'Database', 'DevOps', 'Web Development');

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Understanding SQL Joins'
  AND t.name IN ('Database', 'PostgreSQL', 'Programming');