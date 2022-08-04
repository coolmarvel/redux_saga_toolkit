import React from "react";

function BoardNew({ changeData, data, onSaveButtonClick, resetForm }) {
  const saveBtnClick = (e) => {
    e.preventDefault();
    onSaveButtonClick(data);
    resetForm();
  };

  return (
    <div>
      <form onSubmit={saveBtnClick}>
        <div>
          B :{" "}
          <input
            type="text"
            name="blocks"
            onChange={changeData}
            value={data.blocks}
          />
        </div>
        <div>
          T :{" "}
          <input
            type="text"
            name="transactions"
            onChange={changeData}
            value={data.transactions}
          />
        </div>
        <input type="hidden" name="id" onChange={changeData} value={data.id} />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default BoardNew;
