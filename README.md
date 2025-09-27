# Diretório de Pessoas

Sistema web para visualização e navegação de dados de pessoas.

## Funcionalidades

- **Visualização em Cards**: Exibição organizada dos dados pessoais em formato de cartões
- **Paginação**: Navegação por páginas com 12 registros por vez
- **Estatísticas**: Mini cards com resumo dos dados (total, estado mais comum, idade média, salário médio)
- **Design Responsivo**: Layout adaptável para desktop e mobile
- **Interface Profissional**: Design clean com ícones SVG e paleta corporativa

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript ES6+ (Classes, Async/Await, Fetch API)
- Axios (biblioteca HTTP)

## Estrutura

```
ex01/
├── index.html          # Página principal
├── pessoas.json        # Base de dados (94 registros)
├── assets/
│   ├── css/
│   │   └── style.css   # Estilos da aplicação
│   └── js/
│       └── main.js     # Lógica da aplicação
└── README.md
```

## Dados Exibidos

Para cada pessoa:
- Nome completo
- Email
- Idade
- Estado
- Empresa
- Salário (formatado em R$)
- CPF
- Sexo

## Estatísticas Calculadas

- Total de pessoas cadastradas
- Estado com maior número de registros
- Idade média da base
- Salário médio formatado

## Como Usar

1. Abra o arquivo `index.html` em um navegador
2. Visualize as estatísticas gerais no topo
3. Navegue pelos registros usando os botões de paginação
4. Observe as informações detalhadas em cada card

## Características Técnicas

- Carregamento assíncrono dos dados
- Paginação client-side
- Cálculos estatísticos em tempo real
- Interface sem dependências externas (exceto Axios)
- Código modular e orientado a objetos