let beerList = []; // Array que vai receber os dados da API
let currentPage = 1; // Variavel que recebe a pagina atual
let itemsPerPage = document.getElementById("itemsPerPage"); // Variavel que recebe o valor do dropdown de itens por pagina
let totalPages; // Variavel que depois vai receber o total de paginas
function getData() {
	// Criacao da funcao que usa o fetch para chamar a API usando o metodo GET
	fetch("https://api.punkapi.com/v2/beers")
		.then((response) => response.json()) // Essa linha espera a API responder e transforma a resposta em JSON
		.then((data) => {
			// Essa linha espera o json ser transformado e atribui o valor a variavel data
			beerList = data.map((item) => ({
				// Essa linha mapeia o array data e cria um novo array so com os dados necessarios
				id: item.id,
				name: item.name,
				tagline: item.tagline,
				description: item.description,
				image: item.image_url,
			}));
			totalPages = Math.ceil(beerList.length / itemsPerPage.value);
			createList();
		})
		.catch((error) => {
			console.log("Error:", error);
		});
}

itemsPerPage.addEventListener("change", () => {
	totalPages = Math.ceil(beerList.length / itemsPerPage.value);
	currentPage = 1;
	createList();
});

function createList() {
	let start = (currentPage - 1) * itemsPerPage.value;
	let end = start + parseInt(itemsPerPage.value);
	let paginatedItems = beerList.slice(start, end);

	let table = document.getElementById("beer-table");
	table.innerHTML = "";
	paginatedItems.forEach((beer) => {
		let beerRow = document.createElement("tr");
		beerRow.innerHTML = `
            <td><img src="${beer.image}" alt="${beer.name}" width="100px"></td>
            <td>${beer.id}</td>
            <td>${beer.name}</td>
            <td>${beer.tagline}</td>
            <td>${beer.description}</td>
        `;
		table.appendChild(beerRow);
	});

	let paginationControls = document.getElementById("paginationControls");
	paginationControls.innerHTML = "";
	for (let i = 1; i <= totalPages; i++) {
		let button = document.createElement("button");
		button.innerText = i;
		button.addEventListener("click", () => {
			currentPage = i;
			createList();
		});
		paginationControls.appendChild(button);
	}
}

getData();
