import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Clock } from "react-bootstrap-icons";

dayjs.locale("ru");

const DateTimeBlock: React.FC = () => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dayOfWeek = now.format("dddd");
  const date = now.format("DD MMMM, YYYY");
  const time = now.format("HH:mm:ss");

  return (
    <div>
      <div>{dayOfWeek}</div>
      <div>
        {date} <Clock style={{ marginLeft: "8px", marginRight: "4px" }} />{" "}
        {time}
      </div>
    </div>
  );
};

export default DateTimeBlock;
