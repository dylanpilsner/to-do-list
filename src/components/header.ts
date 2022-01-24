class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    const style = document.createElement("style");
    style.innerHTML = `
.header{
  width:100%;
  height:60px;
  background-color:#FF8282;
  font-size:22px;
  font-weight:500;
  display:flex;
  justify-content:center;
  align-items:center;
}
`;

    div.innerHTML = `
      <div class="header"></div>
      `;

    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}
customElements.define("custom-header", Header);
