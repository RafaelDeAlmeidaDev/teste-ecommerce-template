document.getElementById('cafe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var form = event.target;
    var dateTimeField = form.querySelector('#datetime');
    var currentDate = new Date();
    dateTimeField.value = currentDate.toISOString();

    var tableBody = document.getElementById('cafe-list');
    var row = tableBody.insertRow();
    row.insertCell(0).textContent = form.querySelector('#name').value;
    row.insertCell(1).textContent = form.querySelector('#description').value;
    row.insertCell(2).textContent = form.querySelector('#price').value;
    row.insertCell(3).textContent = currentDate.toLocaleString('pt-BR');

    form.reset();
    updateProductList();
});

// Atualiza a lista com base na página atual e no seletor de produtos por página
function updateProductList() {
    var products = document.getElementById('cafe-list').rows;
    var productsPerPage = parseInt(document.getElementById('productsPerPage').value);
    var currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    var totalPages = Math.ceil(products.length / productsPerPage);
    var start = (currentPage - 1) * productsPerPage;
    var end = start + productsPerPage;

    // Filtrar produtos
    var filterText = document.getElementById('searchProduct').value.toLowerCase();

    for (var i = 0; i < products.length; i++) {
        var productName = products[i].cells[0].textContent.toLowerCase();
        var productDescription = products[i].cells[1].textContent.toLowerCase();
        var match = productName.includes(filterText) || productDescription.includes(filterText);

        products[i].style.display = (i >= start && i < end && match) ? 'table-row' : 'none';
    }

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

// Atualiza a exibição dos produtos e a paginação ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    updateProductList();
});

// Atualiza a lista de produtos quando o número de produtos por página é alterado
document.getElementById('productsPerPage').addEventListener('change', function() {
    document.getElementById('currentPage').textContent = 'Página 1';
    updateProductList();
});

// Filtro de produtos por nome ou descrição
document.getElementById('searchProduct').addEventListener('input', function() {
    document.getElementById('currentPage').textContent = 'Página 1';
    updateProductList();
});

// Botão "Próximo"
document.getElementById('nextPage').addEventListener('click', function() {
    var currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    var productsPerPage = parseInt(document.getElementById('productsPerPage').value);
    var totalPages = Math.ceil(document.getElementById('cafe-list').rows.length / productsPerPage);
    if (currentPage < totalPages) {
        document.getElementById('currentPage').textContent = 'Página ' + (currentPage + 1);
        updateProductList();
    }
});

// Botão "Anterior"
document.getElementById('prevPage').addEventListener('click', function() {
    var currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    if (currentPage > 1) {
        document.getElementById('currentPage').textContent = 'Página ' + (currentPage - 1);
        updateProductList();
    }
});
