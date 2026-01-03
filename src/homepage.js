export default function () {
  const body = document.querySelector("body");
  const title = document.createElement("h1");
  title.innerText = "Todo List";
  body.appendChild(title);
}
