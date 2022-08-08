import React from "react";
import * as echarts from "echarts";
import Bar from "../component/chart/Bar";
import Line from "../component/chart/Line";
import Pie from "../component/chart/Pie";
import Radar from "../component/chart/Radar";

export default class ChartPage extends React.Component {
  render() {
    return (
      <div>
        <ul style={styles.container}>{this.getAllCharts()}</ul>
      </div>
    );
  }

  getAllCharts = () => {
    const charts = [
      { type: "line", title: "Tooltip & DataZoom" },
      { type: "radar", title: "Basic Radar" },
      { type: "pie", title: "Basic Pie" },
      { type: "bar", title: "Basic Bar" },
    ];

    return charts.map((item, index) => {
      return (
        <li key={item.type} className="box" style={styles.item}>
          {this.renderTitle(item)}
          <div style={{ padding: "0 10px" }}>{this.renderChart(item.type)}</div>
        </li>
      );
    });
  };

  renderTitle = (item) => {
    return <div style={{ padding: 10 }}>{item.title}</div>;
  };

  renderChart = (type) => {
    switch (type) {
      case "line":
        return <Line echarts={echarts} />;
      case "bar":
        return <Bar echarts={echarts} />;
      case "pie":
        return <Pie echarts={echarts} />;
      case "radar":
        return <Radar echarts={echarts} />;
      default:
        break;
    }
  };
}

const styles = {
  container: {
    padding: "10px 0",
  },
  item: {
    margin: "10px 0",
    background: "#FFFFFF",
  },
};
