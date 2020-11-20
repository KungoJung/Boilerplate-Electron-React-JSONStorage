import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {loadSaveText, saveTextInStorage} from "../renderer.js";
const { ipcRenderer } = require("electron");
const { HANDLE_FETCH_TEXT, HANDLE_SAVE_TEXT } = require("../../utils/constants")

const Persist = () => {
  const [val, setVal] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Listener functions that receive messages from main
    ipcRenderer.on(HANDLE_SAVE_TEXT, handleNewExpense)
    // If we omit the next step, we will cause a memory leak and & exceed max listeners
    return () => {
      ipcRenderer.removeListener(HANDLE_SAVE_TEXT, handleNewExpense)
    }
  })

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_TEXT, handleReceiveText)
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_TEXT, handleReceiveText)
    }
  })

  const handleChange = (e) => {
    setVal(e.target.value)
  }

  const handleReceiveText = (event, data) => {
    console.log("renderer received data from main:", data.message)
    setExpenses([...data.message])
  }

  const handleNewExpense = (event, data) => {
    console.log("renderer received data from main:", data.message)
    setExpenses([...expenses, data.message])
  }

  const clickPersist = (input) => {
    // Send the input to main
    saveTextInStorage(input)
    setVal("")
  }

  return (
    <div>
      <div>
        <p>Expenses: {expenses.join(" * ")}</p>
        <Button onClick={loadSaveText}>Load Expenses</Button>
      </div>
      <div>
        <input type="text" onChange={handleChange} value={val}/>
        <Button onClick={() => clickPersist(val)}>Add a new expense</Button>
      </div>
    </div>
  )
}

export default Persist
