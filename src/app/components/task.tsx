type TaskStatus = "To-do" | "In Progress" | "Completed";
type TaskPriority = "Low" | "Medium" | "High" ;

interface Task {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  dueDate: Date;
}

function bgColor(taskStatus: TaskStatus, taskPriority: TaskPriority): string {
  if (taskStatus === "Completed") {
    return "bg-green-600";
  }
  if (taskPriority === "Low") {
    return "bg-primary";
  } else if (taskPriority === "Medium") {
    return "bg-yellow-500";
  }
  return "bg-red-600"
}

function Task(obj: Task) {
  const formatedDate = obj.dueDate.toLocaleDateString();
  const color = bgColor(obj.status, obj.priority)
  
  return (
    <>
      <div className={`card w-full ${color} text-primary-content mt-4`}>
        <div className="card-body">
          <h2 className="card-title">{obj.title}</h2>
          <p>{obj.description}</p>
          <div className="card-actions justify-between">
            <p className='m-auto'><b>Status:</b> {obj.status}</p>
            <p className='m-auto'><b>Priority:</b> {obj.priority}</p>
          </div>
          <div className="card-actions justify-between">
            <p className='m-auto m-w-1/2'><b>Due Date:</b> {formatedDate}</p>
            <div className="card-actions justify-evenly">
              <button className="btn">Modify</button>
              <button className="btn">Delete</button>
              <button className="btn">Done</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;