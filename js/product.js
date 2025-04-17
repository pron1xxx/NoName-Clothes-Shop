product_data_pr = localStorage.getItem('product')
console.log(product_data_pr)

if (product_data_pr == null) {
    window.location.assign("./catalog.html")
}
else {
    product_data_pr = localStorage.getItem('product').split(',') 
const category_p = {
    tshirt: `
    Легкая унисекс футболка. Стирка футболки производится при температуре не выше 40 градусов в деликатном или ручном режиме. Использование пятновыводителей исключено.
    Полученное вами изделие может иметь незначительные отличия от образцов представленных на фотографиях, так как трендовый эффект старения и потёртости достигается за счет определенных методов окрашивания изделия.
    `,
    shirt: `
    Широкая хлопковая рубашка свободного прямого кроя с вместительным нагрудным карманом. Легкий, приятный к телу материал и широкая форма обеспечивают комфорт и свободу передвижения. Изделие необходимо гладить, вывернув его на изнанку. Температура утюга - не более 110 градусов Цельсия. Только сухая глажка.
    `,
    hoodie: `
    Теплая и мягкая к телу толстовка из высококачественного плотного хлопка. Просторный основной карман скрывает внутри несколько небольших карманов для мелочи, ключей или телефона. Свободный крой позволит оставаться активным даже в прохладную погоду.
    `,
    pants: `
    Дизайн штанов посвящен главному герою аниме и манги One Peace – легендарному Манки Д. Луффи.
    Штаны оверсайз силуэта цвета мокко из ткани средней плотности без начеса. Пояс регулируется шнурком, брючина шляпной резинкой.
    `,
    top: `
    Топ на бретелях из качественного хлопка. Его можно носить как одежду первого слоя и как самостоятельную верхнюю одежду. Тонкие бретели и базовый цвет позволяют комбинировать топ с многими цветами и дополнять сложные образы.
    `
}
const head_button = document.querySelector('#head');
const back_button = document.querySelector('#back');
const main_screen = document.querySelector(".big_photo");
const product_name = document.querySelector('#product_name')
const product_cost = document.querySelector('#product_cost')
const product_p = document.querySelector('#product_p')


function fill_content() {
    head_button.style.backgroundImage = `url(${product_data_pr[3]})`;
    back_button.style.backgroundImage = `url(${product_data_pr[4]})`;
    main_screen.style.backgroundImage = `url(${product_data_pr[3]})`;
    product_name.textContent = product_data_pr[1]
    product_cost.textContent = product_data_pr[2] + '₽'

    switch(product_data_pr[0]) {
        case 'hoodie':
            product_p.textContent = category_p["hoodie"];
            break;
        case 'pants':
            product_p.textContent = category_p["pants"];
            break;
        case 'shirt':
            product_p.textContent = category_p["shirt"];
            break;
        case 'shirt':
            product_p.textContent = category_p["shirt"];
            break;
        case 'tshirt':
            product_p.textContent = category_p["tshirt"];
            break;
        case 'tops':
            product_p.textContent = category_p["top"];
            break;
    }

    const feedbacks_productpage = JSON.parse(localStorage.getItem('feedback_array'))
    let rait = 0
    for(key in feedbacks_productpage[product_data_pr[1]]) {
        rait += feedbacks_productpage[product_data_pr[1]][key]["rait"]
    }
    document.querySelector("#all_rait").textContent = rait / Object.keys(feedbacks_productpage[product_data_pr[1]]).length
    document.querySelector("#feedback_username").textContent = feedbacks_productpage[product_data_pr[1]]['zakrep']['user_name']
    document.querySelector("#feedback_text").textContent = feedbacks_productpage[product_data_pr[1]]['zakrep']['feedback_text']
    let stars = document.querySelectorAll('.stars')
    for(let i=0; i < feedbacks_productpage[product_data_pr[1]]['zakrep']['rait']; i++) {
        stars[i].src = "./media/icons/star-light.svg"
    }
    document.querySelector(".otz_count_block").textContent = `+${Object.keys(feedbacks_productpage[product_data_pr[1]]).length - 1} `
}


function change_photo() {    
    const currentBackground = getComputedStyle(main_screen).backgroundImage.split('/');

    if (currentBackground.includes(`${product_data_pr[3].split('/')[3]}")`) && this.id === 'back') {
        main_screen.style.backgroundImage = `url(${product_data_pr[4]})`;
    }
    else if (currentBackground.includes(`${product_data_pr[3].split('/')[3]}")`) && this.id === 'big') {
        main_screen.style.backgroundImage = `url(${product_data_pr[4]})`;
    }
    else {
        main_screen.style.backgroundImage = `url(${product_data_pr[3]})`; 
    }
}


back_button.addEventListener('click', change_photo);
head_button.addEventListener('click', change_photo);
main_screen.addEventListener('click', change_photo);

const sizes_divs = document.querySelectorAll('.sz')
for (let i=0; i < sizes_divs.length; i++) {
    sizes_divs[i].addEventListener('click', set_size);
}

function set_size() {
    for (let i=0; i < sizes_divs.length; i++) {
        sizes_divs[i].classList.remove('checked')
    }

    this.classList.add('checked')
}

function add_to_cart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};  
    
    let size_actual = document.querySelector('.checked');
    if (size_actual == null) {
        alert("Чтобы добавить товар в корзину, выберете размер");
        return; // Выход из функции, если размер не выбран
    }

    // Обновляем данные о продукте
    product_data_pr[4] = size_actual.id;
    product_data_pr[5] = Number(product_data_pr[6]);
    console.log(product_data_pr);

    // Проверяем, есть ли товар уже в корзине
    let productExists = false;
    for (let key in cart) {
        if (cart[key][1] == product_data_pr[1]) {
            productExists = true;
            break; // Выходим из цикла, если товар найден
        }
    }

    if (productExists) {
        alert("Товар уже добавлен в корзину");
    } else {
        // Добавляем товар в корзину
        cart[`product${Object.keys(cart).length}`] = product_data_pr;
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
        alert("Товар добавлен в корзину!"); 
    }
}

fill_content()
document.querySelector('#add_cart').addEventListener('click', add_to_cart)
document.querySelector(".otz_count_block").addEventListener('click', function() {
    window.location.assign('./feedback.html')
})
}