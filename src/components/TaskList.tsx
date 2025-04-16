import React from 'react';
import { Task, deleteTask } from '../utils/api';
import { useRouter } from 'next/navigation';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Completed</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-4 py-2 border-b">{task.id}</td>
              <td className="px-4 py-2 border-b">{task.title}</td>
              <td className="px-4 py-2 border-b">{task.description}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    task.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Not Completed'}
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  className="text-blue-500"
                  onClick={() => router.push(`/tasks/edit/${task.id}`)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 text-red-500"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;