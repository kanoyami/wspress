/*
 * @Date: 2020-10-25 00:55:23
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-10-25 00:56:26
 */
import { getVupInfo, getTodayList, fansTop, getFansClubName } from "../lib/acvupSite";
import { MsgRef, Res } from "../lib/miraiWebSocketServer/interface/interface";

export async function vupSearchRouter(req: MsgRef, res: Res) {
    const r = await getVupInfo(req.data.url_param![1]).catch(e=>{
        res.end()
        console.log(e)
    })
    res.report(r?r:"结果不存在或指令有误")

}

export async function vupDailyTopRouter(req: MsgRef, res: Res) {
    const r = await getTodayList().catch(e=>{
        res.end()
        console.log(e)
    })
    res.report(r?r:"结果不存在或指令有误")
}

export async function fansTopRouter(req: MsgRef, res: Res) {
    const r = await fansTop().catch(e=>{
        res.end()
        console.log(e)
    })
    res.report(r?r:"结果不存在或指令有误")
}

export async function getFansClubNameRouter(req: MsgRef, res: Res) {
    const r = await getFansClubName(req.data.url_param![1]).catch(e=>{
        res.end()
        console.log(e)
    })
    res.report(r?r:"结果不存在或指令有误")
}