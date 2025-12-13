document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('authButton');
  if (!button) {
    console.error('Кнопка authButton не найдена');
    return;
  }

  button.addEventListener('click', () => {
    console.log('Кнопка нажата, инициализация YaAuthSuggest...');
    
    // Проверяем, что объект существует
    if (typeof window.YaAuthSuggest === 'undefined') {
      console.error('YaAuthSuggest не загружен. Проверьте подключение скрипта в HTML.');
      alert('Ошибка загрузки SDK Яндекса');
      return;
    }

    window.YaAuthSuggest.init({
      client_id: '2ac30da3005b46029619b9c3a7388b26',
      response_type: 'token',
      redirect_uri: 'https://my-oauth-site-clean.vercel.app/token.html'
    }, 'https://my-oauth-site-clean.vercel.app')
    .then(({ handler }) => {
      console.log('YaAuthSuggest инициализирован, запускаем handler...');
      return handler();
    })
    .then(async (data) => {
      console.log('Токен получен:', data);
      
      // Запрашиваем информацию о пользователе
      const user = await fetch(`https://login.yandex.ru/info?format=json&oauth_token=${data.access_token}`)
        .then(r => r.json());
      
      console.log('Данные пользователя:', user);
      button.innerText = `Привет, ${user.first_name || 'пользователь'}!`;
      button.disabled = true;
      
      // Можно также вывести данные в logs
      const logsDiv = document.getElementById('logs');
      if (logsDiv) {
        logsDiv.innerHTML = `<p>Успешно авторизован: ${user.display_name || user.login}</p>`;
      }
    })
    .catch(err => {
      console.error('Ошибка авторизации:', err);
      alert('Не удалось авторизоваться: ' + (err.message || err));
    });
  });
});
