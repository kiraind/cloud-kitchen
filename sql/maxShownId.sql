-- Возвращает максимальный отображаемый номер из активных заказов
SELECT
    MAX(ShownId) AS MaxShownId
FROM
    Orders
WHERE
    Delivered = FALSE;