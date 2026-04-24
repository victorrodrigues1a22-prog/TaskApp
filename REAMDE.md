# TaskApp

Aplicativo mobile de gerenciamento de tarefas desenvolvido em React Native com Expo, com backend em Node.js e banco de dados em nuvem utilizando MongoDB Atlas.

## Objetivo do Projeto

O objetivo do TaskApp é permitir que usuários façam login e gerenciem suas tarefas de forma simples, podendo cadastrar, listar, editar e excluir tarefas. As informações ficam salvas em um banco de dados em nuvem, permitindo que as tarefas continuem disponíveis mesmo após fechar o aplicativo.

## Tecnologias Utilizadas

### Frontend
- React Native
- Expo
- JavaScript
- React Navigation

### Backend
- Node.js
- Express
- CORS
- Dotenv
- MongoDB

### Banco de Dados
- MongoDB Atlas

## Funcionalidades

- Tela de login
- Listagem de tarefas
- Cadastro de tarefas
- Edição de tarefas
- Exclusão de tarefas
- Tela de configurações
- Modo escuro
- Persistência de dados no MongoDB Atlas

## Componentes React Native Utilizados

- View
- Text
- TextInput
- TouchableOpacity
- Button
- FlatList
- Switch
- Image

## Telas do Aplicativo

1. Login
2. Home / Minhas Tarefas
3. Adicionar Tarefa
4. Detalhes da Tarefa
5. Configurações

## Estrutura do Projeto

```text
TaskApp/
├── App.js
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── AddTaskScreen.js
│   │   ├── TaskDetailScreen.js
│   │   └── SettingsScreen.js
│   └── context/
│       └── ThemeContext.js
```

## Backend

O backend foi desenvolvido com Node.js e Express, sendo responsável por:

- autenticação de login
- cadastro de tarefas
- listagem de tarefas
- edição de tarefas
- exclusão de tarefas
- conexão com MongoDB Atlas

## Estrutura do Backend:

```text
server/
├── server.js
├── .env
├── package.json
```

## Como Executar o Backend

```bash
cd server
npm install
node server.js
```

Crie um arquivo `.env` com:

```env
MONGO_URI=sua_string_do_mongodb
```