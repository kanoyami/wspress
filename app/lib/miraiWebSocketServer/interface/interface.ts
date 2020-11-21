/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 16:17:19
 */
import { IMessage } from "websocket";
import WebSocketWarpper from "../services/WebSocketWarpper";

export interface MsgRef {
    raw: IMessage,
    wsRef: WebSocketWarpper,
    config: WsConfig,
    data: groupMessage
}

export interface WsConfig {
    httpReportUrl?: string,
    wsReportUrl?: string,
    dataType?: "binary" | "json" | "string"
}

export interface Res {
    report: (message: string) => void,
    end: () => void,
}

export type MiddlewareArgus = {
    req: MsgRef,
    res: Res,
    next: () => void
}

export interface groupMessage {
    anonymous: null | string,
    font: number,
    group_id: number,
    message: string,
    message_id: number,
    message_type: 'group',
    post_type: 'message',
    raw_message: string,
    self_id: number,
    sender: {
        age: number,
        area: string,
        card: string,
        level: string,
        nickname: string,
        role: string,
        sex: string,
        title: string,
        user_id: number
    },
    sub_type: 'normal',
    time: number,
    user_id: number,
    url_param?: string[]
}

export type Middleware = (req: MsgRef, res: Res, next: () => void) => void
