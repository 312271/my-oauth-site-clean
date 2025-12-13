window.onload = function() {
  console.log('Страница token.html загружена');
  
  // Пробуем отправить токен на главную страницу
  try {
    if (window.YaSendSuggestToken && typeof window.YaSendSuggestToken === 'function') {
      console.log('Вызываем YaSendSuggestToken...');
      YaSendSuggestToken(
        'https://my-oauth-site-clean.vercel.app',
        { flag: true }
      );
    } else {
      console.error('YaSendSuggestToken не найден!');
      
      // Альтернатива: парсим токен из URL
      const hash = window.location.hash;
      if (hash && hash.includes('access_token=')) {
        console.log('Найден токен в URL:', hash);
      }
    }
  } catch (error) {
    console.error('Ошибка в token.js:', error);
  }
};
