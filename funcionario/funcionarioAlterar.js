const tabelaCorpoFuncionario2 = $('#tabela-funcionario-body')

function handlerListarFuncionario(){    
}
function toogleAlterarFuncionario(){
    toogle('tabela-funcionarios')
    toogle('tabela-funcionarios-body')
}

function handlerSelecionarFuncionario(funcionario){
    toogleAlterarFuncionario()
    const id = document.getElementById('funcionario-id-alterar')
    const nome = document.getElementById('funcionario-nome-alterar');  
    const cpf = document.getElementById('funcionario-cpf-alterar');  
    const cargo = document.getElementById('funcionario-cargo-alterar');  
    id.value = funcionario.id
    nome.value = funcionario.nome;
    cpf.value = funcionario.cpf
    cargo.value = funcionario.cargo
}



async function buscarFuncionarioPorId(id){  
    getData('https://localhost:44349/funcionario/BuscarFuncionario?id='+id).then(funcionario => {
    //tabelaCorpoCliente2.empty();
        if(funcionario){
            const id = document.querySelector('#funcionario-id-alterar')
            const nome = document.querySelector('#funcionario-nome-alterar')
            const cpf = document.querySelector('#funcionario-cpf-alterar')
            const cargo = document.querySelector('#funcionario-cargo-alterar')

            id.value = funcionario.id;
            nome.value = funcionario.nome
            cpf.value = funcionario.cpf
            cargo.value = funcionario.cargo
        }     
    })
}


function handlerDeleteFuncionario(){
    const idFuncionario = document.getElementById('funcionario-id-alterar').value
    deleteData('https://localhost:44349/funcionario/DeletarFuncionario?id=' + idFuncionario).then(() => {       
        toogleAlterarFuncionario()
        listarFuncionario()
    })
}

function handlerAlterarFuncionario(){
    const id = document.getElementById('funcionario-id-alterar')
    const nome = document.getElementById('funcionario-nome-alterar');  
    const cpf = document.getElementById('funcionario-cpf-alterar');  
    const cargo = document.getElementById('funcionario-cargo-alterar'); 
    
    
    const payload = {
        FuncionarioAtualizar:{
            Nome: nome.value,
            CPF: cpf.value,
            Cargo: cargo.value
        },
        FuncionarioEncontrar: parseInt(id.value)
    }
    console.log(payload);
    updateData('https://localhost:44349/funcionario/AtualizarFuncionario', payload).then(() => {
        toogleAlterarFuncionario()
        listarFuncionario()
    })
}


//pegando os dados do formulário
function handlerSalvarFuncionario(){
    const nome = document.getElementById('funcionario-nome').value;  
    const cpf = document.getElementById('funcionario-cpf').value;  
    const cargo = document.getElementById('funcionario-cargo').value;  
    
    const payload = {     
        SalvarFuncionario:{
            Nome: nome,
            CPF: cpf,
            Cargo: cargo
        }
    } 
    
    postData('https://localhost:44349/funcionario/Salvar', payload).then(funcionario => {
        const linha = document.createElement('tr')
        const nome = document.createElement('td')
        const cpf = document.createElement('td')
        const cargo = document.createElement('td')
        //const acoesfuncionario = document.createElement('td')
        nome.innerHTML = funcionario.nome
        cpf.innerHTML = funcionario.cpf
        cargo.innerHTML = funcionario.cargo
        linha.appendChild(nome)
        linha.appendChild(cpf)
        linha.appendChild(cargo)
        //linha.appendChild(acoesfuncionario)
        tabelaCorpoFuncionario2.append(linha)
        listarFuncionario()
    })

}

async function getFuncionarioId(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await buscarFuncionarioPorId(urlParams.get('id'));
    //preencher a tela;    
}
getFuncionarioId();




