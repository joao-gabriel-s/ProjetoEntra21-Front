const tabelaCorpoObra2 = $('#tabela-obras-body')

function handlerlistarObra() {

}

function toogleAlterarObra() {
    toogle('tabela-obras')
    toogle('alterar-obra')
}

function handlerSelecionarObra(obra){
    toogleAlterarObra()
    const id = document.getElementById('obra-id-alterar')
    const descricao = document.getElementById('obra-descricao-alterar');  
    const inicio = document.getElementById('obra-inicio-alterar');  
    const final = document.getElementById('obra-final-alterar');  
    id.value = obra.id
    descricao.value = obra.descricao
    inicio.value = obra.inicio
    final.value = obra.final
    
}


function listarFuncionario(){  
    getData('https://localhost:44349/funcionario/BuscarTodosFuncionarios').then(funcionarios => {
        tabelaCorpoFuncionario.empty()
        funcionarios.forEach(funcionario => {            
            const linha = document.createElement('tr')
            const id = document.createElement('td')
            const nome = document.createElement('td')
            const cpf = document.createElement('td')
            const cargo = document.createElement('td')
            const acoes = document.createElement('td')
            id.innerHTML = funcionario.id
            nome.innerHTML = funcionario.nome
            cpf.innerHTML = funcionario.cpf
            cargo.innerHTML = funcionario.cargo

            linha.addEventListener('click', ()=> {            
                window.location.href = "FuncionarioAlterar.html?id=" + funcionario.id;
            });

            linha.appendChild(id)
            linha.appendChild(nome)
            linha.appendChild(cpf)
            linha.appendChild(cargo)
            linha.appendChild(acoes)
            tabelaCorpoFuncionario.append(linha)
            
        });
    })
}
listarObra()

async function buscarObraPorId(id){  
    getData('https://localhost:44349/obra/BuscarObra?id='+id).then(obra => {
    //tabelaCorpoCliente2.empty();
        if(obra){
            const id = document.querySelector('#obra-id-alterar')
            const descricao = document.querySelector('#obra-descricao-alterar')
            const inicio = document.querySelector('#obra-inicio-alterar')
            const final = document.querySelector('#obra-final-alterar')

            id.value = obra.id
            descricao.value = obra.descricao
            inicio.value = obra.inicio
            final.value = obra.final
        }     
    })
}


function handlerDeleteObra(){
    const idObra = document.getElementById('obra-id-alterar').value
    deleteData('https://localhost:44349/obra/deletarObra?id=' + idObra).then(() => {       
        toogleAlterarObra()
        listarObra()
    })
}

function handlerAlterarObra(){
    const id = document.getElementById('obra-id-alterar').value;
    const descricao = document.getElementById('obra-descricao-alterar').value;
    const inicio = document.getElementById('obra-inicio-alterar').value;  
    const final = document.getElementById('obra-final-alterar').value;   
    
    
    const payload = {
        ObraAtualizar:{
            Descricao: descricao,
            DatadeInicio: inicio,
            PrevisaodeTermino: final
        },
        ObraEncontrar: parseInt(id)
    }
    updateData('https://localhost:44349/obra/Atualizar', payload).then(() => {
        toogleAlterarObra()
        //listarObra()
    })
}


//pegando os dados do formulário
function handlerSalvarObra(){
    const descricao = document.getElementById('obra-descricao').value;  
    const inicio = document.getElementById('obra-inicio').value;  
    const final = document.getElementById('obra-final').value;  
    
    const payload = {     
        SalvarObra:{
            Descricao: descricao,
            DatadeInicio: inicio,
            PrevisaodeTermino: final
        }
    } 
    
    postData('https://localhost:44349/obra/Salvar', payload).then(obra => {
        const linha = document.createElement('tr')
        const descricao = document.createElement('td')
        const inicio = document.createElement('td')
        const final = document.createElement('td')
        const acoesobra = document.createElement('td')
        descricao.innerHTML = obra.descricao
        inicio.innerHTML = obra.datadeInicio
        final.innerHTML = obra.previsaodeTermino
        linha.appendChild(descricao)
        linha.appendChild(inicio)
        linha.appendChild(final)
        linha.appendChild(acoesobra)
        tabelaCorpoObra2.append(linha)
        listarObra()
    })

}

async function getObraId(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await buscarObraPorId(urlParams.get('id'));
    //preencher a tela;    
}
getObraId();




