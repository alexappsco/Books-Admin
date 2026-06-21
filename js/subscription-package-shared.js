function toggleActions(event) {
  event.stopPropagation();
  document.querySelectorAll(".dropdown-actions").forEach((m) => m.classList.remove("show"));
  const menu = event.currentTarget.nextElementSibling;
  if (menu) menu.classList.toggle("show");
}

window.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-actions").forEach((m) => m.classList.remove("show"));
});

function switchPackageStep(stepId) {
  document.querySelectorAll("[data-package-step]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== stepId);
  });
  document.querySelectorAll("[data-package-step-dot]").forEach((dot) => {
    dot.classList.toggle("bg-[#886CE8]", dot.dataset.packageStepDot === stepId);
    dot.classList.toggle("bg-gray-200", dot.dataset.packageStepDot !== stepId);
  });
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
