-- =========================================================
-- EXTENSIONS
-- =========================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- =========================================================
-- DROP EXISTING TABLES
-- =========================================================

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;


-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL
);


-- =========================================================
-- POSTS
-- =========================================================

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'DRAFT'
        CHECK (status IN ('DRAFT', 'PUBLISHED')),
    views INTEGER NOT NULL DEFAULT 0
        CHECK (views >= 0)
);


-- =========================================================
-- COMMENTS
-- =========================================================

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id),
    body TEXT NOT NULL
);


-- =========================================================
-- TAGS
-- =========================================================

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE
);


-- =========================================================
-- POST TAGS
-- =========================================================

CREATE TABLE post_tags (
    post_id UUID NOT NULL REFERENCES posts(id),
    tag_id UUID NOT NULL REFERENCES tags(id),
    PRIMARY KEY (post_id, tag_id)
);


-- =========================================================
-- INSERT USERS
-- =========================================================

INSERT INTO users (name) VALUES
    ('John Smith'),
    ('Sarah Johnson'),
    ('Michael Brown'),
    ('Emily Davis'),
    ('David Wilson');


-- =========================================================
-- INSERT TAGS
-- =========================================================

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


-- =========================================================
-- INSERT POSTS
-- =========================================================

INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Getting Started with PostgreSQL',
    'PostgreSQL is a powerful open-source relational database system. In this article, we explore how to create databases, tables, constraints, indexes, and relationships. We also look at practical SQL queries that every PostgreSQL developer should know.',
    'PUBLISHED',
    1250
FROM users
WHERE name = 'John Smith';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Building REST APIs with Node.js',
    'REST APIs provide a simple and flexible way for applications to communicate with each other. In this guide, we build a REST API using Node.js and explore routes, controllers, HTTP methods, request validation, and error handling.',
    'PUBLISHED',
    3420
FROM users
WHERE name = 'John Smith';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Understanding TypeScript Generics',
    'Generics are one of the most useful features in TypeScript. They allow developers to create reusable components while maintaining strong type safety. This article explains generic functions, interfaces, constraints, and practical examples.',
    'PUBLISHED',
    875
FROM users
WHERE name = 'Sarah Johnson';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'React Performance Optimization Techniques',
    'React applications can become slower as they grow in size and complexity. Fortunately, there are several techniques that can improve performance, including memoization, code splitting, lazy loading, efficient state management, and avoiding unnecessary renders.',
    'PUBLISHED',
    2180
FROM users
WHERE name = 'Sarah Johnson';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Database Indexing Explained',
    'Database indexes can dramatically improve query performance by allowing the database to locate rows without scanning an entire table. This article explains how indexes work, when to use them, and some common indexing mistakes.',
    'PUBLISHED',
    4560
FROM users
WHERE name = 'Michael Brown';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Docker for Beginners',
    'Docker makes it possible to package an application together with its dependencies into a portable container. In this beginner-friendly introduction, we cover images, containers, Dockerfiles, volumes, networks, and common Docker commands.',
    'DRAFT',
    0
FROM users
WHERE name = 'Michael Brown';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Modern JavaScript Features You Should Know',
    'JavaScript has evolved significantly over the years. Modern features such as destructuring, spread syntax, optional chaining, nullish coalescing, promises, async and await can make applications easier to write and maintain.',
    'PUBLISHED',
    3150
FROM users
WHERE name = 'Emily Davis';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Introduction to CI/CD Pipelines',
    'Continuous integration and continuous delivery help development teams automate testing and deployment. This article introduces the basic concepts behind CI/CD pipelines and explains how they can improve software development workflows.',
    'DRAFT',
    0
FROM users
WHERE name = 'David Wilson';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'How to Design a Scalable Backend',
    'Designing a scalable backend requires careful consideration of databases, caching, load balancing, asynchronous processing, monitoring, and system architecture. This article explores practical approaches for building backend systems that can handle increasing traffic.',
    'PUBLISHED',
    5890
FROM users
WHERE name = 'David Wilson';


INSERT INTO posts (
    user_id,
    title,
    content,
    status,
    views
)
SELECT
    id,
    'Understanding SQL Joins',
    'SQL joins allow data from multiple tables to be combined into a single result. In this article, we explore INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN with practical examples using users, posts, comments, and tags.',
    'PUBLISHED',
    1740
FROM users
WHERE name = 'Emily Davis';


-- =========================================================
-- INSERT COMMENTS
-- =========================================================

INSERT INTO comments (post_id, body)
SELECT
    id,
    'Great introduction to PostgreSQL. Very easy to follow!'
FROM posts
WHERE title = 'Getting Started with PostgreSQL';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'This helped me understand PostgreSQL much better.'
FROM posts
WHERE title = 'Getting Started with PostgreSQL';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'Could you write a follow-up about authentication?'
FROM posts
WHERE title = 'Building REST APIs with Node.js';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'The examples with generics were really useful.'
FROM posts
WHERE title = 'Understanding TypeScript Generics';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'React performance is often overlooked. Nice article.'
FROM posts
WHERE title = 'React Performance Optimization Techniques';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'The explanation of composite indexes was excellent.'
FROM posts
WHERE title = 'Database Indexing Explained';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'I would love to see a practical Docker example.'
FROM posts
WHERE title = 'Docker for Beginners';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'Very useful overview of modern JavaScript.'
FROM posts
WHERE title = 'Modern JavaScript Features You Should Know';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'The section about horizontal scaling was especially helpful.'
FROM posts
WHERE title = 'How to Design a Scalable Backend';


INSERT INTO comments (post_id, body)
SELECT
    id,
    'Finally I understand the difference between LEFT JOIN and INNER JOIN.'
FROM posts
WHERE title = 'Understanding SQL Joins';


-- =========================================================
-- INSERT POST TAGS
-- =========================================================

INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Getting Started with PostgreSQL'
  AND t.name IN (
      'PostgreSQL',
      'Database',
      'Programming'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Building REST APIs with Node.js'
  AND t.name IN (
      'Backend',
      'JavaScript',
      'Web Development'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Understanding TypeScript Generics'
  AND t.name IN (
      'TypeScript',
      'Programming',
      'Frontend'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'React Performance Optimization Techniques'
  AND t.name IN (
      'React',
      'Frontend',
      'JavaScript'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Database Indexing Explained'
  AND t.name IN (
      'Database',
      'PostgreSQL',
      'Backend'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Docker for Beginners'
  AND t.name IN (
      'DevOps',
      'Backend',
      'Programming'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Modern JavaScript Features You Should Know'
  AND t.name IN (
      'JavaScript',
      'Frontend',
      'Programming'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Introduction to CI/CD Pipelines'
  AND t.name IN (
      'DevOps',
      'Programming'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'How to Design a Scalable Backend'
  AND t.name IN (
      'Backend',
      'Database',
      'DevOps',
      'Web Development'
  );


INSERT INTO post_tags (post_id, tag_id)
SELECT
    p.id,
    t.id
FROM posts p
CROSS JOIN tags t
WHERE p.title = 'Understanding SQL Joins'
  AND t.name IN (
      'Database',
      'PostgreSQL',
      'Programming'
  );


-- =========================================================
-- VERIFY DATA
-- =========================================================

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM comments;

SELECT * FROM tags;

SELECT * FROM post_tags;