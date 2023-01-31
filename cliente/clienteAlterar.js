const tabelaCorpoCliente = $('#tabela-clientes-body')

function handlerListar(){    
}
function toogleAlterarCliente(){
    toogle('tabela-clientes')
    toogle('alterar-cliente')
}

function handlerSelecionarCliente(cliente){
    toogleAlterarCliente()
    const id = document.getElementById('cliente-id-alterar')
    const nome = document.getElementById('cliente-nome-alterar');  
    const cnpj = document.getElementById('cliente-cnpj-alterar');  
    const telefone = document.getElementById('cliente-telefone-alterar');  
    id.value = cliente.id
    nome.value = cliente.nome
    cnpj.value = cliente.cnpj
    telefone.value = cliente.telefone
}

function listarCliente(){  
    getData('https://localhost:44349/cliente/BuscarTodos').then(clientes => {
    tabelaCorpoCliente.empty()
        clientes.forEach(cliente => {            
            const linha = document.createElement('tr')
            const id = document.createElement('td')
            const nome = document.createElement('td')
            const cnpj = document.createElement('td')
            const telefone = document.createElement('td')
            id.innerHTML = cliente.id
            nome.innerHTML = cliente.nome
            cnpj.innerHTML = cliente.cnpj
            telefone.innerHTML = cliente.telefone

            linha.addEventListener('click', ()=> {            
                window.location.href = "clienteAlterar.html?id=" + cliente.id;
            });
            // acoes.appendChild(criarBotao(handlerDeleteFuncionario, 'Deletar', funcionario))  
            linha.appendChild(id)
            linha.appendChild(nome)
            linha.appendChild(cnpj)
            linha.appendChild(telefone)
            tabelaCorpoCliente.append(linha)
            
        });
    })
}
listarCliente()

async function buscarClientePorId(id){  
    getData('https://localhost:44349/cliente/BuscarCliente?id='+id).then(cliente => {
    //tabelaCorpoCliente2.empty();
        if(cliente){
            const id = document.querySelector('#cliente-id-alterar')
            const nome = document.querySelector('#cliente-nome-alterar')
            const cnpj = document.querySelector('#cliente-cnpj-alterar')
            const telefone = document.querySelector('#cliente-telefone-alterar')

            id.value = cliente.id;
            nome.value = cliente.nome
            cnpj.value = cliente.cnpj
            telefone.value = cliente.telefone
        }     
    })
}


function handlerDeleteCliente(){
    const idCliente = document.getElementById('cliente-id-alterar').value
    deleteData('https://localhost:44349/cliente/DeletarCliente?id=' + idCliente).then(() => {       
        toogleAlterarCliente()
        listarCliente()
    })
}

function handlerAlterarCliente(){
    const id = document.getElementById('cliente-id-alterar').value;
    const nome = document.getElementById('cliente-nome-alterar').value;  
    const cnpj = document.getElementById('cliente-cnpj-alterar').value;  
    const telefone = document.getElementById('cliente-telefone-alterar').value;   
    
    
    const payload = {
        ClienteAtualizar:{
            Nome: nome,
            CNPJ: cnpj,
            Telefone: telefone
        },
        ClienteEncontrar: parseInt(id)
    }
    updateData('https://localhost:44349/cliente/Atualizar', payload).then(() => {
        toogleAlterarCliente()
        listarCliente()
    })
}


//pegando os dados do formulário
function handlerSalvarCliente(){
    const nome = document.getElementById('cliente-nome').value;  
    const cnpj = document.getElementById('cliente-cnpj').value;  
    const telefone = document.getElementById('cliente-telefone').value;  
    
    const payload = {     
        ClienteSalvar:{
            Nome: nome,
            CNPJ: cnpj,
            Telefone: telefone
        }
    } 
    
    postData('https://localhost:44349/Cliente/Salvar', payload).then(cliente => {
        const linha = document.createElement('tr')
        const nome = document.createElement('td')
        const cnpj = document.createElement('td')
        const telefone = document.createElement('td')
        const acoescliente = document.createElement('td')
        nome.innerHTML = cliente.nome
        cnpj.innerHTML = cliente.cnpj
        telefone.innerHTML = cliente.telefone
        linha.appendChild(nome)
        linha.appendChild(cnpj)
        linha.appendChild(telefone)
        linha.appendChild(acoescliente)
        tabelaCorpoCliente.appendChild(linha)
        listarCliente()
    })

}

async function getClienteId(){
    const urlParams = new URLSearchParams(window.location.search);    
    let res = await buscarClientePorId(urlParams.get('id'));
    //preencher a tela;    
}
getClienteId();




