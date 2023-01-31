const tabelaCorpoFuncionario = $('#tabela-funcionarios-body')

function handlerlistarFuncionario(){

}

function toogleAlterarFuncionario(){
    toogle('tabela-funcionarios')
    toogle('alterar-funcionario')
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

function listarFuncionario(){  
    getData('https://localhost:44349/funcionario/BuscarTodosFuncionarios').then(funcionarios => {
        tabelaCorpoFuncionario.empty()
        funcionarios.forEach(funcionario => {            
            const linha = document.createElement('tr')
            const id = document.createElement('td')
            const nome = document.createElement('td')
            const cpf = document.createElement('td')
            const cargo = document.createElement('td')
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
            tabelaCorpoFuncionario.append(linha)
            
        });
    })
}
listarFuncionario()

async function ListarPorCriterio(elemento){
    let texto = elemento.value;
    let resposta = await ListarPessoasUsandoCriterio(texto);
    
}

async function ListarPessoasUsandoCriterio(criterio){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44349/funcionario/BuscarPorNome?nome='+criterio, options )
        .then(response => {
            tabelaCorpoFuncionario.empty()
                response.json().then(funcionarios =>{
                    funcionarios.forEach(funcionario => {            
                        const linha = document.createElement('tr')
                        const id = document.createElement('td')
                        const nome = document.createElement('td')
                        const cpf = document.createElement('td')
                        const cargo = document.createElement('td')
                        id.innerHTML = funcionario.id
                        nome.innerHTML = funcionario.nome
                        cpf.innerHTML = funcionario.cpf
                        cargo.innerHTML = funcionario.cargo
            
                        linha.addEventListener('click', ()=> {            
                            window.location.href = "FuncionarioAlterar.html?id=" + funcionario.id;
                        });
                        // acoes.appendChild(criarBotao(handlerDeleteFuncionario, 'Deletar', funcionario))  
                        linha.appendChild(id)
                        linha.appendChild(nome)
                        linha.appendChild(cpf)
                        linha.appendChild(cargo)
                        tabelaCorpoFuncionario.append(linha)                    
                    })
                })
            })
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}


function handlerDeleteFuncionario(){
    const idFuncionario = document.getElementById('funcionario-id-alterar').value
    deleteData('https://localhost:44349/funcionario/DeletarFuncionario?id=' + idFuncionario).then(() => {
        toogleAlterarFuncionario()
        listarFuncionario()
    })

}

function handlerAlterarFuncionario(){
    const id = document.getElementById('funcionario-id-alterar').value
    const nome = document.getElementById('funcionario-nome-alterar').value;  
    const cpf = document.getElementById('funcionario-cpf-alterar').value;  
    const cargo = document.getElementById('funcionario-cargo-alterar').value;   
    
    
    const payload = {
        FuncionarioAtualizar:{
            Nome: nome,
            Cpf: cpf,
            Cargo: cargo
        },
        FuncionarioEncontrar: parseInt(id)
    }
    updateData('https://localhost:44349/funcionario/atualizarfuncionario', payload).then(() => {
        toogleAlterarFuncionario()
        listarFuncionario()
    })
}

function handlerSalvarFuncionario(){
    const nome = document.getElementById('funcionario-nome').value;  
    const cpf = document.getElementById('funcionario-cpf').value;  
    const cargo = document.getElementById('funcionario-cargo').value;  
    
    const payload = {     
        SalvarFuncionario: {
            Nome: nome,
            Cpf: cpf,
            Cargo: cargo
        }   
    } 
    postData('https://localhost:44349/Funcionario/salvar', payload).then(funcionario => {
        const linha = document.createElement('tr')
        const id = document.createElement('td')
        const nome = document.createElement('td')
        const cpf = document.createElement('td')
        const cargo = document.createElement('td')
        id.innerHTML = funcionario.id
        nome.innerHTML = funcionario.nome
        cpf.innerHTML = funcionario.cpf
        cargo.innerHTML = funcionario.cargo
        linha.appendChild(id)
        linha.appendChild(nome)
        linha.appendChild(cpf)
        linha.appendChild(cargo)
        tabelaCorpoFuncionario.append(linha)
    })
}







