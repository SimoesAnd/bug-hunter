export const levels = [
  // ==========================================
  // NÍVEIS JAVASCRIPT (BÁSICO A DIFÍCIL)
  // ==========================================
  {
    id: 1,
    title: "O Loop Infinito",
    difficulty: "Iniciante",
    language: "javascript",
    description: "O estagiário tentou calcular a média, mas o loop está indo longe demais e acessando um índice que não existe.",
    hint: "Arrays começam no índice 0. O loop deve ir ENQUANTO 'i' for MENOR (<) que o tamanho.",
    functionName: "calcularMedia",
    initialCode: `function calcularMedia(notas) {
  let soma = 0;
  // BUG: O loop vai até o tamanho total (<=), mas deveria parar antes (<)
  for (let i = 0; i <= notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}`,
    testCases: [{ input: [[10, 8, 9]], expected: 9 }, { input: [[5, 5, 5, 5]], expected: 5 }]
  },
  {
    id: 2,
    title: "Soma de Texto?",
    difficulty: "Iniciante",
    language: "javascript",
    description: "O resultado da soma está concatenando texto (ex: '1020') ao invés de somar números (30).",
    hint: "Verifique o valor inicial de 'total'. Aspas transformam números em texto. Remova as aspas.",
    functionName: "somarPrecos",
    initialCode: `function somarPrecos(precos) {
  // BUG: Iniciado como String
  let total = "0"; 
  for (let i = 0; i < precos.length; i++) {
    total += precos[i];
  }
  return total;
}`,
    testCases: [{ input: [[10, 20, 30]], expected: 60 }, { input: [[1, 1]], expected: 2 }]
  },
  {
    id: 3,
    title: "O Desconto Quebrado",
    difficulty: "Iniciante",
    language: "javascript",
    description: "A loja dá desconto se o valor for MAIOR ou IGUAL a 100. Mas clientes com compra de exatos 100 não ganharam desconto.",
    hint: "O operador '>' (maior que) exclui o número. O operador '>=' (maior ou igual) inclui.",
    functionName: "aplicarDesconto",
    initialCode: `function aplicarDesconto(valor) {
  // Regra: Compras de 100 ou mais ganham 10% de desconto
  // BUG: A condição está excluindo o 100 exato
  if (valor > 100) {
    return valor * 0.9; // 10% off
  }
  return valor;
}`,
    testCases: [{ input: [100], expected: 90 }, { input: [150], expected: 135 }]
  },
  {
    id: 4,
    title: "Confusão de Maiúsculas",
    difficulty: "Fácil",
    language: "javascript",
    description: "O código não roda porque o JavaScript diferencia maiúsculas de minúsculas.",
    hint: "A variável foi declarada como 'NomeUsuario', mas usada como 'nomeUsuario'.",
    functionName: "saudacao",
    initialCode: `function saudacao(nome) {
  let NomeUsuario = nome;
  // BUG: JavaScript diferencia letras maiúsculas de minúsculas
  return "Olá, " + nomeUsuario;
}`,
    testCases: [{ input: ["Ana"], expected: "Olá, Ana" }]
  },
  {
    id: 5,
    title: "O 'Return' Esquecido",
    difficulty: "Fácil",
    language: "javascript",
    description: "A função calcula tudo certo, mas quem chama recebe 'undefined'.",
    hint: "Para uma função devolver um valor, ela precisa da palavra-chave 'return'.",
    functionName: "multiplicar",
    initialCode: `function multiplicar(a, b) {
  let resultado = a * b;
  // BUG: Faltou retornar o resultado
}`,
    testCases: [{ input: [2, 3], expected: 6 }, { input: [10, 10], expected: 100 }]
  },
  {
    id: 6,
    title: "Atribuição no If",
    difficulty: "Fácil",
    language: "javascript",
    description: "A condição IF está sempre verdadeira porque está ATRIBUINDO valor em vez de COMPARAR.",
    hint: "Um sinal de igual (=) atribui. Dois (==) ou três (===) comparam.",
    functionName: "ehDez",
    initialCode: `function ehDez(numero) {
  // BUG: Usou apenas um '=' dentro do if
  if (numero = 10) {
    return true;
  }
  return false;
}`,
    testCases: [{ input: [10], expected: true }, { input: [5], expected: false }]
  },
  {
    id: 7,
    title: "Índice Zero",
    difficulty: "Fácil",
    language: "javascript",
    description: "Tentamos pegar o primeiro item da lista, mas estamos pegando o segundo.",
    hint: "Em programação, a contagem começa no zero. O primeiro item é [0].",
    functionName: "pegarPrimeiro",
    initialCode: `function pegarPrimeiro(lista) {
  // BUG: Índice 1 é o segundo item
  return lista[1];
}`,
    testCases: [{ input: [[10, 20]], expected: 10 }]
  },
  {
    id: 8,
    title: "Lógica Invertida",
    difficulty: "Fácil",
    language: "javascript",
    description: "A função deveria retornar true para maiores de idade (>=18), mas faz o contrário.",
    hint: "O sinal '<' significa menor. Use '>=' para maior ou igual.",
    functionName: "podeDirigir",
    initialCode: `function podeDirigir(idade) {
  // BUG: Lógica está 'menor que 18'
  if (idade < 18) {
    return true;
  }
  return false;
}`,
    testCases: [{ input: [20], expected: true }, { input: [15], expected: false }]
  },
  {
    id: 9,
    title: "Concatenando Strings",
    difficulty: "Fácil",
    language: "javascript",
    description: "Ao somar '5' + '5', o resultado é '55'.",
    hint: "Use Number() ou parseInt() para converter texto em número antes de somar.",
    functionName: "somarStrings",
    initialCode: `function somarStrings(a, b) {
  // a e b vêm como texto (ex: "5")
  // BUG: Precisa converter para número
  return a + b;
}`,
    testCases: [{ input: ["5", "5"], expected: 10 }]
  },
  {
    id: 10,
    title: "Propriedade vs Método",
    difficulty: "Fácil",
    language: "javascript",
    description: "Erro ao tentar ver o tamanho da lista.",
    hint: "Em arrays, '.length' é uma propriedade. Tire os parênteses '()'.",
    functionName: "tamanhoLista",
    initialCode: `function tamanhoLista(lista) {
  // BUG: length não é uma função
  return lista.length();
}`,
    testCases: [{ input: [[1, 2, 3]], expected: 3 }]
  },
  {
    id: 11,
    title: "Erro de Digitação",
    difficulty: "Fácil",
    language: "javascript",
    description: "A função retorna undefined. Parece erro de inglês.",
    hint: "O correto é 'length' (g antes do t).",
    functionName: "contarLetras",
    initialCode: `function contarLetras(texto) {
  // BUG: Erro de digitação (ht vs th)
  return texto.lenght;
}`,
    testCases: [{ input: ["Ola"], expected: 3 }]
  },
  {
    id: 12,
    title: "Else Solitário",
    difficulty: "Fácil",
    language: "javascript",
    description: "Erro de sintaxe no IF/ELSE. O else precisa de um bloco if fechado antes.",
    hint: "Adicione chaves {} ao redor do retorno do if para o else funcionar.",
    functionName: "parOuImpar",
    initialCode: `function parOuImpar(num) {
  if (num % 2 === 0) 
    return "Par";
  // BUG: Falta fechar bloco ou estruturar
  else {
    return "Impar";
  }
}`,
    testCases: [{ input: [2], expected: "Par" }, { input: [3], expected: "Impar" }]
  },
  {
    id: 13,
    title: "Variável Fantasma",
    difficulty: "Fácil",
    language: "javascript",
    description: "Tentando usar uma variável que não foi criada.",
    hint: "Você calculou em 'res', mas tentou retornar 'resultado'.",
    functionName: "cubo",
    initialCode: `function cubo(num) {
  let res = num * num * num;
  // BUG: Nome da variável errado
  return resultado;
}`,
    testCases: [{ input: [2], expected: 8 }]
  },
  {
    id: 14,
    title: "Loop Reverso Falho",
    difficulty: "Médio",
    language: "javascript",
    description: "A contagem regressiva não funciona.",
    hint: "Se o loop diminui (i--), a condição deve ser enquanto i for MAIOR que 0.",
    functionName: "contagemRegressiva",
    initialCode: `function contagemRegressiva(n) {
  let array = [];
  // BUG: Condição i < 0 é falsa logo no início
  for (let i = n; i < 0; i--) {
    array.push(i);
  }
  return array;
}`,
    testCases: [{ input: [3], expected: [3, 2, 1] }]
  },
  {
    id: 15,
    title: "Switch Vazado",
    difficulty: "Médio",
    language: "javascript",
    description: "Selecionar 'Azul' retorna 'Cor desconhecida'.",
    hint: "Faltou o 'break' ou 'return' dentro do case 'Azul'.",
    functionName: "traduzirCor",
    initialCode: `function traduzirCor(cor) {
  switch(cor) {
    case "Vermelho": return "Red";
    case "Azul": 
       // BUG: Sem break, ele cai no default
    default: return "Cor desconhecida";
  }
}`,
    testCases: [{ input: ["Azul"], expected: "Cor desconhecida" }] 
  },
  {
    id: 16,
    title: "Map Mudo",
    difficulty: "Médio",
    language: "javascript",
    description: "A lista volta cheia de 'undefined'.",
    hint: "Arrow functions com chaves {} precisam da palavra 'return'.",
    functionName: "dobrar",
    initialCode: `function dobrar(lista) {
  return lista.map(n => {
    // BUG: Faltou return
    n * 2;
  });
}`,
    testCases: [{ input: [[1, 2]], expected: [2, 4] }]
  },
  {
    id: 17,
    title: "Filter Booleano",
    difficulty: "Médio",
    language: "javascript",
    description: "O filtro não está funcionando.",
    hint: "A função do filter deve retornar true/false. Faltou o return.",
    functionName: "filtrarMaiores",
    initialCode: `function filtrarMaiores(lista) {
  return lista.filter(n => {
    // BUG: Sem return
    n > 10;
  });
}`,
    testCases: [{ input: [[5, 15]], expected: [15] }]
  },
  {
    id: 18,
    title: "Ordenação Alfabética",
    difficulty: "Médio",
    language: "javascript",
    description: "A ordem numérica [1, 10, 2] está errada.",
    hint: "sort() ordena como texto. Use .sort((a,b) => a - b).",
    functionName: "ordenar",
    initialCode: `function ordenar(lista) {
  // BUG: sort padrão é alfabético
  return lista.sort();
}`,
    testCases: [{ input: [[1, 10, 2]], expected: [1, 2, 10] }]
  },
  {
    id: 19,
    title: "Objeto Nulo",
    difficulty: "Médio",
    language: "javascript",
    description: "Erro ao acessar propriedade de algo que não existe.",
    hint: "Use Optional Chaining (?.) para evitar erro se endereco for null.",
    functionName: "pegarRua",
    initialCode: `function pegarRua(user) {
  // BUG: Se user.endereco for null, quebra
  return user.endereco.rua;
}`,
    testCases: [{ input: [{endereco: null}], expected: undefined }]
  },
  {
    id: 20,
    title: "While Travado",
    difficulty: "Médio",
    language: "javascript",
    description: "O loop while nunca termina.",
    hint: "Você precisa incrementar a variável de controle dentro do loop.",
    functionName: "loopWhile",
    initialCode: `function loopWhile() {
  let i = 0;
  let res = [];
  while(i < 3) {
    res.push(i);
    // BUG: Faltou i++
  }
  return res;
}`,
    testCases: [{ input: [], expected: [0, 1, 2] }]
  },
  {
    id: 21,
    title: "Replace Único",
    difficulty: "Médio",
    language: "javascript",
    description: "Só a primeira palavra está sendo trocada.",
    hint: "Use .replaceAll() ou regex global /g.",
    functionName: "censura",
    initialCode: `function censura(texto) {
  // BUG: replace string troca só a primeira
  return texto.replace("feio", "***");
}`,
    testCases: [{ input: ["feio e feio"], expected: "*** e ***" }]
  },
  {
    id: 22,
    title: "Divisão por Zero",
    difficulty: "Médio",
    language: "javascript",
    description: "Média de lista vazia retorna NaN.",
    hint: "Verifique se o array está vazio antes de dividir.",
    functionName: "mediaSegura",
    initialCode: `function mediaSegura(lista) {
  let soma = 0;
  for(let n of lista) soma += n;
  // BUG: Se length for 0, divide por 0
  return soma / lista.length;
}`,
    testCases: [{ input: [[]], expected: 0 }]
  },
  {
    id: 23,
    title: "Includes Manual",
    difficulty: "Médio",
    language: "javascript",
    description: "A verificação manual está falha.",
    hint: "Use o método nativo .includes() do array.",
    functionName: "temValor",
    initialCode: `function temValor(lista, valor) {
  for(let item of lista) {
    if(item == valor) return true;
  }
  // BUG: Se não achar, retorna undefined, deveria ser false
}`,
    testCases: [{ input: [[1, 2], 3], expected: false }]
  },
  {
    id: 24,
    title: "0.1 + 0.2 != 0.3",
    difficulty: "Difícil",
    language: "javascript",
    description: "Bem-vindo ao ponto flutuante binário.",
    hint: "Use .toFixed(1) ou multiplique por 10 para somar inteiros.",
    functionName: "somaDecimal",
    initialCode: `function somaDecimal() {
  let a = 0.1, b = 0.2;
  // BUG: Retorna false porque dá 0.300000004
  return (a + b) === 0.3;
}`,
    testCases: [{ input: [], expected: true }]
  },
  {
    id: 25,
    title: "Cópia Rasa",
    difficulty: "Difícil",
    language: "javascript",
    description: "Modificar a cópia altera o original.",
    hint: "Objetos aninhados precisam de Deep Copy (JSON.parse/stringify ou structuredClone).",
    functionName: "clonar",
    initialCode: `function clonar(obj) {
  // BUG: Spread faz cópia rasa
  let novo = { ...obj };
  novo.dados.id = 99;
  return obj.dados.id; // Deveria manter o original
}`,
    testCases: [{ input: [{dados: {id: 1}}], expected: 1 }]
  },
  {
    id: 26,
    title: "Matriz I vs J",
    difficulty: "Difícil",
    language: "javascript",
    description: "Erro no loop aninhado.",
    hint: "O loop interno deve usar 'j' e verificar o tamanho da linha 'matriz[i]'.",
    functionName: "somarMatriz",
    initialCode: `function somarMatriz(m) {
  let total = 0;
  for(let i=0; i<m.length; i++) {
    // BUG: Usou i++ no loop interno
    for(let j=0; j<m[i].length; i++) {
      total += m[i][j];
    }
  }
  return total;
}`,
    testCases: [{ input: [[[1,1],[1,1]]], expected: 4 }]
  },
  {
    id: 27,
    title: "Reduce Sem Inicial",
    difficulty: "Difícil",
    language: "javascript",
    description: "Erro ao somar objetos.",
    hint: "Passe ', 0' como segundo argumento do reduce.",
    functionName: "somarObj",
    initialCode: `function somarObj(lista) {
  // BUG: Sem valor inicial, pega o primeiro objeto inteiro
  return lista.reduce((acc, item) => acc + item.val);
}`,
    testCases: [{ input: [{val: 10}, {val: 20}], expected: 30 }]
  },
  {
    id: 28,
    title: "Palíndromo Sujo",
    difficulty: "Difícil",
    language: "javascript",
    description: " 'Ana' deveria ser palíndromo.",
    hint: "Converta para minúsculas antes de comparar.",
    functionName: "palindromo",
    initialCode: `function palindromo(s) {
  let rev = s.split('').reverse().join('');
  // BUG: Case sensitive
  return s === rev;
}`,
    testCases: [{ input: ["Ana"], expected: true }]
  },
  {
    id: 29,
    title: "Set Único",
    difficulty: "Difícil",
    language: "javascript",
    description: "Remover duplicatas do array.",
    hint: "Use [...new Set(lista)].",
    functionName: "unicos",
    initialCode: `function unicos(lista) {
  let res = [];
  for(let item of lista) {
    // BUG: Não verifica se já existe
    res.push(item);
  }
  return res;
}`,
    testCases: [{ input: [[1,1,2]], expected: [1,2] }]
  },
  {
    id: 30,
    title: "Async Fake",
    difficulty: "Difícil",
    language: "javascript",
    description: "Filtrar nulos falha.",
    hint: "O filter deve retornar true para MANTER o item (d !== null).",
    functionName: "limparNulos",
    initialCode: `function limparNulos(dados) {
  // BUG: Retorna os nulos
  return dados.filter(d => d === null);
}`,
    testCases: [{ input: [[1, null, 2]], expected: [1, 2] }]
  },
  {
    id: 31,
    title: "Recursão Infinita",
    difficulty: "Difícil",
    language: "javascript",
    description: "Fatorial estoura a pilha.",
    hint: "Adicione o caso base: if (n <= 1) return 1.",
    functionName: "fatorial",
    initialCode: `function fatorial(n) {
  // BUG: Sem caso base
  return n * fatorial(n - 1);
}`,
    testCases: [{ input: [5], expected: 120 }]
  },
  {
    id: 32,
    title: "Contexto This",
    difficulty: "Difícil",
    language: "javascript",
    description: "Perdendo o 'this' no método.",
    hint: "Use arrow function ou capture o valor.",
    functionName: "getNome",
    initialCode: `function getNome() {
  let obj = {
    nome: "Gui",
    get: function() { return this.nome }
  };
  let f = obj.get;
  // BUG: Ao chamar f solta, perde o this
  return f(); 
}`,
    testCases: [{ input: [], expected: "Gui" }]
  },
  {
    id: 33,
    title: "Anagrama",
    difficulty: "Difícil",
    language: "javascript",
    description: "Comparar se letras são iguais.",
    hint: "Split, sort e join nas duas strings.",
    functionName: "anagrama",
    initialCode: `function anagrama(a, b) {
  // BUG: Compara string direta
  return a === b;
}`,
    testCases: [{ input: ["roma", "amor"], expected: true }]
  },
  {
    id: 34,
    title: "Flatten",
    difficulty: "Difícil",
    language: "javascript",
    description: "Aplanar array de arrays.",
    hint: "Use .flat() ou reduce/concat.",
    functionName: "planar",
    initialCode: `function planar(arr) {
  // BUG: toString converte tudo pra string
  return arr.toString().split(',');
}`,
    testCases: [{ input: [[1, [2]]], expected: [1, 2] }]
  },
  {
    id: 35,
    title: "FizzBuzz Bug",
    difficulty: "Difícil",
    language: "javascript",
    description: "15 retorna Fizz em vez de FizzBuzz.",
    hint: "Verifique a condição dupla (3 e 5) ANTES das individuais.",
    functionName: "fizzbuzz",
    initialCode: `function fizzbuzz(n) {
  if (n % 3 == 0) return "Fizz";
  if (n % 5 == 0) return "Buzz";
  // BUG: 15 cai no primeiro if
  if (n % 15 == 0) return "FizzBuzz";
  return n;
}`,
    testCases: [{ input: [15], expected: "FizzBuzz" }]
  },
  {
    id: 36,
    title: "Desestruturação Falha",
    difficulty: "Médio",
    language: "javascript",
    description: "Tentando extrair o nome da cidade, mas a variável usada não corresponde à chave do objeto.",
    hint: "Na desestruturação { chave }, o nome da variável deve ser igual ao do objeto, ou usar { chave: novoNome }.",
    functionName: "getCidade",
    initialCode: `function getCidade(usuario) {
  // O objeto é { id: 1, endereco: { cidade: "Rio" } }
  // BUG: A propriedade é 'cidade', não 'city'
  const { city } = usuario.endereco;
  return city; 
}`,
    testCases: [{ input: [{ endereco: { cidade: "Rio" } }], expected: "Rio" }]
  },
  {
    id: 37,
    title: "Parâmetro Padrão",
    difficulty: "Médio",
    language: "javascript",
    description: "A função deveria saudar 'Visitante' se nenhum nome for passado, mas retorna 'Olá, undefined'.",
    hint: "Use o valor padrão na declaração do parâmetro: function(nome = 'Valor').",
    functionName: "saudarVisitante",
    initialCode: `function saudarVisitante(nome) {
  // BUG: Faltou definir o valor padrão no argumento
  return "Olá, " + nome;
}`,
    testCases: [{ input: [undefined], expected: "Olá, Visitante" }, { input: ["Ana"], expected: "Olá, Ana" }]
  },
  {
    id: 38,
    title: "Find vs Filter",
    difficulty: "Médio",
    language: "javascript",
    description: "Queremos encontrar APENAS O PRIMEIRO número maior que 10, mas a função retorna uma lista.",
    hint: "O método .filter() retorna um array. O método .find() retorna o item.",
    functionName: "acharPrimeiro",
    initialCode: `function acharPrimeiro(lista) {
  // BUG: filter retorna array, queremos apenas o número
  return lista.filter(n => n > 10);
}`,
    testCases: [{ input: [[5, 12, 18, 2]], expected: 12 }]
  },
  {
    id: 39,
    title: "Data Inválida",
    difficulty: "Difícil",
    language: "javascript",
    description: "Tentando criar uma data, mas o mês em JavaScript começa do zero (0 = Janeiro).",
    hint: "No construtor Date(ano, mês, dia), o mês 12 representa o 13º mês (Janeiro do ano seguinte). Dezembro é 11.",
    functionName: "criarNatal",
    initialCode: `function criarNatal() {
  // BUG: Mês 12 em JS vira Janeiro do ano seguinte
  const data = new Date(2023, 12, 25);
  return data.getMonth(); // Deveria retornar 11 (Dezembro)
}`,
    testCases: [{ input: [], expected: 11 }]
  },

  // ==========================================
  // NÍVEIS HTML (NOVOS)
  // ==========================================
  {
    id: 100,
    title: "Link Quebrado",
    difficulty: "Iniciante",
    language: "html",
    description: "Este link deveria levar ao Google, mas não funciona ao clicar.",
    hint: "A tag <a> precisa do atributo 'href' para funcionar.",
    initialCode: `<a>Clique aqui para ir ao Google</a>`,
    validation: (code) => {
      const clean = code.toLowerCase();
      if (!clean.includes("<a")) return { passed: false, msg: "Cade a tag <a>?" };
      if (!clean.includes("href=")) return { passed: false, msg: "Faltou o atributo href." };
      if (!clean.includes("google.com")) return { passed: false, msg: "O link não aponta para o google.com" };
      return { passed: true, msg: "Link corrigido!" };
    }
  },
  {
    id: 101,
    title: "Imagem Sem Fonte",
    difficulty: "Iniciante",
    language: "html",
    description: "A imagem do gato não carrega porque o atributo está escrito errado.",
    hint: "O atributo correto para a fonte da imagem é 'src' (source), não 'scr'.",
    initialCode: `<img scr="gato.jpg" alt="Gatinho Fofo">`,
    validation: (code) => {
      if (code.includes('src="gato.jpg"')) return { passed: true, msg: "Imagem corrigida!" };
      return { passed: false, msg: "Ainda não encontrei 'src=\"gato.jpg\"'." };
    }
  },
  {
    id: 102,
    title: "Botão Desabilitado",
    difficulty: "Fácil",
    language: "html",
    description: "O botão de enviar está travado (disabled) e o usuário não consegue clicar.",
    hint: "Remova o atributo 'disabled' da tag button.",
    initialCode: `<button disabled>Enviar Formulário</button>`,
    validation: (code) => {
      if (code.includes("disabled")) return { passed: false, msg: "O botão ainda está desabilitado." };
      return { passed: true, msg: "Botão liberado!" };
    }
  },
  {
    id: 103,
    title: "Senha Exposta",
    difficulty: "Fácil",
    language: "html",
    description: "O campo de senha está mostrando o texto digitado. Isso é um risco de segurança!",
    hint: "Mude o 'type' do input para 'password'.",
    initialCode: `<label>Senha:</label>
<input type="text" name="senha" placeholder="Sua senha">`,
    validation: (code) => {
      if (code.includes('type="password"')) return { passed: true, msg: "Segurança restaurada!" };
      return { passed: false, msg: "O tipo do input ainda é texto visível." };
    }
  },
  {
    id: 104,
    title: "Lista Desordenada",
    difficulty: "Iniciante",
    language: "html",
    description: "Os itens da lista estão soltos. Eles precisam estar dentro de uma tag de lista (ul ou ol).",
    hint: "Envolva as tags <li> dentro de uma tag <ul> (Unordered List).",
    initialCode: `<li>Leite</li>
<li>Ovos</li>
<li>Pão</li>`,
    validation: (code) => {
      const clean = code.toLowerCase().replace(/\s/g, "");
      if (clean.includes("<ul><li>") && clean.includes("</li></ul>")) return { passed: true, msg: "Lista organizada!" };
      return { passed: false, msg: "Faltou a tag <ul> envolvendo os itens." };
    }
  },
  {
    id: 105,
    title: "Checkbox Quebrado",
    difficulty: "Médio",
    language: "html",
    description: "O usuário clica no texto 'Aceito os termos', mas a caixinha não marca. Falta vincular o label.",
    hint: "O atributo 'for' do label deve ser igual ao 'id' do input.",
    initialCode: `<input type="checkbox" id="termos">
<label>Aceito os termos</label>`,
    validation: (code) => {
      if (code.includes('for="termos"')) return { passed: true, msg: "Vínculo corrigido!" };
      return { passed: false, msg: "O label precisa do atributo for=\"termos\"." };
    }
  },

  // ==========================================
  // NÍVEIS CSS (NOVOS)
  // ==========================================
  {
    id: 200,
    title: "Texto Invisível",
    difficulty: "Iniciante",
    language: "css",
    description: "O texto está branco em um fundo branco. Mude a cor do texto para preto.",
    hint: "A propriedade CSS para cor de texto é 'color'.",
    initialCode: `.texto {
  background-color: white;
  /* BUG: Texto branco no fundo branco */
  color: white; 
}`,
    validation: (code) => {
      const clean = code.replace(/\s/g, "").toLowerCase();
      if (clean.includes("color:black") || clean.includes("color:#000")) {
        return { passed: true, msg: "Cor corrigida!" };
      }
      return { passed: false, msg: "O texto ainda não está preto." };
    }
  },
  {
    id: 201,
    title: "Botão sem Destaque",
    difficulty: "Fácil",
    language: "css",
    description: "O botão precisa ter a cor de fundo vermelha (red), mas está azul.",
    hint: "Troque o 'background-color' para 'red'.",
    initialCode: `.botao-perigo {
  /* BUG: Deveria ser vermelho */
  background-color: blue;
  color: white;
}`,
    validation: (code) => {
      const clean = code.replace(/\s/g, "").toLowerCase();
      if (clean.includes("background-color:red")) return { passed: true, msg: "Cor do botão corrigida!" };
      return { passed: false, msg: "O fundo ainda não é vermelho." };
    }
  },
  {
    id: 202,
    title: "Margem Negativa",
    difficulty: "Médio",
    language: "css",
    description: "O elemento está sumindo da tela porque a margem está muito negativa.",
    hint: "Mude o margin-top para 0 ou um valor positivo.",
    initialCode: `.box {
  width: 100px;
  height: 100px;
  /* BUG: Elemento subiu demais e sumiu */
  margin-top: -9999px;
}`,
    validation: (code) => {
      if (code.includes("-9999px")) return { passed: false, msg: "A margem ainda está errada." };
      return { passed: true, msg: "Elemento recuperado!" };
    }
  },
  {
    id: 203,
    title: "Flexbox Desalinhado",
    difficulty: "Médio",
    language: "css",
    description: "Queremos centralizar o item na tela, mas ele está preso no canto esquerdo.",
    hint: "Para centralizar horizontalmente no Flexbox, use 'justify-content: center'.",
    initialCode: `.container {
  display: flex;
  /* BUG: start joga para a esquerda */
  justify-content: flex-start; 
  align-items: center;
}`,
    validation: (code) => {
      const clean = code.replace(/\s/g, "").toLowerCase();
      if (clean.includes("justify-content:center")) return { passed: true, msg: "Centralizado com sucesso!" };
      return { passed: false, msg: "Ainda não está centralizado (use center)." };
    }
  },
  {
    id: 204,
    title: "Display None vs Hidden",
    difficulty: "Médio",
    language: "css",
    description: "O elemento precisa ocupar espaço na tela mas ficar invisível. O código atual removeu ele totalmente.",
    hint: "Use 'visibility: hidden' para ocultar mantendo o espaço, em vez de 'display: none'.",
    initialCode: `.fantasma {
  /* BUG: Isso remove o elemento do layout */
  display: none; 
  width: 100px;
  height: 100px;
}`,
    validation: (code) => {
      const clean = code.replace(/\s/g, "").toLowerCase();
      if (clean.includes("visibility:hidden") && !clean.includes("display:none")) return { passed: true, msg: "Elemento oculto, mas presente!" };
      return { passed: false, msg: "Use visibility: hidden." };
    }
  },
  {
    id: 205,
    title: "Z-Index Perdido",
    difficulty: "Difícil",
    language: "css",
    description: "O menu deveria ficar na frente de tudo, mas está atrás do conteúdo.",
    hint: "O z-index precisa ser um número positivo alto. Além disso, z-index só funciona se tiver 'position' (relative, absolute ou fixed).",
    initialCode: `.menu-flutuante {
  background: red;
  /* BUG: z-index negativo ou sem position */
  z-index: -1;
  width: 100%;
}`,
    validation: (code) => {
      const clean = code.replace(/\s/g, "").toLowerCase();
      const hasPosition = clean.includes("position:relative") || clean.includes("position:absolute") || clean.includes("position:fixed") || clean.includes("position:sticky");
      const hasPositiveZ = !clean.includes("z-index:-");
      
      if (hasPositiveZ) return { passed: true, msg: "Menu trazido para frente!" };
      return { passed: false, msg: "O z-index precisa ser positivo." };
    }
  }
];