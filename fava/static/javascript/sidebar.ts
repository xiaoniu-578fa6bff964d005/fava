/**
 * This script updates the links and error count in the sidebar as well as
 * toggling the sidebar on mobile.
 */

import { select, fetchAPI } from "./helpers";
import { favaAPI } from "./stores";
import { number } from "./lib/validation";
import e from "./events";

function initSidebar(): void {
  document.querySelectorAll("aside a").forEach((el) => {
    el.classList.remove("selected");
    const href = el.getAttribute("href");
    if (
      !el.hasAttribute("data-remote") &&
      href?.includes(window.location.pathname)
    ) {
      el.classList.add("selected");
    }
  });
  select("aside li.error")?.classList.toggle("hidden", favaAPI.errors === 0);
  const span = select("aside li.error span");
  if (span) {
    span.innerHTML = `${favaAPI.errors}`;
  }
}

export class AsideButton extends HTMLButtonElement {
  constructor() {
    super();

    this.addEventListener("click", () => {
      select("aside")?.classList.toggle("active");
      this.classList.toggle("active");
    });
  }
}

e.on("page-loaded", () => {
  initSidebar();
});

e.on("file-modified", async () => {
  const errors = await fetchAPI("errors");
  favaAPI.errors = number(errors);
  initSidebar();
});
