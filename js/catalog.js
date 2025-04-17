const feedbacks_catalogpage = JSON.parse(localStorage.getItem('feedback_array')) || {}

if (Object.keys(feedbacks_catalogpage).length == 0) {
    function loadScript(url) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            console.log('Скрипт загружен успешно:', url);
        };
        
        script.onerror = () => {
            console.error('Ошибка при загрузке скрипта:', url);
        };
        document.head.appendChild(script);
    }
    loadScript('./js/feedbacks-generate.js');
    window.location.assign("./catalog.html")
}
else {

let towars =[]
sizes = ['S','M','L', 'XL']



let hoodies = {name: 'Худи'}
hoodies_name = ["Худи Эйс Синие", "Худи котики черное", "Худи дама коричневое", "Худи розовый лол розовое", "Худи Зеницу желтое", "Худи наруто зеленое", "Худи ван-пис телесный", "Худи Силачи черное", "Худи ДедИнсайд черное", "Лонгслив Эйс белое", "Худи Язычок черное",]
hoodies_cost = [3499, 3599, 3999, 4050, 4050, 4050, 3999, 3499, 3499, 4050, 4050]
for (let i=0; i<=10;i++) {
    hoodies[`item${i}`] = {
        img: [`./media/hoodies/hoddie${i+1}.jpg`,`./media/hoodies/hoddie${i+1}-back.jpg`],
        name: hoodies_name[i],
        cost: hoodies_cost[i],
        sizes: sizes,
        pol: 'women,men', 
        category: "hoodie"
    }
}




pants = {name: 'Штаны'}
pants_name = ["Штаны ВанПис с затяжкой", "Штаны синие с затяжкой", "Штаны молочко с резинкой", "Штаны серые с затяжкой", "Штаны Берсерк черные", "Джинсы Трендовые", "Штаны берсерк варенка", "Штаны ДжоДжо на резинке",]
pants_cost = [8999, 5799, 6050, 8050, 5799, 5799, 8999, 8999]
for (let i=0; i<=7;i++) {
    pants[`item${i}`] = {
        img: [`./media/pants/pants${i+1}.jpg`,`./media/pants/pants${i+1}-back.jpg`],
        name: pants_name[i],
        cost: pants_cost[i],
        sizes: sizes,
        pol: 'women,men', 
        category: "pants"
    }
}




shirts = {name: 'Рубашки'}
shirts_name = ["Рубашка WoterFlow короткий", "Рубашка Магичка короткий", "Рубашка Луфи короткий", "Рубашка Сила розовая длинная", "Рубашка семья длинный", "Рубашка гармония длинный", "Рубашка дракон короткий", "Рубашка шаман короткий"]
shirts_cost = [5999, 6050, 6050, 5999, 4899, 4899, 5050, 6050]
for (let i=0; i<=7;i++) {
    shirts[`item${i}`] = {
        img: [`./media/shirts/shirt${i+1}.jpg`,`./media/shirts/shirt${i+1}-back.jpg`],
        name: shirts_name[i],
        cost: shirts_cost[i],
        sizes: sizes,
        pol: 'women,men', 
        category: "shirt"
    }
}




tshirts = {name: 'Фуболки'}
tshirts_name = ["Футболка глаз варенка", "Футболка саске-опасен варенка", "Футболка эйс варенка", "Футболка в 20:31 варенка", "Футболка happy варенка", "Футболка няшки варенка", "Футболка в-полоску варенка", "Футболка одни кости варенка", "Футболка годжу варенка", "Футболка мегамужик белая", "Футболка пицца варенка", "Футболка нами варенка",]
tshirts_cost = [3899, 4050, 4050, 3899, 3899, 4050, 4050, 3899, 3899, 4050, 4050, 3899]
for (let i=0; i<=11;i++) {
    tshirts[`item${i}`] = {
        img: [`./media/tshirts/tshirt${i+1}.jpg`,`./media/tshirts/tshirt${i+1}-back.jpg`],
        name: tshirts_name[i],
        cost:  tshirts_cost[i],
        sizes: sizes,
        pol: 'women,men', 
        category: 'tshirt'
    }
}



tops = {name: 'Топики'}
tops_name = ["Топик фанатка", "Топик розовый вайб", "Топик ванпис", "Топик мертв внутри"]
tops_cost = [1599, 1699, 1599, 1599]
for (let i=0; i<=3;i++) {
    tops[`item${i}`] = {
        img: [`./media/womens/top${i+1}.jpg`,`./media/womens/top${i+1}-back.jpg`],
        name: tops_name[i],
        cost:  tops_cost[i],
        sizes: sizes,
        pol: 'women', 
        category: 'tops'
    }
}

const parent = document.querySelector(".tovar_cards")

function create_cards(category) {
    parent.insertAdjacentHTML("beforeend", 
        `
        <h1 id="${category["name"]}_h"> ${category["name"]} </h1>
        `
    )
    parent.insertAdjacentHTML("beforeend", 
        `
        <div class="tovar_categories" id="${category["name"]}"> </div>
        `
    )

    let category_tovars = document.querySelector(`#${category["name"]}`)

    for(key in category){
        let rait_catalog = 0
        if (category[key]["name"] != undefined) {
            for(let xyi in feedbacks_catalogpage[category[key]["name"]]) {
                rait_catalog += feedbacks_catalogpage[category[key]["name"]][xyi]["rait"]
            }
            rait_catalog = rait_catalog / Object.keys(feedbacks_catalogpage[category[key]["name"]]).length
        }
    
        if (typeof category[key] != 'string') {
            category_tovars.insertAdjacentHTML("beforeend",  
                `
                <div class="tovar_card" data-category='${category[key]["category"]}', data-size="${category[key]["sizes"]}", data-cost="${category[key]["cost"]}", data-gender="${category[key]["pol"]}"> 
                                    <div class="big_img"> <img src="${category[key]["img"][0]}" alt=""> </div>
                                    <div class="text-line1"> 
                                        <h1> ${category[key]["cost"]}₽ </h1>
                                        <span> <h2>${rait_catalog}</h2> <div class="star-icon"> <img src="./media/icons/star-light.svg" alt=""> </div> </span>
                                    </div>
                                    <h2> ${category[key]["name"]} </h2>
                                    <div class="buttons"> 
                                        <button class="btn_add", data-name="${category[key]["name"]}", data-cost="${category[key]["cost"]}", data-categoryi="${category[key]["category"]}", data-images="${category[key]["img"]}"> В корзину </button>
                                        <button class="btn1", data-name="${category[key]["name"]}", data-cost="${category[key]["cost"]}", data-categoryi="${category[key]["category"]}", data-images="${category[key]["img"]}"> Подробнее </button>
                                    </div>
                                </div>
                `
            )
        }
        
    }
}

create_cards(hoodies)
create_cards(pants)
create_cards(shirts)
create_cards(tshirts)
create_cards(tops)

const filters = document.querySelectorAll(".checkbox")
const set_button = document.querySelector("#filter_submit")

set_button.addEventListener('click', setFilters)

function setFilters() {
    let checked_filters = {};
    for (let i = 0; i < filters.length; i++) {
        if (filters[i].checked) {
            let papa = filters[i].parentNode.parentNode.parentNode; // Поднимаемся на два уровня вверх
            if (!checked_filters[papa.id]) {
                checked_filters[papa.id] = []; // Инициализируем как массив, если еще не существует
            }
            checked_filters[papa.id].push(filters[i].id); // Добавляем id в массив
        }
    }
    console.log(checked_filters);
    let c = 0;

    // Получаем значения из полей ввода для фильтрации по цене
    const minPriceInput = document.querySelector('#cost input[type="ot_number"]');
    const maxPriceInput = document.querySelector('#cost input[type="do_number"]');
    const minPrice = parseFloat(minPriceInput.value) || 0; // Если пусто, то 0
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity; // Если пусто, то бесконечность

    let tovars = document.querySelectorAll(".tovar_card");
    for (let i = 0; i < tovars.length; i++) {
        let showCard = true; // Флаг для отображения карточки товара

        // Проверка по фильтрам
        for (let key in checked_filters) {
            if (checked_filters[key].length > 0) {
                // Получаем значение из dataset
                let datasetValue = tovars[i].dataset[key];

                // Проверяем, если значение в dataset существует
                if (datasetValue) {
                    let datasetArray = datasetValue.split(','); // Преобразуем строку в массив
                    // Если значение в dataset не содержится в массиве checked_filters[key], скрываем карточку
                    if (!checked_filters[key].some(value => datasetArray.includes(value))) {
                        showCard = false; // Устанавливаем флаг в false
                        c++; 
                    }
                }
            }
        }

        // Проверка по цене
        const itemPrice = parseFloat(tovars[i].dataset.cost); // Получаем цену из dataset
        if (itemPrice < minPrice || itemPrice > maxPrice) {
            showCard = false; // Устанавливаем флаг в false, если цена не в диапазоне
            c++
        }

        tovars[i].style.display = showCard ? "flex" : "none"; // Или "flex", в зависимости от вашего CSS

        
    }

    console.log(tovars.length) 
    console.log(c)
    if (c-tovars.length == tovars.length || c == tovars.length) {
        document.querySelector('.tovar_cards').style.display = 'none';
        document.querySelector('.eror_screen').style.display = 'flex';
    } else {
        document.querySelector('.tovar_cards').style.display = 'flex';
        document.querySelector('.eror_screen').style.display = 'none';
    }

    const categoreis_names = ['Худи', 'Штаны', 'Рубашки', 'Фуболки', 'Топики'];

    for (const key of categoreis_names) {
        check_visible_cards(key);
    }
    
    function check_visible_cards(parent_id) {
        const childrens = document.querySelector(`#${parent_id}`).children;
        let visiable = 0;
    
        for (let i = 0; i < childrens.length; i++) {
            // Используем getComputedStyle для проверки стиля display
            if (getComputedStyle(childrens[i]).display === 'none') {
                visiable += 1;
            }
        }
    
        const parent_h = document.querySelector(`#${parent_id}_h`);
        
        // Если все дочерние элементы невидимы, показываем родительский элемент
        if (visiable === childrens.length) {
            parent_h.style.display = 'none';
        } else {
            parent_h.style.display = 'block';
        }
    }
}



document.getElementById('filter_reset').addEventListener('click',reset_filters)
document.getElementById('eror_reset').addEventListener('click',reset_filters)



function reset_filters() {
    // Убедитесь, что filters определены и содержат элементы
    const filters = document.querySelectorAll('input[type="checkbox"], input[type="radio"]'); // Пример, как можно получить все фильтры

    filters.forEach(filter => {
        filter.checked = false; // Сбрасываем состояние фильтров
    });

    // Сбрасываем значения полей ввода для фильтрации по цене
    const minPriceInput = document.querySelector('#cost input[type="ot_number"]');
    const maxPriceInput = document.querySelector('#cost input[type="do_number"]');
    
    if (minPriceInput) {
        minPriceInput.value = ''; // Сбрасываем минимальную цену
    }
    
    if (maxPriceInput) {
        maxPriceInput.value = ''; // Сбрасываем максимальную цену
    }

    // Вызываем функцию для применения фильтров
    setFilters();
}

let show_button_catalog = document.querySelector('.filters_right')
let close_button_catalog = document.querySelector('.cross_filters')

show_button_catalog.addEventListener('click', show_filters)
function show_filters() {
    document.querySelector(".left_block").style.left = '0vh'
}

close_button_catalog.addEventListener('click', close_filters)
function close_filters() {
    document.querySelector(".left_block").style.left = '100vh'
}

function open_product_page() {
    let category = this.dataset.categoryi;
    let product_name = this.dataset.name;
    let cost = this.dataset.cost;
    let images = this.dataset.images;
    let size = ''
    let count = 1
    let product_data = [category, product_name, cost, images, size, count];

    console.log(this.classList.contains('btn1'))
    
    if (this.classList.contains('btn1')) {
        localStorage.setItem('product', product_data);
        a = localStorage.getItem('product')
        window.location.assign("./product.html")
    } 
    else {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        cart[`product${Object.keys(cart).length}`] = product_data;
        localStorage.setItem('cart', JSON.stringify(cart));

        alert("Товар добавлен в корзину!");
    }
}


function add_product_function(a) {
    let buttons = document.querySelectorAll(a)
    for(let i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click',open_product_page)
    }
}

add_product_function('.btn_add')
add_product_function('.btn1')
}
