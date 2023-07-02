export const setScore = (score: number) => fetch('/api/flappy/setScore', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        // data: window.location.hash,
        data: '3134353c303d373535794462444444485a40445441475c4e4e5267405c6e5464464a633c40',
        score: score
    })
})