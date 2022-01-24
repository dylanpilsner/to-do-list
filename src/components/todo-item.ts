class Todo extends HTMLElement {
  shadow: ShadowRoot;
  title: string;
  checked: boolean = false;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.title = this.getAttribute("title") || "";
    this.checked = this.hasAttribute("checked");
    this.id = this.getAttribute("id");
    this.render();
  }

  addCallbacks() {
    const chEl = this.shadow.querySelector(".checkbox-input");
    chEl.addEventListener("click", (e) => {
      const target = e.target as any;

      const event = new CustomEvent("change", {
        detail: {
          id: this.id,
          value: target.checked,
        },
      });
      this.dispatchEvent(event);
    });

    const card = this.shadow.querySelector(".root");
    card.addEventListener("click", (e) => {
      const target = e.target as any;
      target.classList.toggle("open");
      target.classList.toggle("closed");
      const clases = target.getAttribute("class");
      const remove: any = this.shadow.querySelector(".bi");
      if (clases == "root open") {
        remove.style.display = "initial";
        target.style.border = "solid 2px";
      } else if (clases == "root closed") {
        remove.style.display = "none";
        target.style.border = "none";
      }
    });

    const trashEl = this.shadow.querySelector(".bi");

    trashEl.addEventListener("click", () => {
      const deleteEvent = new CustomEvent("delete", {
        detail: {
          id: this.id,
        },
      });

      this.dispatchEvent(deleteEvent);
    });
  }

  render() {
    this.shadow.innerHTML = `
    <div class="root closed">
    <h4 class='${this.checked ? "checked" : ""}'>${this.title}</h4>
    <div class="makers">
      <input class="checkbox-input" type="checkbox" ${
        this.checked ? "checked" : ""
      } />
      <img class="bi" src="https://lio-n.github.io/dwf-m5-noteApp/trash-icon.afb2ef45.svg" alt="foto">
    </div>
  </div>
    `;

    const style = document.createElement("style");

    style.innerHTML = `
    *{
      box-sizing: border-box; 
    }

    .makers{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-between;
    }

    .bi{
      margin-bottom:15px;
      display:none;
      height:25px;
      width:25px;
    }

    h4{
      height:20px
    }

    .root{
      display:flex;
      justify-content:space-between;
      font-size:18px;
      border-radius: 4px;
      padding: 0px 13px;
      background-color: #fff599;
      height:112px;
      width:100%;
      max-width:312px;
    }
    .checkbox-input{
      margin-top:20px;
      height:20px;
      width:20px;
    }

    h4.checked{
      text-decoration: line-through;
    }
    `;
    this.shadow.appendChild(style);
    this.addCallbacks();
  }
}
customElements.define("todo-item", Todo);
