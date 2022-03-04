const get_best_guesses = (words, guess, result) => {
    console.log("making API call: " + guess + ", " + result)
    return fetch('http://127.0.0.1:5000/api/best-guesses', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({words, guess, result})
    })
}

const test = () => {
    return fetch('http://127.0.0.1:5000/test', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"hello": "bye"})
    })
}

export default {
    get_best_guesses,
    test
}