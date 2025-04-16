'use client';

import React, { useEffect, useState } from 'react';
import { fetchTaskById, updateTask } from '@/utils/api';
import { Task } from '@/utils/api';
import { useRouter } from 'next/navigation';

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

const EditTaskPage: React.FC<EditTaskPageProps> = ({ params }) => {
  const { id } = React.use(params); // Get the ID from the URL params
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const router = useRouter();

  useEffect(() => {
    const getTask = async () => {
      setLoading(true);
      const taskData = await fetchTaskById(Number(id)); // Fetch the task details by ID
      if (taskData) {
        setTask(taskData);
        setFormData({
          title: taskData.title,
          description: taskData.description,
          completed: taskData.completed,
        });
      } else {
        alert('Task not found');
      }
      setLoading(false);
    };

    if (id) {
      getTask();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission (update task)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = await updateTask(Number(id), formData);  // Update the task with the new form data
    if (updatedTask) {
      router.push('/tasks'); // Redirect to the tasks list after successful update
    } else {
      alert('Error updating task');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!task) return <div>Task not found.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="completed" className="block text-gray-700">Completed</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleInputChange}
            className="p-2"
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskPage;