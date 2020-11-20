import { MsgRef, Res, Middleware } from "../lib/miraiWebSocketServer/interface/interface";

export function indexRouter(req: MsgRef, res: Res, next: any): void {
    res.report("hello router")
}
