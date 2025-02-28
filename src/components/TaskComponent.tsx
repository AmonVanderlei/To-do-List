import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Task } from "../types/Task";
import ModifyButton from "./ModifyButton";
import DoneButton from "./DoneButton";
import { TaskContext } from "@/contexts/taskContext";

interface Props {
  obj: Task;
  bgColor: string;
}

function TaskComponent({ obj, bgColor }: Props) {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  const { dates } = taskContext;

  const [readMore, setReadMore] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const maxHeight = 96;

  const taskDate = obj.inicialDate;
  taskDate.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > maxHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [contentRef, maxHeight, obj]);

  const style = "card w-full text-primary-content mt-4 " + bgColor;

  return (
    <div className={style}>
      <div className="card-body !px-6">
        <h2 className="card-title">{obj.title}</h2>

        <div
          ref={contentRef}
          className={clsx("whitespace-pre-wrap overflow-x-auto", {
            "overflow-y-hidden": !readMore,
          })}
          style={{ maxHeight: readMore ? "none" : `${maxHeight}px` }}
        >
          {obj.description}
        </div>

        {showButton && (
          <button
            className="font-bold underline hover:text-blue-800"
            type="button"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Ler menos" : "Ler mais"}
          </button>
        )}

        {dates ? (
          taskDate.getTime() > dates.currentDate.getTime() ||
          !obj.days.includes(dates.today) ? (
            <>
              <div className="card-actions justify-between">
                <p className="m-auto">
                  <b>Inicial Date:</b> {obj.inicialDate.toLocaleDateString()}
                </p>
              </div>
              <div className="card-actions justify-end">
                <div className="card-actions justify-evenly">
                  <ModifyButton key={obj.id} obj={obj} />
                </div>
              </div>
            </>
          ) : (
            <div className="card-actions justify-end">
              <div className="card-actions justify-evenly">
                <ModifyButton key={obj.id} obj={obj} />
                <DoneButton key={`${obj.id}${obj.title}`} obj={obj} />
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default TaskComponent;
