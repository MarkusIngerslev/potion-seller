export class StoryNode {
  constructor(id, title, description, dialogue = [], choices = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dialogue = dialogue;
    this.choices = choices;
  }
}

export async function loadStory() {
  try {
    const response = await fetch("./data/story.json");
    const data = await response.json();

    // Create a map to store all nodes
    const nodeMap = new Map();

    // First pass: Create all nodes
    data.nodes.forEach((nodeData) => {
      const node = new StoryNode(
        nodeData.id,
        nodeData.title,
        nodeData.description,
        nodeData.dialogue || [],
        nodeData.choices.map((choice) => ({
          name: choice.name,
          node: null,
        }))
      );
      nodeMap.set(nodeData.id, node);
    });

    // Second pass: Link the nodes
    data.nodes.forEach((nodeData) => {
      const node = nodeMap.get(nodeData.id);
      nodeData.choices.forEach((choice, index) => {
        node.choices[index].node = nodeMap.get(choice.nodeId);
      });
    });

    return nodeMap.get("start");
  } catch (error) {
    console.error("Error loading story:", error);
    return null;
  }
}
