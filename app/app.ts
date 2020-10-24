/*
 * @Date: 2020-10-11 14:08:58
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-10-17 03:17:21
 */
// import { client as WebSocketClient } from "websocket"
// let SWITCH = true
// const client = new WebSocketClient();

import { authChecker } from "./middleware/authDo";
import WebSocketWarpper from "./services/WebSocketWarpper";
import { typeFilter } from "./middleware/filter";
import { indexRouter } from "./router/indexRouter";

const client = new WebSocketWarpper("ws://localhost:6700", { httpReportUrl: "http://localhost:5700" })
client.all(typeFilter)
client.all(authChecker)
client.use("/show", indexRouter)
client.use("/", indexRouter)
client.use("/show", indexRouter)
