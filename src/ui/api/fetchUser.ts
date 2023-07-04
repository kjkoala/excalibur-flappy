import type { User } from "../types";

export const fetchUsers: () => Promise<User[]> = () => fetch('/api/flappy/getHeightScores', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        data: location.search.slice(4),
    })
})
.then(res => res.json())