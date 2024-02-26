import { useState } from "react";
import clsx from "clsx";
import { Task } from "@/types/Task";

interface DaysProps {
  setFormData: React.Dispatch<React.SetStateAction<Task>>;
  days?: string[];
}

function Days({ setFormData, days }: DaysProps) {
  const [taskDays, setTaskDays] = useState<string[]>(days || []);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    const day = button.value;

    if (!taskDays.includes(day)) {
      setTaskDays([...taskDays, day]);
    } else {
      setTaskDays(taskDays.filter((day) => day !== day));
    }

    setFormData((prevData: Task) => ({
      ...prevData,
      days: taskDays.includes(day)
        ? [...prevData.days.filter((selectedDay) => selectedDay !== day)]
        : [...prevData.days, day],
    }));
  };

  return (
    <div>
      <div className="flex flex-wrap justify-evenly w-full">
        <button
          className={clsx(
            taskDays.includes("Sunday") && "!bg-slate-400 !text-gray-800",
            "btn btn-circle btn-outline !w-10 !h-10 !min-h-10"
          )}
          onClick={handleClick}
          value="Sunday"
        >
          Sun
        </button>
        <button
          className={clsx(
            taskDays.includes("Monday") && "!bg-slate-400 !text-gray-800",
            "btn btn-circle btn-outline !w-10 !h-10 !min-h-10"
          )}
          onClick={handleClick}
          value="Monday"
        >
          Mon
        </button>
        <button
          className={clsx(
            taskDays.includes("Tuesday") && "!bg-slate-400 !text-gray-800",
            "btn btn-circle btn-outline !w-10 !h-10 !min-h-10"
          )}
          onClick={handleClick}
          value="Tuesday"
        >
          Tue
        </button>
        <button
          className={clsx(
            taskDays.includes("Wednesday") && "!bg-slate-400 !text-gray-800",
            "btn btn-circle btn-outline !w-10 !h-10 !min-h-10"
          )}
          onClick={handleClick}
          value="Wednesday"
        >
          Wed
        </button>
        <button
          className={clsx(
            taskDays.includes("Thursday") && "!bg-slate-400 !text-gray-800",
            "btn btn-circle btn-outline !w-10 !h-10 !min-h-10"
          )}
          onClick={handleClick}
          value="Thursday"
        >
          Thu
        </button>
        <button
          className={clsx(
            taskDays.includes("Friday") && "!bg-slate-400 !text-gray-800",
            "btn btn-circle btn-outline !w-10 !h-10 !min-h-10"
          )}
          onClick={handleClick}
          value="Friday"
        >
          Fri
        </button>
        <button
          className={clsx(
            taskDays.includes("Saturday") && "!bg-slate-400 !text-gray-800",
            "btn btn-circle btn-outline !w-10 !h-10 !min-h-10"
          )}
          onClick={handleClick}
          value="Saturday"
        >
          Sat
        </button>
      </div>
    </div>
  );
}

export default Days;
