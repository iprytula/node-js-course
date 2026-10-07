SELECT
  posts.title,
  tags.name
FROM posts
INNER JOIN post_tags
  ON posts.id = post_tags.post_id
INNER JOIN tags
  ON post_tags.tag_id = tags.id
ORDER BY posts.title, tags.name;