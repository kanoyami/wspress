
/*
 * @Date: 2020-11-21 21:03:26
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 21:04:32
 */
import { Collection } from "mongodb"
import { AcvupGroup } from "../../../interface/AcvupGroup"
import reportRequest from "../../../lib/miraiWebSocketServer/utils/sendMessage"
import assert from 'assert'

const config = require('../config/config.json')

export function sendMsg(collection: Collection, ACUid: string, str: string) {
    collection.find({ ACUid: Number(ACUid) }).toArray(function (err, docs) {
      assert.strictEqual(err, null)
      docs.forEach((e: AcvupGroup) => {
        reportRequest.send_str(
          '[CQ:at,qq=all]' + str,
          e.groupQQ,
          config.report_server,
        )
      })
    })
  }
  