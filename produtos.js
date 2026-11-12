// URL base da API
const LINK_API = "http://localhost:3000";

async function buscar_produtos(queryParams) {
    const resposta = await fetch(LINK_API + "/produto?" + queryParams.toString());
    if (!resposta.ok) {
        throw new Error("Erro ao buscar produtos (status " + resposta.status + ")");
    }
    return await resposta.json();
}

// Deve coincidir com o LIMITE fixado no back-end (index.js - rota /produto)
const LIMITE_POR_PAGINA = 10;

const lista_produtos = document.getElementById("lista-produtos");
const filtro_busca = document.getElementById("filtro-busca");
const filtro_categoria = document.getElementById("filtro-categoria");
const filtro_preco_min = document.getElementById("filtro-preco-min");
const filtro_preco_max = document.getElementById("filtro-preco-max");
const filtro_ordenacao = document.getElementById("filtro-ordenacao");
const btn_filtrar = document.getElementById("btn-filtrar");
const btn_limpar = document.getElementById("btn-limpar");
const btn_anterior = document.getElementById("btn-anterior");
const btn_proximo = document.getElementById("btn-proximo");
const info_pagina = document.getElementById("info-pagina");

let pagina_atual = 1;

function construir_filtros() {
    const params = new URLSearchParams();
    const busca = filtro_busca.value.trim();
    if (busca) params.set("busca", busca);
    if (filtro_categoria.value) params.set("categoria", filtro_categoria.value);
    if (filtro_preco_min.value !== "") params.set("preco_min", filtro_preco_min.value);
    if (filtro_preco_max.value !== "") params.set("preco_max", filtro_preco_max.value);
    if (filtro_ordenacao.value) params.set("ordenacao", filtro_ordenacao.value);
    params.set("pagina", pagina_atual);
    return params;
}

function atualizar_paginacao(quantidade_retornada) {
    info_pagina.textContent = "Página " + pagina_atual;
    btn_anterior.disabled = pagina_atual <= 1;
    btn_proximo.disabled = quantidade_retornada < LIMITE_POR_PAGINA;
}

async function carregar_produtos() {
    try {
        const produtos = await buscar_produtos(construir_filtros());
        mostrar_produtos(produtos);
        atualizar_paginacao(produtos.length);
    } catch (erro) {
        console.error(erro);
        lista_produtos.replaceChildren();
        mostrar_mensagem("Não foi possível carregar as peças. Verifique se a API está rodando.");
        atualizar_paginacao(0);
    }
}

function criar_card(produto) {
    const card = document.createElement("article");
    card.className = "produto-estoque";

    const imagem = document.createElement("img");
    if (produto.caminho_img) imagem.src = produto.caminho_img;
    imagem.alt = produto.nome;
    imagem.onerror = () => {
        imagem.removeAttribute("src");
        imagem.alt = "Imagem indisponível";
    };

    const categoria = document.createElement("span");
    categoria.className = "categoria";
    categoria.textContent = produto.categoria;

    const nome = document.createElement("h2");
    nome.textContent = produto.nome;

    const descricao = document.createElement("p");
    descricao.className = "descricao";
    descricao.textContent = produto.descricao;

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = Number(produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    card.append(imagem, categoria, nome, descricao, preco);

    const estoque = produto.quantidade ?? produto.quantidade_img;
    if (estoque !== undefined) {
        const quantidade = document.createElement("p");
        quantidade.className = "quantidade";
        quantidade.textContent = estoque > 0 ? estoque + " em estoque" : "Sem estoque";
        card.append(quantidade);
    }
    return card;
}

function mostrar_produtos(produtos) {
    lista_produtos.replaceChildren();
    if (produtos.length === 0) {
        mostrar_mensagem("Nenhuma peça encontrada. Tente outro nome ou limpe os filtros.");
        return;
    }
    produtos.forEach(produto => lista_produtos.appendChild(criar_card(produto)));
}

function mostrar_mensagem(texto) {
    const mensagem = document.createElement("p");
    mensagem.className = "mensagem";
    mensagem.textContent = texto;
    lista_produtos.appendChild(mensagem);
}

function aplicar_filtros() {
    pagina_atual = 1;
    carregar_produtos();
}

btn_filtrar.addEventListener("click", aplicar_filtros);

[filtro_busca, filtro_preco_min, filtro_preco_max].forEach(campo => {
    campo.addEventListener("keydown", (e) => { if (e.key === "Enter") aplicar_filtros(); });
});

filtro_categoria.addEventListener("change", aplicar_filtros);
filtro_ordenacao.addEventListener("change", aplicar_filtros);

btn_limpar.addEventListener("click", () => {
    filtro_busca.value = "";
    filtro_categoria.value = "";
    filtro_preco_min.value = "";
    filtro_preco_max.value = "";
    filtro_ordenacao.value = "";
    aplicar_filtros();
});

btn_anterior.addEventListener("click", () => {
    if (pagina_atual > 1) { pagina_atual--; carregar_produtos(); }
});

btn_proximo.addEventListener("click", () => { pagina_atual++; carregar_produtos(); });

carregar_produtos();