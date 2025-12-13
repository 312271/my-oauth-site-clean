// index.js - УПРОЩЕННАЯ ВЕРСИЯ
window.onload = function() {
  const button = document.getElementById('authButton');
  const logsDiv = document.getElementById('logs');
  
  function logMessage(message) {
    console.log(message);
    if (logsDiv) {
      const p = document.createElement('p');
      p.textContent = message;
      logsDiv.appendChild(p);
    }
  }
  
  // Проверяем токен
  const savedToken = localStorage.getItem('yandex_token');
  if (savedToken) {
    logMessage('✅ Найден сохраненный токен');
    button.textContent = 'Вы уже авторизованы';
    button.disabled = true;
    getUserInfo(savedToken);
  }
  
  button.addEventListener('click', function() {
    logMessage('Запуск авторизации...');
    
    const clientId = '2ac30da3005b46029619b9c3a7388b26';
    const redirectUri = encodeURIComponent('https://my-oauth-site-clean.vercel.app/token.html');
    
    // ВАРИАНТ 1: Без scope вообще (Яндекс сам предложит доступы)
    const authUrl = 
      'https://oauth.yandex.ru/authorize?' +
      'response_type=token&' +
      'client_id=' + clientId + '&' +
      'redirect_uri=' + redirectUri;
      // Не указываем scope - пусть Яндекс сам предлагает
    
    // ВАРИАНТ 2: Только БАЗОВЫЕ scopes (если настроены в приложении)
    // const scope = 'login:info'; // Только одно базовое разрешение
    // const authUrl = 
    //   'https://oauth.yandex.ru/authorize?' +
    //   'response_type=token&' +
    //   'client_id=' + clientId + '&' +
    //   'redirect_uri=' + redirectUri + '&' +
    //   'scope=' + encodeURIComponent(scope);
    
    logMessage('Переходим: ' + authUrl);
    window.location.href = authUrl;
  });
  
  async function getUserInfo(token) {
    try {
      logMessage('Получаем информацию о пользователе...');
      
      // Пробуем получить данные с токеном
      const response = await fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`);
      
      if (!response.ok) {
        throw new Error('Ошибка: ' + response.status);
      }
      
      const userData = await response.json();
      console.log('Данные пользователя:', userData);
      
      showUserInfo(userData);
      
    } catch (error) {
      logMessage('❌ Ошибка: ' + error.message);
      localStorage.removeItem('yandex_token');
      button.textContent = 'Войти через Яндекс';
      button.disabled = false;
    }
  }
  
  function showUserInfo(user) {
    const info = `
      <div style="background: #e8f5e9; padding: 20px; border-radius: 10px;">
        <h3>👤 Авторизация успешна!</h3>
        <p><strong>Имя:</strong> ${user.first_name || 'Не указано'} ${user.last_name || ''}</p>
        <p><strong>Логин:</strong> ${user.login || 'Не указан'}</p>
        ${user.default_email ? `<p><strong>Email:</strong> ${user.default_email}</p>` : ''}
        <button onclick="logout()" style="margin-top: 10px; padding: 10px 20px; background: #ff4444; color: white; border: none; border-radius: 5px;">
          Выйти
        </button>
      </div>
    `;
    
    if (logsDiv) {
      logsDiv.innerHTML = info;
    }
  }
};

window.logout = function() {
  localStorage.removeItem('yandex_token');
  location.reload();
};
