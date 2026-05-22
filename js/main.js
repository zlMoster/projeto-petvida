document.addEventListener("DOMContentLoaded", () => {
    
    // Banco de dados simulado (Mock)
    const cachorrosDB = [
        { 
            id: 1, nome: '', idade: '', raca: '', porte: '',
            vacinas: '', castrado: '', 
            personalidade: '',
            foto: '' 
        },
        { 
            id: 2, nome: '', idade: '', raca: '', porte: '',
            vacinas: '', castrado: '', 
            personalidade: '',
            foto: '' 
        },
        { 
            id: 3, nome: '', idade: '', raca: '', porte: '',
            vacinas: '', castrado: '', 
            personalidade: '',
            foto: '' 
        }
    ];


    const containerLista = document.getElementById("lista-cachorros");
    if (containerLista) {
        containerLista.innerHTML = ""; 
        
        cachorrosDB.forEach(cachorro => {
            const coluna = document.createElement("div");
            coluna.className = "col";
            
            coluna.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <img src="${cachorro.foto}" class="card-img-top card-cachorro-img" alt="Foto do ${cachorro.nome}">
                    <div class="card-body text-center d-flex flex-column">
                        <h5 class="card-title fw-bold">${cachorro.nome}</h5>
                        <p class="card-text text-muted mb-4">${cachorro.idade} | ${cachorro.raca}</p>
                        <a href="detalhes.html?id=${cachorro.id}" class="btn btn-primary mt-auto">Conhecer mais</a>
                    </div>
                </div>
            `;
            containerLista.appendChild(coluna);
        });
    }

    // --- LÓGICA: DETALHES DO CACHORRO ---
    const containerDetalhes = document.getElementById("detalhes-cachorro");
    if (containerDetalhes) {
        const parametrosDaUrl = new URLSearchParams(window.location.search);
        const idCachorro = parseInt(parametrosDaUrl.get("id"));

        const cachorroEncontrado = cachorrosDB.find(c => c.id === idCachorro);

        if (cachorroEncontrado) {
            containerDetalhes.innerHTML = `
                <div class="card border-0 shadow-sm overflow-hidden">
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${cachorroEncontrado.foto}" alt="${cachorroEncontrado.nome}" class="img-fluid h-100 object-fit-cover">
                        </div>
                        <div class="col-md-6 d-flex flex-column justify-content-center p-5">
                            <h2 class="fw-bold mb-4">${cachorroEncontrado.nome}</h2>
                            <ul class="list-group list-group-flush mb-4">
                                <li class="list-group-item px-0"><strong>Raça:</strong> ${cachorroEncontrado.raca}</li>
                                <li class="list-group-item px-0"><strong>Idade:</strong> ${cachorroEncontrado.idade}</li>
                                <li class="list-group-item px-0"><strong>Porte:</strong> ${cachorroEncontrado.porte}</li>
                                <li class="list-group-item px-0"><strong>Castrado:</strong> ${cachorroEncontrado.castrado}</li>
                                <li class="list-group-item px-0"><strong>Vacinas:</strong> ${cachorroEncontrado.vacinas}</li>
                            </ul>
                            <p class="text-muted"><strong>Personalidade:</strong> ${cachorroEncontrado.personalidade}</p>
                            
                            <a href="contato.html?assunto=adocao" class="btn btn-primary mt-3 py-2 fs-5">Preencher Pré-Cadastro</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            containerDetalhes.innerHTML = `
                <div class="text-center py-5">
                    <h2 class="mb-3">Cachorro não encontrado</h2>
                    <p class="text-muted mb-4">O animal que você procura pode já ter sido adotado ou o link está incorreto.</p>
                    <a href="adocao.html" class="btn btn-primary">Voltar para lista</a>
                </div>
            `;
        }
    }

    // --- LÓGICA: FORMULÁRIO DE CONTATO ---
    const formContato = document.getElementById("form-contato");
    if (formContato) {
        // Se vier da página de adoção, seleciona o assunto "adocao" automaticamente
        const parametrosDaUrl = new URLSearchParams(window.location.search);
        if (parametrosDaUrl.get("assunto") === "adocao") {
            document.getElementById("assunto").value = "adocao";
        }

        formContato.addEventListener("submit", async (evento) => {
            evento.preventDefault();
            
            const botaoSubmit = formContato.querySelector("button[type='submit']");
            const textoOriginalBotao = botaoSubmit.innerText;
            botaoSubmit.innerText = "Enviando...";
            botaoSubmit.disabled = true;

            const dadosFormulario = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                assunto: document.getElementById("assunto").value,
                mensagem: document.getElementById("mensagem").value
            };

            try {
                // Tenta enviar para o Python FastAPI
                const resposta = await fetch('http://localhost:8000/api/contato', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosFormulario)
                });
                
                const resultado = await resposta.json();
                
                if (resposta.ok) {
                    alert(resultado.mensagem);
                    formContato.reset();
                } else {
                    alert("Erro ao enviar. Tente novamente.");
                }
            } catch (erro) {
                console.error(erro);
                alert("Simulação concluída! (Erro de conexão pois o backend não está rodando no momento).");
            } finally {
                botaoSubmit.innerText = textoOriginalBotao;
                botaoSubmit.disabled = false;
            }
        });
    }
});