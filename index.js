// Ждем полной загрузки страницы и всех скриптов
window.onload = function() {
  console.log('Страница загружена');
  
  const button = document.getElementById('authButton');
  const logsDiv = document.getElementById('logs');
  
  if (!button) {
    console.error('Кнопка не найдена!');
    return;
  }
  
  // Проверяем, загрузился ли SDK Яндекса
  console.log('Проверка SDK:');
  console.log('- window.YaAuthSuggest:', typeof window.YaAuthSuggest);
  console.log('- window.YaSendSuggestToken:', typeof window.YaSendSuggestToken);
  console.log('- window.Ya:', typeof window.Ya);
  
  // Функция для логирования
  function logMessage(message) {
    console.log(message);
    if (logsDiv) {
      logsDiv.innerHTML += '<p>' + message + '</p>';
    }
  }
  
  button.addEventListener('click', function() {
    logMessage('Нажата кнопка "Войти через Яндекс"');
    
    // Вариант 1: Если SDK загрузился
    if (window.YaAuthSuggest && typeof window.YaAuthSuggest.init === 'function') {
      logMessage('Используем YaAuthSuggest.init()');
      
      window.YaAuthSuggest.init(
        {
          client_id: '2ac30da3005b46029619b9c3a7388b26',
          response_type: 'token',
          redirect_uri: 'https://my-oauth-site-clean.vercel.app/token.html'
        },
        'https://my-oauth-site-clean.vercel.app'
      )
      .then(function(result) {
        logMessage('SDK инициализирован, запускаем обработчик...');
        return result.handler();
      })
      .then(function(data) {
        logMessage('Токен получен: ' + (data.access_token ? 'да' : 'нет'));
        console.log('Полные данные:', data);
        
        // Меняем текст кнопки
        button.textContent = 'Успешно!';
        button.disabled = true;
        
        // Показываем уведомление
        alert('Авторизация успешна! Токен получен.');
      })
      .catch(function(error) {
        logMessage('Ошибка: ' + error.message);
        console.error('Детали ошибки:', error);
      });
      
    } 
    // Вариант 2: Если SDK не загрузился - используем прямой редирект
    else {
      logMessage('SDK не загружен, используем прямой OAuth редирект');
      
      const clientId = '2ac30da3005b46029619b9c3a7388b26';
      const redirectUri = encodeURIComponent('https://my-oauth-site-clean.vercel.app/token.html');
      
      // Формируем URL для OAuth авторизации
      const authUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=login:info`;
      
      logMessage('Переходим по: ' + authUrl);
      
      // Редирект на страницу авторизации Яндекса
      window.location.href = authUrl;
    }
  });
  
  // Проверяем, загрузился ли SDK через 3 секунды
  setTimeout(function() {
    if (!window.YaAuthSuggest) {
      logMessage('ВНИМАНИЕ: Яндекс SDK не загрузился автоматически');
      logMessage('Попробуйте нажать кнопку - используется резервный метод');
    }
  }, 3000);
};
