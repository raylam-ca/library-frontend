import React from 'react';
import TaskForm from '@/components/TaskForm';

const NewTaskPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Create New Task</h1>
      <TaskForm />
    </div>
  );
};

export default NewTaskPage;