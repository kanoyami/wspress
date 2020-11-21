/*
 * @Date: 2020-11-21 17:42:47
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 19:21:42
 */
import * as amqp from 'amqplib'
import { Collection, Db } from 'mongodb'
import WebSocketWarpper from '../lib/miraiWebSocketServer'
import reportRequest from '../lib/miraiWebSocketServer/utils/sendMessage'
import { AcvupGroup } from '../interface/AcvupGroup'
import assert from 'assert'

const config = require('../config/config.json')

export function rabbitmq(wsRef: WebSocketWarpper) {
  const collection: Collection = wsRef.ctx.db.collection('acvup-group')
  const q = config.rabbitmq.queue
  const open = amqp.connect(config.rabbitmq.connect_string)
  open
    .then(function (conn) {
      console.log('connected successfully to rabbitmq')
      return conn.createChannel()
    })
    .then(function (ch) {
      return ch
        .assertQueue(q, {
          durable: false,
        })
        .then(function (ok) {
          return ch.consume(q, function (msg) {
            if (msg !== null) {
              const message = msg.content.toString()
              const commadArr = message.split('_$')
              switch (commadArr[0]) {
                case 'startLive':
                  collection
                    .find({ ACUid: Number(commadArr[1]) })
                    .toArray(function (err, docs) {
                      assert.strictEqual(err, null)
                      docs.forEach((e: AcvupGroup) => {
                        reportRequest.send_str(
                          '[CQ:at,qq=all]' + commadArr[2] + commadArr[3],
                          e.groupQQ,
                          config.report_server,
                        )
                      })
                      ch.ack(msg)
                    })
              }
              //ch.ack(msg)
            }
          })
        })
    })
    .catch(console.warn)
}
