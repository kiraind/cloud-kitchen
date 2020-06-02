-- Создание записи заказа
-- Аргументы: ShownId, CustomerId, AddressId, Comment
INSERT
    INTO Orders
    (
        ShownId,
        CustomerId,
        AddressId,
        Comment
    )
VALUES
    (?, ?, ?, ?);