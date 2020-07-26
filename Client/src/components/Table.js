import React from 'react';

const Table = ({data}) => {
  const tableItems = data.map((entry) => {
    return(
      <tr>
        <td data-label="Name">{entry.name}</td>
        <td data-label="Country">{entry.country}</td>
        <td data-label="Birthday">{entry.birthday}</td>
      </tr>
    );
  })

  return(
    <table className="ui celled table">
  <thead>
    <tr><th>Name</th>
    <th>Country</th>
    <th>Birthday</th>
  </tr></thead>
  <tbody>
    {tableItems}
  </tbody>
</table>
  );
}

export default Table
