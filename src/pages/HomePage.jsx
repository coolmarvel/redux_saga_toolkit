import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardList from "../component/BoardList";
import BoardNew from "../component/BoardNew";
import {
  searchDataAsync,
  saveDataAsync,
  removeDataAsync,
} from "../redux/actions/index";

import ECharts, { EChartsReactProps } from "echarts-for-react";

function HomePage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id: "",
    blocks: "",
    transactions: "",
    // cpu: "",
    // memory: "",
    // storage: "",
    // blockchainInfo: "",
    // ledgerInfo: "",
    // resourceInfo: "",
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
      // cpu: "",
      // memory: "",
      // storage: "",
      // blockchainInfo: "",
      // ledgerInfo: "",
      // resourceInfo: "",
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
  // console.log("dashboard", dashboard);

  const blocksArray = [];

  for (const data of dashboard) {
    blocksArray.push(data.blocks);
  }

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  shuffle(blocksArray);

  useEffect(() => {
    setLoading(true);
    dispatch(searchDataAsync());
    setLoading(false);
  }, []);

  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: ["우", "주", "멋", "쟁", "이", "성", "현"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: blocksArray,
        type: "bar",
      },
    ],
  });
  const [options1, setOptions1] = useState({
    xAxis: {
      type: "category",
      data: ["우", "주", "멋", "쟁", "이", "성", "현"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: blocksArray,
        type: "line",
      },
    ],
  });

  return (
    <div>
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
                  // cpu={value.cpu}
                  // memory={value.memory}
                  // storage={value.storage}
                  // blockchainInfo={value.blockchainInfo}
                  // ledgerInfo={value.ledgerInfo}
                  // resourceInfo={value.resourceInfo}
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
      <ECharts
        option={options}
        opts={{ renderer: "svg", width: "auto", height: "350px" }}
      />
      <ECharts
        option={options1}
        opts={{ renderer: "svg", width: "auto", height: "350px" }}
      />
    </div>
  );
}

export default HomePage;
