import assert from 'assert'
import { Db } from 'mongodb'
import { AcvupGroup } from '../interface/AcvupGroup'
import _ from 'lodash'
/*
 * @Date: 2020-11-21 15:13:09
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 16:59:04
 */
export function adminCheck(QQ: string, groupQQ: string, db: Db) {
  const collection = db.collection('acvup-group')
  return new Promise((reslove, reject) => {
    collection.findOne({ groupQQ: groupQQ }, function (err, doc: AcvupGroup) {
      assert.strictEqual(err, null)
      if (doc.QQAdmin.indexOf(QQ) >= 0) {
        return reslove(true)
      } else {
        return reslove(false)
      }
    })
  })
}
