let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

const menuData = [
    {
      name: "Burger",
      price: "$4.99",
      image: "photo/logo.jpg"
    },
    {
      name: "Pizza",
      price: "$9.99",
      image: "photo/logo.jpg"
    },
    {
        name: "Pizza",
        price: "$9.99",
        image: "photo/logo.jpg"
      },
      {
        name: "Pizza",
        price: "$9.99",
        image: "photo/logo.jpg"
      },
      {
        name: "Pizza",
        price: "$9.99",
        image: "photo/logo.jpg"
      },
      {
        name: "Pizza",
        price: "$9.99",
        image: "photo/logo.jpg"
      },
      {
        name: "Pizza",
        price: "$9.99",
        image: "photo/logo.jpg"
      },
      {
        name: "Pizza",
        price: "$9.99",
        image: "photo/logo.jpg"
      },
  ];
  
  const menuContainer = document.getElementById("menu-container");
  
  // Создаем элементы кафе-меню и добавляем их в контейнер
  menuData.forEach(item => {
    // Создаем элемент кафе-меню
    const cafeItem = document.createElement("div");
    cafeItem.classList.add("cafe-item");
  
    const cafeCounter = document.createElement("div");
    cafeCounter.classList.add("cafe-item-counter");
    cafeCounter.textContent = 0;
    cafeItem.appendChild(cafeCounter);

    // Создаем изображение
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    cafeItem.appendChild(image);
  
    // Создаем название
    const name = document.createElement("span");
    name.classList.add("cafe-item-name");
    name.textContent = item.name;
    cafeItem.appendChild(name);
  
    // Создаем цену
    const price = document.createElement("span");
    price.classList.add("cafe-item-price");
    price.textContent = item.price;
    cafeItem.appendChild(price);
  
    // Создаем кнопку "Добавить"
    const addButton = document.createElement("button");
    addButton.classList.add("add-button");
    addButton.textContent = "Добавить";
    cafeItem.appendChild(addButton);

    const minusButton = document.createElement("button");
    minusButton.classList.add("minus-button");
    minusButton.textContent = "-";
    cafeItem.appendChild(minusButton);

    const plusButton = document.createElement("button");
    plusButton.classList.add("plus-button");
    plusButton.textContent = "+";
    cafeItem.appendChild(plusButton);
  
    // Добавляем элемент кафе-меню в контейнер
    menuContainer.appendChild(cafeItem);
  });
  
const cart = document.getElementById("cart");
const addButton = document.querySelectorAll('.add-button');
const counter = document.querySelectorAll('.cafe-item-counter');
const minusButton = document.querySelectorAll('.minus-button');
const plusButton = document.querySelectorAll('.plus-button');

addButton.forEach((button, index) => {
  button.addEventListener("click", () => {

    const currentValue = parseInt(counter[index].textContent);
    counter[index].textContent = currentValue + 1;
    updateCartButton();
    cartButton.style.display = 'inline-block';
    button.style.display = 'none';
    counter[index].style.display = 'inline-block';

    minusButton[index].style.display = 'inline-block';
    plusButton[index].style.display = 'inline-block';
    
  });
});

minusButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      const currentValue = parseInt(counter[index].textContent);

      if (currentValue == 1) {
        button.style.display = 'none';
        plusButton[index].style.display = 'none';
        counter[index].style.display = 'none';
        addButton[index].style.display = 'inline-block';
      }

      counter[index].textContent = currentValue - 1;
      updateCartButton();

    });
  });
  
  plusButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        const currentValue = parseInt(counter[index].textContent);
        counter[index].textContent = parseInt(counter[index].textContent) + 1;
        updateCartButton();
    });
  });

const cartButton = document.getElementById("cart-button");
cartButton.textContent = 'Корзина';

var msg;

// Обработчик события для кнопки "Корзина"
cartButton.addEventListener("click", () => {
  msg = showReceipt();
  if (tg.MainButton.isVisible) {
    tg.MainButton.hide();
  }
  else{
    tg.MainButton.setText("Готово!");
    tg.MainButton.show();
  }
  //showCartDetails();
});



Telegram.WebApp.onEvent("mainButtonClicked", function(){
  tg.sendData(cartButton);
});

let p = document.createElement("p");



function updateCartButton() {
    let total = calculateTotal();
  
    // Обновляем текст кнопки с суммой заказа
    cartButton.textContent = `Корзина ($${total.toFixed(2)})`;
  };

  function calculateTotal() {
    let total = 0;
  
    // Рассчитываем общую сумму заказа
    for (let i = 0; i < menuData.length; i++) {
      const currentValue = parseInt(counter[i].textContent);
      const itemPrice = parseFloat(menuData[i].price.replace("$", ""));
      const itemTotal = itemPrice * currentValue;
  
      total += itemTotal;
    }
  
    return total;
  }
  
  // Обновляем кнопку при изменении количества товаров в корзине
  function updateButtonOnQuantityChange() {
    const addButton = document.querySelectorAll('.add-button');
    const minusButton = document.querySelectorAll('.minus-button');
    const plusButton = document.querySelectorAll('.plus-button');
  
    addButton.forEach((button, index) => {
      button.addEventListener("click", () => {
        // Обработчик события при нажатии кнопки "Добавить"
  
        // Ваш код для изменения количества и других действий
  
        updateCartButton(); // Обновляем текст кнопки с суммой заказа
      });
    });
};

/*function showCartDetails() {
  let cartItems = ""; // Строка для хранения деталей заказа
  let total = 0; // Переменная для отслеживания общей суммы заказа

  // Формируем детали заказа
  for (let i = 0; i < menuData.length; i++) {
    const currentValue = parseInt(counter[i].textContent);
    const itemPrice = parseFloat(menuData[i].price.replace("$", ""));
    const itemTotal = itemPrice * currentValue;

    // Добавляем детали заказа, если количество больше нуля
    if (currentValue > 0) {
      cartItems += `${menuData[i].name}: ${currentValue} x $${itemPrice.toFixed(2)} = $${itemTotal.toFixed(2)}\n`;
      total += itemTotal;
    }
  }

}*/

function showReceipt() {
  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
  const iframeOverlay = document.getElementById("iframe-overlay");
  iframeOverlay.classList.remove("active");
  });

  // Создание содержимого чека
  let receiptContent = "<h2>Чек</h2>";

  // Добавление позиций заказа и их суммы
  for (let i = 0; i < menuData.length; i++) {
    const currentValue = parseInt(counter[i].textContent);
    const itemPrice = parseFloat(menuData[i].price.replace("$", ""));
    const itemTotal = itemPrice * currentValue;
    let cartItems = ""; // Строка для хранения деталей заказа
    let total = 0;

    // Добавьте необходимую логику для формирования строки с позицией и суммой
    if (currentValue > 0) {
      receiptContent += `${menuData[i].name}: ${currentValue} x $${itemPrice.toFixed(2)} = $${itemTotal.toFixed(2)}\n`;
      total += itemTotal;
    }
  }

  // Вычисление общей суммы заказа
  const total = calculateTotal();
  receiptContent += `<h3>Итого: $${total.toFixed(2)}</h3>`;

  // Установка содержимого чека в iframe
  const receiptIframe = document.getElementById("receipt-iframe");
  receiptIframe.src = `data:text/html;charset=utf-8,${encodeURI(receiptContent)}`;

  closeButton.style.display = 'inline-block';
  const iframeOverlay = document.getElementById("iframe-overlay");
  iframeOverlay.classList.add("active");
  return JSON.stringify(receiptContent);
}



