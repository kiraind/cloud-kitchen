-- Аргумент: orderId, CourierId
UPDATE
    Orders
SET
    Delivered = TRUE
WHERE
    Id = ? AND CourierId = ?;