const { ipcRenderer } = require("electron");

function sendMessageToMain(e) {
  e.preventDefault();
  // console.log("Button submit function");
  const message = e.target.sendBox.value;

  console.log("sending...");
  console.log(message);

  ipcRenderer.send("key_on_message", {
    message: message,
    comingFrom: "sendMessageToMain"
  });

}

module.exports = {sendMessageToMain}
