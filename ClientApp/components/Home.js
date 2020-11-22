import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import {loadSavedData, saveDataInStorage} from "../renderer.js";
import List from "./List";
const { ipcRenderer } = require("electron");
const { HANDLE_FETCH_DATA, HANDLE_SAVE_DATA } = require("../../utils/constants")

const Home = () => {
  const [val, setVal] = useState("");
  const [itemsToTrack, setItems] = useState([]);

  // Grab the user's saved itemsToTrack after the app loads
  useEffect(() => {
    loadSavedData();
  }, []);

  // Listener functions that receive messages from main
  useEffect(() => {
    ipcRenderer.on(HANDLE_SAVE_DATA, handleNewItem);
    // If we omit the next step, we will cause a memory leak and & exceed max listeners
    return () => {
      ipcRenderer.removeListener(HANDLE_SAVE_DATA, handleNewItem);
    }
  });
  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_DATA, handleReceiveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_DATA, handleReceiveData);
    }
  });

  // Receives all user itemsToTrack from main
  const handleReceiveData = (event, data) => {
    setItems([...data.message]);
  };

  // Receives a new item back from main
  const handleNewItem = (event, data) => {
    setItems([...itemsToTrack, data.message])
  }

  // Manage state and input field
  const handleChange = (e) => {
    setVal(e.target.value)
  }

  // Send the input to main
  const addItem = (input) => {
    saveDataInStorage(input)
    setVal("")
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-primary" onClick={() => addItem(val)}>New Item</Button>
        </InputGroup.Prepend>
          <input type="text" onChange={handleChange} value={val}/>
      </InputGroup>
      {itemsToTrack.length ? (
        <List itemsToTrack={itemsToTrack} />
      ) : (
        <p>Add an item to get started</p>
      )}
    </div>
  )
}

export default Home
