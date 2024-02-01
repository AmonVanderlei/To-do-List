import { Task, TaskStatus, TaskPriority } from "../types/Task";
import DeleteButton from "./DeleteButton";
import ModifyButton from "./ModifyButton";
import DoneButton from "./DoneButton";

function bgColor(taskStatus: TaskStatus, taskPriority: TaskPriority): string {
  if (taskStatus === "Completed") {
    return "bg-green-600";
  }
  if (taskPriority === "Low") {
    return "bg-primary";
  } else if (taskPriority === "Medium") {
    return "bg-yellow-500";
  }
  return "bg-red-600";
}

function Task(obj: Task) {
  const color = bgColor(obj.status, obj.priority);

  const descriptionLines = obj.description.split("\n").map((line, index) => {
    return <p key={index}>{line.trim() === "" ? "\u00A0" : line} </p>;
  });
  
  return (
    <>
      <div className={`card w-full ${color} text-primary-content mt-4`}>
        <div className="card-body !px-6">
          <h2 className="card-title">{obj.title}</h2>
          <div>{descriptionLines}</div>
          <div className="card-actions justify-between">
            <p className="m-auto">
              <b>Status:</b> {obj.status}
            </p>
            <p className="m-auto">
              <b>Priority:</b> {obj.priority}
            </p>
          </div>
          <div className="card-actions justify-between">
            <div className="card-actions justify-evenly">
              <ModifyButton
                key={obj.title}
                title={obj.title}
                status={obj.status}
                priority={obj.priority}
                description={obj.description}
              />
              <DeleteButton
                key={obj.description}
                title={obj.title}
                status={obj.status}
                priority={obj.priority}
                description={obj.description}
              />
              <DoneButton
                key={obj.priority}
                title={obj.title}
                status={obj.status}
                priority={obj.priority}
                description={obj.description}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
