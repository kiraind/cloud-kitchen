-- Добавление адреса
-- Аргументы: CustomerId, Street, Building, Room
INSERT INTO
    Addresses
    (
        CustomerId,
        Street,
        Building,
        Room
    )
VALUES
    (?, ?, ?, ?);