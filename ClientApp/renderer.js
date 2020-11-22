const { ipcRenderer } = require("electron");
const { FETCH_DATA_FROM_STORAGE, SAVE_DATA_IN_STORAGE, } = require("../utils/constants")

// This renderer file contains much of our front end code for communicating with main. For that reason, it's similar to making api calls to the server, except here the calls are not asynchronous.

// There are also similar handler functions on the React side

// -----------------------------------------------------------------
// Functions for calling main

// Ask main to load data from its persistent storage
function loadSavedData() {
  ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "itemsToTrack")
}

// Send item message to main
function saveDataInStorage(item) {
  ipcRenderer.send(SAVE_DATA_IN_STORAGE, item)
}

module.exports = { loadSavedData, saveDataInStorage }
