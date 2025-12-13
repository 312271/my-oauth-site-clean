document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('authButton');
  if (!button) return;

  button.addEventListener('click', () => {
    window.YaAuthSuggest.init({
      client_id: '2ac30da3005b46029619b9c3a7388b26',
      response_type: 'token',
      redirect_uri: 'https://my-oauth-site-clean.vercel.app/token.html'
    }, 
      'https://my-oauth-site-clean.vercel.app'
  )
      .then(({ handler }) => handler())
      .then(async (data) => {
        const user = await fetch(`https://login.yandex.ru/info?format=json&oauth_token=${data.access_token}`).then(r => r.json());
        button.innerText = `Привет, ${user.first_name}!`;
        button.disabled = true;
      })
      .catch(err => {
        console.error('Ошибка:', err);
        alert('Не удалось авторизоваться');
      });
  });
});
