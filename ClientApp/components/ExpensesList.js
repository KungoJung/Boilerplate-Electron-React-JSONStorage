import React from 'react';
import Table from "react-bootstrap/Table"

const ExpensesList = ({expenses}) => {
  return (
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Expense</th>
    </tr>
  </thead>
  <tbody>
    {expenses.map((item, i) => {
      return (
        <tr key={i+1}>
          <td>{i+1}</td>
          <td>{item}</td>
        </tr>
      )
    })}
  </tbody>
</Table>
  )
}

export default ExpensesList;
