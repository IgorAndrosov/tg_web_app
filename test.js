// Данные для элементов кафе-меню
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
    updateCart(); // Обновляем корзину при изменении значения счетчика
    updateCartButton();
    cartButton.style.display = 'inline-block';
    button.style.display = 'none';
    counter[index].style.display = 'inline-block';

    minusButton[index].style.display = 'inline-block';
    plusButton[index].style.display = 'inline-block';
    
    // Дополнительные действия, которые вы хотите выполнить при нажатии кнопки
    // Например, добавление элемента в корзину или отображение подробной информации
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
      updateCart(); // Обновляем корзину при изменении значения счетчика
      updateCartButton();

    });
  });
  
  plusButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        const currentValue = parseInt(counter[index].textContent);
        counter[index].textContent = parseInt(counter[index].textContent) + 1;
        updateCart(); // Обновляем корзину при изменении значения счетчика
        updateCartButton();
    });
  });

  function updateCart() {
    cart.innerHTML = ""; // Очищаем содержимое корзины

    let total = 0;
  
    // Перебираем все элементы и добавляем в корзину только те, у которых счетчик больше нуля
    for (let i = 0; i < menuData.length; i++) {
      const currentValue = parseInt(counter[i].textContent);
      if (currentValue > 0) {
        const item = menuData[i];
        const cartItem = document.createElement("div");
        cartItem.textContent = `${item.name}: ${currentValue}`;
        cart.appendChild(cartItem);

         // Вычисляем сумму для текущего элемента и добавляем к общей сумме
        const itemPrice = parseFloat(item.price.replace("$", ""));
        const itemTotal = itemPrice * currentValue;
        total += itemTotal;
      }
    };
    const totalElement = document.createElement("div");
  totalElement.textContent = `Общая сумма заказа: $${total.toFixed(2)}`;
  cart.appendChild(totalElement);
};

const cartButton = document.getElementById("cart-button");

// Обработчик события для кнопки "Корзина"
cartButton.addEventListener("click", () => {
  showCartDetails();
});

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

function showCartDetails() {
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

  // Отображаем всплывающее окно с деталями заказа
  alert(`Детали заказа:\n\n${cartItems}\nОбщая сумма заказа: $${total.toFixed(2)}`);
}
