//Script pra download da lista em 'Registro de Atividades de ACS'

function export2txt(data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 0)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "page_1.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//Retorna a 'página' de cadastros especificada
function getPage(page){
    //                                      /sigss/atvAcs/listar?searchField=entiIsen.entiNome&searchString=&filters%5B0%5D=isFiltrarData%3Afalse&filters%5B1%5D=dataInicial%3A&filters%5B2%5D=dataFinal%3A&filters%5B3%5D=isFiltrarIdade%3Afalse&filters%5B4%5D=idadeInicial%3A&filters%5B5%5D=idadeFinal%3A&filters%5B6%5D=isFiltrarDataNasc%3Afalse&filters%5B7%5D=dataNascInicial%3A&filters%5B8%5D=dataNascFinal%3A&filters%5B9%5D=area%3A&filters%5B10%5D=microArea%3A&filters%5B11%5D=prsaPK%3A&_search=false&nd=1692371489858&rows=15&page=1&sidx=entiIsen.entiNome&sord=asc
    var theUrl = window.location.origin + '/sigss/atvAcs/listar?searchField=entiIsen.entiNome&searchString=&filters%5B0%5D=isFiltrarData%3Afalse&filters%5B1%5D=dataInicial%3A&filters%5B2%5D=dataFinal%3A&filters%5B3%5D=isFiltrarIdade%3Afalse&filters%5B4%5D=idadeInicial%3A&filters%5B5%5D=idadeFinal%3A&filters%5B6%5D=isFiltrarDataNasc%3Afalse&filters%5B7%5D=dataNascInicial%3A&filters%5B8%5D=dataNascFinal%3A&filters%5B9%5D=area%3A&filters%5B10%5D=microArea%3A&filters%5B11%5D=prsaPK%3A&_search=false&nd=1692371489858&rows=5000&page=' + page + '&sidx=entiIsen.entiNome&sord=asc';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    data = JSON.parse(xmlHttp.responseText);
    return data;
}

//Baixa todos os cadastros atualmente disponiveis na base
function getFullyDb(){
    let total = -1;
    let drop = {"page":1,"total":1,"records":0,"rows":[]};

    for(let i = 1; i <= total || total == -1; i++){
        var page = getPage(i);
        console.log('Page ' + i + '/' + total + ' downloaded...');

        if(total == -1){
            total = page['total'];
        }

        drop['rows'] = drop['rows'].concat(page['rows']);
    }

    drop['records'] = drop['rows'].length;

    export2txt(drop);
}

getFullyDb();