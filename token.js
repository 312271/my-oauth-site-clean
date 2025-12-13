// token.js
window.onload = function() {
  console.log('Token page loaded');
  
  // Пытаемся получить токен из URL
  const hash = window.location.hash;
  console.log('Hash из URL:', hash);
  
  if (hash && hash.includes('access_token=')) {
    // Извлекаем токен из URL
    const tokenMatch = hash.match(/access_token=([^&]*)/);
    if (tokenMatch) {
      const token = tokenMatch[1];
      console.log('✅ Найден токен:', token.substring(0, 20) + '...');
      
      // Сохраняем токен в localStorage
      localStorage.setItem('yandex_token', token);
      console.log('Токен сохранен в localStorage');
      
      // Показываем сообщение на 3 секунды, потом редирект
      document.body.innerHTML = `
        <div style="text-align: center; margin-top: 50px;">
          <h2 style="color: green;">✅ Авторизация успешна!</h2>
          <p>Токен получен и сохранен.</p>
          <p>Возвращаемся на главную страницу...</p>
          <div id="countdown">3</div>
        </div>
      `;
      
      // Обратный отсчет и редирект
      let count = 3;
      const countdownEl = document.getElementById('countdown');
      const timer = setInterval(() => {
        count--;
        if (countdownEl) countdownEl.textContent = count;
        if (count <= 0) {
          clearInterval(timer);
          // Редирект на главную
          window.location.href = 'https://my-oauth-site-clean.vercel.app/';
        }
      }, 1000);
      
      // Можно сразу редиректнуть (без отсчета)
      // setTimeout(() => {
      //   window.location.href = 'https://my-oauth-site-clean.vercel.app/';
      // }, 1000);
      
    }
  } else {
    console.log('Токен не найден в URL');
    document.body.innerHTML = `
      <div style="text-align: center; margin-top: 50px;">
        <h2 style="color: red;">❌ Ошибка авторизации</h2>
        <p>Токен не найден в URL.</p>
        <button onclick="window.location.href='https://my-oauth-site-clean.vercel.app/'">
          Вернуться на главную
        </button>
      </div>
    `;
  }
};
