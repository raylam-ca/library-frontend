'use client';

import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '@/utils/api';
import TaskList from '@/components/TaskList';
import { Task } from '@/utils/api';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks.');
      }
      setLoading(false);
    };
    getTasks();
  }, []);

  const handleDelete = async (id: number) => {
    const success = await deleteTask(id);
    if (success) {
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      alert('Failed to delete the task.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <TaskList tasks={tasks} onDelete={handleDelete} />
      <button
        onClick={() => window.location.href = '/tasks/new'}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Create New Task
      </button>
    </div>
  );
};

export default TasksPage;