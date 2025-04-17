feedbacks = JSON.parse(localStorage.getItem('feedback_array')) || {}
product_data_otz = localStorage.getItem('product')

if (product_data_otz == null) {
    window.location.assign("./catalog.html")
}
else {
product_data_otz = localStorage.getItem('product').split(',')
console.log(feedbacks)

const feedbackForm = document.getElementById('feedbackForm');
const modalOverlay = document.getElementById('modalOverlay');
const feedbackDialog = document.getElementById('feedbackDialog');
const closeDialogButton = document.getElementById('closeDialog');
const stars = document.querySelectorAll(".star")

document.querySelector("#product-redirect").addEventListener('click', function() {
    window.location.assign("./product.html")
})

console.log(product_data_otz)
console.log(feedbacks[product_data_otz[1]])


function fill_page() {
    const product_image = document.querySelector(".product_image")
    const product_name = document.querySelector("#product-name")
    const zakrep = document.querySelector("#fixed_feedback")
    const zakrep_h = document.querySelector("#zakrep_h")
    const fixed_stars = document.querySelectorAll('.fixed_star')
    const parent_block = document.querySelector('.feed-scroll')
    let product_rait = 0
    const product_all_rait_visiable =  document.querySelector("#raiting")

    for(key in feedbacks[product_data_otz[1]]) {
        console.log(product_rait)
        product_rait += feedbacks[product_data_otz[1]][key]['rait']
        if (key != 'zakrep') {
            parent_block.insertAdjacentHTML("beforeend", 
                `
                <div class="otz_card bid-otz"> 
                <div class="otz_header"> <img src="./media/category1.png" alt=""> <h2 id="user_name"> ${feedbacks[product_data_otz[1]][key]['user_name']} </h2> </div>
                <div class="stars"> 
                    <ul> 
                        <li><img src="./media/icons/star-grey.svg" alt="" id="${key}"></li>
                        <li><img src="./media/icons/star-grey.svg" alt="" id="${key}"></li>
                        <li><img src="./media/icons/star-grey.svg" alt="" id="${key}"></li>
                        <li><img src="./media/icons/star-grey.svg" alt="" id="${key}"></li>
                        <li><img src="./media/icons/star-grey.svg" alt="" id="${key}"></li>
                    </ul>
                </div>
                <h2 id="feedback_text"> ${feedbacks[product_data_otz[1]][key]['feedback_text']} </h2>
            </div>
                `
            )
            const stats_otz = document.querySelectorAll(`#${key}`)
            for (let i=0; i < feedbacks[product_data_otz[1]][key]['rait']; i++) {
                stats_otz[i].src = "./media/icons/star-light.svg"
            }
        }
    }

    if (Object.keys(feedbacks[product_data_otz[1]]['zakrep']).length == 0) {
        zakrep.remove()
        zakrep_h.insertAdjacentHTML('beforeend', 
            `
            <h1> Закрепленного отзыва нет! Может это будет ваш?</h1>
            `
        )
        document.querySelector(".product-info").style.justifyContent = "start"
        product_all_rait_visiable.textContent = product_rait / Object.keys(feedbacks[product_data_otz[1]]).length - 1
    }
    else {
        document.querySelector("#user_name_zakrep").textContent = feedbacks[product_data_otz[1]]['zakrep']['user_name']
        for (let i=0; i < feedbacks[product_data_otz[1]]['zakrep']['rait']; i++) {
            fixed_stars[i].src = "./media/icons/star-light.svg"
        }
        document.querySelector("#feedback_text_zakrep").textContent = feedbacks[product_data_otz[1]]['zakrep']['feedback_text']

        product_all_rait_visiable.textContent = product_rait / Object.keys(feedbacks[product_data_otz[1]]).length
    }
    product_image.style.backgroundImage = `url(${product_data_otz[3]})`;
    product_name.textContent = product_data_otz[1]
}

for(let i=0; i < stars.length; i++) {
    stars[i].addEventListener('click', function() {
        for (i=0; i < stars.length; i++) {
            stars[i].src = "./media/icons/star-grey.svg"
        }
        for(i=0; i < this.id; i++) {
            stars[i].src = "./media/icons/star-light.svg"
        } 
    }) 
}

// Открытие модального окна при отправке формы
feedbackForm.addEventListener('submit', function(event) {
    let grade = false
    let rait = 0

    const modal_smile = document.querySelector("#smile")
    const modal_reaction = document.querySelector('#feedback_modal_reaction')

    for (i=0; i < stars.length; i++) {
        if (stars[i].src.includes("/media/icons/star-light.svg")) {
            grade = true
            rait +=1
        }
    }
    event.preventDefault(); // Предотвращаем отправку формы

    if (grade) {
        if (rait <= 3) {
            modal_smile.textContent = "=("
            modal_reaction.textContent = "Спасибо за обратную связь!"
        }
        else {
            modal_smile.textContent = "=)"
            modal_reaction.textContent = "Рады что вам все понравилось!"   
        }
        modalOverlay.style.display = 'block'; // Показываем затемнение
        feedbackDialog.style.display = 'flex'; // Показываем модальное окно
    }
    else {
        alert("Поставьте оценку!")
    }
    
});

// Закрытие модального окна
closeDialogButton.addEventListener('click', function() {
    feedbackForm.submit()
    modalOverlay.style.display = 'none'; // Скрываем затемнение
    feedbackDialog.style.display = 'none'; // Скрываем модальное окно
    for (i=0; i < stars.length; i++) {
        stars[i].src = "./media/icons/star-grey.svg"
    }
});


fill_page()
}
