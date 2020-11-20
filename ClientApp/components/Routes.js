import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {sendMessageToMain} from "../renderer.js"
import Persist from "./Persist"
const { ipcRenderer } = require("electron");

const Routes = () => {

  useEffect(() => {
    console.log("This component mounted")
    ipcRenderer.on("send_to_renderer", handleRenderer)
  })

  return (
    <div>
      <form onSubmit={sendMessageToMain}>
        <input type="text" name="sendBox" id="sendBox" />
        <Button type="submit">Hello There</Button>
      </form>
      <Persist />
    </div>
  )
};

export default Routes;

function handleRenderer(event, data) {
  // this should receive pong back
  console.log("handleRenderer", data);
}
