// A status can only ever be one of these three exact strings.
export type TaskStatus = "todo" | "in-progress" | "done";

// Every Task must have this exact shape.
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}
let nextId = 1;

// Add a new task — always starts as "todo".
export function addTask(
  tasks: Task[],
  title: string,
  status: TaskStatus = "todo",
): Task[] {
  const newTask: Task = { id: nextId++, title, status };
  return [...tasks, newTask];
}

// Mark a task done by id.
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// Return only the tasks matching a given status.
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}
export function advanceTask(tasks: Task[], id: number): Task[] {
  const next: Record<TaskStatus, TaskStatus> = {
    todo: "in-progress",
    "in-progress": "done",
    done: "done",
  };
  return tasks.map((t) => (t.id === id ? { ...t, status: next[t.status] } : t));
}

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}
