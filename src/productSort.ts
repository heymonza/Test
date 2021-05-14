import { sqlGetAll } from './dbWrapper'

const SORTED_PRODUCT_QUERY = `
SELECT
  products.id AS id, 
  min(products.name) AS name, 
  min(products.brand_name) AS brand_name, 
  count(*) AS review_count, 
  avg(score) AS avg_score
FROM products
LEFT OUTER JOIN (
  SELECT 
    batches.id AS id, 
    batches.product_id AS product_id, 
    reviews.score AS score
  FROM batches
  LEFT OUTER JOIN reviews
    on REVIEWS.batch_id = BATCHES.id
) reviewed_batches
ON products.id = REVIEWED_BATCHES.product_id
GROUP BY products.id
ORDER BY review_count DESC, score DESC
`

export async function sortedProducts () {
  return sqlGetAll(SORTED_PRODUCT_QUERY)
}
