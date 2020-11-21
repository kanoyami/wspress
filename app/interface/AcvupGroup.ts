/*
 * @Date: 2020-11-21 14:43:23
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 14:46:13
 */
export interface AcvupGroup {
  name: string
  QQAdmin: number[]
  QQGruoup: number[]
  songs: SongRecord[]
  BotStatus: boolean
}
export interface SongRecord {
  name: string
  uploadDate: number
  fileURL: string
}
