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
			totalPages = Math.ceil(beerList.length / itemsPerPage.value); // Calcula o total de paginas
			createList(); // Chama a funcao que cria a lista para exibir os dados
		})
		.catch((error) => {
			// Caso ocorra algum erro, ele sera exibido no console
			console.log("Error:", error);
		});
}

itemsPerPage.addEventListener("change", () => {
	// Evento que observa a mudanca do dropdown de itens por pagina
	totalPages = Math.ceil(beerList.length / itemsPerPage.value); // Calcula o total de paginas
	currentPage = 1; // Reseta a pagina atual
	createList(); // Chama a funcao que cria a lista para atualizar a pagina
});

function createList() {
	// Funcao que cria a lista de acordo com a pagina atual e o numero de itens por pagina
	let start = (currentPage - 1) * itemsPerPage.value; // Calcula o inicio da pagina atual de acordo com o numero de itens por pagina
	let end = start + parseInt(itemsPerPage.value); // Calcula o fim da pagina atual de acordo com o numero de itens por pagina
	let paginatedItems = beerList.slice(start, end); // Cria um novo array com os itens da pagina atual

	let table = document.getElementById("beer-table"); // Seleciona a tabela onde os dados serao exibidos
	table.innerHTML = ""; // Limpa a tabela
	paginatedItems.forEach((beer) => {
		// Cria uma linha para cada item do array
		let beerRow = document.createElement("tr");
		// Adiciona os dados do item na linha
		beerRow.innerHTML = `
            <td><img src="${beer.image}" alt="${beer.name}" width="100px"></td>
            <td>${beer.id}</td>
            <td>${beer.name}</td>
            <td>${beer.tagline}</td>
            <td>${beer.description}</td>
        `;
		table.appendChild(beerRow); // Adiciona a linha na tabela no HTML
	});

	let paginationControls = document.getElementById("paginationControls"); // Seleciona o elemento onde os botoes de paginacao serao exibidos
	paginationControls.innerHTML = ""; // Limpa o elemento
	for (let i = 1; i <= totalPages; i++) {
		// For que cria os botoes de paginacao
		let button = document.createElement("button"); // Cria o botao
		button.innerText = i; // Adiciona o numero da pagina no botao
		button.addEventListener("click", () => {
			// Arrow function que observa quando o botao e clicado
			currentPage = i; // Atribui o valor do botao a pagina atual
			createList(); // Chama a funcao que cria a lista para atualizar a pagina
		});
		paginationControls.appendChild(button); // Adiciona o botao no HTML
	}
}

getData(); // Chama a funcao que chama a API
