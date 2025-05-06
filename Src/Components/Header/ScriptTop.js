/* Dropdown Profile and Themes */
function toggleMenu() {}
const userDropdown = document.querySelector('#userDropdown'); // Container
const userDropdownBtn = document.querySelector('#userDropdownBtn'); // Button

userDropdownBtn.addEventListener('click', () => {
  userDropdownBtn.classList.toggle('activeDrop');
  userDropdown.classList.toggle('activeDrop');
});
document.addEventListener('click', (event) => {
  const isClickInsideuserDropdown = userDropdown.contains(event.target);
  const isClickOnuserDropdownBtn = userDropdownBtn.contains(event.target);

  if (!isClickInsideuserDropdown && !isClickOnuserDropdownBtn) {
    userDropdown.classList.remove('activeDrop');
    userDropdownBtn.classList.remove('activeDrop');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const userDropdownBtn = document.getElementById('userDropdownBtn');
  const userDropdown = document.getElementById('userDropdown');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeOptions = document.getElementById('themeOptions');

  if (userDropdownBtn && userDropdown) {
    document.addEventListener('click', () => {
      userDropdown.classList.add('hiddenTheme');
      themeOptions.classList.add('hiddenTheme');
    });

    if (themeToggleBtn && themeOptions) {
      themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeOptions.classList.toggle('hiddenTheme');
      });
    }
  }
});
/* Inbox Box */
document.addEventListener('DOMContentLoaded', () => {
  const inboxDetail = document.getElementById('inboxDetail');
  const detailTitle = document.getElementById('detailTitle');
  const detailContent = document.getElementById('detailContent');
  const detailDate = document.getElementById('detailDate');
  const closeDetail = document.getElementById('closeDetail');
  const articles = document.querySelectorAll('article.Mail');

  if (
    !inboxDetail ||
    !detailTitle ||
    !detailContent ||
    !detailDate ||
    !closeDetail
  ) {
    console.warn('❌ Algum elemento do Inbox não foi encontrado no DOM.');
    return;
  }
  const dataMap = {
    1: {
      title: '✉️ Notícia!',
      content:
        'Nova atualização está disponível, vem conferir! <li>Novo Inbox no header!</li><li>Novos links na sidebar!</li>',
      date: '01/05/2025',
    },
    2: {
      title: '🔥 Novidade!',
      content: 'Solo Leveling disponível, vem conferir!',
      date: '01/01/2025',
    },
    3: {
      title: '🔥 Novidade!',
      content: 'Solo Leveling: Ragnarok disponível, vem conferir!',
      date: '01/07/2026',
    },
  };

  articles.forEach((article) => {
    article.addEventListener('click', () => {
      const id = article.getAttribute('data-id');
      const data = dataMap[id];

      if (data) {
        detailTitle.textContent = data.title;
        detailContent.textContent = data.content;
        detailDate.textContent = data.date || ''; // Garante que não quebre
        inboxDetail.classList.remove('hidden'); // Certifique-se que tenha .hidden no CSS
      } else {
        console.warn(`🔎 Nenhum dado encontrado para data-id: ${id}`);
      }
    });
  });

  closeDetail.addEventListener('click', () => {
    inboxDetail.classList.add('hidden');
  });
});
