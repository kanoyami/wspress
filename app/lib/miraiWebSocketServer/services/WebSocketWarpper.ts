/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 18:34:00
 */
import { client as WebSocketClient } from 'websocket'
import events = require('events')
import { MsgRef, WsConfig, Middleware } from '../interface/interface'
import { MassageHandler } from './MassageService'
export default class WebSocketWarpper extends events.EventEmitter {
  private client: WebSocketClient
  private chain: Array<Middleware>
  private routedMiddwares: { [x: string]: Middleware } = {}
  SWITCH = true
  ctx: any = {}
  constructor(ws: string, config: WsConfig) {
    super()
    this.client = new WebSocketClient()
    this.chain = []
    this.client.connect(ws)
    this.client.on('connectFailed', (error) => {
      console.log('Connect Error: ' + error.toString())
      this.emit('connectFailed', error)
    })
    this.client.on('connect', (connection) => {
      console.log('WebSocket Client Connected')
      connection.on('error', (error) => {
        console.log('Connection Error: ' + error.toString())
      })
      connection.on('close', () => {
        console.log('echo-protocol Connection Closed')
      })
      connection.on('message', async (message) => {
        const data = JSON.parse(message.utf8Data!)
        const ret: MsgRef = {
          raw: message,
          wsRef: this,
          config: config,
          data: data,
        }
        if (data.post_type !== 'message') return
        const temp: Array<Middleware> = []
        const routedChain = temp.concat(this.chain)
        const url = ret.data.message.split(' ')[0]
        if (this.routedMiddwares[url]) {
          routedChain.push(this.routedMiddwares[url])
        }
        const messageHandler = new MassageHandler(ret, routedChain)
        await messageHandler.next()
      })
    })
  }

  public async load(plugin: Function) {
    await plugin(this)
  }
  public all(handle: Middleware) {
    this.chain.push(handle)
  }

  public use(url: string, handle: Middleware) {
    this.routedMiddwares[url] = handle
  }
}
