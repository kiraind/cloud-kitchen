-- Аргументы: status, CooksId
UPDATE
    Cooks
SET
    Active = ?
WHERE
    Id = ?;