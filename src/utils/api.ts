export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/`);
  const responseData = await res.json();
  
  const taskList = Array.isArray(responseData.data) ? responseData.data : [];

  return taskList;
};

export const fetchTaskById = async (id: number): Promise<Task | null> => {
  const res = await fetch(`${BACKEND_URL}/tasks/${id}`);
  
  if (res.ok) {
    const responseData = await res.json();
    return responseData.data;
  } else {
    return null;
  }
};

export const createTask = async (
  taskData: { title: string; description: string; completed: boolean }
): Promise<Task> => {
  const res = await fetch(`${BACKEND_URL}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  const responseData = await res.json();
  return responseData.data;
};

export const updateTask = async (
  id: number,
  taskData: { title: string; description: string; completed: boolean }
): Promise<Task> => {
  const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  const responseData = await res.json();
  return responseData.data;
};

export const deleteTask = async (id: number): Promise<boolean> => {
  const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  const responseData = await res.json();
  console.log("responseData",responseData);
  return responseData.data;
};