import { Db } from 'mongodb'

/*
 * @Date: 2020-11-21 15:13:09
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 15:21:31
 */
export function adminCheck(QQ: number, db: Db) {
  const collection = db.collection('acvup-group')
  collection.find({}).toArray(function(err, docs) {
    console.log(docs)
  });
}