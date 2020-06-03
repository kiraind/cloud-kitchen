-- Аргументы: status, CouriersId
UPDATE
    Couriers
SET
    Busy = ?
WHERE
    Id = ?;