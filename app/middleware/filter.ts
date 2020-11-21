/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 17:01:07
 */
import { MsgRef, Res } from "../lib/miraiWebSocketServer/interface/interface";
import { urlParse } from "../lib/miraiWebSocketServer/utils/urlParse";

export async function typeFilter(req: MsgRef, res: Res, next: Function) {
    if (req.data.message[0] !== "/") res.end();
    else {
        req.data.url_param = urlParse(req.data.message);
         next();
    }
}