window.onload = () => {
  console.log('Token page loaded');
  
  // Проверьте, что функция существует
  if (typeof YaSendSuggestToken === 'function') {
    console.log('Calling YaSendSuggestToken');
    YaSendSuggestToken('https://my-oauth-site-clean.vercel.app', {
      flag: true
    });
  } else {
    console.error('YaSendSuggestToken not found');
  }
};
