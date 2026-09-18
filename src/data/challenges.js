export const challenges = [
  // ======================================================
  // PADRÃO 01
  // 2 → 4 → 8 → 14
  //
  // Diferenças:
  // +2 → +4 → +6
  //
  // Próximo esperado:
  // +8 = 22
  // ======================================================

  {
    id: 1,
    title: 'PADRÃO 01',
    letter: 'S',

    questions: [
      {
        id: 1,
        question: 'Quantos olhos uma pessoa normalmente tem?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
      },

      {
        id: 2,
        question: 'Quantas patas tem um cachorro?',
        options: ['2', '4', '6', '8'],
        correctAnswer: '4',
      },

      {
        id: 3,
        question: 'Quantos lados possui um octógono?',
        options: ['6', '7', '8', '10'],
        correctAnswer: '8',
      },

      {
        id: 4,
        question: 'Quantos dias existem em duas semanas?',
        options: ['10', '12', '14', '16'],
        correctAnswer: '14',
      },
    ],

    breakChallenge: {
      prompt: 'Quebre o padrão sem quebrar a regra.',

      rule:
        'Digite um número PAR, maior que 14 e menor que 28.',

      expected: '22',

      validAnswers: [
        '17',
        '19',
        '21',
        '23',
        '27',
      ],

      inputType: 'number',
    },
  },

  // ======================================================
  // PADRÃO 02
  // 1 → 3 → 6 → 10
  //
  // Diferenças:
  // +2 → +3 → +4
  //
  // Próximo esperado:
  // +5 = 15
  // ======================================================

  {
    id: 2,
    title: 'PADRÃO 02',
    letter: 'A',

    questions: [
      {
        id: 1,
        question: 'Quantas luas naturais a Terra possui?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '1',
      },

      {
        id: 2,
        question: 'Quantos lados possui um triângulo?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
      },

      {
        id: 3,
        question: 'Quantas faces possui um cubo?',
        options: ['4', '5', '6', '8'],
        correctAnswer: '6',
      },

      {
        id: 4,
        question: 'Quantos dedos existem nas duas mãos?',
        options: ['8', '9', '10', '12'],
        correctAnswer: '10',
      },
    ],

    breakChallenge: {
      prompt: 'O sistema já calculou sua próxima resposta.',

      rule:
        'Digite um MÚLTIPLO DE 3, maior que 10 e menor que 20.',

      expected: '15',

      validAnswers: [
        '12',
        '18',
      ],

      inputType: 'number',
    },
  },

  // ======================================================
  // PADRÃO 03
{
  id: 3,
  title: 'PADRÃO 03 — BINÁRIO',
  letter: 'I',

  questions: [
    {
      id: 1,
      question:
        'REGRA: 16 • 8 • 4 • 2 • 1. Some apenas os valores onde aparece 1. Quanto vale 01101?',
      options: ['11', '12', '13', '14'],
      correctAnswer: '13',
    },

    {
      id: 2,
      question:
        'Usando a mesma regra, quanto vale 10101?',
      options: ['19', '20', '21', '22'],
      correctAnswer: '21',
    },

    {
      id: 3,
      question:
        'Usando a mesma regra, quanto vale 00100?',
      options: ['2', '4', '6', '8'],
      correctAnswer: '4',
    },

    {
      id: 4,
      question:
        'Usando a mesma regra, quanto vale 00001?',
      options: ['1', '2', '4', '8'],
      correctAnswer: '1',
    },
  ],

  breakChallenge: {
    prompt: 'O sistema não quer mais números. Leia a mensagem.',

    rule:
      'Converta os valores usando A = 1, B = 2, C = 3 ... Z = 26. As respostas foram 13 • 21 • 4 • 1. Qual palavra foi formada?',

    // Valor interno apenas para o motor atual.
    // A resposta correta está em validAnswers.
    expected: '__BINARY__',

    validAnswers: [
      'MUDA',
    ],

    inputType: 'text',
  },
},


  // ======================================================
  // PADRÃO 04
  //

{
  id: 4,
  title: 'PADRÃO 04 — SÍMBOLOS',
  letter: 'D',

  questions: [
    {
      id: 1,
      question:
        'Observe o símbolo: △. Quantos lados ele possui?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
    },

    {
      id: 2,
      question:
        'Observe o símbolo: □. Quantos lados ele possui?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },

    {
      id: 3,
      question:
        'Observe a forma: PENTÁGONO. Quantos lados ela possui?',
      options: ['4', '5', '6', '7'],
      correctAnswer: '5',
    },

    {
      id: 4,
      question:
        'Observe a forma: HEXÁGONO. Quantos lados ela possui?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '6',
    },
  ],

  breakChallenge: {
    prompt:
      'O sistema já sabe qual forma você escolheria.',

    rule:
      'A sequência é △ → □ → PENTÁGONO → HEXÁGONO. Digite a quantidade de lados de uma forma que tenha MAIS DE 6 lados, mas NÃO escolha a próxima forma prevista pelo sistema.',

    // O sistema espera:
    // 3 → 4 → 5 → 6 → 7
    expected: '7',

    // 8 = octógono
    // 9 = eneágono/nonágono
    // 10 = decágono
    validAnswers: [
      '8',
      '9',
      '10',
    ],

    inputType: 'number',
  },
},

  // ======================================================
  // PADRÃO 05
  //
  
 {
  id: 5,
  title: 'PADRÃO 05 — SISTEMA ADAPTATIVO',
  letter: 'A',

  questions: [
    {
      id: 1,
      question:
        'Quanto é 1 + 2?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
    },

    {
      id: 2,
      question:
        'Usando a regra binária que você aprendeu, qual opção representa o número 4?',
      options: ['0011', '0100', '0101', '0110'],
      correctAnswer: '0100',
    },

    {
      id: 3,
      question:
        'Qual destes símbolos representa uma forma com 5 lados?',
      options: ['△', '□', '⬟', '⬢'],
      correctAnswer: '⬟',
    },

    {
      id: 4,
      question:
        'Qual é a 6ª letra do alfabeto?',
      options: ['E', 'F', 'G', 'H'],
      correctAnswer: 'F',
    },
  ],

  breakChallenge: {
    prompt:
      'O sistema aprendeu com você. Agora ele mistura linguagens.',

    rule:
      'As respostas representam 3 → 4 → 5 → 6. Descubra o próximo valor, mas NÃO responda usando um número comum. Use uma representação que ainda não apareceu.',

    // O valor esperado seria 7.
    // Digitar simplesmente 7 é previsível.
    expected: '7',

    // VII = número romano
    // SETE = palavra
    // Ambas representam 7 de uma nova maneira.
    validAnswers: [
'VII',      // romano
  'Ⅶ',        // romano em caractere único

  'SETE',     // português
  'SEVEN',    // inglês
  'SIETE',    // espanhol
  'SETTE',    // italiano
  'SEPT',     // francês
  'SIEBEN',   // alemão

  '٧',        // numeral arábico-indiano
    ],

    inputType: 'text',
  },
},
]

export const finalPassword = 'SAIDA'