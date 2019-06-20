var usuarioAtual = JSON.parse(localStorage.getItem('loginAtual'));
var login = JSON.parse(localStorage.getItem('login'));


function calculaFesta (Festa) {
    let comiloes = Festa.comiloes;
    let beberroes = Festa.beberroes;
    let semAlcool = Festa.semAlcool;
    let convidados = Festa.convidados;

    for (i=0; i<Festa.ingredientes.length; i++)
    {
        porcao = Festa.ingredientes[i].qtde_porcao;
        
        if (Festa.ingredientes[i].id[0] == "c"){
            Festa.ingredientes[i].quantidadeTotal =  ((convidados-comiloes)*porcao)+(comiloes*porcao*1.5);
            Festa.ingredientes[i].unidade = "kg";
        }
        else if (Festa.ingredientes[i].id[0] == "b") {
            Festa.ingredientes[i].quantidadeTotal = (semAlcool * porcao) + ((convidados-semAlcool)*porcao*0.5);
            Festa.ingredientes[i].unidade = "L";
        }
        else if (Festa.ingredientes[i].id[0] == "d") {
            Festa.ingredientes[i].quantidadeTotal = (convidados*porcao);
            Festa.ingredientes[i].unidade = "kg";
        }
        else if (Festa.ingredientes[i].id[0] == "a") {
            Festa.ingredientes[i].quantidadeTotal = ((convidados-semAlcool-beberroes)*porcao)+(beberroes*porcao*1.5);
            Festa.ingredientes[i].unidade = "L";
        }
    }

    let index = login.data.map(obj => obj.id).indexOf(usuarioAtual.id);
    console.log("INDEX "+usuarioAtual.id);
    login.data[index].festas.push(Festa);
    localStorage.setItem('login', JSON.stringify(login));
    usuarioAtual.festas[0] = Festa;
    localStorage.setItem('loginAtual', JSON.stringify(usuarioAtual));
}