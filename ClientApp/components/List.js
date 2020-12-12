import React from 'react';
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button";
import {removeDataFromStorage} from "../renderer.js"

const List = ({itemsToTrack}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
        </tr>
      </thead>
      <tbody>
        {itemsToTrack.map((item, i) => {
          return (
            <tr key={i+1}>
              <td>{i+1}</td>
              <td>{item}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => removeDataFromStorage(item)}
                >Remove</Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default List;
