-- Узнать можно ли сейчас сделать заказ
-- (есть ли сейчас работающие сотрудники ресторана и курьеры)
SELECT
    COUNT(Cooks.Id) > 0 AS IsRestaurantWorking
FROM
    Cooks
    CROSS JOIN
    Couriers
WHERE
    Cooks.Active = TRUE AND Couriers.Active = TRUE;