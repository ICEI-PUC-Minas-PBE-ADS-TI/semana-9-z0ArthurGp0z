var data = {};

data.produtos = [
    {
        id: 1,
        nome: "Nike Air Max 90",
        preco: 799.90,
        categoria: "Running",
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
        descricao: "Clássico tênis de corrida com amortecimento Air Max. Conforto e estilo para o dia a dia.",
        emEstoque: true
    },
    {
        id: 2,
        nome: "Adidas Superstar",
        preco: 599.90,
        categoria: "Casual",
        imagem: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80",
        descricao: "Ícone do streetwear mundial. Couro legítimo com a clássica shell toe.",
        emEstoque: true
    },
    {
        id: 3,
        nome: "Jordan 1 Retro High",
        preco: 1299.90,
        categoria: "Basketball",
        imagem: "https://images.unsplash.com/photo-1657801566558-23dcdee5a7b5?w=400&q=80",
        descricao: "O tênis que mudou o basquete. Silhueta icônica com couro premium e cano alto.",
        emEstoque: true
    },
    {
        id: 4,
        nome: "Vans Old Skool",
        preco: 449.90,
        categoria: "Streetwear",
        imagem: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80",
        descricao: "O favorito dos skatistas. Lona resistente com solado de borracha waffle.",
        emEstoque: false
    },
    {
        id: 5,
        nome: "Nike React Infinity",
        preco: 899.90,
        categoria: "Running",
        imagem: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
        descricao: "Tecnologia React para máximo amortecimento. Ideal para longas distâncias.",
        emEstoque: true
    },
    {
        id: 6,
        nome: "New Balance 574",
        preco: 529.90,
        categoria: "Casual",
        imagem: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80",
        descricao: "Estilo retrô com conforto moderno. Cabedal em camurça e mesh respirável.",
        emEstoque: true
    },
    {
        id: 7,
        nome: "Puma Suede Classic",
        preco: 399.90,
        categoria: "Streetwear",
        imagem: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
        descricao: "Um dos tênis mais reconhecidos do mundo. Camurça macia e solado de borracha.",
        emEstoque: true
    },
    {
        id: 8,
        nome: "Adidas Harden Vol. 7",
        preco: 1099.90,
        categoria: "Basketball",
        imagem: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80",
        descricao: "Tênis de performance para quem joga sério. Tração e suporte lateral superiores.",
        emEstoque: false
    }
];

var productList = document.getElementById("product-list");
var productDetails = document.getElementById("product-details");
var searchInput = document.querySelector("#search");
var categorySelect = document.querySelector("#category");
var btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2).replace(".", ",");
}

function createProductCard(produto) {
    var card = document.createElement("div");
    card.setAttribute("data-id", produto.id);
    card.setAttribute("data-categoria", produto.categoria);
    card.classList.add("card");
    card.style.position = "relative";

    var img = document.createElement("img");
    img.setAttribute("src", produto.imagem);
    img.setAttribute("alt", produto.nome);

    var nome = document.createElement("p");
    nome.classList.add("card-nome");
    nome.textContent = produto.nome;

    var preco = document.createElement("p");
    preco.classList.add("card-preco");
    preco.textContent = formatPrice(produto.preco);

    var categoria = document.createElement("p");
    categoria.classList.add("card-categoria");
    categoria.textContent = produto.categoria;

    var botoes = document.createElement("div");
    botoes.classList.add("card-botoes");

    var btnDetalhes = document.createElement("button");
    btnDetalhes.classList.add("btn-detalhes");
    btnDetalhes.textContent = "Ver detalhes";

    var btnDestacar = document.createElement("button");
    btnDestacar.classList.add("btn-destacar");
    btnDestacar.textContent = "Destacar";

    btnDetalhes.addEventListener("click", function() {
        showProductDetails(produto);
    });

    btnDestacar.addEventListener("click", function() {
        if (card.classList.contains("highlight")) {
            card.classList.remove("highlight");
            btnDestacar.textContent = "Destacar";
        } else {
            card.classList.add("highlight");
            btnDestacar.textContent = "Remover";
        }
    });

    botoes.appendChild(btnDetalhes);
    botoes.appendChild(btnDestacar);

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(categoria);
    card.appendChild(botoes);

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    for (var i = 0; i < produtos.length; i++) {
        var card = createProductCard(produtos[i]);
        productList.appendChild(card);
    }

    var todos = document.querySelectorAll(".card");
    for (var j = 0; j < todos.length; j++) {
        console.log("Card data-id:", todos[j].getAttribute("data-id"));
    }
}

function renderCategories() {
    categorySelect.innerHTML = "";

    var optTodas = document.createElement("option");
    optTodas.setAttribute("value", "Todas");
    optTodas.textContent = "Todas";
    categorySelect.appendChild(optTodas);

    var categorias = [];
    for (var i = 0; i < data.produtos.length; i++) {
        var cat = data.produtos[i].categoria;
        if (categorias.indexOf(cat) === -1) {
            categorias.push(cat);
        }
    }

    for (var j = 0; j < categorias.length; j++) {
        var opt = document.createElement("option");
        opt.setAttribute("value", categorias[j]);
        opt.textContent = categorias[j];
        categorySelect.appendChild(opt);
    }
}

function showProductDetails(produto) {
    var estoqueTexto = produto.emEstoque ? "Em estoque" : "Fora de estoque";
    var estoqueClasse = produto.emEstoque ? "em-estoque" : "sem-estoque";

    productDetails.innerHTML =
        "<img src='" + produto.imagem + "' alt='" + produto.nome + "'>" +
        "<h2>" + produto.nome + "</h2>" +
        "<p class='det-preco'>" + formatPrice(produto.preco) + "</p>" +
        "<p class='det-categoria'>" + produto.categoria + "</p>" +
        "<p class='det-estoque " + estoqueClasse + "'>" + estoqueTexto + "</p>" +
        "<p class='det-descricao'>" + produto.descricao + "</p>";
}

function filterProducts() {
    var texto = searchInput.value.toLowerCase();
    var categoriaSelecionada = categorySelect.value;

    var resultado = [];
    for (var i = 0; i < data.produtos.length; i++) {
        var produto = data.produtos[i];
        var nomeMatch = produto.nome.toLowerCase().indexOf(texto) !== -1;
        var catMatch = categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;

        if (nomeMatch && catMatch) {
            resultado.push(produto);
        }
    }

    return resultado;
}

searchInput.addEventListener("input", function() {
    var filtrados = filterProducts();
    renderProducts(filtrados);
});

categorySelect.addEventListener("change", function() {
    var filtrados = filterProducts();
    renderProducts(filtrados);
});

btnRender.addEventListener("click", function() {
    var filtrados = filterProducts();
    renderProducts(filtrados);
});

productDetails.innerHTML = "<p class='placeholder-detalhes'>Clique em \"Ver detalhes\" para ver as informações do produto.</p>";

renderCategories();
renderProducts(data.produtos);
