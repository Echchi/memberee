"use client";
import React, { useEffect, useState } from "react";
import db from "@/libs/server/db";
import Input from "@/component/input";
import getSession from "@/libs/client/session";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";

interface WorkerListProps {
  selectedDay?: number[];
  selectedWorker?: number;
  isOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setInitValue?: React.Dispatch<React.SetStateAction<string>>;
}

const WorkerList: React.FC<WorkerListProps> = ({
  selectedDay,
  selectedWorker,
  isOnly = false,
  onChange,
  setInitValue,
}) => {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    const fetchWorkerList = async () => {
      const workerList = await getWorkerList();
      const filterWorkerList = workerList.filter((worker) => {
        if (selectedDay) {
          return selectedDay.some((day) =>
            worker?.dayOfWeek?.includes(day.toString()),
          );
        } else {
          return worker?.dayOfWeek;
        }
      });
      const firstWorkerId = filterWorkerList[0]?.id.toString();
      setInitValue && setInitValue(firstWorkerId);
      setWorkers(filterWorkerList);
    };

    fetchWorkerList();
  }, [selectedDay]);

  return (
    <>
      {isOnly && onChange ? (
        <select
          onChange={onChange}
          defaultValue={selectedWorker}
          className="rounded-xl border-0 h-12 px-6 bg-stone-100 w-full lg:w-fit outline-none"
        >
          {workers.map((worker) => (
            <option key={`workerList_option_${worker.id}`} value={worker.id}>
              {worker.name}
            </option>
          ))}
        </select>
      ) : (
        <Input
          type={"select"}
          label={"담당"}
          value={selectedWorker + ""}
          options={workers.map((worker) => ({
            value: worker.id,
            label: worker.name,
          }))}
          name={"worker"}
          className="h-14 lg:text-lg border-b-1"
        />
      )}
    </>
  );
};

export default WorkerList;
