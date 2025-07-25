/* CONTENTS */
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
        <article class="Card-Man"
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
      // Recomendados (nota acima de 6.0)
      if (score >= 6.0) {
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
    card.classList.toggle('ModalOpening');
  });
});

/* SlideHome page */
const slides = document.querySelectorAll('.SlideBox');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const interval = 7000; // 7 segundos

function changeSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('dot-active', i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  changeSlide(nextIndex);
}

let slideInterval = setInterval(nextSlide, interval);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    changeSlide(i);
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, interval); // reseta o timer
  });
});
