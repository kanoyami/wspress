/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 17:02:45
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
  if (authAdmin) {
    switch (req.data.message) {
      case '/close':
        await setBotStatus(
          false,
          req.data.group_id.toString(),
          req.wsRef.ctx.db,
        )
        res.report('笨蛋二号已经下锅。')
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
