// Дані про сети суші
const sushiSets = [
    { id: 1, name: "Філадельфія", description: "Ніжний сет з лососем, вершковим сиром та огірком", price: 420, image: "https://966.ua/upload/iblock/975/9754cb6854a63d7bc6db43ed391daafe.jpg" },
    { id: 2, name: "Каліфорнія", description: "Класичний сет з крабом, авокадо та огірком", price: 380, image: "🟧" },
    { id: 3, name: "Дракон", description: "Сет з вугром, авocado та унагі соусом", price: 460, image: "🟨" },
    { id: 4, name: "Гейша", description: "Сет з тунцем, лососем та спайсі соусом", price: 440, image: "🟩" },
    { id: 5, name: "Самурай", description: "Сет з куркою темпура та соусом теріякі", price: 400, image: "🟦" },
    { id: 6, name: "Токіо", description: "Сет з лососем, тунцем та авокадо", price: 480, image: "🟪" },
    { id: 7, name: "Осака", description: "Сет з креветкою, лососем та ікрою масаго", price: 450, image: "🟫" },
    { id: 8, name: "Кіото", description: "Сет з вугром, крабом та вершковим сиром", price: 490, image: "⬜" },
    { id: 9, name: "Йокогама", description: "Сет з тунцем, лососем та огірком", price: 430, image: "⬛" },
    { id: 10, name: "Монстр", description: "Наш фірмовий сет з різноманітними морепродуктами", price: 520, image: "🟥" }
];

// Змінні для роботи з кошиком
let cart = [];
let user = null;

// DOM елементи
const sushiSetsContainer = document.getElementById('sushi-sets-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const registerModal = document.getElementById('register-modal');
const loginModal = document.getElementById('login-modal');
const closeRegister = document.getElementById('close-register');
const closeLogin = document.getElementById('close-login');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Функція для відображення сетів суші
function renderSushiSets() {
    sushiSetsContainer.innerHTML = '';
    
    sushiSets.forEach(set => {
        const setElement = document.createElement('div');
        setElement.className = 'sushi-card';
        setElement.innerHTML = `
            <div class="sushi-image">${set.image} ${set.name}</div>
            <div class="sushi-info">
                <h3>${set.name}</h3>
                <p>${set.description}</p>
                <span class="sushi-price">${set.price} грн</span>
                <button class="add-to-cart" data-id="${set.id}">Додати до кошика</button>
            </div>
        `;
        
        sushiSetsContainer.appendChild(setElement);
    });
    
    // Додаємо обробники подій для кнопок додавання в кошик
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const setId = parseInt(e.target.getAttribute('data-id'));
            addToCart(setId);
        });
    });
}

// Функція додавання товару в кошик
function addToCart(setId) {
    const set = sushiSets.find(item => item.id === setId);
    if (!set) return;
    
    const existingItem = cart.find(item => item.id === setId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: set.id,
            name: set.name,
            price: set.price,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Показуємо сповіщення про додавання
    alert(`"${set.name}" додано до кошика!`);
}

// Функція оновлення відображення кошика
function updateCart() {
    // Перевіряємо, чи кошик не порожній
    const emptyMessage = cartItemsContainer.querySelector('.empty-cart-message');
    if (cart.length === 0) {
        if (!emptyMessage) {
            const message = document.createElement('p');
            message.className = 'empty-cart-message';
            message.textContent = 'Ваш кошик порожній';
            cartItemsContainer.appendChild(message);
        }
    } else {
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        // Очищаємо контейнер і додаємо товари
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price} грн x ${item.quantity}</p>
                </div>
                <div>
                    <button class="btn remove-from-cart" data-id="${item.id}">Видалити</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Додаємо обробники подій для кнопок видалення
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const setId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(setId);
            });
        });
    }
    
    // Оновлюємо загальну суму
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `Загальна сума: ${total} грн`;
}

// Функція видалення товару з кошика
function removeFromCart(setId) {
    cart = cart.filter(item => item.id !== setId);
    updateCart();
}

// Обробник події для кнопки оформлення замовлення
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Кошик порожній! Додайте товари перед оформленням замовлення.');
        return;
    }
    
    if (!user) {
        alert('Будь ласка, увійдіть або зареєструйтесь для оформлення замовлення.');
        registerModal.style.display = 'flex';
        return;
    }
    
    alert('Замовлення оформлено! Дякуємо за покупку!');
    cart = [];
    updateCart();
});

// Відкриття модальних вікон
registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Закриття модальних вікон
closeRegister.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Закриття модальних вікон при кліку поза контентом
window.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Обробка форми реєстрації
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    // Тут буде логіка реєстрації (в ідеалі - відправка на сервер)
    user = { name, email };
    alert(`Реєстрація успішна! Вітаємо, ${name}!`);
    registerModal.style.display = 'none';
    
    // Очищаємо форму
    registerForm.reset();
});

// Обробка форми входу
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Тут буде логіка входу (в ідеалі - перевірка на сервері)
    // Для демонстрації просто вважаємо, що вхід успішний
    user = { email };
    alert(`Вітаємо з поверненням!`);
    loginModal.style.display = 'none';
    
    // Очищаємо форму
    loginForm.reset();
});

// Ініціалізація сторінки
document.addEventListener('DOMContentLoaded', () => {
    renderSushiSets();
    updateCart();
});