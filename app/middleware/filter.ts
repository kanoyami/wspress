import { MsgRef, Res } from "../lib/miraiWebSocketServer/interface/interface";
import { urlParse } from "../lib/miraiWebSocketServer/utils/urlParse";

export function typeFilter(req: MsgRef, res: Res, next: Function): void {
    if (req.data.message[0] !== "/") res.end();
    else {
        req.data.url_param = urlParse(req.data.message);
        next();
    }
}