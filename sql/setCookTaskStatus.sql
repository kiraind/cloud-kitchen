-- Установить статус задания работника ресторана
-- Аргументы: Status, OrderId, ItemId
UPDATE
    MenuItems_X_Orders
SET
    Status = ?
WHERE
    OrderId = ? AND MenuItemId = ?;