
const mealsEl = document.getElementById('meals');
const favMeals = document.getElementById('favMeals');
const mealPopup = document.getElementById('meal-popup');
const mealInfoEl = document.getElementById('meal-info')
const popupCloseBtn = document.getElementById('close-popup');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

getRandomMeal();
fecthFavMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meal = respData.meals;

    return meal;
}

function addMeal(mealData, random = false) {
    console.log(mealData);
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
                <div class="meal-header">
                ${random ? `
                    <span class="random">
                    Random Recipe
                </span>
                ` : ''}
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn"><i class="fa-solid fa-heart"></i></button>
                </div>
    `;

    const btn = meal.querySelector('.meal-body .fav-btn');

    btn.addEventListener("click", () => {
        if (btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.toggle("active");
        }

        fecthFavMeals();
    });

    const img = meal.querySelector('img');

    img.addEventListener('click', () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fecthFavMeals() {
    favMeals.innerHTML = '';

    const mealIds = getMealLS();

    const meals = [];

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);

        addMealFav(meal);
    }
}

function addMealFav(mealData) {
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal}</span></img>
                <button class="clear"><i class="fa-solid fa-circle-xmark"></i></button>
    `;
    
    favMeal.addEventListener('click', () => {
        showMealInfo(mealData);
    });

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        removeMealLS(mealData.idMeal);

        fecthFavMeals();
    });

    favMeals.appendChild(favMeal);
}

function showMealInfo(mealData) {
    mealInfoEl.innerHTML = '';

    const mealEl = document.createElement('div');

    ingredients = [];

    for (let i = 1; i < 21; i++) {
        if (mealData[`strIngredient`+i]) {
            ingredients.push(`${mealData[`strIngredient`+i]} / ${mealData[`strMeasure`+i]}`)
        } else {
            break;
        }
    }

    mealInfoEl.appendChild(mealEl);

    mealEl.innerHTML = `
                <h1>${mealData.strMeal}</h1>
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                <p>${mealData.strInstructions}</p>
                <h3>Ingredients : </h3>
                <ul>
                    ${ingredients.map((ing) => `
                    <li>${ing}</li>
                    `).join('')}
                </ul>
                `;

    mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener('click', async () => {
    mealsEl.innerHTML = '';
    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);

    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    } else {

    }
});

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});