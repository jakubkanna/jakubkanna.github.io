import "./style.css";

const PROJECT_TOPIC = "odinproject";
const USER = "jakubkanna";

class DataFetcher {
  async fetchData() {
    try {
      const apiUrl = `https://api.github.com/users/${USER}/repos`;
      const response = await fetch(apiUrl);
      const repos = await response.json();
      const filteredRepos = repos.filter((repo) =>
        repo.topics.includes(PROJECT_TOPIC)
      );
      return filteredRepos;
    } catch (error) {
      console.error("Error fetching user repos:", error);
      // Provide user feedback if needed
      throw new Error("Failed to fetch user repos. Please try again later.");
    }
  }
}

class OdinProjectViewerController {
  constructor() {
    this.dataFetcher = new DataFetcher();
  }

  async init() {
    try {
      // Fetch the data
      this.data = await this.dataFetcher.fetchData();

      // Renderer
      this.renderer = new Renderer(this.data);

      // Initialize the project container
      this.renderer.initializeProjectContainer();
      this.renderer.renderSelectedItem();
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }
}

class Renderer {
  constructor(data) {
    this._currentIndex = 0;
    this.data = data;
    this.containerID = "odin-project-inner";
    this.helper = new RendererHelper();
  }

  set currentIndex(index) {
    if (index < 0 || index > this.data.length - 1) {
      this._currentIndex = 0;
    } else if (index < 0) {
      this._currentIndex = this.data.length - 1;
    } else {
      this._currentIndex = parseInt(index);
    }
  }

  get currentIndex() {
    return this._currentIndex;
  }

  initializeProjectContainer() {
    const odinProjectContainer = document.createElement("div");
    odinProjectContainer.id = "odin-project";

    const innerContainer = document.createElement("div");
    innerContainer.id = this.containerID;

    const prevButton = this.helper.createButton("Previous", () => {
      this.currentIndex--;
      this.renderSelectedItem();
    });

    const nextButton = this.helper.createButton("Next", () => {
      this.currentIndex++;
      this.renderSelectedItem();
    });

    odinProjectContainer.appendChild(innerContainer);
    odinProjectContainer.appendChild(prevButton);
    odinProjectContainer.appendChild(nextButton);

    document.body.appendChild(odinProjectContainer);
  }

  renderSelectedItem() {
    const { homepage, description } = this.data[this.currentIndex] || {};
    const innerContainer = document.getElementById(this.containerID);
    const projectElement = this.helper.createProjectElement(
      homepage,
      description
    );

    innerContainer.innerHTML = "";
    innerContainer.appendChild(projectElement);
  }
}

class RendererHelper {
  createProjectElement(homepage, description) {
    const projectElement = document.createElement("div");
    const contentContainer = this.createContentContainer(homepage);
    const descriptionElement = this.createDescriptionElement(description);

    projectElement.appendChild(contentContainer);
    projectElement.appendChild(descriptionElement);

    return projectElement;
  }

  createContentContainer(homepage) {
    const contentContainer = document.createElement("div");
    contentContainer.id = "content";
    if (homepage) {
      const iframeElement = this.createIframeElement(homepage);
      contentContainer.appendChild(iframeElement);
    } else {
      const noHomepageElement = this.createNoHomepageElement();
      contentContainer.appendChild(noHomepageElement);
    }

    return contentContainer;
  }

  createIframeElement(src) {
    const iframeElement = document.createElement("iframe");
    iframeElement.src = src;
    return iframeElement;
  }

  createNoHomepageElement() {
    const noHomepageElement = document.createElement("p");
    noHomepageElement.textContent =
      "This project has no homepage. Visit its GitHub page for details.";
    return noHomepageElement;
  }

  createDescriptionElement(description) {
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    return descriptionElement;
  }

  createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }
}

const odinProjectViewerController = new OdinProjectViewerController();
odinProjectViewerController.init();
