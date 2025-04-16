'use client';

import React, { useState } from 'react';
import { createTask, updateTask } from '../utils/api';
import { useRouter } from 'next/navigation';

interface TaskFormProps {
  task?: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  const [title, setTitle] = useState<string>(task?.title || '');
  const [description, setDescription] = useState<string>(task?.description || '');
  const [completed, setCompleted] = useState<boolean>(task?.completed || false); // Default to false (boolean)
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      completed,
    };

    // Call createTask or updateTask depending on whether task is passed in or not
    if (task) {
      await updateTask(task.id, taskData);
    } else {
      await createTask(taskData);
    }

    // Redirect to tasks page after creating/updating task
    router.push('/tasks');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="completed" className="block text-gray-700">Completed</label>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="p-2"
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;