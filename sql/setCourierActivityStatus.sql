-- Аргументы: status, CouriersId
UPDATE
    Couriers
SET
    Active = ?
WHERE
    Id = ?;