-- Получение истории заказов
-- Аргумент: CustomerId
SELECT
    Orders.Id AS Id,
    ShownId, Ready, Delivered, Comment,
    AddressId,
    Addresses.Street AS AddressStreet,
    Addresses.Building AS AddressBuilding,
    Addresses.Room AS AddressRoom
FROM
    Orders
    INNER JOIN
    Addresses
        ON Orders.AddressId = Addresses.Id
WHERE
    Orders.CustomerId = ?
ORDER BY
    Orders.Id DESC;