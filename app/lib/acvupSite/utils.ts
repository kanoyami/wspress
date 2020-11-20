import Request from "request"

export function request(url: string): Promise<string> {
    return new Promise((rl, rj) => {
        Request(url, (err, res, body) => {
            if (err) rj(err)
            rl(body)
        })
    })
}