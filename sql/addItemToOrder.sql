-- Добавление блюда в заказ
-- Аргументы: OrderId, MenuItemId, Amount, CookId
INSERT
    INTO MenuItems_X_Orders
    (
        OrderId,
        MenuItemId,
        Amount,
        CookId
    )
VALUES
    (?, ?, ?, ?);