-- 
-- Аргумент: courierId
SELECT
    Orders.Id AS OrderId,
    Orders.ShownId AS ShownId,

    Addresses.Id AS AddressId,
    Addresses.Street AS Street,
    Addresses.Building AS Building,
    Addresses.Room AS Room
FROM
    Orders
    INNER JOIN
    Addresses
        ON Orders.AddressId = Addresses.Id
WHERE
    Orders.Ready     = TRUE  AND
    Orders.Delivered = FALSE AND
    Orders.CourierId = ?;