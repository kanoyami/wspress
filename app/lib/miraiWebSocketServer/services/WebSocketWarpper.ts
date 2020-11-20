

import { client as WebSocketClient } from "websocket"
import events = require('events');
import { MsgRef, WsConfig, Middleware } from "../interface/interface";
import { MassageHandler } from "./MassageService";
import { throws } from "assert";
export default class WebSocketWarpper extends events.EventEmitter {
    private client: WebSocketClient;
    private chain: Array<Middleware>;
    private routedMiddwares: { [x: string]: Middleware } = {};
    SWITCH = true;
    constructor(ws: string, config: WsConfig) {
        super()
        this.client = new WebSocketClient();
        this.chain = []
        this.client.connect(ws);
        this.client.on("connectFailed", (error) => {
            console.log("Connect Error: " + error.toString());
            this.emit("connectFailed", error)
        });
        this.client.on("connect", connection => {
            console.log("WebSocket Client Connected");
            connection.on("error", error => {
                console.log("Connection Error: " + error.toString());
            });
            connection.on("close", () => {
                console.log("echo-protocol Connection Closed");
            });
            connection.on("message", message => {
                const data = JSON.parse(message.utf8Data!);
                const ret: MsgRef = { raw: message, wsRef: this, config: config, data: data }
                if (data.post_type !== "message") return;
                const temp: Array<Middleware> = [];
                const routedChain = temp.concat(this.chain);
                const url = ret.data.message.split(" ")[0]
                if (this.routedMiddwares[url]) {
                    routedChain.push(this.routedMiddwares[url])
                }
                const messageHandler = new MassageHandler(ret, routedChain)
                messageHandler.next()
            });
        });
    }
    public all(handle: Middleware) {
        this.chain.push(handle);
    }

    public use(url: string, handle: Middleware) {
        this.routedMiddwares[url] = handle;
    }

}