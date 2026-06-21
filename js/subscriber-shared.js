function toggleActions(event) {
  event.stopPropagation();
  document.querySelectorAll(".dropdown-actions").forEach((m) => m.classList.remove("show"));
  const menu = event.currentTarget.nextElementSibling;
  if (menu) menu.classList.toggle("show");
}

window.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-actions").forEach((m) => m.classList.remove("show"));
});

function switchSubscriberTab(tabId) {
  document.querySelectorAll("[data-subscriber-tab]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== tabId);
  });
  document.querySelectorAll("[data-subscriber-tab-btn]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.subscriberTabBtn === tabId);
  });
}

function openNotesPanel() {
  const panel = document.getElementById("notesPanel");
  const overlay = document.getElementById("notesOverlay");
  if (!panel || !overlay) return;
  panel.classList.remove("-translate-x-full");
  panel.classList.add("translate-x-0");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeNotesPanel() {
  const panel = document.getElementById("notesPanel");
  const overlay = document.getElementById("notesOverlay");
  if (!panel || !overlay) return;
  panel.classList.add("-translate-x-full");
  panel.classList.remove("translate-x-0");
  overlay.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function openBlockModal() {
  const m = document.getElementById("blockModal");
  if (!m) return;
  m.classList.remove("hidden");
  m.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeBlockModal() {
  const m = document.getElementById("blockModal");
  if (!m) return;
  m.classList.add("hidden");
  m.classList.remove("flex");
  document.body.style.overflow = "auto";
}

function openLogoutModal() {
  const m = document.getElementById("logoutModal");
  if (!m) return;
  m.classList.remove("hidden");
  m.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeLogoutModal() {
  const m = document.getElementById("logoutModal");
  if (!m) return;
  m.classList.add("hidden");
  m.classList.remove("flex");
  document.body.style.overflow = "auto";
}
