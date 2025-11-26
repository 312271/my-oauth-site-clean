window.onload = () => {
  window.YaAuthSuggest.init({
    client_id: '2ac30da3005b46029619b9c3a7388b26',
    response_type: 'token',
    redirect_uri: 'https://my-oauth-site-clean.vercel.app/token.html'
  }, 'https://my-oauth-site-clean.vercel.app')
    .then(({ handler }) => handler())
    .then(async (data) => {
      const result = await fetchYandexData(data.access_token);
      authorize(result);
    })
    .catch((error) => console.log("Что-то пошло не так:", error));
};

async function fetchYandexData(token) {
  const response = await fetch('https://login.yandex.ru/info?format=json&oauth_token=' + token);
  return await response.json();
}

function authorize(userData) {
  const button = document.getElementById('authButton');
  if (button) {
    button.innerText = `Вы авторизованы. Привет, ${userData.first_name}!`;
    button.disabled = true;
  }
}
