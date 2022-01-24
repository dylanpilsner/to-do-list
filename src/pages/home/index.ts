import { state } from "../../state";

export function initHomePage(containerEl: Element) {
  const div = document.createElement("div");
  const tasks = state.getEnabledTasks();

  div.innerHTML = `
  <custom-header></custom-header>
  <div class="main-container">
  <h1 class="title">Mis pendientes</h1>
  <form class="my-form">
  <label class="label">
  <div class="label-input">
  <div class="label-data">Nuevo pendiente</div>
  <input class="task-input" type"text" name="task" />
  </div>
  <button class="add-button">Agregar</button>
  </label>
  </form>
  <ul class="lista">
  </ul>
  </div>
  `;

  const listaEl = div.querySelector(".lista");

  function createTasks(tasks) {
    listaEl.innerHTML = "";
    for (const t of tasks) {
      const todoItemEl = document.createElement("todo-item");
      todoItemEl.setAttribute("title", t.title);
      todoItemEl.setAttribute("id", t.id);
      if (t.completed) {
        todoItemEl.setAttribute("checked", "true");
      }

      todoItemEl.addEventListener("delete", (e: any) => {
        state.deleteTask(e.detail.id);
      });
      todoItemEl.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });
      listaEl.appendChild(todoItemEl);
    }
  }

  state.subscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

  div.querySelector(".my-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target as any;
    state.addTask(Math.random(), form.task.value);
    form.task.value = "";
  });

  containerEl.appendChild(div);
}
