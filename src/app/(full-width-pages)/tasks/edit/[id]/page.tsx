'use client';

import React, { useEffect, useState } from 'react';
import { fetchTaskById, updateTask } from '@/utils/api';
import { Task } from '@/utils/api';
import { useRouter, useParams } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

const EditTaskPage: React.FC = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getTask = async () => {
      if (id) {
        const taskData = await fetchTaskById(Number(id)); // Fetch the task details by ID
        if (taskData) {
          setTask(taskData);
        } else {
          alert('Task not found');
        }
      }
      setLoading(false);
    };

    getTask();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!task) return <div>Task not found.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <TaskForm task={task} />
    </div>
  );
};

export default EditTaskPage;