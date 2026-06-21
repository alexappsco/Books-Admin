function toggleActions(event) {
  event.stopPropagation();
  document.querySelectorAll(".dropdown-actions").forEach((m) => m.classList.remove("show"));
  const menu = event.currentTarget.nextElementSibling;
  if (menu) menu.classList.toggle("show");
}

window.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-actions").forEach((m) => m.classList.remove("show"));
});

function openDeleteModal() {
  const m = document.getElementById("deleteModal");
  if (!m) return;
  m.classList.remove("hidden");
  m.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeDeleteModal() {
  const m = document.getElementById("deleteModal");
  if (!m) return;
  m.classList.add("hidden");
  m.classList.remove("flex");
  document.body.style.overflow = "auto";
}

function openOfferModal() {
  const m = document.getElementById("offerModal");
  if (!m) return;
  m.classList.remove("hidden");
  m.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeOfferModal() {
  const m = document.getElementById("offerModal");
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
