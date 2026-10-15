const totalQuestoes = 90;
const inicioQuestao = 91; // Questões de 91 a 180 (padrão do 2º dia de prova)
let respostasUsuario = {};

const gridQuestoes = document.getElementById("grid-questoes");
const cartaoContainer = document.getElementById("cartao-container");
const resultContainer = document.getElementById("result-container");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const summaryInfo = document.getElementById("summary-info");
const selectedList = document.getElementById("selected-list");

// Função para gerar dinamicamente as 90 linhas de questões e as bolinhas A, B, C, D, E
function gerarCartao() {
    gridQuestoes.innerHTML = "";
    respostasUsuario = {};

    for (let i = 0; i < totalQuestoes; i++) {
        const numQuestao = inicioQuestao + i;
        
        const linhaDiv = document.createElement("div");
        linhaDiv.classList.add("questao-linha");

        const numSpan = document.createElement("span");
        numSpan.classList.add("questao-num");
        numSpan.innerText = `${numQuestao}.`;
        linhaDiv.appendChild(numSpan);

        const opcoesDiv = document.createElement("div");
        opcoesDiv.classList.add("opcoes-bolinhas");

        const letras = ['A', 'B', 'C', 'D', 'E'];
        letras.forEach(letra => {
            const btn = document.createElement("button");
            btn.classList.add("opcao-btn");
            btn.innerText = letra;

            // Evento de clique para marcar/mudar a alternativa
            btn.addEventListener("click", () => selecionarOpcao(numQuestao, letra, opcoesDiv, btn));
            opcoesDiv.appendChild(btn);
        });

        linhaDiv.appendChild(opcoesDiv);
        gridQuestoes.appendChild(linhaDiv);
    }
}

function selecionarOpcao(numQuestao, letra, opcoesDiv, btnClicado) {
    // Remove a marcação anterior da mesma questão
    const botoesDaQuestao = opcoesDiv.querySelectorAll(".opcao-btn");
    botoesDaQuestao.forEach(b => b.classList.remove("selected"));

    // Marca a bolinha clicada
    btnClicado.classList.add("selected");

    // Registra a resposta do usuário no objeto
    respostasUsuario[numQuestao] = letra;
}

// Ação de finalizar e gerar o relatório final
submitBtn.addEventListener("click", () => {
    cartaoContainer.classList.add("hide");
    resultContainer.classList.remove("hide");

    let respondidasCount = Object.keys(respostasUsuario).length;
    summaryInfo.innerText = `Você preencheu ${respondidasCount} de ${totalQuestoes} questões.`;

    selectedList.innerHTML = "";

    // Gera a lista detalhada para cada uma das 90 questões
    for (let i = 0; i < totalQuestoes; i++) {
        const numQuestao = inicioQuestao + i;
        const escolha = respostasUsuario[numQuestao];

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("selected-item");

        if (escolha) {
            itemDiv.innerHTML = `<span>Questão ${numQuestao}:</span> <span class="respondida">Alternativa [ ${escolha} ]</span>`;
        } else {
            itemDiv.innerHTML = `<span>Questão ${numQuestao}:</span> <span class="nao-respondida">Não respondida</span>`;
        }

        selectedList.appendChild(itemDiv);
    }
});

// Botão para refazer / limpar o cartão
restartBtn.addEventListener("click", () => {
    resultContainer.classList.add("hide");
    cartaoContainer.classList.remove("hide");
    gerarCartao();
});

// Inicialização automática ao carregar a página
gerarCartao();