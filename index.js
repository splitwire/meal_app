
// https://www.themealdb.com/api.php
//----------------
// DATA
let categoryData;


//----------------
// ELEMENTS
const formElm = document.getElementById("form");
const categorySelectElm = document.getElementById("categories");
const categoryInfoElm = document.getElementById("category-info");


//----------------
// GET FUNCTIONS
async function callAPI(url) {
	try {
		const response = await axios.get(url);

		return response.data;
	}
	catch (error) {
		throw error;
	}
}

async function getRandomRecipes() {
	try {
		const url = "https://www.themealdb.com/api/json/v1/1/random.php";

		return callAPI(url);
	}
	catch (error) {
		throw error;
	}
}

async function getMealCategories() {
	try {
		const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

		return callAPI(url);
	}
	catch (error) {
		throw error;
	}
}

async function getMealBySearchTerm(term) {
	try {
		const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`;

		return callAPI(url);
	}
	catch (error) {
		throw error;
	}
}

//----------------
// LOAD FUNCTIONS
async function loadMealById(id) {
	try {
		const url = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

		return callAPI(url);
	}
	catch (error) {
		throw error;
	}
}

//----------------
// FIND FUNCTIONS
function findCategoryInfo(value) {
	return (categoryData && value)
		? categoryData.find(i => i.idCategory == value)
		: null;
}

//----------------
// POPULATE FILTERS
async function populateMealCategories() {
	try {
		const list = await getMealCategories();

		categoryData = list.categories;

		const options = categoryData
			.sort((a, b) => {
				return a.strCategory.trim().toLowerCase() - b.strCategory.trim().toLowerCase();
			})
			.map(category => {
				return `<option title='${category.strCategoryDescription}' value='${category.idCategory}'>${category.strCategory}</option>`
			});
		
		options.unshift("<option value=''></option>");

		categorySelectElm.innerHTML = options.join("");
	}
	catch (error) {
		throw error;
	}
}

//----------------
// PICKS
function pickCategory(value) {
	const info = findCategoryInfo(value);

	if (info) {
		categoryInfoElm.innerHTML = `
			<div class="row">
				<div class="col-4">
					<img src="${info.strCategoryThumb}" class="img-thumbnail">
				</div>

				<div class="col">
					<p>${info.strCategoryDescription}</p>
				</div>
			</div>
		`
	}
	else {
		// EMPTY INFO ELEMENT
		categoryInfoElm.innerText = "";
	}
}

//----------------

async function initialize() {
	try {
		await populateMealCategories();

	}
	catch (error) {
		console.log(error);
	}
};

initialize();


/*
categorySelectElm.addEventListener("change", evt => {
	console.log(categorySelectElm.value);
});
*/

formElm.addEventListener("change", evt => {
	const { id } = evt.target;

	switch (id) {
		case "categories":
			pickCategory(evt.target.value);
			break;
	}
});
