export function authChecker(message: any, res: any, next: any): void {
    if (message.data.sender.user_id.toString() === "448264919" || message.data.sender.user_id.toString() === "2973519939") {
        switch (message.data.message) {
            case "/close":
                res.report("笨蛋二号已经下锅。");
                break;
            case "/on":
                res.report("可恶，上工了。");
                break;
            default:
                next()
        }
        //执行下一个中间件
    }
}