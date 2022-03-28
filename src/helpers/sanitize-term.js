function sanitizeLetters(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export default sanitizeLetters