document.getElementById("suggest").onclick = () => {
  YaAuthSuggest.init(
    {
      client_id: "2ac30da3005b46029619b9c3a7388b26",
      response_type: "token",
      redirect_url: "https://my-oauth-site-clean.vercel.app/token.html",
    },
    "https://my-oauth-site-clean.vercel.app"
  )
    .then(({ handler }) => handler())
    .then(async (data) => {
      const result = await fetchYandexData(data.access_token);
      authorize(result);
      console.log(result, data);
    })
    .catch((error) => console.log("Что-то пошло не так: ", error));
};
