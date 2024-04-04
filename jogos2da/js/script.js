//variavel que irá receber um número aleatorío
let randomNumber = parseInt (Math.random()*100+1)
//criando varivaveis para manipular os elementos html

const submit = document.querySelector('#jogar') //Vai pegar o elemento Jogar. Const Submit: vai entender que é um botão
const jogada = document.querySelector('#txtNumero') //Manipula a caixa de texto
const jogadaAnterior = document.querySelector('.Vezes') //Jogadas anteriores
const jogadasRestantes = document.querySelector('.numChances') //Jogadas restantes
const recomecar = document.querySelector('.resultados') //Div
const avisos = document.querySelector('.avisos') //Texto informativo
const p = document.createElement ('p') //criará um paragrafo para reiniciar

let numerosJogados = [] //Todos números que forem jogados irão pro vetor ai sla (professor: criação de vetor para números jogados)
let minhasJogadas = 1 //Contador de jogadas
let playGame = true; //jogador pode jogar caso seja true, caso seja false, não pode

if(playGame){ //se a variavel playGame for true execute os códigos abaixo
        submit.addEventListener('click', function(e){ //quando o botão for clicado...
        e.preventDefault() //vai prevenir o default ai (é pra não ficar reiniciando)
        const tentativa = parseInt(jogada.value)
        validaChances(tentativa) // Chamando a função validaChances e enviando tentativa como argumento
  })
}

//(tentativa) = vai utilizar o tentativa como argumento, em outras palavras, vai utilizar do valor que for dado no "tentativa"

function validaChances(tentativa){ //recebe o valor digitado pelo jogador
  if(isNaN(tentativa)){
      alert('Por favor, nos informe um valor númerico.')
      jogada.value = "" //limpa a caixa de texto quando tiver uma letra ou caso o valor fornecido seja menor que 1
      jogada.focus () //leva o curso para a caixinha após apertar o Ok do alert
  }
  //Caso NaN (tentativa não seja um número) let´s go to build a code


  else if(tentativa < 1 || (tentativa >100)){
    alert('Valor inválido, por favor informe um valor maior que 1 e menor que 101.')
    jogada.value = ''
    jogada.focus()
  }

  else if(numerosJogados.includes(tentativa)){
    alert('O número informado já foi jogado.')
    jogada.value=''
    jogada.focus()
  
  }

 
  else{
      numerosJogados.push(tentativa) //Empurrando o valor do vetor\
      if(minhasJogadas === 6 && tentativa !== randomNumber){
        //se minhasJogadas for igual a 6 vidas e tentativa for diferente (!==) do número aleatório
    displayTentativas(tentativa) //chame a função displayTentativas
    msg(`Gamer Over!! <br> O número correto era ${randomNumber}`)
    fimJogo()
      }


    else{
      displayTentativas(tentativa)
      checarTentativas(tentativa)
    }

  }

}

function checarTentativas(tentativa){
  if(tentativa === randomNumber){
    msg ('Parabéns, você acertou o número.')
    fimJogo()
  }
  
  else if(tentativa < randomNumber){
    msg('Palpite baixo, tente novamente, irmão.')
  }

  else if (tentativa > randomNumber){
    msg('Alto D++, tente novamente.')
  }
}

/*
O código irá limpar a caixa de texto para a próxima jogada
inserindo uma informação dentro do elemnto html chamado span
Incremento um novo valor para a variavel minhasJogadas
Inserindo informação de jogadas restantes usando propriedades innherHTML*/

function displayTentativas(tentativa){
  jogada.value= ''
  jogadaAnterior.innerHTML += `${tentativa} ` /*É uma propriedade. Caso não tenha espaço após o "tentativa", acaba que o número só fica junto*/
  minhasJogadas++
  jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
}

function msg(mensagem){
 avisos.innerHTML = `<h1>${mensagem}</h1>` 
}

function fimJogo(){
  jogada.value = ''
  jogada.setAttribute('disabled','') //Desabilita caixinha para digitação
  submit.setAttribute('disabled','') //Desabilita o botão
  p.innerHTML = '<h1 id="iniciarJogada">Iniciar o jogo</h1>'
  recomecar.appendChild(p)
  playGame = false;
  iniciarJogo()
}

function iniciarJogo(){
  const botaoIniciar = document.querySelector('#iniciarJogada')
  botaoIniciar.addEventListener('click',function(){
  randomNumber = parseInt(Math.random()*100+1)
  numerosJogados = [] //deixa o vetor vazio
  minhasJogadas= 1
  jogadaAnterior.innerHTML = ''
  avisos.innerHTML = ''
  jogadasRestantes.innerHTML - `${7 - minhasJogadas}` //O JogadasRestantes vai pegar o minhasJogadas
  jogada.removeAttribute('disabled','')
  submit.removeAttribute('disabled','')
  recomecar.removeChild(p)
  playGame = true
  })
}