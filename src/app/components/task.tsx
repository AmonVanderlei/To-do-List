import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const formatedDate = obj.dueDate.toLocaleDateString();
  const color = bgColor(obj.status, obj.priority)

  useEffect(() => {
    let storedTasks: string | null = localStorage.getItem('tasks');
    
    if (storedTasks != null) {
      setTasks(JSON.parse(storedTasks));
      setFilteredTasks(JSON.parse(storedTasks));
    }
  }, []);

  function deleteTask(deletedTask: Task) {
    const newTasks: Task[] = tasks.filter((task) =>
      task.title !== deletedTask.title && task.description !== deletedTask.description
    );

    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  const handleModify: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const modifiedTask: Task = JSON.parse(value);
    const formatedDate: string = modifiedTask.dueDate.toString().split('T')[0]
  
    // deleteTask(modifiedTask);
  
    const queryString = `title=${modifiedTask.title}&status=${modifiedTask.status}
    &priority=${modifiedTask.priority}&description=${modifiedTask.description}&dueDate=${formatedDate}`
  
    router.push(`/new-task?${queryString}`);
  };
  

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const deletedTask: Task = JSON.parse(value);
    
    deleteTask(deletedTask)

    window.location.reload();
  };
  
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
              <button value={JSON.stringify(obj)} className="btn" onClick={handleModify}>Modify</button>
              <button value={JSON.stringify(obj)} className="btn" onClick={handleDelete}>Delete</button>
              <button className="btn">Done</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;