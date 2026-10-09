/* ===== 1. DADOS ===== */
const nomeLoja = "Loja de Roupas";
const produtos = [
    {nome: "Camiseta", categoria: "algodão", preco: 30.00, quantidade: 3, vendidos: 7},
    {nome: "Vestido", categoria: "algodão", preco: 120.00, quantidade: 4, vendidos: 3},
    {nome: "Saia", categoria: "algodão", preco: 80.00, quantidade: 6, vendidos: 4},
    {nome: "Shorts", categoria: "jeans", preco: 50.00, quantidade: 5, vendidos: 2},
    {nome: "Calça", categoria: "jeans", preco: 70.00, quantidade: 8, vendidos: 5},
    {nome: "Jaqueta", categoria: "jeans", preco: 100.00, quantidade: 2, vendidos: 1}
];

/*===== 2. FUNÇÕES =====*/

/*Tarefa 2 — Listar produtos */
function listarProdutos(lista) {
    for(let i=0; i < produtos.length; i++) {
    console.log(`${i+1}. ${produtos[i].nome} | ${produtos[i].categoria} | R$ ${produtos[i].preco} | ${produtos[i].quantidade} un. | ${produtos[i].vendidos} vendidos`);
    } 
}

/*Tarefa 3 — Cadastrar um produto */
function cadastrarProduto(lista, nome, categoria, preco, quantidade) {
    formatarNome(nome);
    produtos.push({nome, categoria, preco, quantidade, vendidos: 0});
    return produtos.length;
}

/*Tarefa 4 — Valor do estoque */
function calcularValorEstoque(lista) {
    let soma = 0;
    for(let i=0; i < lista.length; i++) {
        soma = soma + (lista[i].preco * lista[i].quantidade);
    }
    return soma;
}

/*Tarefa 5 - Buscar um produto*/
function buscarProduto(lista, termo){
    for(let i = 0; i < lista.length; i++){
        if(lista[i].nome.toLowerCase().includes(termo.toLowerCase()) === true){
            return lista[i];
        }
    }
    return null;
}

/*Tarefa 6 — Produtos em falta*/
function produtosEmFalta(lista, minimo){
    let novoArray = [];
    for(let i = 0; i < lista.length; i++){
        if(lista[i].quantidade < minimo){
            novoArray.push(lista[i].nome);
        }
    }
    return novoArray;
}

/*Tarefa 7 — Aplicar desconto*/
function aplicarDesconto(lista, categoria, percentual){
    let produtosAlterados = 0;
    for(let i = 0; i < lista.length; i++){
        if(lista[i].categoria === categoria){
            lista[i].preco = lista[i].preco - (lista[i].preco * (percentual / 100));
            produtosAlterados++;
        }
    }
    return produtosAlterados;
}

/*Tarefa 8 — Registrar uma venda*/
function registrarVenda(lista, nome, quantidade){
    let produtoVenda = buscarProduto(lista, nome);
    if(produtoVenda === null || quantidade > produtoVenda.quantidade){
        return false;
    }
    produtoVenda.quantidade = produtoVenda.quantidade - quantidade;
    produtoVenda.vendidos = produtoVenda.vendidos + quantidade;
    return true;
}
/*Tarefa 9 — Padronizar nomes*/
function formatarNome(texto){
    texto = texto.trim();
    let texto1 = texto.slice(0,1).toUpperCase();
    let texto2 = texto.slice(1, texto.length).toLowerCase();
    texto = texto1 + texto2;
    return texto;
}

/*Tarefa 10 — Salvar e recuperar em JSON */
function converterParaJSON(lista){
    let texto = JSON.stringify(lista);
    return texto;
}

function lerJSON(texto){
    let array = JSON.parse(texto);
    return array;
}

/*Tarefa 11 — Relatório final*/
function gerarRelatorio(nome, lista){
    console.log(`${nome.toUpperCase()} \nProdutos cadastrados: ${lista.length} \nValor total em estoque: R$ ${calcularValorEstoque(lista)} \nProdutos com estoque baixo: ${produtosEmFalta(lista, 5).length} \n${produtosEmFalta(lista, 5)}`);
}


/*===== 3. PROGRAMA PRINCIPAL =====*/
function main(){
    console.log("Tarefa 2 \n");
    listarProdutos(produtos);

    console.log("\nTarefa 3 \n");
    let produtoNovo = {nome: "Moletom", categoria: "algodão", preco: 60.00, quantidade: 10};
    console.log("Produto cadastrado! Agora a loja tem " + cadastrarProduto(produtos, produtoNovo.nome, produtoNovo.categoria, produtoNovo.preco, produtoNovo.quantidade) + " produtos cadastrados");
    listarProdutos(produtos);

    console.log("\nTarefa 4 \n");
    console.log("Valor do estoque: R$" + calcularValorEstoque(produtos));

    console.log("\nTarefa 5\n")
    let resultBusca = buscarProduto(produtos, "SHORT");
    if(resultBusca === null){
    console.log("Produto não encontrado.");
    } 
    else{
    console.log(`Encontrado: ${resultBusca.nome} - R$ ${resultBusca.preco}`);
    }

    console.log("\nTarefa 6\n");
    console.log(produtosEmFalta(produtos, 5));

    console.log("\nTarefa 7\n");
    console.log(aplicarDesconto(produtos, "algodão", 20) + ` produtos receberam desconto \nNovo preço da camiseta: R$ ${produtos[0].preco}`);

    console.log("\nTarefa 8\n");
    if(registrarVenda(produtos, "camiseta", 3) === false){
        console.log("Venda não realizada: estoque insuficiente ou produto inexistente.")
    }
    else{
        console.log(`${produtos[0].nome}: ${produtos[0].quantidade} un. em estoque, ${produtos[0].vendidos} vendidos`);
    }

    console.log("\nTarefa 9\n");
    console.log(formatarNome("   bORRACHA branca  "));

    console.log("\nTarefa 10\n");
    let textojson = converterParaJSON(produtos);
    console.log(typeof(textojson));
    arrayjson = lerJSON(textojson);
    console.log(arrayjson.length + " |Primeiro: " + arrayjson[0].nome);

    console.log("\nTarefa 11\n");
    gerarRelatorio(nomeLoja, produtos);

}

main();

