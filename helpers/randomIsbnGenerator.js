function randomIsbnGenerator() {
  let result = ""
    let char = `0123456789`
    let length = 10

    for (let i = 0; i < length; i++) {
        result += char[(Math.floor(Math.random() * char.length))];
    }

    return result
}

module.exports = randomIsbnGenerator