import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor() {
    this.initChatPanel();
  }

  private loadScript(FILE_URL, async = true, type = "text/javascript") {
    return new Promise((resolve, reject) => {
      try {
        const scriptEle = document.createElement("script");
        scriptEle.type = type;
        scriptEle.async = async;
        scriptEle.src = FILE_URL;

        scriptEle.addEventListener("load", (ev) => {
          resolve({ status: true });
        });

        scriptEle.addEventListener("error", (ev) => {
          reject({
            status: false,
            message: `Failed to load the script ${FILE_URL}`,
          });
        });

        document.body.appendChild(scriptEle);
      } catch (error) {
        reject(error);
      }
    });
  }

  private loadStyle(FILE_URL) {
    return new Promise((resolve, reject) => {
      try {
        const linkEle = document.createElement("link");
        linkEle.href = FILE_URL;
        linkEle.rel = "stylesheet";
        linkEle.type = "text/css";
        linkEle.media = "all";
        linkEle.addEventListener("load", (ev) => {
          resolve({ status: true });
        });

        linkEle.addEventListener("error", (ev) => {
          reject({
            status: false,
            message: `Failed to load the style ${FILE_URL}`,
          });
        });

        document.body.appendChild(linkEle);
      } catch (error) {
        reject(error);
      }
    });
  }

  async initChatPanel() {
    const chatServerUrl = `http://localhost:3000`;
    try {
      await this.loadScript(`${chatServerUrl}/chat-panel.js`);
      const chatPanelContainer = document.createElement("div");
      chatPanelContainer.id = "chat-panel-container";
      const activateChatPanelFab = document.createElement("button");
      activateChatPanelFab.id = "activate-chat-panel-fab";
      const chatPanelElement = document.createElement("chat-panel");
      chatPanelElement.setAttribute("chat-server-url", `${chatServerUrl}`);
      chatPanelContainer.appendChild(chatPanelElement);
      document.body.appendChild(activateChatPanelFab);
      document.body.appendChild(chatPanelContainer);
      activateChatPanelFab.addEventListener("click", () => {
        chatPanelContainer.classList.toggle("active");
      });
      chatPanelElement.addEventListener("minimize", () => {
        chatPanelContainer.classList.toggle("active");
      });
      chatPanelElement.addEventListener("active-chat", () => {
        activateChatPanelFab.classList.add("active");
      });
      chatPanelElement.addEventListener("in-active-chat", () => {
        activateChatPanelFab.classList.remove("active");
      });
    } catch (error) {
      console.error(error);
    }
  }
}
