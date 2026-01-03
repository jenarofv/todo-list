import diceImage from "./dice1.jpg";
import "./style.css";
import Todo from "./todo.js";
import Projects from "./projects.js";

const image = document.createElement("img");
image.src = diceImage;
image.width = "200";

document.body.appendChild(image);
