---
:warning: Este é um projeto de estudo para consumo de API para busca de filmes, com possibilidade de review. 

O projeto se divide em backend e frontend.

---
---

# Movie Flix
### Sistema de busca e avaliação de filmes.

---

**Descrição:**

- Este é um sistema de busca de filmes, consumindo a API 'OMDb API', e cadastro todos aqueles avaliados com 'like' ou 'dislike' pelo usuário. 

#

**Como usar:**

- Acessar ao link da aplicação;
- Digitar o nome do filme que se deseja buscar (em inglês);
- Clicar em 'Search';
- Selecionar e clicar no filme que se deseja avaliar;
- Na tela seguinte, na parte inferior, dar 'like' ou 'dislike' no filme, segundo ícones propostos;
- Para voltar, clicar na seta à esquerda, no canto superior direito da tela.

#  

**Vantagens:**

- Busca filmes simplificada por trechos de nomes;
- Armazenamento de 'filmes favoritos';
- Armazenamento de 'filmes não curtidos';
- Layout de fácil aprendizado.

---

## Funcionalidades

`Resumo`

- Busca de filmes por ID ou Nome, consumindo a API 'OMDb API'; 
- Cadastro e visualização de filmes curtidos e não curtidos. 
---

## Fluxo de Processos

Link: http://localhost:3000/
> Busca de filmes
   >> ##### Digitar nome ou trecho do nome no campo de busca (em inglês);
   >> ##### Clicar no botão 'Search':
      > > > ###### O campo de texto é obrigatório para a busca.
> Ordenação de filmes
   >> ##### Clicar na seta encontrada no canto superior direito:
      > > > ###### A ordenação é feita pela data do filme apenas.
> Visualizar filmes
   >> ##### Utilizar a barra de rolagem do navegador (caso necessário):
      > > > ###### A primeira sessão são todos os filmes encontrados;
      > > > ###### A segunda sessão são todos os filmes com like;
      > > > ###### A terceira sessão são todos os filmes com dislike.
> Avaliar um filme
   >> ##### Escolha o filme que deseja avaliar;
   >> ##### Clicar no filme;
   >> ##### Na tela seguinte, na parte inferior da tela:
      > > > ###### Clicar no icone do 'Heart' para dar like;
      > > > ###### Clicar no icone do 'Broken Heart' para dar dislike.
> Voltar à tela inicial
   >> ##### Clicar na seta à esquerda, no canto superior direito da tela.


---

## Validações e Regras de Negócio

`Regras Funcionais`

- Não é possível buscar filmes sem preencher o campo de texto;
- Não é possível deletar o registro de um filme avaliado, ainda que não possua mais like ou dislike.

---
---

## Sobre o Projeto

---

Este projeto refere-se ao frontend e backend da aplicação com um todo. 
#
É um Web APP construído com ReactJS, API em NODE.js e Typescript, responsável pela busca de filmes, consumindo a API 'OMDb API', e cadastro todos aqueles avaliados com 'like' ou 'dislike' pelo usuário.

---

### Detalhes 

`Termos Técnicos`
#

| Info             | Descrição                          |
| ---------------- | ---------------------------------- |
| Linguagem        | Typescript                         |
| Tecnologia       | ReactJS                            |
| API Backend      | NodeJS                             |
| Validações       | Celebrate-Joi (Back) & Yup (Front) |
| Testes Unitários | Jest                               |

---

### Download
> ##### **1. Baixar e instalar o GIT para seu computador**
> ###### Link: https://git-scm.com/downloads

> ##### **2. Criar uma pasta para armazenar o projeto**

> ##### **3. Na pasta, clique com o botão direito e escolher 'Git Bash Here'**

> ##### **4. No terminal, copie e cole o código abaixo:**
> ###### Obs.: como a pasta node_modules não é copiada para o gitHub, as dependências necessárias devem ser instaladas.
``` js
git clone https://github.com/robertomorel/movies_research.git
```

---

### Execução
> ##### **1. Abrir o terminal do seu sistema operacional**
> ###### Será usado o windows como exemplo.
> ###### Sugestão: 'Windows PowerShell'

> ##### **2. Acessar as pastas do projeto**
``` js
cd path/frontend
cd path/backend
```

> ##### **3. Executar o comando abaixo na pasta 'frontend':**
> ###### Como já comentado, devem ser instaladas as dependências necessárias.
``` js
yarn start
```

> ##### **4. Executar o comando abaixo na pasta 'backend':**
> ###### Como já comentado, devem ser instaladas as dependências necessárias.
``` js
yarn dev:server
```

---

### Extra
`Instalando dependências .:. Code`
#
    yarn

---

### Links

[Dev Docs](https://devdocs.io/)

[ECMAScript 6](https://www.w3schools.com/js/js_es6.asp)

[React documentation](https://reactjs.org/)

[Typescript documentation](https://www.typescriptlang.org/docs/home.html)