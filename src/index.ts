import "./components/card";
import "./components/text";
import "./components/todo-item";
import "./components/header";
import { initHomePage } from "./pages/home";
import { state } from "./state";
(function () {
  const root = document.querySelector(".root");
  state.init();
  initHomePage(root);
})();
