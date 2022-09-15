function randomIsbnGenerator() {
  let result = ""
    let char = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    let length = 5

    for (let i = 0; i < length; i++) {
        result += char[(Math.floor(Math.random() * char.length))];
    }

    return result
}

module.exports = randomIsbnGenerator