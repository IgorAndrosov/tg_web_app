let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.text = "Продолжить";

const menuData = [
    {
      name: "Капучино",
      price: "150₽",
      image: "photo/menu/Capuch.png"
    },
    {
      name: "Латте",
      price: "150₽",
      image: "photo/menu/Latte.png"
    },
    {
        name: "Флэт Уайт",
        price: "180₽",
        image: "photo/menu/Flet.png"
      },
      {
        name: "Американо",
        price: "120₽",
        image: "photo/menu/Americano.png"
      },
      {
        name: "Раф",
        price: "200₽",
        image: "photo/menu/Raf.png"
      },
      {
        name: "Айс кофе",
        price: "150₽",
        image: "photo/menu/Ice.png"
      },
      {
        name: "Чизкейк",
        price: "130₽",
        image: "photo/menu/Cake.png"
      },
      {
        name: "Безе",
        price: "90₽",
        image: "photo/menu/Beze.jpg"
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
    name.textContent = item.name + "\n";
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
    counter[index].style.opacity = '1';

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
        counter[index].style.opacity = '0'
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
  const iframeOverlay = document.getElementById("iframe-overlay");
  iframeOverlay.style.zIndex = '9999';
  tg.MainButton.show();
  //showCartDetails();
});

function updateCartButton() {
    let total = calculateTotal();
  
    // Обновляем текст кнопки с суммой заказа
    cartButton.textContent = `Корзина (${total.toFixed(2)}₽)`;
  };

  function calculateTotal() {
    let total = 0;
  
    // Рассчитываем общую сумму заказа
    for (let i = 0; i < menuData.length; i++) {
      const currentValue = parseInt(counter[i].textContent);
      const itemPrice = parseFloat(menuData[i].price.replace("₽", ""));
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
        updateCartButton(); // Обновляем текст кнопки с суммой заказа
      });
    });
};

function showReceipt() {
  let data = [];
  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
    data = [];
    const iframeOverlay = document.getElementById("iframe-overlay");
    iframeOverlay.classList.remove("show");
    iframeOverlay.style.zIndex = '1';
    tg.MainButton.hide();
  });

  // Создание содержимого чека
  let receiptContent = "<h2>Чек</h2>";
  let cou = 0;

  // Добавление позиций заказа и их суммы
  for (let i = 0; i < menuData.length; i++) {
    const currentValue = parseInt(counter[i].textContent);
    const itemPrice = parseFloat(menuData[i].price.replace("₽", ""));
    const itemTotal = itemPrice * currentValue;
    let cartItems = ""; // Строка для хранения деталей заказа
    let total = 0;

    // Добавьте необходимую логику для формирования строки с позицией и суммой
    if (currentValue > 0) {
      receiptContent += `${menuData[i].name}: ${currentValue} x ${itemPrice.toFixed(2)}₽ = ${itemTotal.toFixed(2)}₽<br>`;
      data[cou] = itemPrice;
      cou = cou + 1;
      total += itemTotal;
    }
  }

  // Вычисление общей суммы заказа
  const total = calculateTotal();
  receiptContent += `<h3>Итого: ${total.toFixed(2)}₽</h3>`;

  data[cou] = total;
  //cou = 0;

  // Установка содержимого чека в iframe
  const receiptIframe = document.getElementById("receipt-iframe");
  receiptIframe.src = `data:text/html;charset=utf-8,${encodeURI(receiptContent)}`;

  closeButton.style.display = 'inline-block';
  const iframeOverlay = document.getElementById("iframe-overlay");

  Telegram.WebApp.onEvent('mainButtonClicked', function(){
    tg.sendData(1); 
    //при клике на основную кнопку отправляем данные в строковом виде
  });

  iframeOverlay.classList.add("show");
}



