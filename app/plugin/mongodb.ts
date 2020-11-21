/*
 * @Date: 2020-11-21 14:52:27
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 14:59:17
 */
import { MongoClient } from 'mongodb'
import assert from 'assert'
import WebSocketWarpper from '../lib/miraiWebSocketServer'
const config = require('../config/config.json')
export function mongodb(wsRef: WebSocketWarpper) {
  MongoClient.connect(config.mongodb.connect_string, function (err, client) {
    assert.strictEqual(null, err)
    console.log('Connected successfully to server')
    const db = client.db(config.mongodb.db)
    wsRef.ctx.db = db
    wsRef.ctx.dbClient = client
  })
}
