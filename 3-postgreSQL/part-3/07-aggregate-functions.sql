SELECT
  COUNT(*) AS total_posts
FROM posts;

SELECT COUNT(*) AS published_posts
FROM posts
WHERE posts.status = 'PUBLISHED';

SELECT
  COUNT(*) AS total_posts,
  COUNT(*) FILTER (WHERE status = 'PUBLISHED') AS published_posts,
  SUM(views) AS total_views,
  FLOOR(AVG(views)) AS average_views,
  MIN(views) AS lowest_views,
  MAX(views) AS highest_views
FROM posts;