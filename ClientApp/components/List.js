import React from 'react';
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button";

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
                {/* {these do not work yet} */}
                <Button variant="outline-warning">Edit</Button>{' '}
                <Button variant="outline-danger">Remove</Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default List;
