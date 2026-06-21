function toggleLegalNav(e) {
  if (e) e.stopPropagation();
  const sub = document.getElementById('legalSubnav');
  const chevron = document.getElementById('legalChevron');
  if (!sub) return;
  sub.classList.toggle('hidden');
  if (chevron) chevron.classList.toggle('rotate-180');
}
