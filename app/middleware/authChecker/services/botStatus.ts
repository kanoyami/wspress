/*
 * @Date: 2020-11-21 15:55:39
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 20:06:08
 */
import assert from 'assert'
import { Db } from 'mongodb'
import { AcvupGroup } from '../../../interface/AcvupGroup'
import _ from 'lodash'
/*
 * @Date: 2020-11-21 15:13:09
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 15:50:11
 */
export function setBotStatus(status: boolean, groupQQ: string, db: Db) {
  const collection = db.collection('acvup-group')
  return new Promise((reslove, reject) => {
    collection.updateOne(
      { groupQQ: groupQQ },
      { $set: { BotStatus: status } },
      function (err, result) {
        assert.strictEqual(err, null)
        console.log('Updated the botstatus'+result.result)
        reslove(result.result)
      },
    )
  })
}

export function getBotStatus(groupQQ: string, db: Db) {
  const collection = db.collection('acvup-group')
  return new Promise((reslove, reject) => {
    collection.findOne({ groupQQ: groupQQ }, function (err, doc: AcvupGroup) {
      if (doc === null) return reslove(false)
      assert.strictEqual(err, null)
      reslove(doc.BotStatus)
    })
  })
}
