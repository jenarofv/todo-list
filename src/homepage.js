export default function () {
  const body = document.querySelector("body");
  const title = document.createElement("h1");
  const main = document.createElement("main");
  // const addBtn = document.createElement("button");
  // addBtn.id = "add-todo";
  // addBtn.textContent = "+";
  main.classList.add("container");
  title.innerText = "Todo List";
  body.appendChild(title);
  body.appendChild(main);
  // body.appendChild(addBtn);
}
