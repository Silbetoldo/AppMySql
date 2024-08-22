// Importa as bibliotecas necessárias
const express = require('express'); // Framework para criar o servidor HTTP
const mysql = require('mysql'); // Biblioteca para conectar e interagir com o banco de dados MySQL
const bodyParser = require('body-parser'); // Middleware para analisar o corpo das requisições
const cors = require('cors'); // Middleware para permitir solicitações de diferentes origens (Cross-Origin Resource Sharing)
 
// Cria uma instância do aplicativo Express
const app = express();
const port = 3000; // Porta em que o servidor vai escutar
 
// Configura o middleware para permitir requisições de diferentes origens
app.use(cors());
// Configura o middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());
 
// Cria uma conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // Host do banco de dados
    user: 'root', // Usuário do banco de dados
    password: '', // Senha do banco de dados
    database: 'mydatabase' // Nome do banco de dados
});
 
// Conecta ao banco de dados e exibe uma mensagem no console se a conexão for bem-sucedida
db.connect(err => {
    if (err) throw err; // Se houver um erro, lança uma exceção
    console.log('Connected to database'); // Mensagem de sucesso
});
 
// Rota para obter todos os usuários
app.get('/users', (req, res) => {
    // Faz uma consulta para selecionar todos os registros da tabela 'users'
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err; // Se houver um erro, lança uma exceção
        res.json(results); // Retorna os resultados da consulta em formato JSON
    });
});
 
// Rota para obter um usuário pelo ID
app.get('/users/:id', (req, res) => {
    // Faz uma consulta para selecionar um registro da tabela 'users' com base no ID fornecido
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err; // Se houver um erro, lança uma exceção
        res.json(result); // Retorna o resultado da consulta em formato JSON
    });
});
 
// Rota para criar um novo usuário
app.post('/users', (req, res) => {
    const { nome, sobrenome, email } = req.body; // Extrai os dados do corpo da requisição
    // Faz uma consulta para inserir um novo registro na tabela 'users'
    db.query('INSERT INTO users (nome, sobrenome, email) VALUES (?, ?, ?)', [nome, sobrenome, email], (err, result) => {
        if (err) throw err; // Se houver um erro, lança uma exceção
        // Retorna o ID do novo usuário e os dados inseridos em formato JSON
        res.json({ id: result.insertId, nome, sobrenome, email });
    });
});
 
// Rota para atualizar um usuário existente
app.put('/users/:id', (req, res) => {
    const { nome, sobrenome, email } = req.body; // Extrai os dados do corpo da requisição
    // Faz uma consulta para atualizar um registro na tabela 'users' com base no ID fornecido
    db.query('UPDATE users SET nome = ?, sobrenome = ?, email = ? WHERE id = ?', [nome, sobrenome, email, req.params.id], (err, result) => {
        if (err) throw err; // Se houver um erro, lança uma exceção
        // Retorna o ID do usuário atualizado e os dados atualizados em formato JSON
        res.json({ id: req.params.id, nome, sobrenome, email });
    });
});
 
// Rota para excluir um usuário
app.delete('/users/:id', (req, res) => {
    // Faz uma consulta para excluir um registro da tabela 'users' com base no ID fornecido
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err; // Se houver um erro, lança uma exceção
        // Retorna uma mensagem indicando que o usuário foi excluído com sucesso
        res.json({ message: 'User deleted successfully' });
    });
});
 
// Inicia o servidor e escuta na porta especificada
app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`); // Mensagem de sucesso ao iniciar o servidor
});