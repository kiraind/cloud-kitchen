import capitalize from './capitalize.js'

const allowedCharsStr = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя -'
const allowedChars = allowedCharsStr // конвертация в объект с ключами-буквами
    .split('')
    .reduce((obj, char, i) => {
        obj[char] = i
        return obj
    }, {})

export default function formatName(name) {
    const filtered = name
        .split('')
        .filter(char => char.toLocaleLowerCase() in allowedChars)
        .join('')

    const capitalized = filtered
        .split(' ')
        .filter(word => word.length > 0)
        .map(
            word => word
                .split('-')
                .map(wordPart => capitalize(wordPart))
                .join('-')
        )
        .join(' ')

    return capitalized
}