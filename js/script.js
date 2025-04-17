console.log('start_script')

let open_button = document.querySelector(".burger_icon")
let close_button = document.querySelector("#close")
document.querySelector("#cart").addEventListener('click', function() {
    window.location.assign("./cart.html")
})

close_button.addEventListener('click',hide_menu)
open_button.addEventListener('click',show_menu)

let menu = document.querySelector(".burger_menu");

function show_menu() {
    menu.style.display = 'block';
}

function hide_menu() {
    menu.style.display = 'none';
}

document.querySelector(".header-cart").addEventListener('click', function() {
    window.location.assign("./cart.html")
})