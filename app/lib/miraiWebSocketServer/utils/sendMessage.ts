/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 16:16:37
 */
import request from "request";
const reportRequest = {
    send_str: (str: string, gid: string | number, reprot_url: string) => {
        console.log("send message "+str)
        request(
            reprot_url + "/send_msg?message_type=group&&group_id=" +
            gid +
            "&&message=" +
            encodeURI(str)
        );

    }
}

export = reportRequest;