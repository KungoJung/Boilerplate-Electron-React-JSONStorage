const { ipcRenderer } = require("electron");
const { FETCH_TEXT_FROM_STORAGE, SAVE_TEXT_IN_STORAGE, HANDLE_SAVE_TEXT } = require("../utils/constants")

// This renderer file contains all of our front end code for communicating with main. In essence, it is similar to making api calls to the server, except here we do not have to async/await because everything is running in the same system.

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

// -----------------------------------------------------------------
// Functions for calling main

// Ask main to load text from persistent storage
function loadSaveText() {
  console.log("loadSaveText called")
  ipcRenderer.send(FETCH_TEXT_FROM_STORAGE, "expenses")
}

// Send expense message to main
function saveTextInStorage(expense) {
  console.log("saveTextInStorage called")
  ipcRenderer.send(SAVE_TEXT_IN_STORAGE, expense)
}

module.exports = {sendMessageToMain, loadSaveText, saveTextInStorage}
