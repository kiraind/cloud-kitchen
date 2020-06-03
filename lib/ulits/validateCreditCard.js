// Luhn Check
export default function validateCreditCard(number) {
    if(number.length !== 16) {
        return false
    }

    let sum = 0

    for (let i = 0; i < number.length; i += 1) {
        let intVal = parseInt(number.substr(i, 1))

        if (i % 2 == 0) {
            intVal *= 2

            if (intVal > 9) {
                intVal = 1 + (intVal % 10)
            }
        }

        sum += intVal
    }

    return (sum % 10) === 0
}