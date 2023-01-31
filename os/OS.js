const tabelaCorpoOS2 = $('#tabela-os-body')

function handlerlistarOS() {

}

function toogleAlterarOS() {
    toogle('tabela-os')
    toogle('alterar-os')
}

function handlerSelecionarOS(os) {
    toogleAlterarOS()
    const id = document.getElementById('os-id-alterar')
    const valorObra = document.getElementById('valor-obra-alterar').value;
    const idCliente = document.getElementById('idCliente-alterar').value;
    const idFuncionario = document.getElementById('idFuncionario-alterar').value;
    const idObra = document.getElementById('idObra-alterar').value;
    id.value = os.ordemDeServico
    valorObra.value = os.valorDaObra;
    idCliente.value = os.idCliente
    idFuncionario.value = os.idFuncionario
    idObra.value = os.idObra
}

async function ListarPorCriterio(elemento){
    let texto = elemento.value;
    let resposta = await ListarPessoasUsandoCriterio(texto);
    
}
async function ListarPessoasUsandoCriterio(criterio){  
    
    const options = {
        method: 'GET',  
        headers:{'content-type': 'application/json'}                     
    };    
    const req =  await fetch('https://localhost:44349/OS/BuscarPorNome?nome='+criterio, options )
        .then(response => {
            tabelaCorpoOS2.empty()
                response.json().then(oss =>{
                    oss.forEach(os => {            
                        const linha = document.createElement('tr')

            const ordemDeServico = document.createElement('td')
            const valordaObra = document.createElement('td')
            const descricaoDaObra = document.createElement('td')
            const nomeCliente = document.createElement('td')
            const nomeFuncionario = document.createElement('td')
            const dataDeInicio = document.createElement('td')
            const previsaoDeTermino = document.createElement('td')

            ordemDeServico.innerHTML = os.ordemDeServico
            valordaObra.innerHTML = os.valordaObra
            descricaoDaObra.innerHTML = os.descricaoDaObra
            nomeCliente.innerHTML = os.nomeCliente
            nomeFuncionario.innerHTML = os.nomeFuncionario
            dataDeInicio.innerHTML = os.dataDeInicio
            previsaoDeTermino.innerHTML = os.previsaoDeTermino
            
                        linha.addEventListener('click', ()=> {            
                            window.location.href = "OsAlterar.html?id=" + os.id;
                        });
                        // acoes.appendChild(criarBotao(handlerDeleteFuncionario, 'Deletar', funcionario))  
                        linha.appendChild(ordemDeServico)
            linha.appendChild(valordaObra)
            linha.appendChild(descricaoDaObra)
            linha.appendChild(nomeCliente)
            linha.appendChild(nomeFuncionario)
            linha.appendChild(dataDeInicio)
            linha.appendChild(previsaoDeTermino)

            tabelaCorpoOS2.append(linha)                   
                    })
                })
            })
        .catch(erro => {
            console.log(erro);
            return erro;
        });
    return req;
}

function listarOS() {
    getData('https://localhost:44349/OS/BuscarTodas').then(oss => {
        tabelaCorpoOS2.empty()
        oss.forEach(os => {
            const linha = document.createElement('tr')

            const ordemDeServico = document.createElement('td')
            const valordaObra = document.createElement('td')
            const descricaoDaObra = document.createElement('td')
            const nomeCliente = document.createElement('td')
            const nomeFuncionario = document.createElement('td')
            const dataDeInicio = document.createElement('td')
            const previsaoDeTermino = document.createElement('td')

            ordemDeServico.innerHTML = os.ordemDeServico
            valordaObra.innerHTML = os.valordaObra
            descricaoDaObra.innerHTML = os.descricaoDaObra
            nomeCliente.innerHTML = os.nomeCliente
            nomeFuncionario.innerHTML = os.nomeFuncionario
            dataDeInicio.innerHTML = formatDate(new Date(os.dataDeInicio))
            previsaoDeTermino.innerHTML = formatDate(new Date(os.previsaoDeTermino)) 
            
            
            linha.addEventListener('click', ()=> {            
                window.location.href = "osAlterar.html?id=" + os.ordemDeServico;
            });

            linha.appendChild(ordemDeServico)
            linha.appendChild(valordaObra)
            linha.appendChild(descricaoDaObra)
            linha.appendChild(nomeCliente)
            linha.appendChild(nomeFuncionario)
            linha.appendChild(dataDeInicio)
            linha.appendChild(previsaoDeTermino)

            tabelaCorpoOS2.append(linha)

        });
    })
}
listarOS()


function handlerDeleteOS() {
    const idOS = document.getElementById('os-id-alterar').value
    deleteData('https://localhost:44349/OS/DeletarOS?id=' + idOS).then(() => {
        toogleAlterarOS()
        listarOS()
    })

}

function handlerAlterarOS() {
    const id = document.getElementById('os-id-alterar').value;
    const valorObra = document.getElementById('valor-obra-alterar').value;
    const idCliente = document.getElementById('idCliente-alterar').value;
    const idFuncionario = document.getElementById('idFuncionario-alterar').value;
    const idObra = document.getElementById('idObra-alterar').value;


    const payload = {
        
        OSatualizar: {
            ValorDaObra: parseInt(valorObra),
            IdCliente:  parseInt(idCliente),
            IdFuncionario:  parseInt(idFuncionario),
            IdObra:  parseInt(idObra)
        },
        OSencontrar: parseInt(id)
    }
    console.log(payload)
    updateData('https://localhost:44349/OS/AtualizarValor', payload).then(() => {
        toogleAlterarOS()
        listarOS()
    })
}

function handlerSalvarOS() {
    const valorObra = document.getElementById('valor-obra').value;
    const idCliente = document.getElementById('idCliente').value;
    const idFuncionario = document.getElementById('idFuncionario').value;
    const idObra = document.getElementById('idObra').value;

    const payload = {
        ParametrosOs: {
            ValordaObra: parseInt(valorObra),
            IdCliente: parseInt(idCliente),
            IdFuncionario: parseInt(idFuncionario),
            IdObra: parseInt(idObra)
        }
    }
    
    postData('https://localhost:44349/OS/SalvarOS', payload).then(os => {
        const linha = document.createElement('tr')
        const valorObra = document.createElement('td')
        const idCliente = document.createElement('td')
        const idFuncionario = document.createElement('td')
        const idObra = document.createElement('td')
        valorObra.innerHTML = os.valorObra
        idCliente.innerHTML = os.idCliente
        idFuncionario.innerHTML = os.idFuncionario
        idObra.innerHTML =  os.idObra    
        linha.appendChild(valorObra)
        linha.appendChild(idCliente)
        linha.appendChild(idFuncionario)
        linha.appendChild(idObra)
        tabelaCorpoOS2.append(linha)
        listarOS()
    })

}
function listarCliente(){      
    getData('https://localhost:44349/cliente/BuscarTodos').then(clientes => {
        const idClientes = document.querySelector('#idCliente');   
        if(clientes)
        {
            clientes.forEach(cliente => {
                let optionCliente = new Option(cliente.nome,cliente.id);                
                idClientes.options[idClientes.options.length] = optionCliente;  
            });
        }
    })
}
function listarFuncionario(){  
    getData('https://localhost:44349/funcionario/BuscarTodosFuncionarios').then(funcionarios => {
        const idFuncionarios = document.querySelector('#idFuncionario');
        if(funcionarios)
        {
            funcionarios.forEach(funcionario => { 
                let optionFuncionario = new Option(funcionario.nome,funcionario.id);                
                idFuncionarios.options[idFuncionarios.options.length] = optionFuncionario;  
            });
        }});
}

function listarObra() {
    getData('https://localhost:44349/Obra/BuscarTodas').then(obras => {
        const idObras = document.querySelector('#idObra');
        if(obras) 
        {
            obras.forEach(obra => {
                let optionObra = new Option(obra.descricao,obra.id);                
                idObras.options[idObras.options.length] = optionObra; 
            });
        }
    })
}

listarCliente();
listarFuncionario();
listarObra();







