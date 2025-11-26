fetch("https://autofill.yandex.ru/version")
  .then((a) => a.json())
  .then((data) => {
    document.body.innerHTML += `Загрузилась версия: ${JSON.stringify(
      data
    )}<br />`;
  });

window.onload = () => {
  document.body.innerHTML += `Сработал onload <br />`;
};
