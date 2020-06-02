-- Получение всех карт пользователя
-- Аргументы: CustomerId
SELECT
    Id,
    CardNumber,
    Expires,
    CVV,
    HolderName
FROM
    CreditCards
WHERE
    CustomerId = ?;