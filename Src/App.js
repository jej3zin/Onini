// ===== PRELOADER =====
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      if (!$('.main_header').hasClass('fixed')) {
        $('.main_header').stop().addClass('fixed').css('top', '-100px').animate(
          {
            top: '0px',
          },
          500
        );
      }
    } else {
      $('.main_header').removeClass('fixed');
    }
  });
});
$(window).load(function () {
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({ overflow: 'visible' });
});
/* Nav Sidebar */
function toggleMenu() {}
const navbar = document.querySelector('.sidebar'); // Container
const toggle = document.querySelector('#toggleMenu'); // Button

toggle.addEventListener('click', () => {
  toggle.classList.toggle('activeMenu');
  navbar.classList.toggle('activeMenu');
});
document.addEventListener('click', (event) => {
  const isClickInsideNavbar = navbar.contains(event.target);
  const isClickOnToggle = toggle.contains(event.target);

  if (!isClickInsideNavbar && !isClickOnToggle) {
    navbar.classList.remove('activeMenu');
    toggle.classList.remove('activeMenu');
  }
});

/* Header Dropdown */
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
/* Tabs profile */
function showTab(tab) {
  const tabs = ['feed', 'favoritos', 'amigos', 'level'];
  tabs.forEach((t) => {
    document.getElementById(`${t}Tab`).classList.add('hidden');
  });
  document.getElementById(`${tab}Tab`).classList.remove('hidden');
  document
    .querySelectorAll('button')
    .forEach((btn) => btn.classList.remove('tab-active'));
  event.target.classList.add('tab-active');
}
/* Slide Homepage */
const slideContainer = document.getElementById('bannerSlide');
const fallback = document.querySelector('.fallback-text');
const loader = document.getElementById('loader-Slidebanner');

const imageCount = 2; // Altere esse número de acordo com o número de imagens esperadas
const slideImages = [];
let loadedCount = 0;

for (let i = 1; i <= imageCount; i++) {
  const img = new Image();
  img.src = `Asset/Slide/${i}.png`;

  img.onload = () => {
    slideImages.push(img);
    loadedCount++;
    checkIfReady();
  };

  img.onerror = () => {
    loadedCount++;
    checkIfReady();
  };
}
function checkIfReady() {
  if (loadedCount === imageCount) {
    loader.style.display = 'none';

    if (slideImages.length > 0) {
      startSlider();
    } else {
      fallback.style.display = 'block';
    }
  }
}
function startSlider() {
  if (slideImages.length === 0) return;

  fallback.style.display = 'none';
  let current = 0;

  slideImages.forEach((img) => {
    img.classList.add('slide-image');
    slideContainer.appendChild(img);
  });

  slideImages[0].classList.add('active');

  setInterval(() => {
    const currentImg = slideImages[current];
    currentImg.classList.remove('active');
    currentImg.classList.add('out');

    current = (current + 1) % slideImages.length;
    const nextImg = slideImages[current];
    nextImg.classList.add('active');

    setTimeout(() => {
      currentImg.classList.remove('out');
    }, 600); // Tempo da transição
  }, 10000);
}
/*  */
let currentAnime = null;
function showModal(title, image, synopsis, id) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalImage').src = image;
  document.getElementById('modalSynopsis').innerText = synopsis;
  document.getElementById('animeModal').classList.add('aniActive');
  currentAnime = { id, title, image };

  const favoriteBtn = document.getElementById('favoriteBtn');
  if (favoriteBtn) {
    favoriteBtn.onclick = () => {
      addToFavorites(currentAnime.id, currentAnime.title, currentAnime.image);
      alert('Adicionado aos favoritos!');
    };
  }
}
function closeModal() {
  document.getElementById('animeModal').classList.remove('aniActive');
}
document.addEventListener('click', function (event) {
  const card = event.target.closest('.Card-Man');
  if (card) {
    const title = card.dataset.title;
    const image = card.dataset.image;
    const synopsis = card.dataset.synopsis;
    const id = card.dataset.id;
    showModal(title, image, synopsis, id);
  }
});
document.getElementById('favoriteBtn').onclick = () => {
  if (currentAnime) {
    addToFavorites(currentAnime.id, currentAnime.title, currentAnime.image);
    alert('Adicionado aos favoritos!');
  }
};
/* Animes */
document.addEventListener('DOMContentLoaded', () => {
  const hasLists =
    document.getElementById('releasesList') &&
    document.getElementById('recommendList') &&
    document.getElementById('galleryList');

  if (hasLists) {
    fetchAnimes();
  } else {
    console.warn(
      'As listas ainda não estão no DOM. Verifique o HTML ou mova o script para o final do body.'
    );
  }

  // Toggle da galeria
  document.body.addEventListener('click', (e) => {
    const toggle = e.target.closest('#toggleGallery');
    if (toggle) {
      const grid = document.getElementById('galleryGrid');
      const icon = document.getElementById('toggleIcon');
      grid?.classList.toggle('expand');
      icon?.classList.toggle('rotated');
    }
  });
});

async function fetchAnimes() {
  try {
    const res = await axios.get('https://api.jikan.moe/v4/top/anime');

    const releasesList = document.getElementById('releasesList');
    const recommendList = document.getElementById('recommendList');
    const galleryList = document.getElementById('galleryList');

    if (!releasesList || !recommendList || !galleryList) {
      console.error('Elementos do DOM não encontrados!');
      return;
    }

    const currentYear = new Date().getFullYear();
    let releasesHTML = '';
    let recommendHTML = '';
    let galleryHTML = '';

    res.data.data.forEach((anime) => {
      const title = anime.title;
      const image = anime.images.jpg.image_url;
      const synopsis = anime.synopsis || 'Sem sinopse disponível.';
      const id = anime.mal_id;
      const score = anime.score || 0;
      const airDate = anime.aired?.from;

      const articleHTML = `
        <article onclick="aniActive()" class="Card-Man"
          data-title=${JSON.stringify(title)}
          data-image=${JSON.stringify(image)}
          data-synopsis=${JSON.stringify(synopsis)}
          data-id=${JSON.stringify(id)}
        >
          <img src="${image}" alt="${title}">
          <p>${title}</p>
        </article>`;

      // Lançamentos do ano atual
      if (airDate && new Date(airDate).getFullYear() === currentYear) {
        releasesHTML += articleHTML;
      }
      // Recomendados (nota acima de 7.0)
      if (score >= 7.0) {
        recommendHTML += articleHTML;
      }
      // Todos os animes
      galleryHTML += articleHTML;
    });
    // Preenche o HTML nas seções
    releasesList.innerHTML =
      releasesHTML || '<p>Nenhum lançamento de 2025 encontrado.</p>';
    recommendList.innerHTML =
      recommendHTML || '<p>Nenhum recomendado encontrado.</p>';
    galleryList.innerHTML = `
          ${galleryHTML}
    `;
  } catch (err) {
    console.error('Erro ao buscar animes:', err);
  }
}

/* Gallery */
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('galleryList');
  const toggleBtn = document.getElementById('toggleGallery');
  const toggleIcon = document.getElementById('toggleIcon');

  if (gallery && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = gallery.classList.toggle('expanded');
    });
  }
});
async function fetchGenres() {
  try {
    const res = await axios.get('https://api.jikan.moe/v4/genres/anime');
    const categoryList = document.getElementById('categoryList');
    res.data.data.forEach((genre) => {
      const item = `<button class="Cat-BTN">${genre.name}</button>`;
      categoryList.innerHTML += item;
    });
  } catch (err) {
    console.error('Erro ao buscar categorias:', err);
  }
}
fetchAnimes();
fetchGenres();

function addToFavorites(id, title, image) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.some((item) => item.id === id)) {
    favorites.push({ id, title, image });
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
document.addEventListener('click', function (e) {
  const card = e.target.closest('.Card-Man');
  if (card) {
    const title = card.dataset.title;
    const image = card.dataset.image;
    const synopsis = card.dataset.synopsis;
    const id = card.dataset.id;

    showModal(title, image, synopsis, id);
  }
});
const cards = document.getElementsByClassName('Card-Man');

Array.from(cards).forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('aniActive');
  });
});
/* Config themes */
const body = document.body;
function setTheme(theme) {
  body.classList.remove('theme-day', 'theme-night', 'theme-purple');
  body.classList.add(`theme-${theme}`);
  localStorage.setItem('userTheme', theme);
}
document
  .getElementById('themeDay')
  .addEventListener('click', () => setTheme('day'));
document
  .getElementById('themeNight')
  .addEventListener('click', () => setTheme('night'));
document
  .getElementById('themePurple')
  .addEventListener('click', () => setTheme('purple'));

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('userTheme') || 'day';
  setTheme(savedTheme);
});
/* Database */
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userAvatar = document.getElementById('userAvatar');

loginBtn.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};
logoutBtn.onclick = () => {
  auth.signOut();
};
auth.onAuthStateChanged((user) => {
  if (user) {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    userAvatar.src = user.photoURL || 'https://via.placeholder.com/30';
  } else {
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    userAvatar.src = 'https://via.placeholder.com/30';
  }
});
