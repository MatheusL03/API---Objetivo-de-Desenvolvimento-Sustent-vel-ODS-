    document.getElementById("formPonto").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nomeLocal = document.getElementById("nomeLocal").value;
    const bairro = document.getElementById("bairro").value;
    const tipoLocal = document.getElementById("tipo").value;
    const latitude = Number(document.getElementById("latitude").value);
    const longitude = Number(document.getElementById("longitude").value);

    const categoriasSelecionadas  = Array.from(
        document.querySelectorAll('input[name="categoria"]:checked')
    ).map(checkbox  => checkbox.value);

    const ponto = {
    nomeLocal: nomeLocal,
    bairro: bairro,
    tipoLocal: tipoLocal,
    categoriaResiduo: categoriasSelecionadas,
    geolocalizacao:{
            lat: latitude,
            lng: longitude
        }
};

    console.log("Enviando dados:", ponto);

    // Envio para API — ajuste a URL se necessário
    const resposta = await fetch("http://localhost:3000/descarte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ponto)
    });

    if (resposta.ok) {
        alert("Ponto cadastrado com sucesso!");
        document.getElementById("formPonto").reset();
    } else {
        alert("Erro ao cadastrar o ponto.");
    }
});

// REGISTRAR PONTOS NA INTERFACE

async function carregarPontos() {
    const container = document.getElementById("listaPontos");
    container.innerHTML = "Carregando...";

    try {
        const resposta = await fetch("http://localhost:3000/descarte");
        const pontos = await resposta.json();

        container.innerHTML = "";

        pontos.forEach(ponto => {
            const card = document.createElement("div");
            card.classList.add("card");

            const lat = ponto.geolocalizacao?.lat ?? "Não informado";
            const lng = ponto.geolocalizacao?.lng ?? "Não informado";


            const categorias = ponto.categoriaResiduo.length > 0
                ? ponto.categoriaResiduo.map(cat => `<span class="badge">${cat}</span>`).join("")
                : "<span class='badge'>Nenhuma</span>";

            card.innerHTML = `
                <h3>${ponto.nomeLocal}</h3>
                <p><strong>Bairro:</strong> ${ponto.bairro}</p>
                <p><strong>Tipo:</strong> ${ponto.tipoLocal}</p>
                <p><strong>Categorias:</strong> ${categorias}</p>
                <p><strong>Latitude:</strong> ${lat}</p>
                <p><strong>Longitude:</strong> ${lng}</p>

                 <div style="display:flex; gap:10px; margin-top:10px;">
                    <button onclick='editarPonto(${JSON.stringify(ponto)})'
                        style="background:orange; padding:5px 10px; border:none; cursor:pointer; color:white;">
                        Editar
                    </button>

                    <button onclick="excluirPonto('${ponto._id}')"
                        style="background:red; padding:5px 10px; border:none; cursor:pointer; color:white;">
                        Excluir
                    </button>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (erro) {
        container.innerHTML = "Erro ao carregar pontos.";
        console.error(erro);
    }
}

carregarPontos();


// EXCLUIR PONTOS

async function excluirPonto(id) {
    if (!confirm("Tem certeza que deseja excluir este ponto?")) return;

    try {
        const resposta = await fetch(`http://localhost:3000/descarte/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Ponto excluído com sucesso!");
            carregarPontos();
        } else {
            alert("Erro ao excluir ponto.");
        }
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir ponto.");
    }
}


// EDITAR PONTOS


async function editarPonto(ponto) {
    const novoNome = prompt("Novo nome do local:", ponto.nomeLocal);
    const novoBairro = prompt("Novo bairro:", ponto.bairro);
    const novoTipo = prompt("Novo tipo do local:", ponto.tipoLocal);
    const novaLat = prompt("Nova latitude:", ponto.geolocalizacao?.lat);
    const novaLng = prompt("Nova longitude:", ponto.geolocalizacao?.lng);

    if (!novoNome || !novoBairro || !novoTipo || !novaLat || !novaLng) {
        alert("Edição cancelada ou inválida.");
        return;
    }

    const categoriasEditadas = prompt("Categorias separadas por vírgula:", ponto.categoriaResiduo.join(","));
    
    const categoriaResiduo = categoriasEditadas
        ? categoriasEditadas.split(",").map(c => c.trim())
        : ponto.categoriaResiduo;

    const dadosAtualizados = {
        nomeLocal: novoNome,
        bairro: novoBairro,
        tipoLocal: novoTipo,
        categoriaResiduo: categoriaResiduo,
        geolocalizacao: {
            lat: Number(novaLat),
            lng: Number(novaLng)
        }
    };

    try {
        const resposta = await fetch(`http://localhost:3000/descarte/${ponto._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (resposta.ok) {
            alert("Ponto atualizado com sucesso!");
            carregarPontos();
        } else {
            alert("Erro ao atualizar ponto.");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar.");
    }
}


