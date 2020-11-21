/*
 * @Date: 2020-11-21 14:43:23
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 15:36:09
 */
export interface AcvupGroup {
  groupQQ: string
  groupInfo: {
    name: string
    ACUid: number
  }
  QQAdmin: string[]
  songs: SongRecord[]
  BotStatus: boolean
  _id:string
}
export interface SongRecord {
  name: string
  uploadDate: number
  fileURL: string
}
