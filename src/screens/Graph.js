import React from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const GraphContainer = styled.div`
  
`;

const GraphRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 4rem;
  padding-bottom: 4rem;
`;

function Graph() {
  const [series, setSeries] = useState([
    {
      name: "BMS1",
      data: [60, 550, 100, 150, 250, 140],
    },
    {
      name: "BMS2",
      data: [120, 210, 420, 690, 350, 440],
    },
  ]);

  const [currentSeries, setCurrentSeries] = useState([]);
  const [tempSeries, setTempSeries] = useState([]);

  const voltage = useSelector((state) => state.voltage);
  const temp = useSelector((state) => state.temp);
  const current = useSelector((state) => state.current);
  const num_bms = useSelector((state) => state.bms);

  let s = "gaurav";
  console.log(`b4 useEffect : ${s}`);
  useEffect(() => {
    var bmsVoltageData = [];
    var bmsCurrentData = [];
    var bmsTempData = [];

    if (voltage["bms 0"] && temp["bms 0"] != undefined) {
      var table_data = [];
      for (let i = 0; i < num_bms; i++) {
        bmsVoltageData[i] = [];
        bmsTempData[i] = [];

        var cur_bms = {};
        cur_bms["key"] = i;
        for (var j = 0; j < 16; j++) {
          cur_bms[`v ${j}`] =
            voltage[`bms ${i}`][voltage[`bms ${i}`].length - 1][j] == undefined
              ? "-"
              : voltage[`bms ${i}`][voltage[`bms ${i}`].length - 1][j];

          bmsVoltageData[i].push(cur_bms[`v ${j}`]);
          console.log("curr_bms : " + j + ":" + cur_bms[`v ${j}`]);
        }
        for (let j = 0; j < 5; j++) {
          cur_bms[`t ${j}`] =
            temp[`bms ${i}`][temp[`bms ${i}`].length - 1][j] == undefined
              ? "-"
              : temp[`bms ${i}`][temp[`bms ${i}`].length - 1][j];

          bmsTempData[i].push(cur_bms[`t ${j}`]);
        }

        cur_bms["current"] = current[current.length - 1];
        bmsCurrentData.push(cur_bms["current"]);
        table_data.push(cur_bms);
      }

      console.log("table data : " + table_data);
      console.log(`bms1VoltageData : ${bmsVoltageData[0]}`);
      console.log(`bms2VoltageData : ${bmsVoltageData[1]}`);

      const updatedSeries = [];
      for (let i = 0; i < num_bms; i++) {
        const obj = {
          name: `BMS${i}`,
          data: bmsVoltageData[i],
        };
        console.log(obj);
        updatedSeries.push(obj);
        console.log(updatedSeries[i]);
      }
      console.log("updated Series : " + updatedSeries[0].voltage);
      setSeries(updatedSeries);
      console.log("series after updating : " + series[0].data);
    }
  }, [voltage, current, temp]);

  console.log(`after useEffect : ${s}`);
  console.log(`voltage size : ${voltage.length}`);
  console.log(`voltage : ${voltage}`);
  console.log(`current : ${current}`);
  console.log(`temp : ${temp}`);
  console.log(`num_bms : ${num_bms}`);

  const [options, setOptions] = useState({
    title: {
      text: "Its the title",
    },
    xaxis: {
      title: { text: "Time axis" },
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    yaxis: {
      title: { text: "Voltages" },
    },
  });

  

  return (
    <GraphContainer>
      <GraphRow>
        <Chart
          type="line"
          width={700}
          height={400}
          series={series}
          options={options}
        ></Chart>
        <Chart
          type="radar"
          width={600}
          height={400}
          series={series}
          options={{
            labels: ["April", "May", "June", "July", "August", "September"],
          }}
        ></Chart>
      </GraphRow>
      <GraphRow>
        <Chart
          type="line"
          width={700}
          height={400}
          series={series}
          options={options}
        ></Chart>
        <Chart
          type="line"
          width={600}
          height={400}
          series={series}
          options={{
            labels: ["April", "May", "June", "July", "August", "September"],
          }}
        ></Chart>
      </GraphRow>
    </GraphContainer>
  );
}

export default Graph;
