const feedbacks_generate = {
};

// Списки товаров
const hoodies = [
    'Худи Эйс Синие', 'Худи котики черное', 'Худи дама коричневое', 
    'Худи розовый лол розовое', 'Худи Зеницу желтое', 'Худи наруто зеленое', 
    'Худи ван-пис телесный', 'Худи Силачи черное', 'Худи ДедИнсайд черное', 
    'Лонгслив Эйс белое', 'Худи Язычок черное'
];

const pants = [
    'Штаны ВанПис с затяжкой', 'Штаны синие с затяжкой', 
    'Штаны молочко с резинкой', 'Штаны серые с затяжкой', 
    'Штаны Берсерк черные', 'Джинсы Трендовые', 
    'Штаны берсерк варенка', 'Штаны ДжоДжо на резинке'
];

const shirts = [
    'Рубашка WoterFlow короткий', 'Рубашка Магичка короткий', 
    'Рубашка Луфи короткий', 'Рубашка Сила розовая длинная', 
    'Рубашка семья длинный', 'Рубашка гармония длинный', 
    'Рубашка дракон короткий', 'Рубашка шаман короткий'
];

const tShirts = [
    'Футболка глаз варенка', 'Футболка саске-опасен варенка', 
    'Футболка эйс варенка', 'Футболка в 20:31 варенка', 
    'Футболка happy варенка', 'Футболка няшки варенка', 
    'Футболка в-полоску варенка', 'Футболка одни кости варенка', 
    'Футболка годжу варенка', 'Футболка мегамужик белая', 
    'Футболка пицца варенка', 'Футболка нами варенка'
];

const tops = [
    'Топик фанатка', 'Топик розовый вайб', 
    'Топик ванпис', 'Топик мертв внутри'
];

// Функция для генерации случайного отзыва
function generateFeedback(userName) {
    const rating = Math.floor(Math.random() * 5) + 1; // Оценка от 1 до 5
    let feedbackText = '';

    if (rating <= 2) {
        feedbackText = `К сожалению, я не доволен этим товаром. У него есть недостатки, такие как плохое качество и неудачный дизайн.`;
    } else if (rating === 3) {
        feedbackText = `Товар неплохой, но есть некоторые недостатки. Например, он не совсем удобен в носке.`;
    } else if (rating === 4) {
        feedbackText = `Хороший товар, но есть небольшие недочеты. В целом, я доволен покупкой.`;
    } else {
        feedbackText = `Отличный товар! Я очень доволен качеством и дизайном. Рекомендую всем!`;
    }

    return {
        user_name: userName,
        rait: rating,
        feedback_text: feedbackText
    };
}

// Заполнение объекта feedbacks
const userNames = ['мандаринка', 'ананас', 'яблоко', 'груша', 'персик'];

const allProducts = [...hoodies, ...pants, ...shirts, ...tShirts, ...tops];

allProducts.forEach(product => {
    feedbacks_generate[product] = {}; // Инициализируем объект для каждого продукта

    // Генерируем закрепленный отзыв
    const userNameForZakrep = userNames[Math.floor(Math.random() * userNames.length)];
    feedbacks_generate[product]['zakrep'] = generateFeedback(userNameForZakrep); // Добавляем закрепленный отзыв

    // Генерируем случайное количество обычных отзывов
    const numberOfReviews = Math.floor(Math.random() * 2) + 3; // 3-4 отзыва

    for (let i = 0; i < numberOfReviews; i++) {
        const userName = userNames[Math.floor(Math.random() * userNames.length)]; // Случайное имя пользователя
        feedbacks_generate[product][`otz${i + 1}`] = generateFeedback(userName); // Добавляем обычный отзыв
    }
});

localStorage.setItem('feedback_array', JSON.stringify(feedbacks_generate))