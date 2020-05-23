-- Выбор основной информации о пользователе
-- Первый аргумент: id покупателя
SELECT BonusPoints
FROM Customers
WHERE Customers.Id = ?