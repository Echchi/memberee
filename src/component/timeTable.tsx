import React from "react";
import { cls } from "@/libs/client/utils";

function createTimeTableData() {
  const timetableData = [];
  for (let hour = 6; hour <= 23; hour++) {
    for (let i = 1; i <= 3; i++) {
      timetableData.push({
        time: hour,
        classLee: `이쌤 ${hour}시 수업 ${i}`,
        classHam: `함쌤 ${hour}시 수업 ${i}`,
      });
    }
  }
  return timetableData;
}

function TimeTable() {
  const data = createTimeTableData();

  return (
    <table className="table-auto w-full mt-3 text-center">
      <thead>
        <tr className="font-semibold border-0 border-b border-emerald-700/30 *:py-2 sticky top-0 bg-white">
          <th></th>
          <th>이상혁</th>
          <th>함민식</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index, arr) => {
          const isLastOfClass =
            index === arr.length - 1 || arr[index + 1].time !== item.time;
          return (
            <tr
              key={index}
              className={cls(
                "*:py-2",
                isLastOfClass ? "border-b border-emerald-700/30" : "",
              )}
            >
              {index === 0 || arr[index - 1].time !== item.time ? (
                <td rowSpan={3} className="text-emerald-700 font-semibold">
                  {item.time}
                </td>
              ) : null}
              <td>{item.classLee}</td>
              <td>{item.classHam}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TimeTable;
