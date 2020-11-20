
import { MsgRef, Res } from "../lib/miraiWebSocketServer/interface/interface";

export function authChecker(req: MsgRef, res: Res, next: any): void {
    if (req.data.sender.user_id.toString() === "448264919" || req.data.sender.user_id.toString() === "2973519939") {
        switch (req.data.message) {
            case "/close":
                req.wsRef.SWITCH = false;
                res.report("笨蛋二号已经下锅。");
                break;
            case "/on":
                console.log(111)
                req.wsRef.SWITCH = true;
                res.report("可恶，上工了。");
                break;
            case "/echo":
                res.report(req.data.message);
                break;
            default:
                next();
        }
        //执行下一个中间件
    } else if (!req.wsRef.SWITCH) res.end();
    else next();
}