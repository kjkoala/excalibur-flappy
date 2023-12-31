export const setScore = (score: number) => fetch('/api/flappy/setScore', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        data: location.search.slice(4),
        score: score
    })
})