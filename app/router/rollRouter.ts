/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 16:34:00
 */
import { MsgRef, Res } from "../lib/miraiWebSocketServer/interface/interface";

export function rollRouter(req: MsgRef, res: Res): void {
    console.log("roll")
    let roll = Math.floor((Math.random() * 1000000) % 100000)
    res.report(roll.toString())
}
