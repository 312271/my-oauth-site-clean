// Ждем загрузки
window.addEventListener('load', function() {
  console.log('Token page loaded');
  
  // Проверяем функцию
  if (typeof YaSendSuggestToken === 'function') {
    console.log('YaSendSuggestToken доступен, вызываем...');
    
    try {
      YaSendSuggestToken(
        'https://my-oauth-site-clean.vercel.app',
        { flag: true }
      );
      console.log('Функция вызвана успешно');
    } catch (error) {
      console.error('Ошибка вызова:', error);
    }
  } else {
    console.error('YaSendSuggestToken НЕ найден!');
    console.log('Доступные объекты:');
    for (let key in window) {
      if (key.includes('Ya') || key.includes('ya')) {
        console.log('-', key);
      }
    }
  }
});
