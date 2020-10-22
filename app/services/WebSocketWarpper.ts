

import { client as WebSocketClient } from "websocket"
import events = require('events');
export default class WebSocketWarpper extends events.EventEmitter {
    private client: WebSocketClient;
    constructor(ws: string) {
        super()
        this.client = new WebSocketClient();
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
                this.emit("message", message)
            });
        });


    }
}