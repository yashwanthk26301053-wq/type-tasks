import {
  type Task,
  type TaskStatus,
  addTask,
  advanceTask,
  deleteTask,
  filterByStatus,
} from "./model.js";

let tasks: Task[] = [];
let filter: "all" | TaskStatus = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const statusSelect = document.getElementById("status") as HTMLSelectElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const chipsEl = document.getElementById("chips") as HTMLDivElement;
const listEl = document.getElementById("list") as HTMLUListElement;

const FILTERS: ("all" | TaskStatus)[] = ["all", "todo", "in-progress", "done"];

function render(): void {
  // chips
  chipsEl.innerHTML = "";
  for (const f of FILTERS) {
    const chip = document.createElement("button");
    chip.textContent = f;
    chip.className = f === filter ? "chip active" : "chip";
    chip.onclick = () => {
      filter = f;
      render();
    };
    chipsEl.appendChild(chip);
  }

  // list
  const visible = filter === "all" ? tasks : filterByStatus(tasks, filter);
  listEl.innerHTML = "";
  for (const t of visible) {
    const li = document.createElement("li");
    li.className = "task";

    const label = document.createElement("span");
    label.textContent = `${t.title} [${t.status}]`; // textContent, not innerHTML

    const advance = document.createElement("button");
    advance.textContent = "advance →";
    advance.onclick = () => {
      tasks = advanceTask(tasks, t.id);
      render();
    };

    const del = document.createElement("button");
    del.textContent = "✕";
    del.onclick = () => {
      tasks = deleteTask(tasks, t.id);
      render();
    };

    li.append(label, advance, del);
    listEl.appendChild(li);
  }
}

addBtn.onclick = () => {
  const title = titleInput.value.trim();
  if (!title) return;
  tasks = addTask(tasks, title, statusSelect.value as TaskStatus);
  titleInput.value = "";
  render();
};

render();
