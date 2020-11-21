/*
 * @Date: 2020-10-11 14:08:58
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 18:38:13
 */
// import { client as WebSocketClient } from "websocket"
// let SWITCH = true
// const client = new WebSocketClient();

import { authChecker } from './middleware/authChecker'
import WebSocketWarpper from './lib/miraiWebSocketServer'
import { typeFilter } from './middleware/filter'
import { indexRouter } from './router/indexRouter'
import { rollRouter } from './router/rollRouter'
import * as VupRouters from './router/vupSearchRouter'
import { mongodb } from './plugin/mongodb'
import { rabbitmq } from './plugin/rabbitmq'
const config = require('./config/config.json')

async function start_server() {
  const client = new WebSocketWarpper(config.listen_server, {
    httpReportUrl: config.report_server,
    rootQQ: '448264919',
  })
  await client.load(mongodb)
  await client.load(rabbitmq)
  client.all(typeFilter)
  client.all(authChecker)
  client.use('/show', indexRouter)
  client.use('/vsearch', VupRouters.vupSearchRouter)
  client.use('/vfantop', VupRouters.fansTopRouter)
  client.use('/vdailyup', VupRouters.vupDailyTopRouter)
  client.use('/clubname', VupRouters.getFansClubNameRouter)
  client.use('/roll', rollRouter)
  client.use('/help', (req, res) => {
    res.report(
      `/vsearch id/关键字 查询v的具体信息\n/clubname id 通过id查询粉丝牌叫啥\n/vfantop   查询当前粉丝榜前十\n/vdailyup  查询每日新增榜前十`,
    )
  })
}


start_server() 