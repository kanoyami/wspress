/*
 * @Date: 2020-10-11 14:08:58
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-10-25 00:52:02
 */
// import { client as WebSocketClient } from "websocket"
// let SWITCH = true
// const client = new WebSocketClient();

import { authChecker } from "./middleware/authDo";
import WebSocketWarpper from "./lib/miraiWebSocketServer";
import { typeFilter } from "./middleware/filter";
import { indexRouter } from "./router/indexRouter";
import { rollRouter } from "./router/rollRouter";
import * as VupRouters from "./router/vupSearchRouter";

const client = new WebSocketWarpper("ws://localhost:6700", { httpReportUrl: "http://localhost:5700" })
client.all(typeFilter)
client.all(authChecker)
client.use("/show", indexRouter)
client.use("/vsearch", VupRouters.vupSearchRouter)
client.use("/vfantop", VupRouters.fansTopRouter)
client.use("/vdailyup", VupRouters.vupDailyTopRouter)
client.use("/clubname", VupRouters.getFansClubNameRouter)
client.use("/roll", rollRouter)
client.use("/help",(req,res)=>{
    res.report(`/vsearch id/关键字 查询v的具体信息\n/clubname id 通过id查询粉丝牌叫啥\n/vfantop   查询当前粉丝榜前十\n/vdailyup  查询每日新增榜前十`)
})
