const LINK_API = "http://localhost:3000";

async function buscar_produtos(queryParams) {
    let rota = "/produto";
    const queryString = queryParams.toString();
    if (queryString) {
        rota += "?" + queryString;
    }

    const resposta = await fetch(LINK_API + rota);
    if (!resposta.ok) {
        throw new Error("Erro ao buscar produtos");
    }
    return await resposta.json();
}