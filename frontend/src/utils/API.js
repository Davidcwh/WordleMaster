const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN
console.log(backendDomain)
console.log('here')
const get_best_guesses = (words, guess, result) => {
    return fetch(`${backendDomain}/api/best-guesses`, {
        method: 'POST',
        rejectUnauthorized: false,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({words, guess, result})
    })
}

const API = {
    get_best_guesses,
}

export default API