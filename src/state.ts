export { state };

// VEEEEEEEEEEEER

const state = {
  data: {
    tasks: [
      "Bienvenido! Podés agregar una nota, marcarla como realizada, o eliminarla.",
    ],
  },
  listeners: [],

  init() {
    const localData = JSON.parse(localStorage.getItem("saved-state"));
    this.setState(localData);
  },

  getState() {
    return this.data;
  },
  getEnabledTasks() {
    const currentState = this.getState();
    return currentState.tasks.filter((t) => !t.deleted);
  },
  addTask(id, title) {
    const currentState = this.getState();
    currentState.tasks.push({ id, title, completed: false });
    this.setState(currentState);
  },
  changeItemState(id, value) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found.completed = value;

    this.setState(currentState);
  },

  deleteTask(id) {
    const currentState = this.getState();
    const foundTask = currentState.tasks.find((t) => t.id == id);
    foundTask.deleted = true;
    this.setState(currentState);
  },
  setState(newState) {
    this.data = newState;
    for (let cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
