import { MsgRef, Res } from "../interface/interface";
import { urlParse } from "../utils/urlParse";

export function typeFilter(req: MsgRef, res: Res, next: Function): void {
    if (req.data.post_type !== "message") res.end();
    else if (req.data.message[0] !== "/") res.end();
    else {
        req.data.url_param = urlParse(req.data.message);
        next();
    }
}