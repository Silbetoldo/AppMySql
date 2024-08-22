# Projeto - React Native e MySQL

## 1. Configuração do Projeto

**1. Abrir o terminal do Windows ou Linux.**

**2. Criar uma pasta com o nome `projeto`:**

   ```bash
   mkdir projeto
   cd projeto

3. Criar um projeto React Native dentro da pasta:
npx create-expo-app NomedoProjeto --template
Escolher a opção "blank".

4. Abrir a pasta do projeto no Visual Studio Code:
cd NomedoProjeto
code .

2. Configuração do Banco de Dados MySQL
1. Criar o banco de dados:
Executar o comando SQL:
CREATE DATABASE mydatabase;

2. Criar a tabela users:
Executar o comando SQL:
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

3. Instalação das Dependências
1. Instalar dependências para rodar o app na web:

Executar o comando no terminal do VS Code

npx expo install react-native-web@~0.19.10 react-dom@18.2.0 @expo/metro-runtime@~3.2.1

2. Instalar dependências para usar a API e gerenciar rotas e middleware:

Executar o comando no terminal do VS Code:

npm install express mysql body-parser cors

3. Instalar dependências para os métodos HTTP:

Executar o comando no terminal do VS Code:
npm install axios

4. Iniciar o Servidor
1. Criar o arquivo server.js para configurar o servidor Express.

2. Iniciar o servidor:
Executar o comando no terminal do VS Code:
node server.js







