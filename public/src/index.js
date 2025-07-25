/* LOADER */
window.addEventListener('load', function () {
  const status = document.getElementById('status');
  const preloader = document.getElementById('preloader');

  status.style.display = 'none';
  setTimeout(() => {
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = 0;
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = 'visible';
    }, 500); // Tempo igual ao fadeOut do jQuery
  }, 350);
});

/* Model Anime Box */
let currentAnime = null;
function showModal(title, image, synopsis, id) {
  const modal = document.getElementById('animeModal');
  modal.classList.remove('ModalClosing');
  modal.classList.add('ModalOpening');

  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalImage').src = image;
  document.getElementById('modalSynopsis').innerText = synopsis;
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
  const modal = document.getElementById('animeModal');
  modal.classList.remove('ModalOpening');
  modal.classList.add('ModalClosing');

  modal.addEventListener('transitionend', function handleTransitionEnd() {
    modal.classList.remove('ModalClosing');
    modal.removeEventListener('transitionend', handleTransitionEnd);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.getElementById('animeModal').addEventListener('click', (e) => {
  if (e.target.id === 'animeModal') closeModal();
});
document.getElementById('Close').addEventListener;
