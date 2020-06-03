-- Получение всех актуальных заданий для работника ресторана
-- Аргумент: CookId
SELECT
    OrderId,
    MenuItemId,
    Status,
    Amount,

    Orders.ShownId AS OrderShownId,
    MenuItems.Title AS MealTitle
FROM
    MenuItems_X_Orders
    LEFT OUTER JOIN
    Orders
        ON MenuItems_X_Orders.OrderId = Orders.Id
    LEFT OUTER JOIN
    MenuItems
        ON MenuItems_X_Orders.MenuItemId = MenuItems.Id 
WHERE
    CookId = ? AND Status <> 'Ready'; 