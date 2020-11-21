/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 17:27:41
 */

import { MsgRef, Res } from '../../lib/miraiWebSocketServer/interface/interface'
import { adminCheck } from './services/adminCheck'
import { getBotStatus, setBotStatus } from './services/botStatus'

export async function authChecker(req: MsgRef, res: Res, next: any) {
  const authAdmin = await adminCheck(
    req.data.sender.user_id.toString(),
    req.data.group_id.toString(),
    req.wsRef.ctx.db,
  )
  if (authAdmin||req.data.sender.user_id.toString()===req.config.rootQQ) {
    switch (req.data.message) {
      case '/close':
        await setBotStatus(false, req.data.group_id.toString(), req.wsRef.ctx.db)
        res.report('不会的，我的工作是永远做不完的。')
        break
      case '/on':
        await setBotStatus(true, req.data.group_id.toString(), req.wsRef.ctx.db)
        res.report('可恶，上工了。')
        break
      case '/echo':
        res.report(req.data.message)
        break
      default:
        next()
    }
    //执行下一个中间件
  }
  const switcher = await getBotStatus(
    req.data.group_id.toString(),
    req.wsRef.ctx.db,
  )

  if (switcher) {
    next()
  } else {
    res.end()
  }
}
