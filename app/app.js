/*
 * @Date: 2020-10-11 14:08:58
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-10-17 03:17:21
 */
var WebSocketClient = require("websocket").client;

var client = new WebSocketClient();
var SWITCH = true
client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", function (connection) {
  console.log("WebSocket Client Connected");
  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
  });
  connection.on("message", async (message) => {

    if (!SWITCH) return
    if (message.type === "utf8") {
      const json = JSON.parse(message.utf8Data);
      if (json.meta_event_type == "heartbeat") return;
      console.log(json);
      if (json.sender.user_id.toString() === "448264919" ||json.sender.user_id.toString() === "2973519939") {
        switch (json.message) {
          case "/close":
            SWITCH = false;
            sendReq("笨蛋二号已经下锅。", json.group_id);
             break;
          case "/on":
            SWITCH = true;
            sendReq("可恶，上工了。", json.group_id);
            break;
        }
      }
      if (json.message[0] == "/") {
        switch (json.message.split(" ")[0]) {
          case "/nnkk":
            sendReq("N.N.K.K", json.group_id);
            break;
          case "/roll":
            let roll = Math.floor((Math.random() * 1000000) % 100000)
            sendReq(`${json.sender.nickname}:${roll}`, json.group_id);
            break;
          case "/笨蛋":
            sendReq("对，是二号", json.group_id);
          default:
            break;
        }
      }
    }
  });
});

function sendReq(str, group_id) {
  request(
    "http://localhost:5700/send_msg?message_type=group&&group_id=" +
    group_id +
    "&&message=" +
    encodeURI(str)
  );
  console.log(str);
}
client.connect("ws://localhost:6700/");
