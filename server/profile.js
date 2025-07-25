function editProfile() {
  alert('Abrir modal de edição de perfil...');
}
/* RenderAnime */
document.addEventListener('DOMContentLoaded', () => {
  const favorite = {
    title: 'Bleach: Sennen Kessen-hen',
    image:
      'https://images.cybersport.ru/images/as-is/plain/95/956a7c6b-e4dd-49be-ac2e-9a2fc2dad3a5.png',
    link: 'https://myanimelist.net/anime/41467/Bleach__Sennen_Kessen-hen',
  };

  const el = document.getElementById('favoriteHTML');
  if (el) {
    el.innerHTML = `
      <a class="Card-Man" href="${favorite.link}" target="_blank">
        <img src="${favorite.image}" alt="${favorite.title}">
        <span>${favorite.title}</span>
      </a>
    `;
  } else {
    console.log(document.getElementById('favoriteHTML'));
  }
});

/* // Exemplo:
renderFavoriteAnime("favoriteHTML", "Bleach"); */
/*  *
const perfilSalvo = localStorage.getItem('perfil');
if (perfilSalvo) {
  const user = JSON.parse(perfilSalvo);
  render(user);
} else {
  fetch('data/perfil.json')
    .then((r) => r.json())
    .then(render);
}
/* Render infos *
fetch('/server/data/perfil.json')
  .then((res) => res.json())
  .then((user) => {
    document.getElementById('avatarImg').src = user.avatar;
    document.getElementById('bannerImg').src = user.banner;
    document.getElementById('username').textContent = user.name;
    document.getElementById('bioText').textContent = user.bio;
    document.getElementById('linkInsta').href = user.instagram;
    document.getElementById(
      'accountTime'
    ).textContent = `Conta criada há ${user.tempo}`;
    document.getElementById('local').textContent = user.local;
  });
/* Change infos *
document.getElementById('avatarInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('preview').src = reader.result;
  };
  if (file) reader.readAsDataURL(file);
});

document.getElementById('salvar').addEventListener('click', () => {
  const perfil = {
    nome: document.getElementById('nome').value,
    bio: document.getElementById('bio').value,
    avatar: document.getElementById('preview').src,
    local: 'Planeta Terra',
  };
  localStorage.setItem('perfil', JSON.stringify(perfil));
  alert('Perfil salvo!');
});
*/
