-- Найти пользователя по адресу почты
-- Первый аргумент: e-mail
SELECT
    Id,
    Name,
    BcryptPassword
FROM
    Users
WHERE
    Email = ?