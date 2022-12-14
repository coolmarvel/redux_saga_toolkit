import React from "react";

export default class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.echarts = this.props.echarts;
  }

  render() {
    return <div id="chartBar" style={{ width: "100%", minHeight: 300 }}></div>;
  }

  componentDidMount() {
    this.chartBar = this.echarts.init(document.getElementById("chartBar"));
    this.constructOption();
  }

  constructOption = () => {
    var dataAxis = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "r",
      "s",
      "t",
      "u",
    ];
    var data = [
      220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133,
      334, 198, 123, 125, 220,
    ];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    let option = {
      title: {
        text: "수직：데이터",
        subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom",
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: "#fff",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      dataZoom: [
        {
          type: "inside",
        },
      ],
      series: [
        {
          // For shadow
          type: "bar",
          itemStyle: {
            color: "rgba(0,0,0,0.05)",
          },
          barGap: "-100%",
          barCategoryGap: "40%",
          data: dataShadow,
          animation: false,
        },
        {
          type: "bar",
          emphasis: {
            color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
            itemStyle: {
              color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: data,
        },
      ],
    };

    // Enable data zoom when user click bar.
    var zoomSize = 6;
    this.chartBar.on("click", (params) => {
      // console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      this.chartBar.dispatchAction({
        type: "dataZoom",
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
      });
    });

    this.chartBar.setOption(option);
  };
}
