import type { User } from "../types";

export const fetchUsers: () => Promise<User[]> = () => fetch('/api/flappy/getHeightScores', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        data: '3134353c303d373535794462444444485a40445441475c4e4e5267405c6e5464464a633c40'
        // data: window.location.hash
    })
})
.then(res => res.json())