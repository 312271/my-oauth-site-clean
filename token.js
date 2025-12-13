// token.js - получаем токен из URL
window.onload = function() {
  console.log('Token page loaded');
  
  // Пытаемся получить токен из URL (после редиректа Яндекс добавит его в #)
  const hash = window.location.hash;
  console.log('Hash из URL:', hash);
  
  if (hash && hash.includes('access_token=')) {
    // Извлекаем токен из URL
    const tokenMatch = hash.match(/access_token=([^&]*)/);
    if (tokenMatch) {
      const token = tokenMatch[1];
      console.log('✅ Найден токен:', token.substring(0, 20) + '...');
      
      // Показываем токен на странице
      document.body.innerHTML += `
        <h3>Токен получен!</h3>
        <p>Токен: ${token.substring(0, 30)}...</p>
        <p>Теперь можно закрыть эту вкладку и вернуться на главную.</p>
      `;
      
      // Можно отправить токен обратно на главную страницу
      try {
        if (window.opener) {
          window.opener.postMessage({ type: 'yandex_token', token: token }, '*');
          console.log('Токен отправлен в opener');
        }
      } catch (e) {
        console.error('Не удалось отправить токен:', e);
      }
    }
  } else {
    console.log('Токен не найден в URL');
    document.body.innerHTML += `
      <p style="color: red;">Токен не найден в URL.</p>
      <p>Закройте эту вкладку и попробуйте снова.</p>
    `;
  }
};
