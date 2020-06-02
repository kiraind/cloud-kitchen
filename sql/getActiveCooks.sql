-- Поиск активных работников ресторана
-- И для каждого подсчет еще не готовых заказов
SELECT
    Cooks.Id AS Id,
    COUNT(MenuItems_X_Orders.OrderId) AS TaskCount
FROM
    Cooks
    LEFT OUTER JOIN
    MenuItems_X_Orders
    ON MenuItems_X_Orders.CookId = Cooks.Id
WHERE
    Cooks.Active = TRUE AND (
        MenuItems_X_Orders.Status IS NULL
        OR
        MenuItems_X_Orders.Status <> 'Ready'
    )
GROUP BY
    Cooks.Id
ORDER BY TaskCount ASC;
