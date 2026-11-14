import { addTask, advanceTask, deleteTask, filterByStatus, } from "./model.js";
let tasks = [];
let filter = "all";
const titleInput = document.getElementById("title");
const statusSelect = document.getElementById("status");
const addBtn = document.getElementById("add");
const chipsEl = document.getElementById("chips");
const listEl = document.getElementById("list");
const FILTERS = ["all", "todo", "in-progress", "done"];
function render() {
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
    if (!title)
        return;
    tasks = addTask(tasks, title, statusSelect.value);
    titleInput.value = "";
    render();
};
render();
//# sourceMappingURL=app.js.map