# Cypress API test

Este projeto contém testes de API implementados com Cypress para verificar as seguintes funcionalidades:
- Login de usuário com email e senha
- Criação de usuário com nome, email e senha
- Criação de um CRUD de tarefas, onde o usuário pode criar uma tarefa com os campos 'nome' e até 3 tags opcionais

## Pré-requisitos

- Node.js
- Cypress

## Instalação

Clone o repositório e instale as dependências:

```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

# Estrutura dos Testes em BDD

## Feature: Login de usuário

 **Cenário: Usuário faz login com credenciais válidas**    
    Dado que o usuário possui um email "usuario@example.com" e senha "senha123"  
    Quando ele envia uma requisição POST para "/sessions" com as credenciais  
    Então ele deve receber um status code 200  
    E a resposta deve conter um token de autenticação  

**Cenário: Usuário faz login com credenciais inválidas**    
    Dado que o usuário possui um email "usuario@example.com" e senha "senhaIncorreta"  
    Quando ele envia uma requisição POST para "/sessions" com as credenciais  
    Então ele deve receber um status code 401  
    E a resposta deve conter uma mensagem de erro "email not found"  

## Feature: Criação de usuário

  **Cenário: Usuário cria uma conta com email e senha válidos**    
    Dado que o usuário quer criar uma conta com email "novo.usuario@example.com" e senha "novaSenha123"  
    Quando ele envia uma requisição POST para "/api/usuarios" com os dados  
    Então ele deve receber um status code 201  
    E a resposta deve conter o ID do novo usuário  

 **Cenário: Usuário tenta criar uma conta com um email já existente**    
    Dado que o usuário quer criar uma conta com email "existente.usuario@example.com" e senha "senha123"  
    E o email já está registrado no sistema  
    Quando ele envia uma requisição POST para "/users" com os dados  
    Então ele deve receber um status code 409  
    E a resposta deve conter uma mensagem de erro "Duplicated email!"  

 **Cenário: Campos obrigatórios para criação de usuário**  
    Dado que o usuário quer criar uma conta sem preencher todos os campos obrigatórios  
    Quando ele envia uma requisição POST para "/users" com os dados incompletos  
    Então ele deve receber um status code 400  
    E a resposta deve conter uma mensagem de erro indicando que os campos 'email', 'senha' e 'nome'  is required

## Feature: CRUD tarefas

**Cenário: Usuário cria uma nova tarefa com nome e tags**    
    Dado que o usuário está autenticado  
    E ele possui um token de autenticação válido  
 Quando ele envia uma requisição POST para "/api/tarefas" com os dados da tarefa
   | nome          | tags                  |
   |---------------|-----------------------|
   | "Minha Tarefa"| ["tag1", "tag2", "tag3"] |  
   
 Então ele deve receber um status code 201  
 E a resposta deve conter o ID da nova tarefa

 **Cenário: Usuário lê as tarefas existentes**    
    Dado que o usuário está autenticado  
    E ele possui um token de autenticação válido  
    Quando ele envia uma requisição GET para "/tasks"  
    Então ele deve receber um status code 200  
    E a resposta deve conter a lista de tarefas  

  **Cenário: Usuário atualiza uma tarefa existente**    
    Dado que o usuário está autenticado  
    E ele possui um token de autenticação válido  
    E ele possui uma tarefa com ID "12345"  
    Quando ele envia uma requisição PUT para "/tasks/12345" com os novos dados  
       | nome          | tags                  |
   |---------------|-----------------------|
   | "Minha Tarefa"| ["tag1", "tag2", "tag3"] |
   
  Então ele deve receber um status code 200  
  E a resposta deve conter a tarefa atualizada  

  **Cenário: Usuário deleta uma tarefa existente**    
    Dado que o usuário está autenticado  
    E ele possui um token de autenticação válido  
    E ele possui uma tarefa com ID "12345"  
    Quando ele envia uma requisição DELETE para "/tasks"  
    Então ele deve receber um status code 204  
    

    
