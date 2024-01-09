class WorkSection {
  constructor() {
    this.projectName = "Project name";
    this.projectLink = "#";
    this.projectDescription =
      "Short description of the project. Just a couple sentences will do.";
    this.main = document.querySelector("main");
    this.main.append(this.createSection());
  }

  createSection() {
    const section = document.createElement("section");

    const workDiv = document.createElement("div");
    workDiv.classList.add("work");

    const miniatureDiv = document.createElement("div");
    miniatureDiv.classList.add("miniature");
    miniatureDiv.textContent = "screenshot of project";

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");

    const h3 = document.createElement("h3");
    h3.textContent = this.projectName;

    const githubIcon = document.createElement("i");
    githubIcon.classList.add("devicon-github-original");

    const p = document.createElement("p");
    p.textContent = this.projectDescription;

    descriptionDiv.appendChild(h3);
    descriptionDiv.appendChild(githubIcon);
    descriptionDiv.appendChild(p);

    workDiv.appendChild(miniatureDiv);
    workDiv.appendChild(descriptionDiv);

    section.appendChild(workDiv);

    return section;
  }
}

// Create an array of instances using a loop
const sections = [];

for (let i = 0; i < 4; i++) {
  sections.push(new WorkSection());
}
