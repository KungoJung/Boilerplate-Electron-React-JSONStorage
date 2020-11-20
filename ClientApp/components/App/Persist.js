import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';

const Persist = () => {
  const [val, setVal] = useState("")

  const handleChange = (e) => {
    console.log(e.target.value)
    setVal(e.target.value)
  }

  const clickPersist = (input) => {
    console.log("clicked!")
    console.log("input variable", input)
  }

  return (
    <div>
      <div>
        <p>Test</p>
        <Button>Load Save Text</Button>
      </div>
      <div>
        <input type="text" onChange={handleChange} value={val}/>
        <Button onClick={() => clickPersist(val)}>Save Text</Button>
      </div>
    </div>
  )
}

export default Persist
