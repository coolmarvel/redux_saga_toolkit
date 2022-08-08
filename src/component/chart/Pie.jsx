import React from "react";

export default class Pie extends React.Component {
  constructor(props) {
    super(props);

    this.echarts = this.props.echarts;
  }

  render() {
    return <div id="chartPie" style={{ width: "100%", minHeight: 300 }}></div>;
  }

  componentDidMount() {
    this.chartPie = this.echarts.init(document.getElementById("chartPie"));
    this.constructOption();
  }

  constructOption = () => {
    let option = {
      title: {
        text: "파이 그래프",
        subtext: "Demo Digital",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["data1", "data2", "data3", "data4", "data5"],
      },
      series: [
        {
          name: "source of access",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "data1" },
            { value: 310, name: "data2" },
            { value: 234, name: "data3" },
            { value: 135, name: "data4" },
            { value: 1548, name: "data5" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    this.chartPie.setOption(option);
  };
}
