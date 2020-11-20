import { MsgRef, Res } from "../lib/miraiWebSocketServer/interface/interface";

export function rollRouter(req: MsgRef, res: Res): void {
    let roll = Math.floor((Math.random() * 1000000) % 100000)
    res.report(roll.toString())
}
