const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN

const get_best_guesses = (words, guess, result) => {
    console.log("making API call: " + guess + ", " + result)
    return fetch(`${backendDomain}/api/best-guesses`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({words, guess, result})
    })
}

export default {
    get_best_guesses,
}