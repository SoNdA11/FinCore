## Visão Geral do Projeto

**FinCore** é uma aplicação web desenvolvida para auxiliar usuários no gerenciamento eficiente de suas finanças pessoais. O sistema permite o registro de receitas e despesas, oferecendo uma visão clara e organizada da saúde financeira do usuário por meio de um dashboard interativo e intuitivo.

A plataforma foi construída com tecnologias modernas, utilizando **React** no frontend para proporcionar uma experiência dinâmica e responsiva, e **Node.js** com **Express** no backend para garantir robustez e escalabilidade. Os dados são armazenados em um banco **MongoDB**, permitindo uma estrutura flexível e de fácil expansão.

### Principais Funcionalidades

- **Autenticação de Usuário**: O sistema possui um sistema de registro e login para garantir a segurança dos dados do usuário.
- **Dashboard Financeiro**: Apresenta um resumo do saldo total, receitas e despesas, além de gráficos que ilustram a distribuição financeira.
- **Gerenciamento de Receitas**: Permite que os usuários adicionem, visualizem, excluam e façam o download de suas fontes de renda.
- **Gerenciamento de Despesas**: Funcionalidade similar à de receitas, mas focada nos gastos do usuário.

## Estrutura de Arquivos e Pastas

O projeto é dividido em duas partes principais: `backend` e `frontend`.

### Backend

O backend é responsável pela lógica de negócio, interação com o banco de dados e fornecimento de uma API para o frontend.

|   |   |   |
|---|---|---|
|**Pasta/Arquivo**|**Descrição**|**Relações**|
|`config/db.js`|Configura e estabelece a conexão com o banco de dados MongoDB utilizando a biblioteca Mongoose.|Importado por `server.js` para iniciar a conexão com o banco de dados.|
|`controllers/`|Contém a lógica de negócio para cada rota da aplicação.|`authController.js`, `dashboardController.js`, `expenseController.js` e `incomeController.js` são chamados pelas rotas definidas na pasta `routes/`.|
|`middleware/`|Contém os middlewares da aplicação, como autenticação e upload de arquivos.|`authMiddleware.js` protege as rotas que exigem autenticação e `uploadMiddleware.js` gerencia o upload de arquivos.|
|`models/`|Define os schemas do banco de dados para Usuário, Despesa e Receita utilizando o Mongoose.|`User.js`, `Expense.js` e `Income.js` são utilizados pelos controllers para interagir com o banco de dados.|
|`routes/`|Define as rotas da API para cada funcionalidade da aplicação.|`authRoutes.js`, `dashboardRoutes.js`, `expenseRoutes.js` e `incomeRoutes.js` são importados em `server.js`.|
|`server.js`|Ponto de entrada do backend. Inicializa o servidor Express, conecta ao banco de dados e configura as rotas e middlewares.|Utiliza todos os arquivos das pastas `config`, `middleware`, e `routes` para configurar e iniciar o servidor.|
|`package.json`|Lista as dependências e scripts do projeto backend.|Define as bibliotecas que o projeto utiliza.|

### Frontend

O frontend é construído em React e é responsável pela interface do usuário e interação com a API do backend.

|   |   |   |
|---|---|---|
|**Pasta/Arquivo**|**Descrição**|**Relações**|
|`src/components/`|Contém componentes React reutilizáveis, como cartões, gráficos e formulários.|São utilizados pelas páginas na pasta `src/pages/` para construir a interface do usuário.|
|`src/context/`|Contém o `UserContext.jsx`, que gerencia o estado global do usuário.|O `UserProvider` envolve o componente `App` para compartilhar o estado do usuário.|
|`src/hooks/`|Contém o `useUserAuth.jsx`, um hook customizado para verificar a autenticação do usuário.|Usado nas páginas que requerem autenticação, como `Home.jsx`, `Income.jsx` e `Expense.jsx`.|
|`src/pages/`|Contém as páginas principais da aplicação, como Login, Cadastro e o Dashboard.|Renderizadas pelo `App.jsx` de acordo com as rotas definidas.|
|`src/utils/`|Contém arquivos utilitários para caminhos de API, instância do Axios, dados estáticos e funções auxiliares.|`apiPaths.js` e `axiosInstance.js` são usados para fazer requisições à API do backend.|
|`App.jsx`|Componente principal que configura as rotas da aplicação usando React Router.|Renderizado pelo `main.jsx`.|
|`main.jsx`|Ponto de entrada do frontend. Renderiza o componente `App`.||
|`package.json`|Lista as dependências e scripts do projeto frontend.|Define as bibliotecas que o projeto utiliza.|

## Fluxo de Funcionamento

1. **Inicialização**: O projeto é iniciado executando os servidores do backend e do frontend. O backend se conecta ao banco de dados MongoDB.
2. **Autenticação**: O usuário acessa a página de login ou cadastro. Ao submeter o formulário, uma requisição é enviada para a API de autenticação do backend. O backend valida os dados, interage com o modelo `User` e retorna um token JWT em caso de sucesso.
3. **Acesso ao Dashboard**: Com o token armazenado, o frontend faz requisições para as rotas protegidas do dashboard. O middleware de autenticação no backend verifica o token antes de permitir o acesso.
4. **Fluxo de Dados**: As interações do usuário no frontend (ex: adicionar uma despesa) disparam requisições para a API do backend. O controller correspondente processa a requisição, utiliza o modelo apropriado para interagir com o banco de dados e retorna os dados atualizados para o frontend.

## Tecnologias e Bibliotecas

|                           |                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Tecnologia/Biblioteca** | **Propósito**                                                                                        |
| **Backend**               |                                                                                                      |
| Node.js                   | Ambiente de execução para o código JavaScript no servidor.                                           |
| Express                   | Framework para a construção de APIs web em Node.js.                                                  |
| MongoDB                   | Banco de dados NoSQL utilizado para armazenar os dados da aplicação.                                 |
| Mongoose                  | Biblioteca para modelagem de dados do MongoDB em um ambiente Node.js.                                |
| JWT (jsonwebtoken)        | Para a criação e verificação de tokens de autenticação.                                              |
| bcryptjs                  | Usado para criptografar as senhas dos usuários antes de armazená-las no banco de dados.              |
| Multer                    | Middleware para o upload de arquivos, como a imagem de perfil do usuário.                            |
| CORS                      | Middleware para habilitar o Cross-Origin Resource Sharing.                                           |
| dotenv                    | Para carregar variáveis de ambiente a partir de um arquivo `.env`.                                   |
| xlsx                      | Biblioteca para a criação de planilhas Excel, usada para o download de dados de receitas e despesas. |
| **Frontend**              |                                                                                                      |
| React                     | Biblioteca para a construção de interfaces de usuário.                                               |
| Vite                      | Ferramenta de build para o desenvolvimento frontend.                                                 |
| React Router              | Para o gerenciamento de rotas na aplicação React.                                                    |
| Axios                     | Cliente HTTP para fazer requisições para a API do backend.                                           |
| Tailwind CSS              | Framework de CSS para a estilização da interface do usuário.                                         |
| Recharts                  | Biblioteca para a criação de gráficos.                                                               |
| Moment.js                 | Para a formatação de datas.                                                                          |
| react-hot-toast           | Para a exibição de notificações (toasts) na interface.                                               |
| emoji-picker-react        | Componente para a seleção de emojis.                                                                 |

## Pontos de Melhoria

- **Validação de Dados**: A validação de dados de entrada poderia ser aprimorada utilizando bibliotecas como Joi ou Zod no backend para garantir a integridade dos dados.
- **Tratamento de Erros**: O tratamento de erros, tanto no frontend quanto no backend, poderia ser mais robusto e centralizado.
- **Testes**: A adição de testes unitários e de integração aumentaria a confiabilidade e a manutenibilidade do código.
- **Componentização**: Alguns componentes React poderiam ser divididos em componentes menores para melhorar a reutilização e a legibilidade.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js e npm (ou yarn) instalados.
- Uma instância do MongoDB em execução.

### Passos

1. **Clone o repositório**:
    
    Bash
    
    ```
    git clone <URL_DO_REPOSITÓRIO>
    ```
    
2. **Configure o Backend**:
    - Navegue até a pasta `backend`.
    - Crie um arquivo `.env` e adicione as variáveis de ambiente necessárias (MONGODB_URI, JWT_SECRET, CLIENT_URL, PORT).
    - Instale as dependências: `npm install`.
    - Inicie o servidor: `npm start`.
3. **Configure o Frontend**:
    - Navegue até a pasta `frontend/fin-core`.
    - Instale as dependências: `npm install`.
    - Inicie o servidor de desenvolvimento: `npm run dev`.

## Respostas a Perguntas Complementares

- **Quais arquivos são mais críticos para o funcionamento do sistema?**
    
    - `backend/server.js`: Ponto de entrada do servidor que conecta todas as partes do backend.
    - `backend/config/db.js`: Essencial para a conexão com o banco de dados.
    - `frontend/src/App.jsx`: Define a estrutura de rotas do frontend.
    - `frontend/src/utils/axiosInstance.js`: Centraliza a comunicação com a API.
- **Onde estão localizados os pontos de entrada da aplicação?**
    
    - Backend: `backend/server.js`.
    - Frontend: `frontend/fin-core/src/main.jsx`.
- **Existe alguma lógica repetida que poderia ser centralizada?**
    
    - A lógica de download de arquivos Excel nos controllers `expenseController.js` e `incomeController.js` é muito semelhante e poderia ser abstraída em uma função utilitária.
    - As funções de busca de dados (`fetchIncomeDetails`, `fetchExpenseDetails`) nas páginas do frontend são similares e poderiam ser unificadas em um hook customizado.
- **Há alguma arquitetura (MVC, Clean Architecture, etc.) sendo seguida? Qual?**
    
    - O backend segue uma estrutura semelhante ao padrão **Model-View-Controller (MVC)**, onde:
        - **Model**: Definido na pasta `models/`.
        - **View**: O frontend em React atua como a View.
        - **Controller**: A lógica de negócio está nos arquivos da pasta `controllers/`.
- **Que nome você daria para esse projeto se fosse explicar ele em uma linha para alguém?**
    
    - "FinCore é uma aplicação web para gerenciamento de finanças pessoais com controle de receitas e despesas."