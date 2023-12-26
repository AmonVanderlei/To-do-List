'use client'

import Link from 'next/link'
import Task from '@/app/components/task'

export default function Home() {
  let storedTasks: string | null = localStorage.getItem('tasks')
  let tasks: Task[] = [] 

  if (storedTasks != null) {
    tasks = JSON.parse(storedTasks);
  }

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <div className="flex flex-col	w-full">
        <div className='flex justify-between flex-wrap'>
          <h1 className='text-3xl'>Tasks</h1>
          <Link className="btn btn-ghost" href="/new-task">
            <svg className="white-svg" width="24" height="24" 
              xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                <path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/>
            </svg>
            Create new task
          </Link>
        </div>
        <div className='w-full pt-4 px-4'>
        {tasks.map((task) => (
          <Task 
            key={task.description}
            title={task.title} 
            status={task.status} 
            priority={task.priority}
            description={task.description}
            dueDate={new Date(task.dueDate+"T04:00:00")}
          />
        ))}
        </div>
      </div>
    </main>
  )
}
