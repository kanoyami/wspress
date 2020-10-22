import { IMessage } from "websocket";
import { send_str } from "../utils/sendMessage"
export class MassageHandler {
    private chain: Array<any>;
    private index: number;
    final = false;
    message: any;
    response = {
        report: (str: string) => {
            send_str(str, this.message.data.group_id,this.reprot_url)
            this.final = true;
        },
        end:()=>{
            this.final = true;
        }
    };
    reprot_url: string;
    constructor(message: IMessage, reprot_url: string) {
        const json = JSON.parse(message.utf8Data!);
        this.reprot_url = reprot_url;
        this.message = { raw: message, data: json };
        this.chain = [] // 存放中间件的数组
        this.index = 0; // 当前中间件在数组中的位置
    }
    public use(handle: any) {
        this.chain.push(handle);
    }
    public next() {
        if (this.final) return console.error("use method cannot use after reprot")
        if (this.index > this.chain.length - 1) return;
        let middleware = this.chain[this.index];
        this.index++;
        middleware(this.message, this.response, this.next.bind(this));
    }

}

