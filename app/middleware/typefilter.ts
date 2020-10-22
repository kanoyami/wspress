export function typeFilter(message: any, res: any, next: any, wsClient: any): void {
    console.log(message)
    if (message.data.post_type !== "message") res.end()
    else next()
}