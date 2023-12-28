'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link'

type TaskStatus = "To-do" | "In Progress" | "Completed";
type TaskPriority = "Low" | "Medium" | "High" ;

interface Task {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  dueDate: string;
}

const MyForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const title: string | null = searchParams.get('title')
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  const description: string | null = searchParams.get('description')
  const dueDate: string | null = searchParams.get('dueDate')

  const [errorClass, setErrorClass] = useState("!hidden");
  const [formData, setFormData] = useState<Task>({
    title: title !== null ? title : "",
    status: status !== null ? status as TaskStatus: "To-do",
    priority: priority !== null ? priority as TaskPriority: "Low",
    description: description !== null ? description : "",
    dueDate: dueDate !== null ? dueDate : "",
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorClass("!hidden");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [errorClass]);

  function isValidDateFormat(dateString: string): boolean {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!dateFormatRegex.test(dateString)) {
      return false;
    }
  
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    return inputDate >= currentDate;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidDateFormat(formData.dueDate)) {
      setErrorClass("");
      return
    }

    let storedTasks = localStorage.getItem('tasks')

    if (storedTasks != null) {
      let tasks = JSON.parse(storedTasks);
      tasks.push(formData)
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.setItem('tasks', JSON.stringify([formData]));
    }

    router.push('/')
  };

  return (
    <>
      <form className='flex items-center flex-col' onSubmit={handleSubmit}>
        <label className='flex flex-col w-4/5'>
          <div className='label'>
            <span className='label-text'>Title</span>
          </div>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            placeholder="Type here" 
            className="input input-bordered w-full"
            onChange={handleChange} 
          />
        </label>

        <label className="form-control w-4/5">
          <div className="label">
            <span className="label-text">Status</span>
          </div>
          <select 
            name="status" 
            value={formData.status} 
            className="select select-bordered"
            onChange={handleChange}
          >
            <option value="To-do">To-do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label className="form-control w-4/5">
          <div className="label">
            <span className="label-text">Priority</span>
          </div>
          <select 
            name="priority" 
            value={formData.priority} 
            className="select select-bordered"
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className='flex flex-col w-4/5'>
          <div className='label'>
            <span className='label-text'>Description</span>
          </div>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            placeholder="Type here" 
            className="input input-bordered w-full h-8"
            onChange={handleChange} 
          />
        </label>

        <label className='flex flex-col w-4/5'>
          <div className='label'>
            <span className='label-text'>Due Date</span>
          </div>
          <input 
            type="text" 
            name="dueDate" 
            value={formData.dueDate} 
            placeholder="YYYY-MM-DD" 
            className="input input-bordered w-full"
            onChange={handleChange} 
          />
        </label>

        <button type='submit' className="btn btn-outline mt-8 w-4/5">Submit</button>
        <Link className="btn btn-outline btn-error mt-2 w-4/5" href="/">Cancel</Link>
      </form>

      <div role="alert" className={`alert alert-error absolute top-10 ${errorClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! Date should be in the YYYY-MM-DD format and must be at least tomorrow.</span>
      </div>
    </>
  );
};

export default MyForm;