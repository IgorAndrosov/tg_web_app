export function sendCartData(API_TOKEN, chat_id, cartData) {
  // Получите данные о содержимом корзины вашего веб-приложения

  // Отправьте данные боту через Telegram Bot API
  var url = 'https://api.telegram.org/bot' + API_TOKEN + '/sendMessage';
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Данные корзины успешно отправлены в бота');
    }
  };
  xhr.send('chat_id=' + chat_id + '&text=' + encodeURIComponent(cartData));
}

export function getCartData() {
  // Ваш код для получения данных о содержимом корзины
  // Верните данные в нужном формате (например, в виде строки или объекта)
  // Пример: return JSON.stringify(cartItems);
}
