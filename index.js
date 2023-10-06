
// https://www.themealdb.com/api.php

const categorySelectElm = document.getElementById("categories");


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
// POPULATE FILTERS
async function populateMealCategories() {
	try {
		const list = await getMealCategories();

		const options = list.categories
			.sort((a, b) => {
				return a.strCategory.trim().toLowerCase() - b.strCategory.trim().toLowerCase();
			})
			.map(category => {
				return `<option title='${category.strCategoryDescription}' value='${category.idCategory}'>${category.strCategory}</option>`
			});

		categorySelectElm.innerHTML = options.join("");

	}
	catch (error) {
		throw error;
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


categorySelectElm.addEventListener("change", evt => {
	console.log(categorySelectElm.value);
});