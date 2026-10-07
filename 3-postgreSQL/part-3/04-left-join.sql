SELECT
  posts.title AS post_title,
  comments.body AS comment_body
FROM posts
LEFT JOIN comments ON (comments.post_id = posts.id);