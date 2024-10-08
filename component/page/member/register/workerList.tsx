"use client";
import React, { useEffect, useState } from "react";
import db from "../../../../libs/server/db";
import Input from "../../../input";
import getSession from "../../../../libs/client/session";
import { getWorkerList } from "../../../../app/(tabBar)/worker/register/api";
import { cls } from "../../../../libs/client/utils";

interface WorkerListProps {
  selectedDay?: number[];
  selectedWorker?: number;
  isOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setInitValue?: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
  className?: string;
  errorMessage?: string[] | string;
}

const WorkerList: React.FC<WorkerListProps> = ({
  selectedDay,
  selectedWorker,
  isOnly = false,
  onChange,
  setInitValue,
  className,
  errorMessage,
}) => {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      const firstWorkerName = filterWorkerList[0]?.name;
      setInitValue &&
        setInitValue({ id: firstWorkerId, name: firstWorkerName });
      setWorkers(filterWorkerList);
      setLoading(false);
    };

    fetchWorkerList();
  }, [selectedDay]);

  return (
    <>
      {!loading ? (
        isOnly && onChange ? (
          <select
            onChange={onChange}
            defaultValue={selectedWorker}
            className="rounded-xl border-0 h-14 px-6 bg-stone-100 w-full xl:w-fit outline-none"
          >
            {workers.map((worker) => (
              <option key={`workerList_option_${worker.id}`} value={worker.id}>
                {worker.name}
              </option>
            ))}
          </select>
        ) : (
          <Input
            isLong={true}
            type={"select"}
            label={"담당"}
            value={selectedWorker + ""}
            options={workers.map((worker) => ({
              value: worker.id,
              label: worker.name,
            }))}
            name={"worker"}
            className={cls(
              "h-16 xl:text-lg border-b-0 xl:border-b",
              className || "",
            )}
            errorMessage={errorMessage}
          />
        )
      ) : (
        <div className="h-16 skeleton w-52 rounded-lg" />
      )}
    </>
  );
};

export default WorkerList;
