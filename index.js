import express from 'express';
import path from 'path';
import session from 'express-session';


// para permitir informações sejam trocadas entre cliente e servidor, tais infomrações podem ser armazenadas em cookies, para manipular cookies 
//modulo cokkie-parser(npm install cookie-parser);
import cookieParser from 'cookie-parser';


const host = '0.0.0.0';

const porta = 3000;

let listaProduto = [];

let usuarioAutenticado = true; // a aplicação possui esse conteudo visivel para todos seus usuarios

const app = express();
//configurar o express para manipular corretamente os dados qndo forem submetido via metodo POST
app.use(express.urlencoded({ extended: true }));//habilita a biblioteta queryString 


//Para controlar estados e informações exclusivas para um determinado usuario entre tantos outros que poderão acessar a aplicação, é preciso estabelecer uma sessão para cada um dos usuarios
// necessario instalar o modulo sessions(npm install express-session)
app.use(session({
    secret: 'Minh4Ch4v3S3cr3t4',//chave para assinar os dados
    resave: true, //salva a sessão a cada requisição HTTP
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15 // logado maximo 15minutos
    }
}));

app.use(cookieParser());//middleware permite manipular cookies

//função para verificar se o usuario esta autenticado (middleware)

function usuarioEstaAutenticado(requisicao, resposta, next) {

    if (requisicao.session.usuarioAutenticado) {

        next();//permitir que a requisição continue a ser processada

    }
    else {
        resposta.redirect('/login.html');
    }

}

function cadastrarProduto(requisicao, resposta) {

    const codigoBarra = requisicao.body.codigoBarra;
    const descricaoProduto = requisicao.body.descricaoProduto;
    const nomeFabricante = requisicao.body.nomeFabricante;
    const precoCusto = requisicao.body.precoCusto;
    const precoVenda = requisicao.body.precoVenda;
    const qtdEstoque = requisicao.body.qtdEstoque;
    const dataValidade = requisicao.body.dataValidade;


    //verificando campos preenchidos
    if (codigoBarra && descricaoProduto && nomeFabricante && precoCusto && precoVenda && qtdEstoque && dataValidade) {

        listaProduto.push({

            codigoBarra: codigoBarra,
            descricaoProduto: descricaoProduto,
            nomeFabricante: nomeFabricante,
            precoCusto: precoCusto,
            precoVenda: precoVenda,
            qtdEstoque: qtdEstoque,
            dataValidade: dataValidade,

        });
        resposta.redirect('/listarProduto');
    }

    else {

        resposta.write(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Produto</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />


</head>

<body>
    <main class="container d-flex flex-column justify-content-center align-items-center">
        <div class="card w-50 p-4 border-0 mt-5">
            <div class="card-body text-center">
               

                    <h3 class="text-center mb-5">Cadastrar Produto</h3>
                    <div class="container mb-5">
                        <form method="POST" action='/cadastrarProduto' class=" border row g-2">
                            <div class="mb-3">
                                <label for="codigoBarra" class="form-label">Código de Barras:</label><br>
                                <input type="text" class="form-control" id="codigoBarra" name="codigoBarra" value="${codigoBarra}"
                                    placeholder="">`);

        if (codigoBarra == "") {

            resposta.write(`<div my-2 class="alert alert-danger" role="alert">
                            Por favor, informe o código de barras do produto.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="descricaoProduto" class="form-label">Descrição do Produto:</label><br>
                                <input type="text" class="form-control" id="descricaoProduto" name="descricaoProduto" value="${descricaoProduto}"
                                    placeholder="">`);

        if (descricaoProduto == "") {

            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe a descrição do produto.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="nomeFabricante" class="form-label">Nome do Fabricante:</label><br>
                                <input type="text" class="form-control" id="nomeFabricante" name="nomeFabricante" placeholder="" value="${nomeFabricante}">`);
        if (nomeFabricante == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o Nome do Fabricante.
                        </div>`);
        }
        resposta.write(`</div>
                        <div class="col-md-6">
                            <label for="precoCusto" class="form-label">Preço de Custo</label><br>
                            <input type="text" class="form-control" id="precoCusto" name="precoCusto" value="${precoCusto}" placeholder="">`);
        if (precoCusto == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o preço de custo do produto
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="col-md-6">
                                <label for="precoVenda" class="form-label">precoVenda:</label><br>
                                <input type="text" class="form-control" id="precoVenda" name="precoVenda"value="${precoVenda}" placeholder="">`);
        if (precoVenda == "") {

            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o preço de venda do produto.
                        </div>`);
        }
        resposta.write(`</div>
                        <div class="col-md-6">
                            <label for="qtdEstoque" class="form-label">Quantidade em Estoque:</label><br>
                            <input type="text" class="form-control" id="qtdEstoque" name="qtdEstoque" value="${qtdEstoque}" placeholder="">`);
        if (qtdEstoque == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe a quantidade em estoque.
                        </div>`);
        }

        resposta.write(`</div>
                        <div class="col-md-6">
                            <label for="dataValidade" class="form-label">Data de Validade</label><br>
                            <input type="date" class="form-control" id="dataValidade" name="dataValidade" value="${dataValidade}" required>`);
        if (dataValidade == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe a data de validade.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="text-center">
                                <div class="col-12 mb-3 mt-3">
                                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                                    <a class="btn btn-secondary" href="/">Voltar</a>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
        </script>

</body>

</html>`);

        resposta.end();//finaliza o envio da resposta 

    }//fim do else
}
function autenticaUsuario(requisicao, resposta) {

    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

    if (usuario == 'admin' && senha == '123') {

        requisicao.session.usuarioAutenticado = true;
        resposta.cookie('dataUltimoAcesso', new Date().toLocaleDateString(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        })
        resposta.redirect('/');

    }
    else {
        resposta.write('<!DOCTYPE html>');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>falha ao realizar o login</title>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<p>Usuário senha inválida!</p>');
        resposta.write('<a href="/login.html"> Voltar </a>');
        if (requisicao.cookies.dataUltimoAcesso) {
            resposta.write('<p>');
            resposta.write('Seu ultimo acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
            resposta.write('</p>');

        }
        resposta.write('</body>');
        resposta.write('</html>');
        //resposta.write('<input type = "button" value= "voltar" onclick"history.go(-1)"/>');
        resposta.end();
    }
}
app.post('/login', autenticaUsuario);

app.get('/login', (req, resp) => {
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp) => {
    req.session.destroy();
    //req.session.usuarioLogado = False;
    resp.redirect('/login.html');

});

//permitir que os usuarios acessem o conteudo da pasta 'publico'
app.use(express.static(path.join(process.cwd(), 'publico')));

//permitir que os usuarios tenham acesso ao conteudo da pasta 'protegidos'
//verificando antes se o usuario esta autenticado
app.use(usuarioEstaAutenticado, express.static(path.join(process.cwd(), 'protegidos')));




app.post('/cadastrarProduto', usuarioEstaAutenticado, cadastrarProduto);

app.get('/listarProduto', usuarioEstaAutenticado, (requisicao, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Listar</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write("<h3 class='text-center mt-3'>Lista de Produtos</h3>");
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<div class="container">');
    resp.write('<table class="table table-dark table-striped-columns">');
    resp.write('<tr>');
    resp.write('<th class="text-center">Código de Barras</th>');
    resp.write('<th class="text-center">Descrição do Produto</th>');
    resp.write('<th class="text-center">Nome do Fabricante</th>');
    resp.write('<th class="text-center">Preço de Custo</th>');
    resp.write('<th class="text-center">Preço de Venda</th>');
    resp.write('<th class="text-center">Quantidade em Estoque</th>');
    resp.write('<th class="text-center">Data de Validade</th>');
    resp.write('</tr>');
    for (let i = 0; i < listaProduto.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaProduto[i].codigoBarra}`);
        resp.write(`<td>${listaProduto[i].descricaoProduto}`);
        resp.write(`<td>${listaProduto[i].nomeFabricante}`);
        resp.write(`<td>${listaProduto[i].precoCusto}`);
        resp.write(`<td>${listaProduto[i].precoVenda}`);
        resp.write(`<td>${listaProduto[i].qtdEstoque}`);
        resp.write(`<td>${listaProduto[i].dataValidade}`);
        resp.write('</tr>');
    }
    resp.write('<a href="/">Inicio</a>');
    resp.write('<br><br>');
    if (requisicao.cookies.dataUltimoAcesso) {
        resp.write('<p>');
        resp.write('Seu ultimo acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
        resp.write('</p>');

    }
    resp.write('</table>');

    resp.write('</div>');
    resp.write('</body>');


    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});


//quando usuario enviar uma requisição do tipo post para endpoint 'http://localhost:3000//cadastrarFornecedor'
//executa a função a funcção cadastrarFornecedor();
app.post('/cadastrarProduto', cadastrarProduto);

app.listen(porta, host, () => {

    console.log(`Servidor rodando em http://${host}:${porta}`);
})