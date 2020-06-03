-- Поиск активных работников ресторана
-- И для каждого подсчет еще не готовых заказов
SELECT
    Cooks.Id AS Id
FROM
    Cooks
WHERE
    Cooks.Active = TRUE;
