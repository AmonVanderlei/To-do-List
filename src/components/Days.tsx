import { useEffect, useState } from "react";
import clsx from "clsx";
import { Task } from "@/types/Task";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface DaysProps {
  setFormData: React.Dispatch<React.SetStateAction<Task>>;
  days?: string[];
}

function Days({ setFormData, days }: DaysProps) {
  const [taskDays, setTaskDays] = useState<string[]>(
    days !== undefined ? days : []
  );
  const [allChecked, setAllChecked] = useState<boolean>(false);

  // When the formData days change, change the days in the state
  useEffect(() => {
    if (days !== undefined) {
      setTaskDays(days);
    }
  }, [days]);

  // Control the AllChecked state
  useEffect(() => {
    if (taskDays.length < 7) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
  }, [taskDays]);

  // Add/Remove day when clicked
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    const day = button.value;

    if (!taskDays.includes(day)) {
      setTaskDays([...taskDays, day]);
    } else {
      setTaskDays(taskDays.filter((dayToFilter) => dayToFilter !== day));
    }

    setFormData((prevData: Task) => ({
      ...prevData,
      days: taskDays.includes(day)
        ? [...prevData.days.filter((selectedDay) => selectedDay !== day)]
        : [...prevData.days, day],
    }));
  };

  // Add/Remove all days
  const handleMarkAll: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (allChecked) {
      setTaskDays([]);

      setFormData((prevData: Task) => ({
        ...prevData,
        days: [],
      }));

      setAllChecked(false);
    } else {
      setTaskDays([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);

      setFormData((prevData: Task) => ({
        ...prevData,
        days: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      }));

      setAllChecked(true);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-evenly w-full">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={clsx(
              taskDays.includes(day) && "!bg-slate-400 !text-gray-800",
              "btn btn-circle !w-10 !h-10 !min-h-10"
            )}
            onClick={handleClick}
            value={day}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      <button className="text-gray-400 underline" onClick={handleMarkAll}>
        {allChecked ? "Remove all" : "Check all"}
      </button>
    </div>
  );
}

export default Days;
