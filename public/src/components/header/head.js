document.addEventListener('DOMContentLoaded', () => {
  const avatarBtn = document.getElementById('avatarDrop');
  const dropdown = document.getElementById('avatarDropdown');

  // Fecha dropdown se clicar fora
  document.addEventListener('click', (e) => {
    if (!avatarBtn.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Toggle dropdown
  avatarBtn.addEventListener('click', () => {
    const isOpen = dropdown.classList.contains('show');
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  function openDropdown() {
    dropdown.classList.add('show');
    avatarBtn.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
  }

  function closeDropdown() {
    dropdown.classList.remove('show');
    avatarBtn.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
  }
});
