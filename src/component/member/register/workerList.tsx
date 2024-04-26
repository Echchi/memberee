import React, { useEffect, useState } from "react";
import db from "@/libs/server/db";
import Input from "@/component/input";
import getSession from "@/libs/client/session";
import { getWorkerList } from "@/app/(tabBar)/worker/register/api";

const WorkerList = ({ selectedDay }: { selectedDay: number[] }) => {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    const fetchWorkerList = async () => {
      const workerList = await getWorkerList();
      console.log("workerList", workerList);
      const filterWorkerList = workerList.filter((worker) =>
        selectedDay.some((day) => worker.dayOfWeek.includes(day.toString())),
      );
      setWorkers(filterWorkerList);
    };
    console.log("workers~~~~~~~~", workers);
    fetchWorkerList();
  }, [selectedDay]);

  return (
    <Input
      type={"select"}
      label={"담당"}
      options={workers.map((worker) => ({
        value: worker.id,
        label: worker.name,
      }))}
      name={"worker"}
      className="h-14 lg:text-lg border-b-1"
    />
  );
};

export default WorkerList;
