/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 16:56:55
 */
import { Middleware, MsgRef, Res } from '../interface/interface'
import { send_str } from '../utils/sendMessage'
import WebSocketWarpper from './WebSocketWarpper'
export class MassageHandler {
  private chain: Array<Middleware>
  private index: number
  final = false
  response: Res = {
    report: (message: string) => {
      send_str(
        message,
        this.msgRef.data.group_id,
        this.msgRef.config.httpReportUrl!,
      )
      this.final = true
    },
    end:  () => {
      this.chain = []
      this.final = true
    },
  }
  msgRef: MsgRef
  constructor(msgRef: MsgRef, chain: Array<Middleware>) {
    this.msgRef = msgRef
    this.chain = [] // 存放中间件的数组
    this.index = 0 // 当前中间件在数组中的位置
    this.chain = chain
  }

  public async next() {
    if (this.final) return console.error('use method cannot use after reprot')
    if (this.index > this.chain.length - 1) return
    let middleware = this.chain[this.index]
    this.index++
    await middleware(this.msgRef, this.response, this.next.bind(this))
  }
}
