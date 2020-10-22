var request = require("request");
export default {
    send_str: (str, gid) => {
        request(
            "http://localhost:5700/send_msg?message_type=group&&group_id=" +
            gid +
            "&&message=" +
            encodeURI(str)
        );

    }
}