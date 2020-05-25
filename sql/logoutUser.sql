-- Удаление неактуального токена доступа
-- Первый аргумент: Токен доступа
-- Второй аргумент: Токен CSRF-защиты
DELETE
FROM UserTokens
WHERE UserTokens.Token = ? AND UserTokens.CSRFToken = ?