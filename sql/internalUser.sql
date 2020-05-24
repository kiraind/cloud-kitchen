-- Выбор основонй информации о пользователе
-- Первый аргумент: Токен доступа
-- Второй аргумент: Токен CSRF-защиты
SELECT
    Users.Id AS Id,
    Name,
    Email,
    BcryptPassword,
    Customers.Id AS Customer,
    Cooks.Id     AS Cook,
    Couriers.Id  AS Courier

FROM UserTokens
    INNER JOIN Users
        ON Users.Id = UserTokens.UserId
    LEFT JOIN Customers
        ON Users.Id = Customers.UserId
    LEFT JOIN Cooks
        ON Users.Id = Cooks.UserId
    LEFT JOIN Couriers
        ON Users.Id = Couriers.UserId

WHERE UserTokens.Token = ? AND UserTokens.CSRFToken = ?