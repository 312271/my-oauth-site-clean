// index.js
window.onload = function() {
  const button = document.getElementById('authButton');
  const logsDiv = document.getElementById('logs');
  
  // Функция для вывода сообщений
  function logMessage(message) {
    console.log(message);
    if (logsDiv) {
      const p = document.createElement('p');
      p.textContent = message;
      logsDiv.appendChild(p);
    }
  }
  
  // Проверяем, есть ли уже сохраненный токен
  const savedToken = localStorage.getItem('yandex_token');
  if (savedToken) {
    logMessage('✅ Найден сохраненный токен');
    button.textContent = 'Вы уже авторизованы';
    button.disabled = true;
    
    // Получаем информацию о пользователе
    getUserInfo(savedToken);
  }
  
  button.addEventListener('click', function() {
    logMessage('Запуск авторизации...');
    
    // Параметры OAuth
    const clientId = '2ac30da3005b46029619b9c3a7388b26';
    const redirectUri = encodeURIComponent('https://my-oauth-site-clean.vercel.app/token.html');
    const scope = encodeURIComponent('login:info login:email login:avatar');
    
    // Формируем URL для OAuth авторизации
    const authUrl = 
      'https://oauth.yandex.ru/authorize?' +
      'response_type=token&' +
      'client_id=' + clientId + '&' +
      'redirect_uri=' + redirectUri + '&' +
      'scope=' + scope;
    
    logMessage('Переходим на страницу авторизации Яндекса...');
    window.location.href = authUrl;
  });
  
  // Функция для получения информации о пользователе
  async function getUserInfo(token) {
    try {
      logMessage('Получаем информацию о пользователе...');
      
      const response = await fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`);
      
      if (!response.ok) {
        throw new Error('Ошибка запроса: ' + response.status);
      }
      
      const userData = await response.json();
      console.log('Данные пользователя:', userData);
      
      // Показываем информацию о пользователе
      showUserInfo(userData);
      
    } catch (error) {
      logMessage('❌ Ошибка получения данных: ' + error.message);
      
      // Если токен невалидный, удаляем его
      localStorage.removeItem('yandex_token');
      button.textContent = 'Войти через Яндекс';
      button.disabled = false;
    }
  }
  
  // Функция для отображения информации о пользователе
  function showUserInfo(user) {
    const userInfo = `
      <div style="background: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 10px;">
        <h3>👤 Вы авторизованы как:</h3>
        <p><strong>Имя:</strong> ${user.first_name} ${user.last_name}</p>
        <p><strong>Логин:</strong> ${user.login}</p>
        <p><strong>Email:</strong> ${user.default_email || 'не указан'}</p>
        ${user.default_avatar_id ? 
          `<p><img src="https://avatars.yandex.net/get-yapic/${user.default_avatar_id}/islands-200" 
                  style="border-radius: 50%; width: 100px; height: 100px;"></p>` : ''}
        <button onclick="logout()" style="margin-top: 10px;">Выйти</button>
      </div>
    `;
    
    if (logsDiv) {
      // Очищаем и добавляем новую информацию
      logsDiv.innerHTML = userInfo;
    }
  }
};

// Функция для выхода (добавляем в глобальную область видимости)
window.logout = function() {
  localStorage.removeItem('yandex_token');
  alert('Вы вышли из аккаунта');
  location.reload(); // Перезагружаем страницу
};
