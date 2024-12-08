// Imports
import { loadStory } from "./story.js";

// Global variables
let currentNode = null;

window.addEventListener("load", init);

async function init() {
  currentNode = await loadStory();
  if (currentNode) {
    displayNode(currentNode);
  } else {
    document.querySelector(".question").textContent = "Error loading story!";
  }
}

function displayNode(node) {
  // Update title
  document.querySelector(".title").textContent = node.title;

  // Clear existing content
  const container = document.querySelector(".container");
  container.innerHTML = "";

  // Add description
  const description = document.createElement("p");
  description.textContent = node.description;
  description.classList.add("question");
  container.appendChild(description);

  // Add dialogue if it exists
  if (node.dialogue && node.dialogue.length > 0) {
    const dialogueContainer = document.createElement("div");
    dialogueContainer.classList.add("dialogue");

    node.dialogue.forEach((line) => {
      const dialogueLine = document.createElement("p");
      dialogueLine.innerHTML = `<strong>${line.speaker}:</strong> ${line.text}`;
      dialogueContainer.appendChild(dialogueLine);
    });

    container.appendChild(dialogueContainer);
  }

  // Add choices
  const optionsContainer = document.createElement("div");
  optionsContainer.id = "options";

  node.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.name;
    button.classList.add("option");
    button.addEventListener("click", () => {
      if (choice.node) {
        displayNode(choice.node);
      }
    });
    optionsContainer.appendChild(button);
  });

  container.appendChild(optionsContainer);
}
