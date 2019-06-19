var dbfake = {
    "data": [
        {
            "id": 1,
            "usuario": "admin",
            "senha": "admin",
            "administrador": true,
            "nome": "Carolina",
            "dataNascimento": "1999-06-05",
            "festas": []
        }
    ]
};

var db = JSON.parse(localStorage.getItem('login'));
if (!db) {
    db = dbfake;
    localStorage.setItem('login',JSON.stringify(dbfake));
};

function procuraUsuario (usuario, senha) {
    localStorage.removeItem('loginAtual');
    for (i = 0; i < db.data.length; i++) {
        if ((db.data[i].usuario == usuario) &&
            (db.data[i].senha == senha)) {
                dblogin = {
                    "id": db.data[i].id,
                    "nome": db.data[i].nome,
                    "dataNascimento": db.data[i].dataNascimento,
                    "usuario": usuario,
                    "senha": senha,
                    "administrador": db.data[i].administrador,
                    "festas": db.data[i].festas
                };
                localStorage.setItem('loginAtual',JSON.stringify(dblogin));
                return true;
        }
    }

    return false;    
}

function cadastraUsuario(nome, dataNascimento, usuario, senha) {
    localStorage.removeItem('loginAtual');
    for (i = 0; i < db.data.length; i++) { //verifica se o usuário já existe 
        if (db.data[i].usuario == usuario) {
                return false;
        }
    }

    let novoId;

    // Calcula novo Id a partir do último código existente no array
    if (db.data.length == 0)
        novoId = 0;
    else 
        novoId = db.data[db.data.length - 1].id + 1;
    
    let novoUsuario = {
        "id": novoId,
        "usuario": usuario,
        "senha": senha,
        "administrador": false,
        "nome": nome,
        "dataNascimento": dataNascimento,
        "festas": []
    };

    db.data.push(novoUsuario);
    // Atualiza os dados no Local Storage
    localStorage.setItem('login', JSON.stringify(db));

    return true;
}