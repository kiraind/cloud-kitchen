-- Получение всех адресов пользователя
-- Аргументы: CustomerId
SELECT
    Id,
    Street,
    Building,
    Room
FROM
    Addresses
WHERE
    CustomerId = ?;