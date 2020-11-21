/*
 * @Date: 2020-11-21 00:08:24
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-11-21 20:46:11
 */
import request from "request";
const reportRequest = {
    send_str: (str: string, gid: string | number, reprot_url: string) => {
        console.log(gid+ " send message "+str)
        request(
            reprot_url + "/send_msg?message_type=group&&group_id=" +
            gid +
            "&&message=" +
            encodeURI(str)
        );

    }
}

export = reportRequest;