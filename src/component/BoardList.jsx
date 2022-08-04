import React from "react";

function BoardList({ id, blocks, transactions, onRowClick, onRemoveButtonClick,}) {
  return (
    <tr>
      <td onClick={() => onRowClick(id, blocks, transactions)}>{id}</td>
      <td onClick={() => onRowClick(id, blocks, transactions)}>{blocks}</td>
      <td onClick={() => onRowClick(id, blocks, transactions)}>{transactions}</td>
      <td>
        <button onClick={() => onRemoveButtonClick(id)}>삭제</button>
      </td>
    </tr>
  );
}

export default BoardList;
