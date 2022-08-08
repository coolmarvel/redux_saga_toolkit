import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardList from "../component/board/BoardList";
import BoardNew from "../component/board/BoardNew";
import {
  searchDataAsync,
  saveDataAsync,
  removeDataAsync,
} from "../redux/actions/index";

import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id: "",
    blocks: "",
    transactions: "",
  });

  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setData({
      id: "",
      blocks: "",
      transactions: "",
    });
  };

  const onSearchButtonClick = () => {
    resetForm();
    dispatch(searchDataAsync());
  };

  const onSaveButtonClick = (data) => {
    dispatch(saveDataAsync(data, lastId));
  };

  const onRemoveButtonClick = (id) => {
    dispatch(removeDataAsync(id));
  };

  const onRowClick = (id, blocks, transactions) => {
    setData({
      id: id,
      blocks: blocks,
      transactions: transactions,
    });
  };

  const { dashboard, lastId } = useSelector((state) => state.boardReducer);

  const array = [];

  for (const data of dashboard) {
    array.push(data.blocks);
  }

  // const shuffleArray = (array) => {
  //   for (let loop = array.length - 1; loop >= 0; loop--) {
  //     let randomNum = Math.floor(Math.random() * (loop + 1));
  //     let randomArrayItem = array[randomNum];

  //     array[randomNum] = array[loop];
  //     array[loop] = randomArrayItem;
  //   }
  //   // 배열이 잘 섞였는지 확인하기 위함.
  //   // console.log(array);
  // };

  // shuffleArray();

  useEffect(() => {
    setLoading(true);
    dispatch(searchDataAsync());
    setLoading(false);
  }, []);

  return (
    <div>
      <div>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/echart">Chart Page</Link>
        </nav>
      </div>
      <br />
      <button onClick={onSearchButtonClick}>조회</button>
      <div>
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">ID</td>
              <td width="100">Blocks</td>
              <td width="100">Transactions</td>
            </tr>
            {dashboard.length > 0 &&
              dashboard.map((value, index) => (
                <BoardList
                  key={index}
                  id={value.id}
                  blocks={value.blocks}
                  transactions={value.transactions}
                  onRowClick={onRowClick}
                  onRemoveButtonClick={onRemoveButtonClick}
                />
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <hr />
      <br />
      <div>
        <BoardNew
          changeData={changeData}
          data={data}
          onSaveButtonClick={onSaveButtonClick}
          resetForm={resetForm}
        />
      </div>
      <br />
      <hr />
      <br />
    </div>
  );
}

export default HomePage;
