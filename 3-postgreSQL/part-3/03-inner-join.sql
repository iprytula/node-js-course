SELECT
  users.name AS author_name,
  posts.title AS post_title,
  posts.status,
  posts.views
FROM posts
INNER JOIN users
ON posts.user_id = users.id
AND posts.status = 'PUBLISHED';