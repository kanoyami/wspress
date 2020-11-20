/*
 * @Date: 2020-10-25 00:32:47
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-10-25 00:39:41
 */
import { request } from "./utils"
import cheerio from "cheerio"

export async function getVupInfo(id_name: string) {
    const body = await request(encodeURI(`https://vup.loli.ren/search?keyword=${id_name}`))
    const $ = cheerio.load(body)
    let tr = $("tr")
    let str = ``
    for (let index = 1; index < tr.length; index++) {
        const id = tr[index].children[1].children[1].children[1].children[0].data;
        const name = tr[index].children[3].children[1].children[0].data;
        str += `id:${id} 名称:${name} 详情：https://www.acfun.cn/u/${id}\n`
    }
    str += "数据源：https://vup.loli.ren/"
    return str
}

export async function getTodayList() {
    const body = await request(encodeURI(`https://vup.loli.ren/ups`))
    const $ = cheerio.load(body)
    let tr = $("tr")
    let str = `今日新增关注排行：\n`
    for (let index = 1; index < 11; index++) {
        const name = tr[index].children[1].children[1].children[2].children[1].children[1].children[0].data
        const total = tr[index].children[7].children[1].children[0].data
        const change = tr[index].children[5].children[1].children[0].data
        str += `${index} ${name} 新增关注:${change} 总关注:${total}\n`
    }
    str += `总览：https://vup.loli.ren/ups`
    return str
}

export async function fansTop() {
    const body = await request(encodeURI(`https://vup.loli.ren/daily`))
    const $ = cheerio.load(body)
    let tr = $("tr")
    let str = `关注排行：\n`
    for (let index = 1; index < 11; index++) {
        const name = tr[index].children[1].children[1].children[2].children[1].children[1].children[0].data
        const total = tr[index].children[5].children[1].children[0].data
        str += `${index} ${name}  总关注:${total}\n`
    }
    str += `总览：https://vup.loli.ren/daily`
    return str

}

export async function getFansClubName(id: string) {
    const body = await request(encodeURI(`https://vup.loli.ren/search?keyword=${id}`))
    const $ = cheerio.load(body)
    let tr = $("tr")
    const fs = tr[1].children[5].children[1].children[0].data;
    const name = tr[1].children[3].children[1].children[0].data;
    let str = `名称:${name} 粉丝牌:${fs} 详情：https://www.acfun.cn/u/${id}\n数据源：https://vup.loli.ren/`
    console.log(str)
    return str
}
