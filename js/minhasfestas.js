var dbLogin = JSON.parse(localStorage.getItem('login'));
var dbLoginAtual = JSON.parse(localStorage.getItem('loginAtual'));

var index = dbLogin.data.map(obj => obj.id).indexOf(dbLoginAtual.id);
var txt = '';

for (i=0; i < dbLogin.data[index].festas.length; i++) {
    txt += `
    <div class="row">
        <div class="card " style="width: 100rem;">
            <div class="card-body">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                <h2> ${dbLogin.data[index].festas[i].nome}</h2>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Convidados</th>
                                            <th>Beberrões</th>
                                            <th>Comilões</th>
                                            <th>Não tomam álcool</th>
                                        </tr>
                                    </thead>
                                    <tbody id="convidados">
                                    <td>${dbLogin.data[index].festas[i].convidados}</td>
                                    <td>${dbLogin.data[index].festas[i].beberroes}</td>
                                    <td>${dbLogin.data[index].festas[i].comiloes}</td>
                                    <td>${dbLogin.data[index].festas[i].semAlcool}</td>
                                    </tbody>
                                </table>
                                <br>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody id="produtos">`;
                                        for (j=0; j<dbLogin.data[index].festas[i].ingredientes.length; j++) {
                                            txt += `<tr>
                                            <td>${dbLogin.data[index].festas[i].ingredientes[j].nome}</td>
                                            <td>${dbLogin.data[index].festas[i].ingredientes[j].quantidadeTotal}${dbLogin.data[index].festas[i].ingredientes[j].unidade}</td>
                                        </tr>`;
                                        }
                                    txt += `</tbody>
                                </table>
                            </div> 
                            </div>
                            </div> 
                        </div><br><br><br><br>`;
}

$("#resultados").html(txt);