// declara um conjunto fake de dados para contatos
var dbfake = {
    "data": [
        {
            "id": 1,
            "data": "13/06/2019 - 07h42",
            "titulo": "Como escolher o melhor local para a sua festa",
            "texto": `Para fazer um evento memorável é preciso planejar com antecedência e considerar pontos importantes. O melhor local para a festa de aniversário é aquele que atende todas as expectativas, mas como escolher?
            Estipular um orçamento e estipular quantas pessoas serão convidadas é o primeiro passo para escolher o local ideal para festa de aniversário. Após esses itens, é preciso determinar como será o evento e o que ele irá oferecer.
            Quando o aniversariante é uma criança com idade maior ou igual a 5 anos, e hora de pensar em fazer uma festa um pouco diferente do básico feito em casa e considerar alugar um salão.
            A criança a partir dessa idade começa a fazer amigos, o que aumenta a lista de convidados e brincadeiras que serão realizadas, portanto é indicado que a festa seja feita em um lugar com espaço maior.
            As crianças precisam de distração e a melhor opção é um local que possui brinquedos ou permita que você coloque brinquedos em seu espaço.
            Procure chácaras ou sítios que permitam brinquedos, mas dê preferência para locais que já possuam brinquedos, funcionários que irão monitorar as crianças e que ofereçam serviços de buffet. Assim você poderá aproveitar melhor o dia.
`,
            "comentarios": [
                {
                    "nome": "Carol",
                    "texto": "Foi de grande ajuda o post!!!"
                }
            ]
        }
    ]
}

// Caso exista no Local Storage, recupera os dados salvos
var dbPosts = JSON.parse(localStorage.getItem('posts'));
var dbLogado = JSON.parse(localStorage.getItem('loginAtual'));
if (!dbPosts) {
    dbPosts = dbfake;
    localStorage.setItem('posts',JSON.stringify(dbPosts));
};

function insertPostagem(postagem) 
{
    let novoId;

    // Calcula novo Id a partir do último código existente no array
    if (dbPosts.data.length == 0)
        novoId = 0;
    else 
        novoId = db.data[db.data.length - 1].id + 1;
    let data = new Date();
    // Guarda cada pedaço em uma variável
    let dia     = data.getDate();           // 1-31
    let mes     = data.getMonth();          // 0-11 (zero=janeiro)
    let ano    = data.getFullYear();       // 4 dígitos
    let hora    = data.getHours();          // 0-23
    let min     = data.getMinutes();        // 0-59

    // Formata a data e a hora (note o mês + 1)
    let str_data = dia + '/' + (mes+1) + '/' + ano;
    let str_hora = hora + 'h' + min;
    let data_completa = str_data + ' ' + str_hora;

    let novaPostagem = {
        "id": novoId,
        "data": data_completa,
        "titulo": postagem.titulo,
        "texto": postagem.texto,
        "comentarios": []
    };

    // Insere o novo objeto no array
    dbPosts.data.push(novaPostagem);
    displayMessage("Postagem inserida com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('posts', JSON.stringify(dbPosts));
}

function insertComentario (id, comentario)
{
    let index = dbPosts.data.map(obj => obj.id).indexOf(id);

    dbPosts.data[index].comentarios.push(comentario);
    localStorage.setItem('posts', JSON.stringify(dbPosts));
}

function deletePostagem(id) {   
    // Filtra o array removendo o elemento com o id passado
    dbPosts.data = dbPosts.data.filter(function (element) { return element.id != id });

    alert ("Postagem apagada com sucesso!");    

    // Atualiza os dados no Local Storage
    localStorage.setItem('posts', JSON.stringify(dbPosts));
}

function exibePostagens() {
    // Remove todas as linhas do corpo do body
    $("#lista-postagens").html("");

    // Popula o body com os registros do banco de dados
    for (i = dbPosts.data.length-1; i >= 0 ; i--) {
        let postagem = dbPosts.data[i];
        $("#lista-postagens").append(`
        <div class="panel panel-default"> 
        <div class="panel-heading">   
        <h3>${postagem.titulo}</h3> </div>
        <div class="panel-body"> <p>Data: ${postagem.data}</p><p>${postagem.texto}</p>
    </div>
        <h3>Comentários</h3><br>`);
        for (j = 0; j < dbPosts.data[i].comentarios.length; j++)
        {
        let comentario = dbPosts.data[i].comentarios[j];
        $("#lista-postagens").append (`
            <div class="panel panel-default">
            <div class="panel-heading"><h4><strong>${comentario.nome}</strong></h4></div>
            <div class="panel-body"><p>${comentario.texto}</p></div>`);
        }
        $("#lista-postagens").append(`<div class="panel panel-default">
                <form id=form-comentarios">
                <div class="panel-body">
                    <div class="form-group">
                    <label for="inputComentario">Comentário (*)</label>
                    <textarea cols="100" rows="10" type="text" class="form-control" id="inputComentario${postagem.id}" required placeholder="Insira o seu comentário"></textarea>
                    </div>
                    <div class="form-group">
                    <input type="button" class="btn btn-success" id="btnAdicionarComentario" value="Inserir Comentário" onclick="insereComentario(${postagem.id})">
                    </div>
                </div>
                </form>
            </div><br><br>`);
    }
}

function insereComentario (id) {
    let campoNome = dbLogado.nome;
    let campoComentario = $("#inputComentario"+id).val();
    let comentario = {nome: campoNome, texto: campoComentario};

    if(campoNome == "" || campoComentario == "")
    {
        alert("Preencha o formulário corretamente.");
        return;
    }

    insertComentario(id, comentario);

    exibePostagens();
}

function init() {
    if (dbLogado.administrador) {
        $('#btnAdd').show();
        $("#btnInsert").click(function () {
            // Verfica se o formulário está preenchido corretamente
            if (!$('#form-postagem')[0].checkValidity()) {
                alert("Preencha o formulário corretamente.");
                return;
            }
            // Obtem os valores dos campos do formulário
            let campoTitulo = $("#inputTitulo").val();
            let campoTexto = $("#inputTexto").val();
            let campoImagem = $('#getimage').attr("name");
            let postagem = { titulo: campoTitulo, texto: campoTexto, img: campoImagem};
            
            insertPostagem(postagem);
        
            // Reexibe os contatos
            exibePostagens();
        
            // Limpa o formulario
            $("#form-postagem")[0].reset();
        });
    } else {
        $('#btnAdd').hide();
    }
    

exibePostagens();
}
