const tabelaCorpoObra = $('#tabela-obras-body')

function handlerlistar() {

}

function toogleAlterarObra() {
    toogle('tabela-obras')
    toogle('alterar-obra')
}

function handlerSelecionarObra(obra) {
    toogleAlterarObra()
    const id = document.getElementById('obra-id-alterar')
    const descricao = document.getElementById('obra-descricao-alterar');
    const inicio = document.getElementById('obra-inicio-alterar');
    const final = document.getElementById('obra-final-alterar');
    id.value = obra.id
    descricao.value = obra.descricao;
    inicio.value = obra.datadeInicio
    final.value = obra.previsaodeTermino
    
}

function listarObra() {
    getData('https://localhost:44349/Obra/BuscarTodas').then(obras => {
        tabelaCorpoObra.empty()
        obras.forEach(obra => {
            const linha = document.createElement('tr')

            const id = document.createElement('td')
            const descricao = document.createElement('td')
            const inicio = document.createElement('td')
            const final = document.createElement('td')

            id.innerHTML = obra.id
            descricao.innerHTML = obra.descricao
            inicio.innerHTML = formatDate(new Date(obra.datadeInicio));
            final.innerHTML = formatDate(new Date(obra.previsaodeTermino));
            
            
            
            linha.addEventListener('click', ()=> {            
                window.location.href = "obraAlterar.html?id=" + obra.id;
            });
            
            linha.appendChild(id)
            linha.appendChild(descricao)
            linha.appendChild(inicio)
            linha.appendChild(final)
            tabelaCorpoObra.append(linha)

        });
    })
}
listarObra()

async function ListarPorCriterio(elemento){
    let texto = elemento.value;
    let resposta = await ListarPessoasUsandoCriterio(texto);
    
}

async function ListarPessoasUsandoCriterio(criterio){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44349/obra/BuscarPorNome?nome='+criterio, options )
        .then(response => {
            tabelaCorpoObra.empty()
                response.json().then(obras =>{
                    obras.forEach(obra => {            
                        const linha = document.createElement('tr')

                        const id = document.createElement('td')
                        const descricao = document.createElement('td')
                        const inicio = document.createElement('td')
                        const final = document.createElement('td')
            
                        id.innerHTML = obra.id
                        descricao.innerHTML = obra.descricao
                        inicio.innerHTML = obra.inicio
                        final.innerHTML = obra.final
                        console.log(obra)
                        linha.addEventListener('click', ()=> {            
                            window.location.href = "obraAlterar.html?id=" + obra.id;
                        });
                        // acoes.appendChild(criarBotao(handlerDeleteobra, 'Deletar', obra))  
                        linha.appendChild(id)
                        linha.appendChild(descricao)
                        linha.appendChild(inicio)
                        linha.appendChild(final)       
                        tabelaCorpoObra.append(linha)                  
                    })
                })
            })
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}

function handlerDeleteObra() {
    const idObra = document.getElementById('obra-id-alterar').value
    deleteData(`https://localhost:44349/Obra/DeletarObra?id=${idObra}`).then(() => {
        toogleAlterarObra()
        listarObra()
    })

}

function handlerAlterarObra() {
    const id = document.getElementById('obra-id-alterar').value
    const descricao = document.getElementById('obra-descricao-alterar').value;
    const inicio = document.getElementById('obra-inicio-alterar').value;
    const final = document.getElementById('obra-final-alterar').value;


    const payload = {
        ObraAtualizar: {
            Descricao: descricao,
            DatadeInicio: inicio,
            PrevisaodeTermino: final
        },
        ObraEncontrar: parseInt(id)
    }
    updateData('https://localhost:44349/Obra/atualizar', payload).then(() => {
        toogleAlterarObra()
        listarObra()
    })
}

function handlerSalvarObra() {
    const descricao = document.getElementById('obra-descricao').value;
    const inicio = document.getElementById('obra-inicio').value;
    const final = document.getElementById('obra-final').value;
    

    const payload = {
        SalvarObra: {
            Descricao: descricao,
            DatadeInicio: inicio,
            PrevisaodeTermino: final
        }
    }
    postData('https://localhost:44349/Obra/Salvar', payload).then(obra => {
        const linha = document.createElement('tr')
        const descricao = document.createElement('td')
        const inicio = document.createElement('td')
        const final = document.createElement('td')
        const id = document.createElement('td')
        descricao.innerHTML = obra.descricao
        inicio.innerHTML = obra.datadeInicio
        final.innerHTML =  obra.previsaodeTermino
        id.innerHTML = obra.id
             
        linha.appendChild(id)
        linha.appendChild(descricao)
        linha.appendChild(inicio)
        linha.appendChild(final)
        tabelaCorpoObra.append(linha)
        
    })
}







