document.addEventListener('DOMContentLoaded', () => {
  const authButton = document.getElementById('authButton');

  auth он
  authButton.addEventListener('click', () => {
    window.YaAuthSuggest.init({
      client_id: '2ac30da3005b46029619b9c3a7388b26',
      response_type: 'token',
      redirect_uri: 'https://my-oauth-site-clean.vercel.app/token.html' // без пробелов!
    }, 'https://my-oauth-site-clean.vercel.app') // без пробелов!
      .then(({ handler }) => handler())
      .then(async (data) => {
        const result = await fetchYandexData(data.access_token);
        authorize(result);
      })
      .catch((error) => {
        console.error("Ошибка авторизации:", error);
        alert("Не удалось авторизоваться. Подробности в консоли.");
      });
  });
});

async function fetchYandexData(token) {
  const response = await fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`);
  if (!response.ok) {
    throw new Error('Не удалось получить данные пользователя');
  }
  return await response.json();
}

function authorize(userData) {
  const button = document.getElementById('authButton');
  if (button) {
    button.innerText = `Вы авторизованы. Привет, ${userData.first_name}!`;
    button.disabled = true;
  }
}
