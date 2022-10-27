var players = [
  { nome: "Guilherme", vitorias: 0, empates: 0, derrotas: 0, pontos: 0 },
  { nome: "Rafa", vitorias: 0, empates: 0, derrotas: 0, pontos: 0 },
  { nome: "Paulo", vitorias: 0, empates: 0, derrotas: 0, pontos: 0 },
  { nome: "Gui", vitorias: 0, empates: 0, derrotas: 0, pontos: 0 }
];

var error = document.getElementById("erro");

function adicionarJogador() {
  var nome = document.getElementById("novoJogador").value;
  var vitorias = parseInt(document.getElementById("vitorias").value);
  var empates = parseInt(document.getElementById("empates").value);
  var derrotas = parseInt(document.getElementById("derrotas").value);
  var pontos = parseInt(document.getElementById("pontos").value);

  if (
    document.getElementById("novoJogador").value == "" ||
    document.getElementById("vitorias").value == "" ||
    document.getElementById("empates").value == "" ||
    document.getElementById("derrotas").value == "" ||
    document.getElementById("pontos").value == ""
  ) {
    error.innerHTML = "<h1>Um dos campos está vazio!</h1>";
  } else if (
    document.getElementById("vitorias").value < 0 ||
    document.getElementById("empates").value < 0 ||
    document.getElementById("derrotas").value < 0 ||
    document.getElementById("pontos").value < 0
  ) {
    error.innerHTML = "<h1>O valor não pode ser negativo!</h1>";
  } else {
    error.innerHTML = "";
    var novoJogador = {
      nome: nome,
      vitorias: vitorias,
      empates: empates,
      derrotas: derrotas,
      pontos: pontos
    };

    players.push(novoJogador);
    mostrar(players);
    document.getElementById("novoJogador").value = "";
    document.getElementById("vitorias").value = "";
    document.getElementById("empates").value = "";
    document.getElementById("derrotas").value = "";
    document.getElementById("pontos").value = "";
  }
  ganhador.innerHTML = "";
}

function calcular(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates;
  return pontos;
}

players[0].pontos = calcular(players[0]);
players[1].pontos = calcular(players[1]);
players[2].pontos = calcular(players[2]);
players[3].pontos = calcular(players[3]);

function mostrar(players) {
  var elemento = "";
  for (var i = 0; i < players.length; i++) {
    elemento += "<tr><td>" + players[i].nome + "</td>";
    elemento += "<td>" + players[i].vitorias + "</td>";
    elemento += "<td>" + players[i].empates + "</td>";
    elemento += "<td>" + players[i].derrotas + "</td>";
    elemento += "<td>" + players[i].pontos + "</td>";
    elemento +=
      "<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
    elemento +=
      "<td><button onClick='adicionarEmpate(" + i + ")'>Empate</button></td>";
    elemento +=
      "<td><button onClick='adicionarDerrota(" + i + ")'>Derrota</button></td>";
    elemento += "</tr>";
  }

  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento;
}

mostrar(players);

function adicionarVitoria(i) {
  var jogador = players[i];
  jogador.vitorias++;
  jogador.derrotas = jogador.derrotas - 1;
  var s = 0;
  while (s < players.length) {
    players[s].derrotas++;
    s++;
  }
  jogador.pontos = calcular(jogador);
  ganhador.innerHTML = "";
  mostrar(players);
}

function adicionarEmpate(i) {
  var jogador = players[i];
  var s = 0;
  while (s < players.length) {
    players[s].empates++;
    players[s].pontos++;
    s++;
  }
  jogador.pontos = calcular(jogador);
  ganhador.innerHTML = "";
  mostrar(players);
}

var ganhador = document.getElementById("ganhador");

function adicionarDerrota(i) {
  ganhador.innerHTML =
    "<h1>Adicione uma vitória ao oponente ganhador!</h1><br>";
  var jogador = players[i];
  jogador.derrotas++;
  mostrar(players);
}

function zerarPontos() {
  var s = 0;
  while (s < players.length) {
    players[s].vitorias = 0;
    players[s].empates = 0;
    players[s].derrotas = 0;
    players[s].pontos = 0;
    s++;
    ganhador.innerHTML = "";
    error.innerHTML = "";
    mostrar(players);
  }
}