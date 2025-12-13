// token.js - с обработкой ошибок
window.onload = function() {
  console.log('Token page loaded');
  
  const hash = window.location.hash;
  console.log('Hash из URL:', decodeURIComponent(hash));
  
  // Проверяем есть ли ошибка в URL
  if (hash.includes('error=')) {
    // Есть ошибка OAuth
    const errorMatch = hash.match(/error=([^&]*)/);
    const errorDescMatch = hash.match(/error_description=([^&]*)/);
    
    const error = errorMatch ? decodeURIComponent(errorMatch[1]) : 'Неизвестная ошибка';
    const errorDesc = errorDescMatch ? decodeURIComponent(errorDescMatch[1]) : '';
    
    console.error('OAuth ошибка:', error, errorDesc);
    
    document.body.innerHTML = `
      <div style="text-align: center; margin-top: 50px;">
        <h2 style="color: red;">❌ Ошибка авторизации</h2>
        <p><strong>Код ошибки:</strong> ${error}</p>
        ${errorDesc ? `<p><strong>Описание:</strong> ${errorDesc}</p>` : ''}
        <p>Нужно настроить разрешения в OAuth-приложении Яндекса.</p>
        <button onclick="window.location.href='https://my-oauth-site-clean.vercel.app/'" 
                style="padding: 10px 20px; margin-top: 20px;">
          Вернуться на главную
        </button>
      </div>
    `;
    
  } else if (hash.includes('access_token=')) {
    // Успешно - есть токен
    const tokenMatch = hash.match(/access_token=([^&]*)/);
    if (tokenMatch) {
      const token = tokenMatch[1];
      console.log('✅ Токен получен');
      
      localStorage.setItem('yandex_token', token);
      
      document.body.innerHTML = `
        <div style="text-align: center; margin-top: 50px;">
          <h2 style="color: green;">✅ Авторизация успешна!</h2>
          <p>Возвращаемся на главную...</p>
        </div>
      `;
      
      // Быстрый редирект
      setTimeout(() => {
        window.location.href = 'https://my-oauth-site-clean.vercel.app/';
      }, 1500);
    }
  } else {
    // Неизвестная ситуация
    document.body.innerHTML = `
      <div style="text-align: center; margin-top: 50px;">
        <p>Не удалось получить токен.</p>
        <button onclick="window.location.href='https://my-oauth-site-clean.vercel.app/'">
          Вернуться на главную
        </button>
      </div>
    `;
  }
};
