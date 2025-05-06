/* import Header from './Layout/Header/Header';
import Main from './Layout/Main/Main';
import Footer from './Layout/Footer/Footer'; */
/* import './'; */

/* function App() {
  return (
    
  );
} */

/* export default App; */

/* Dropdown header */
document.addEventListener('DOMContentLoaded', () => {
  const inboxBtn = document.getElementById('inboxBtn');
  const inboxDropdown = document.getElementById('inboxDropdown');
  const inboxItems = document.querySelectorAll('.inbox-item');
  const inboxDetail = document.getElementById('inboxDetail');
  const detailTitle = document.getElementById('detailTitle');
  const detailContent = document.getElementById('detailContent');
  const closeDetail = document.getElementById('closeDetail');

  if (
    !inboxBtn ||
    !inboxDropdown ||
    !inboxDetail ||
    !detailTitle ||
    !detailContent ||
    !closeDetail
  ) {
    console.warn('⚠️ Alguns elementos do Inbox não foram encontrados no DOM.');
    return;
  }

  const notifications = {
    1: {
      title: '🔥 Novidade!',
      content:
        'Solo Leveling está completo na Onini! Confira os episódios em HD e com leitura top.',
    },
    2: {
      title: '📰 Notícias!',
      content:
        'Onini foi atualizado com novos recursos como modo escuro, leitura fluida e mais!',
    },
  };

  inboxBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    inboxDropdown.classList.toggle('hidden');
    inboxDetail.classList.add('hidden');
  });

  inboxItems.forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const notice = notifications[id];
      if (notice) {
        detailTitle.textContent = notice.title;
        detailContent.textContent = notice.content;
        inboxDetail.classList.remove('hidden');
      }
    });
  });

  closeDetail.addEventListener('click', () => {
    inboxDetail.classList.add('hidden');
  });

  document.addEventListener('click', (e) => {
    if (
      !inboxBtn.contains(e.target) &&
      !inboxDropdown.contains(e.target) &&
      !inboxDetail.contains(e.target)
    ) {
      inboxDropdown.classList.add('hidden');
      inboxDetail.classList.add('hidden');
    }
  });
});

/* Nav Sidebar */
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
/* Dropdwon sidebar 2 */
document.addEventListener('DOMContentLoaded', () => {
  const btnFavorite = document.querySelector("[data-btn='favorite']");
  const btnFriend = document.querySelector("[data-btn='friend']");
  const btnProfile = document.querySelector("[data-btn='profile']");

  const dropdownFavorite = document.querySelector('.sideDropdownFavorite');
  const dropdownFriend = document.querySelector('.sideDropdownFriend');
  const dropdownProfile = document.querySelector('.sideDropdownProfile');
  const backdrop = document.getElementById('dropdown-backdrop');

  function showDropdown(dropdown) {
    dropdown.classList.remove('hidden', 'dropdown-anim-hide');
    dropdown.classList.add('dropdown-anim-show');
    backdrop.classList.add('active');
  }

  function hideDropdown(dropdown) {
    dropdown.classList.remove('dropdown-anim-show');
    dropdown.classList.add('dropdown-anim-hide');

    setTimeout(() => {
      dropdown.classList.add('hidden');
    }, 280);
  }

  function toggleDropdown(target, all) {
    let isOpening = target.classList.contains('hidden');
    all.forEach((d) => {
      if (d !== target && !d.classList.contains('hidden')) {
        hideDropdown(d);
      }
    });
    if (isOpening) {
      showDropdown(target);
    } else {
      hideDropdown(target);
      backdrop.classList.remove('active');
    }
  }

  btnFavorite?.addEventListener('click', () => {
    toggleDropdown(dropdownFavorite, [dropdownFriend, dropdownProfile]);
  });

  btnFriend?.addEventListener('click', () => {
    toggleDropdown(dropdownFriend, [dropdownFavorite, dropdownProfile]);
  });

  btnProfile?.addEventListener('click', () => {
    const isHidden =
      dropdownProfile.style.display === 'none' ||
      dropdownProfile.style.display === '';
    dropdownProfile.style.display = isHidden ? 'flex' : 'none';
    dropdownProfile.classList.toggle('dropdown-anim-show', isHidden);
    dropdownProfile.classList.toggle('dropdown-anim-hide', !isHidden);

    [dropdownFavorite, dropdownFriend].forEach((d) => {
      if (!d.classList.contains('hidden')) hideDropdown(d);
    });

    backdrop.classList.toggle('active', isHidden);
  });

  backdrop.addEventListener('click', () => {
    [dropdownFavorite, dropdownFriend].forEach((d) => hideDropdown(d));
    dropdownProfile.style.display = 'none';
    backdrop.classList.remove('active');
  });
});
/* Section */
const openBtn = document.querySelectorAll('.open-settings');
const backdrop = document.querySelector('.settings-backdrop');
const modal = document.querySelector('.settings-modal');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.settings-section');

// Abrir modal
openBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    backdrop.classList.remove('hidden');
    modal.classList.add('active');

    const targetSection = btn.dataset.section;
    if (targetSection) {
      // Ativa o botão certo do menu
      navItems.forEach((i) => {
        i.classList.toggle('active', i.dataset.target === targetSection);
      });

      // Ativa a seção certa
      sections.forEach((sec) => {
        sec.classList.toggle('active', sec.id === targetSection);
      });
    }
  });
});
// Fechar modal ao clicar no ícone de fechar
const closeBtn = document.querySelector(
  '.settings-header ion-icon[name="close"]'
);
closeBtn.addEventListener('click', () => {
  backdrop.classList.add('hidden');
  modal.classList.remove('active');
});

// Fechar ao clicar no backdrop
backdrop.addEventListener('click', () => {
  backdrop.classList.add('hidden');
  modal.classList.remove('active');
});
// Alternar seções
navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((i) => i.classList.remove('active'));
    item.classList.add('active');

    const target = item.getAttribute('data-target');
    sections.forEach((sec) => {
      sec.classList.remove('active');
      if (sec.id === target) sec.classList.add('active');
    });
  });
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
/* Modal */
let currentAnime = null;
function showModal(title, image, synopsis, id) {
  const modal = document.getElementById('animeModal');
  const titleEl = document.getElementById('modalTitle');
  const imageEl = document.getElementById('modalImage');
  const synopsisEl = document.getElementById('modalSynopsis');
  const favoriteBtn = document.getElementById('favoriteBtn');

  titleEl.innerText = title;
  imageEl.src = image;
  synopsisEl.innerText = synopsis;

  modal.classList.add('aniActive');
  currentAnime = { id, title, image };

  if (favoriteBtn) {
    favoriteBtn.onclick = () => {
      addToFavorites(currentAnime.id, currentAnime.title, currentAnime.image);
      alert('Adicionado aos favoritos!');
    };
  }
}
function closeModal() {
  const modal = document.getElementById('animeModal');
  modal.classList.remove('aniActive');
}
// ✅ Garante que o botão de fechar funcione mesmo com HTML separado
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('Close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
});
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
/* Database *
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Config Firebase
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const userAvatar = document.getElementById('userAvatar');
  const updateProfileBtn = document.getElementById('updateProfileBtn'); // botão de atualizar perfil

  loginBtn.onclick = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Login feito:', result.user.displayName);
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  };

  logoutBtn.onclick = () => {
    signOut(auth)
      .then(() => {
        console.log('Logout feito.');
      })
      .catch((error) => {
        console.error('Erro no logout:', error);
      });
  };

  onAuthStateChanged(auth, (user) => {
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
});

// Atualizar perfil
updateProfileBtn.onclick = () => {
  const novoNome = document.getElementById('novoNomeInput').value;
  const novaFoto = document.getElementById('novaFotoInput').value;

  const user = auth.currentUser;
  if (user) {
    updateProfile(user, {
      displayName: novoNome,
      photoURL: novaFoto,
    })
      .then(() => {
        console.log('Perfil atualizado com sucesso!');
        document.getElementById('userProfilePic').src = novaFoto;
        document.getElementById('userName').textContent = novoNome;
      })
      .catch((error) => {
        console.error('Erro ao atualizar o perfil:', error);
      });
  } else {
    console.warn('Nenhum usuário logado para atualizar.');
  }
};

// Escuta login/logout
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    userAvatar.src = user.photoURL || 'https://via.placeholder.com/30';

    const profilePic = document.getElementById('userProfilePic');
    const userNameElement = document.getElementById('userName');
    if (profilePic && user.photoURL) profilePic.src = user.photoURL;
    if (userNameElement && user.displayName)
      userNameElement.textContent = user.displayName;
  } else {
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    userAvatar.src = 'https://via.placeholder.com/30';
  }
});*/
/* USER AUTH UI */
// Elementos
const loginBtn = document.getElementById('loginBTN');
const logoutBtn = document.getElementById('logoutBTN');
const loginModal = document.getElementById('loginModal');
const submitLogin = document.getElementById('submitLogin');
const profileContent = document.getElementById('profileContent');

// Popup customizado
function showPopup(message, type = 'success') {
  const popup = document.createElement('div');
  popup.className = `popup ${type}`;
  popup.textContent = message;

  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add('visible');
  }, 10);

  setTimeout(() => {
    popup.classList.remove('visible');
    setTimeout(() => document.body.removeChild(popup), 300);
  }, 3000);
}
// Verifica login salvo
if (localStorage.getItem('userLoggedIn')) {
  loginBtn.classList.add('hidden');
  logoutBtn.classList.remove('hidden');
  profileContent.classList.remove('hidden');
}
// Mostrar modal de login
loginBtn.addEventListener('click', () => {
  loginModal.classList.remove('hidden');
});
// Simula login básico
submitLogin.addEventListener('click', () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (username && password) {
    localStorage.setItem('userLoggedIn', true);
    localStorage.setItem('username', username);
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    profileContent.classList.remove('hidden');
    loginModal.classList.add('hidden');
    showPopup('Login realizado com sucesso!', 'success');
  } else {
    showPopup('Erro: preencha todos os campos!', 'error');
  }
});
// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('userLoggedIn');
  loginBtn.classList.remove('hidden');
  logoutBtn.classList.add('hidden');
  profileContent.classList.add('hidden');
  showPopup('Logout realizado.', 'success');
});
// Salvar dados do perfil
document.getElementById('saveProfile').addEventListener('click', () => {
  localStorage.setItem('username', document.getElementById('username').value);
  localStorage.setItem('bio', document.getElementById('bio').value);
  localStorage.setItem('email', document.getElementById('email').value);
  localStorage.setItem('password', document.getElementById('password').value);
  localStorage.setItem('2FA', document.getElementById('twoFA').checked);

  const file = document.getElementById('profileImage').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem('profileImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }

  showPopup('Perfil salvo com sucesso!', 'success');
});
/* USER DATA MANAGER */
const userData = {
  username: 'oliver_dev',
  bio: 'Apenas um dev construindo o império digital.',
  email: 'oliver@email.com',
  senha: 'hash_ou_criptografada',
  twoFA: {
    enabled: false,
    secret: '',
  },
  avatar: 'path/para/avatar.jpg',
  backgroundImage: 'path/para/background.jpg',
  favoritos: [],
  tema: 'dark',
  amigos: [],
  conquistas: [],
};
function salvarUserData(data) {
  localStorage.setItem('userData', JSON.stringify(data));
}
function carregarUserData() {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
}
function adicionarFavorito(id) {
  const user = carregarUserData();
  if (!user.favoritos.includes(id)) {
    user.favoritos.push(id);
    salvarUserData(user);
  }
}
function removerFavorito(id) {
  const user = carregarUserData();
  user.favoritos = user.favoritos.filter((fav) => fav !== id);
  salvarUserData(user);
}
function trocarTema(novoTema) {
  const user = carregarUserData();
  user.tema = novoTema;
  salvarUserData(user);
  document.body.setAttribute('data-theme', novoTema);
}
function adicionarAmigo(amigo) {
  const user = carregarUserData();
  const existe = user.amigos.find((a) => a.id === amigo.id);
  if (!existe) {
    user.amigos.push(amigo);
    salvarUserData(user);
  }
}
function removerAmigo(amigoId) {
  const user = carregarUserData();
  user.amigos = user.amigos.filter((a) => a.id !== amigoId);
  salvarUserData(user);
}
function desbloquearConquista(nome) {
  const user = carregarUserData();
  if (!user.conquistas.includes(nome)) {
    user.conquistas.push(nome);
    salvarUserData(user);
  }
}
if (!carregarUserData()) {
  salvarUserData(userData);
}
window.addEventListener('DOMContentLoaded', () => {
  const user = carregarUserData();
  if (user && user.tema) {
    document.body.setAttribute('data-theme', user.tema);
  }
});
const formGeral = document.getElementById('formGeral');
formGeral.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem(
    'username',
    document.getElementById('usernameInput').value
  );
  localStorage.setItem('bio', document.getElementById('bioInput').value);

  const avatar = document.getElementById('avatarUpload').files[0];
  const banner = document.getElementById('bannerUpload').files[0];

  if (avatar) {
    const reader = new FileReader();
    reader.onload = () => localStorage.setItem('avatar', reader.result);
    reader.readAsDataURL(avatar);
  }

  if (banner) {
    const reader = new FileReader();
    reader.onload = () => localStorage.setItem('banner', reader.result);
    reader.readAsDataURL(banner);
  }

  showPopup('Configurações salvas!', 'success');
});
const formConta = document.getElementById('formConta');
formConta.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('email', document.getElementById('emailInput').value);
  localStorage.setItem('senha', document.getElementById('senhaInput').value);
  localStorage.setItem('twoFA', document.getElementById('twoFAInput').checked);
  showPopup('Conta atualizada!', 'success');
});
function exibirDadosUsuario() {
  const userData = carregarUserData();

  if (userData) {
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    const userInfoEl = document.getElementById('user-info');

    nameEl.textContent = userData.username;

    if (userData.avatar) {
      avatarEl.src = userData.avatar;
    } else {
      avatarEl.src = 'Onini-Icon.png'; // default-avatar.png fallback se não tiver imagem
    }

    userInfoEl.classList.remove('hidden');
  }
}
submitLogin.addEventListener('click', () => {
  // ...verificação de login...
  if (username && password) {
    localStorage.setItem('userLoggedIn', true);

    const userData = carregarUserData();
    userData.username = username;
    salvarUserData(userData);

    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    profileContent.classList.remove('hidden');
    loginModal.classList.add('hidden');

    // Mostra os dados do user
    exibirDadosUsuario();
    mostrarPopup('Login realizado com sucesso!', 'success');
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const user = carregarUserData();
  if (localStorage.getItem('userLoggedIn')) {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    profileContent.classList.remove('hidden');
    exibirDadosUsuario();
  }

  if (user && user.tema) {
    document.body.setAttribute('data-theme', user.tema);
  }
});
