import { useEffect, useState } from "react";
import cycleData from "./payment-cycle.json";
import "./styles.css";

const end = new Date(cycleData.end);
const due = new Date(cycleData.due);

export default function App() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const diff = due.valueOf() - now.valueOf();
  const total = due.valueOf() - end.valueOf();
  const passed = now.valueOf() - end.valueOf();

  const day = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hour = Math.floor((diff - day * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
  const minute = Math.floor(
    (diff - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000 / 60
  );
  const seconds = Math.floor(
    (diff -
      day * 24 * 60 * 60 * 1000 -
      hour * 60 * 60 * 1000 -
      minute * 60 * 1000) /
      1000
  );

  const progress = Number((passed / total).toFixed(5)) * 100;

  return (
    <div className="App">
      <div style={{ fontSize: "26px", fontWeight: "bold" }}>
        {Math.floor(diff / 1000 / 60 / 60 / 24)}天{hour}小时{minute}分钟
        {seconds}秒
      </div>
      <div style={{ width: "80vw", margin: "0 auto" }}>
        <div className="chart">
          <div className={`bar bar-${Math.round(progress)} white`}>
            <div className="face top">
              <div className="growing-bar"></div>
            </div>
            <div className="face side-0">
              <div className="growing-bar"></div>
            </div>
            <div className="face floor">
              <div className="growing-bar"></div>
            </div>
            <div className="face side-a"></div>
            <div className="face side-b"></div>
            <div className="face side-1">
              <div className="growing-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
