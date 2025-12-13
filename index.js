// index.js - упрощенный вариант с прямым OAuth
window.onload = function() {
  const button = document.getElementById('authButton');
  
  button.addEventListener('click', function() {
    console.log('Используем прямой OAuth редирект');
    
    // Параметры OAuth
    const clientId = '2ac30da3005b46029619b9c3a7388b26';
    const redirectUri = encodeURIComponent('https://my-oauth-site-clean.vercel.app/token.html');
    const scope = encodeURIComponent('login:info login:email');
    
    // Формируем URL для OAuth авторизации
    const authUrl = 
      'https://oauth.yandex.ru/authorize?' +
      'response_type=token&' +
      'client_id=' + clientId + '&' +
      'redirect_uri=' + redirectUri + '&' +
      'scope=' + scope;
    
    console.log('Переходим по:', authUrl);
    window.location.href = authUrl;
  });
};
