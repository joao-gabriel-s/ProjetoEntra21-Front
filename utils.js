function criarBotao(callBack, label, data = null){
    const botao = document.createElement('button')
    botao.innerHTML = label
    const fn = data ? () => callBack(data) : callBack
    botao.onclick = fn
    return botao
}

const toogle = (id) => {
    const element = document.getElementById(id)
  
    if (element.classList.contains('ocultar')) {
      element.className = 'mostrar'
    } else {
      element.className = 'ocultar'
    }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/')
  );
}
