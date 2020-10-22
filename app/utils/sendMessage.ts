import request from "request";
const reportRequest = {
    send_str: (str: string, gid: string | number, reprot_url: string) => {
        request(
            reprot_url + "/send_msg?message_type=group&&group_id=" +
            gid +
            "&&message=" +
            encodeURI(str)
        );

    }
}

export = reportRequest;