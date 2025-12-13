// Ждем загрузки страницы
window.addEventListener('load', function() {
  console.log('Страница загружена');
  
  const button = document.getElementById('authButton');
  const logsDiv = document.getElementById('logs');
  
  if (!button) {
    console.error('Кнопка не найдена');
    return;
  }
  
  // Проверяем что есть в window
  console.log('Доступные объекты Яндекса:');
  for (let key in window) {
    if (key.includes('Ya') || key.includes('ya')) {
      console.log('-', key, ':', typeof window[key]);
    }
  }
  
  button.addEventListener('click', function() {
    console.log('Нажата кнопка');
    console.log('window.YaAuthSuggest:', window.YaAuthSuggest);
    
    // Если SDK загрузился
    if (window.YaAuthSuggest && typeof window.YaAuthSuggest.init === 'function') {
      console.log('Используем YaAuthSuggest');
      
      window.YaAuthSuggest.init(
        {
          client_id: '2ac30da3005b46029619b9c3a7388b26',
          response_type: 'token',
          redirect_uri: 'https://my-oauth-site-clean.vercel.app/token.html'
        },
        'https://my-oauth-site-clean.vercel.app'
      )
      .then(function(result) {
        console.log('Инициализация успешна');
        return result.handler();
      })
      .then(function(data) {
        console.log('Получен токен:', data);
        alert('Токен получен! Проверь консоль.');
      })
      .catch(function(error) {
        console.error('Ошибка:', error);
        alert('Ошибка: ' + error.message);
      });
      
    } else {
      console.log('SDK не загружен, делаем прямой редирект');
      
      // Прямой OAuth редирект
      const authUrl = 
        'https://oauth.yandex.ru/authorize?' +
        'response_type=token&' +
        'client_id=2ac30da3005b46029619b9c3a7388b26&' +
        'redirect_uri=' + encodeURIComponent('https://my-oauth-site-clean.vercel.app/token.html');
      
      window.location.href = authUrl;
    }
  });
  
  // Проверка через 2 секунды
  setTimeout(function() {
    if (!window.YaAuthSuggest) {
      console.log('После загрузки: YaAuthSuggest всё еще не доступен');
      console.log('Используется прямой OAuth редирект');
    }
  }, 2000);
});
