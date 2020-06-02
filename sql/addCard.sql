-- Добавление адреса
-- Аргументы: CustomerId, CardNumber, Expires, CVV, HolderName
INSERT INTO
    CreditCards
    (
        CustomerId,
        CardNumber,
        Expires,
        CVV,
        HolderName
    )
VALUES
    (?, ?, ?, ?, ?);