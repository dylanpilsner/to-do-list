// import { state } from "../state";

// class Card extends HTMLElement {
//   shadow: ShadowRoot;
//   tagName: string;
//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });

//     this.render();
//     const style = document.createElement("style");
//     this.shadow.appendChild(style);
//     style.innerHTML = `
//     .root{
//       border-radius: 4px;
//       padding: 22px 13px;
//       background-color: #fff599;
//     }
//     `;
//   }
//   render() {
//     this.shadow.innerHTML = `
//     <div class="root">${this.innerHTML}</div>
//     `;
//   }
// }

// customElements.define("my-card", Card);
