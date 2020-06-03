-- Получение данных о заказе
-- Аргумент: Order.Id
SELECT
    MenuItemId,
    Amount,
    Title,
    Price,
    Calories
FROM
    MenuItems_X_Orders
    INNER JOIN
    MenuItems
        ON MenuItems_X_Orders.MenuItemId = MenuItems.Id
WHERE
    OrderId = ?;