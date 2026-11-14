let nextId = 1;
// Add a new task — always starts as "todo".
export function addTask(tasks, title, status = "todo") {
    const newTask = { id: nextId++, title, status };
    return [...tasks, newTask];
}
// Mark a task done by id.
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// Return only the tasks matching a given status.
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
export function advanceTask(tasks, id) {
    const next = {
        todo: "in-progress",
        "in-progress": "done",
        done: "done",
    };
    return tasks.map((t) => (t.id === id ? { ...t, status: next[t.status] } : t));
}
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
//# sourceMappingURL=model.js.map