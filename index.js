async function carregar_produtos(busca = false) {
    const container = document.getElementById("produtos");
    const inputBusca = document.getElementById("input-busca");
    const selectOrdem = document.getElementById("select-ordem");

    if (!busca) {
        const paramsDaUrl = new URLSearchParams(window.location.search);

        if (paramsDaUrl.toString() !== "") {
            if (paramsDaUrl.has("busca")) {
                inputBusca.value = paramsDaUrl.get("busca") || "";
            }
            if (paramsDaUrl.has("ordenacao")) {
                selectOrdem.value = paramsDaUrl.get("ordenacao") || "";
            }
        }
    }

    const params = new URLSearchParams();
    const valorBusca = inputBusca.value.trim();
    const valorOrdem = selectOrdem.value.trim();

    if (valorBusca) {
        params.set("busca", valorBusca);
    }

    if (valorOrdem) {
        params.set("ordenacao", valorOrdem);
    }

    const novaUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

    window.history.pushState({}, "", novaUrl);

    try {
        const resposta = await buscar_produtos(params);
        console.log("Resposta da API:", resposta);

        // aceita array direto ou objeto { produtos: [...] }
        const produtos = Array.isArray(resposta)
            ? resposta
            : Array.isArray(resposta?.produtos)
                ? resposta.produtos
                : [];

        container.replaceChildren();
        container.className = "grid-produtos";

        if (produtos.length === 0) {
            container.innerHTML = `
                <p style="margin: 0; text-align: center; width: 100%;">
                    ❌ Nenhum produto encontrado.
                </p>
            `;
            return;
        }

        produtos.forEach((produto) => {
            const card = document.createElement("div");
            card.className = "card";

            const nome = produto.nome || "Produto sem nome";
            const descricao = produto.descricao
                ? String(produto.descricao).slice(0, 40)
                : "Sem descrição";
            const preco = Number(produto.preco ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
            const imagem = produto.caminho_img || "https://via.placeholder.com/300x220?text=Produto";

            card.innerHTML = `
                <img src="${imagem}" alt="${nome}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x220?text=Imagem'">
                <div class="nome-produto">${nome}</div>
                <div class="info">
                    <div class="descricao">${descricao}${descricao.length >= 40 ? "..." : ""}</div>
                    <div class="preco">${preco}</div>
                </div>
                <button class="btn_enviar" type="button">Comprar</button>
            `;

            const btnComprar = card.querySelector(".btn_enviar");
            btnComprar.addEventListener("click", () => {
                alert("Produto selecionado: " + (produto.id || nome));
            });

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        container.className = "";
        container.innerHTML = `
            <p style="margin: 0; text-align: center; width: 100%;">
                ❌ Não foi possível carregar os produtos.
            </p>
        `;
    }
}

window.addEventListener("DOMContentLoaded", () => carregar_produtos(false));