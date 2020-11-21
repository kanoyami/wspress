/*
 * @Date: 2020-11-21 14:52:27
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 18:33:18
 */
import { MongoClient } from 'mongodb'
import assert from 'assert'
import WebSocketWarpper from '../lib/miraiWebSocketServer'
const config = require('../config/config.json')
export function mongodb(wsRef: WebSocketWarpper) {
  return new Promise((rs, rl) => {
    MongoClient.connect(config.mongodb.connect_string, function (err, client) {
      assert.strictEqual(null, err)
      console.log('Connected successfully to server')
      const db = client.db(config.mongodb.db)
      wsRef.ctx.db = db
      wsRef.ctx.dbClient = client
      rs(true)
    })
  })
}
