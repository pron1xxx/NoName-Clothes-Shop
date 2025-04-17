function create_products_cards() {
    const cart_cartpage = JSON.parse(localStorage.getItem('cart')) || {};
    const products = document.querySelectorAll('.product_card')
    const eror_screen = document.querySelector('.cart_eror')
    const papa_div = document.querySelector('.left_block')

    for (let i=0; i < products.length; i++) {
        products[i].remove()
    } 

    if (Object.keys(cart_cartpage).length === 0) {
        eror_screen.style.display = 'flex'
    }
    else {
        eror_screen.style.display = 'none' 
        console.log(cart_cartpage)
    }

    for(key in cart_cartpage) {
        papa_div.insertAdjacentHTML(
            "beforeend",
            `
            <div class="product_card" id="${key}"> 
                    <div class="product_image"> <img src="${cart_cartpage[key][3].split(',')[0]}" class="open_productpage_button" alt=""> </div>
                    <div class="product_title">
                        <h1> ${cart_cartpage[key][1]} </h1>
                        <h2 id="${key}_cost"> ${cart_cartpage[key][2] * cart_cartpage[key][5]}₽ </h2>

                        <div class="count-product"> 
                            <h1 id="${key}_count"> Количество: ${cart_cartpage[key][5]} </h1>
                            <div class="buttons"> 
                                <button id="plus" class="count" data-product='${key}'> + </button>
                                <button id="minus" class="count" data-product='${key}'> - </button>
                            </div>
                        </div>

                        <div class="product_sizes"> 
                            <ul data-product="${key}" class='${key}'> 
                                <li class="size" id="s"> S </li>
                                <li class="size" id="m"> M </li>
                                <li class="size" id="l"> L </li>
                                <li class="size" id="xl"> XL </li>
                            </ul>
                        </div>
                        <div class="delete_button" data-product="${key}"> <img src="./media/icons/cross.svg" alt=""> Удалить из корзины </div>
                    </div>
                </div>
            `
        )
        console.log(cart_cartpage[key])
        fill_sizes(cart_cartpage[key][4], key)
    }
    fill_cart_data()
    active_promo()
}

function clear_cart(a) {
    localStorage.removeItem('cart')
    if (a != 1) {
        alert("Корзина очищена!")
    }
    create_products_cards()
    console.log(JSON.parse(localStorage.getItem('cart')))
    active_promo()
}
document.querySelector('.clear').addEventListener('click', clear_cart)

document.querySelector('#open_catalog').addEventListener('click', function() {
    window.location.assign('./catalog.html')
})

function change_count() {
    const cart_cartpage = JSON.parse(localStorage.getItem('cart')) || {};

    if (this.id == 'plus') {
        let numver_count = Number(cart_cartpage[this.dataset.product][5])
        numver_count+=1
        cart_cartpage[this.dataset.product][5] = numver_count
    }
    else {
        if (cart_cartpage[this.dataset.product][5] == 1) {
            alert('Количество товара не должно быть меньше одного. Если вы хотите удалить товар из корзины нажмите на красную кноаку ниже')
        }
        else {
            cart_cartpage[this.dataset.product][5] -= 1   
        }
    }

    document.querySelector(`#${this.dataset.product}_cost`).textContent = `${cart_cartpage[this.dataset.product][2] * cart_cartpage[this.dataset.product][5]}₽`
    document.querySelector(`#${this.dataset.product}_count`).textContent = `Количество: ${cart_cartpage[this.dataset.product][5]}`
    localStorage.setItem('cart', JSON.stringify(cart_cartpage));
    fill_cart_data()
    active_promo()
}

function fill_sizes(active_size, product_name) {
    let papa_sizes = document.querySelector(`.${product_name}`)
    const detki_sizes = papa_sizes.children

    for(i=0; i < detki_sizes.length; i++) {
        if (detki_sizes[i].id == active_size) {
            detki_sizes[i].classList.add('checked')
        }
        else {
            detki_sizes[i].classList.remove('checked')
        }
    }
}   

function choose_size() {
    const cart_cartpage = JSON.parse(localStorage.getItem('cart'))
    let product_choose = this.parentNode.dataset.product

    cart_cartpage[product_choose][4] = this.id
    fill_sizes(this.id, product_choose)
    localStorage.setItem('cart', JSON.stringify(cart_cartpage));
    console.log(cart_cartpage)
}

function delete_product() {
    let product_id = this.dataset.product
    let new_products_list = []
    new_cart = {}
    const cart_cartpage = JSON.parse(localStorage.getItem('cart'));

    for (key in cart_cartpage) {
        if (key != product_id) {
            new_products_list.push(cart_cartpage[key])
        }
    }
    
    for(i=0; i<new_products_list.length; i++) {
        new_cart[`product${i}`] = new_products_list[i]
    } 
    
    localStorage.setItem('cart', JSON.stringify(new_cart));


    create_products_cards()
    zapolnalka(".delete_button", delete_product)
    zapolnalka('.count', change_count, 'click')
    zapolnalka(".size", choose_size, 'click')   
    zapolnalka(".open_productpage_button", open_productpage, 'click')
}

function open_productpage() {
    const cart_cartpage = JSON.parse(localStorage.getItem('cart'));

    product_data = cart_cartpage[this.parentNode.parentNode.id]
    let images = product_data[3].split(',')
    product_data[6] =  product_data[5]
    product_data[5] =  product_data[4]
    product_data[3] = images[0]
    product_data[4] = images[1]
    localStorage.setItem('product', product_data);
    window.location.assign('./product.html')
}

function fill_cart_data() {
    const cart_cartpage = JSON.parse(localStorage.getItem('cart'));

    const so_skidka = document.querySelector("#new_coast")
    const count_products = document.querySelector("#count_products_cart")
    let cost = 0
    let count_products_data = 0
    
    for(key in cart_cartpage) {
        cost += Number(cart_cartpage[key][2]) * Number(cart_cartpage[key][5])
        count_products_data += Number(cart_cartpage[key][5])
    }

    console.log(count_products)
    so_skidka.textContent = `${cost}₽`
    count_products.textContent = `Товаров: ${count_products_data}`
    console.log(cost)    
}

function active_promo() {
    const actual_promo = [{promo: 'promo', skidka: 20}]
    let promo = false
    let promo_input = document.querySelector('#promo')
    let skidka_str = document.querySelector("#skidka")
    let promo_number = 0
    let old_cost = document.querySelector("#old_cost")
    let new_cost = document.querySelector("#new_coast")
    let summ_none_skidka = document.querySelector("#new_coast").innerHTML
    summ_none_skidka = Number(summ_none_skidka.split('₽')[0])

    console.log(summ_none_skidka)
    for (i=0; i < actual_promo.length; i++) {
        console.log(actual_promo.length)
        if (promo_input.value === actual_promo[i]["promo"]) {
            promo_number = i
            promo = true
            break
        }
    }

    if (this.textContent == "Отменить" && this.id == "promo_submit") {
        promo = false
        promo_input.value = ''
        promo_input.style.display = 'flex'
        skidka_str.style.display = 'none'
        this.textContent = "Применить"
        old_cost.style.display = 'none'
        new_cost.textContent = old_cost.textContent
        c = 1
        alert("Действие промокода отменено")
    }

    if (promo) {
        skidka_str.textContent = `-${actual_promo[promo_number]["skidka"]}% скидка по коду`
        promo_input.style.display = 'none'
        skidka_str.style.display = 'flex'
        this.textContent = "Отменить"

        old_cost.textContent = new_cost.textContent
        old_cost.style.display = 'flex'
        new_cost.textContent = summ_none_skidka - (summ_none_skidka/100)*actual_promo[promo_number]["skidka"] + "₽"
    }


    if (this.id == "promo_submit" && promo) {
        alert("Промокод применен")
    }

    if (this.id == "promo_submit" && !promo && this.textContent != "Отменить" && c!= 1) {
        alert("Промокод не найден")
    }


    const delivey_prices = {5000: '399', 10000: '199', 15000: '99', 20000: '0'}
    let delivey_cost = document.querySelector("#delivery_cost")
    let progress_delivery = document.querySelector("#progress_delivery")
    let remainder_delivery = document.querySelector("#remainder")
    let remainder_key = 0
    let cost = Number(new_cost.textContent.split('₽')[0])

    progress_delivery.value = cost
    for(key in delivey_prices) {
        if (cost > key) {
            delivey_cost.textContent = delivey_prices[key] + '₽'
            remainder_key = Number(key)+5000
        }

        if (cost < 5000) {
            remainder_key = 10000
        }
    }

    document.querySelector("#new_coast").textContent = `${cost + Number(delivey_prices[remainder_key-5000])}₽`

    if (cost < 20000 ) {
        console.log(remainder_key)
        remainder_delivery.textContent = `до доставки за ${delivey_prices[remainder_key]}₽ осталось ${Math.floor(remainder_key - cost)}₽`
    }
    else {
        remainder_delivery.textContent = "доставка за 0₽"
    }
    
}

function check_input(a) {
    let check = 0
    let items = document.querySelectorAll(".cart_input")
    let button = document.querySelector(".oform")

    for(i=0; i < items.length; i++) {
        console.log(items[i].value)
        if(items[i].value != 0) {
            if(a != 1) {
                check +=1
            }
            else {
                items[i].value = ''
            }
        }
    }

    if (check == 3) {
        button.classList.add('active') 
    }
    else {
        button.classList.remove('active')
    }
}

function order_delivery() {
    const cart_cartpage = JSON.parse(localStorage.getItem('cart')) || {}; 
    let choose_size = true
    for (key in cart_cartpage) {
        if (cart_cartpage[key][4] == '') {
            choose_size = false
        }
    }

    if (choose_size) {
        if (Object.keys(cart_cartpage) == 0) {
            alert("Чтобы офорить заказ добавьте товары в корзину")
        }
        else {
            alert("Ваш заказ оформлен. Спасибо что выбрали нас!")
            clear_cart(1)
            check_input(1)
        }
    }
    else {
        alert("Выберите размеры у вещей в козине!")
    }
}

create_products_cards()

document.querySelectorAll(".cart_input")

function zapolnalka(class_id, function_id, event) {
    let items = document.querySelectorAll(class_id)
    for(let i=0; i<items.length; i++) {
        items[i].addEventListener(event, function_id)
    }
}



zapolnalka('.count', change_count, 'click')
zapolnalka(".size", choose_size, 'click')
zapolnalka(".delete_button", delete_product, 'click')
zapolnalka(".open_productpage_button", open_productpage, 'click')
zapolnalka(".cart_input", check_input, 'change')
zapolnalka(".oform", order_delivery, 'click')
zapolnalka("#promo_submit", active_promo, 'click')
