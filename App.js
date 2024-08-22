import React, { useState, useEffect } from 'react'; // Importa as dependências do React
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'; // Importa componentes do React Native
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

const API_URL = 'http://localhost:3000/users'; // Define a URL da API onde os dados de usuários são manipulados

export default function App() {
    // Define os estados que serão usados no componente
    const [users, setUsers] = useState([]); // Lista de usuários
    const [nome, setNome] = useState(''); // Estado para o campo "nome"
    const [sobrenome, setSobrenome] = useState(''); // Estado para o campo "sobrenome"
    const [email, setEmail] = useState(''); // Estado para o campo "email"
    const [editId, setEditId] = useState(null); // ID do usuário que está sendo editado
    const [showConfirm, setShowConfirm] = useState(false); // Controla a visibilidade do modal de confirmação
    const [userIdToDelete, setUserIdToDelete] = useState(null); // ID do usuário que será excluído

    useEffect(() => {
        fetchUsers(); // Busca os usuários quando o componente é montado
    }, []);

    // Função para buscar usuários da API
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL); // Faz uma requisição GET para a API
            setUsers(response.data); // Atualiza o estado "users" com os dados recebidos
        } catch (error) {
            console.error(error); // Mostra o erro no console se ocorrer algum problema
        }
    };

    // Função para adicionar ou atualizar um usuário
    const addUser = async () => {
        try {
            if (editId) { // Se houver um ID, atualiza o usuário existente
                await axios.put(`${API_URL}/${editId}`, { nome, sobrenome, email });
                alert('Usuário atualizado com sucesso!'); // Mostra uma mensagem de sucesso
            } else { // Se não houver ID, adiciona um novo usuário
                await axios.post(API_URL, { nome, sobrenome, email });
                alert('Usuário adicionado com sucesso!'); // Mostra uma mensagem de sucesso
            }
            // Limpa os campos e reseta o estado de edição
            setNome('');
            setSobrenome('');
            setEmail('');
            setEditId(null);
            fetchUsers(); // Atualiza a lista de usuários
        } catch (error) {
            alert('Não foi possível salvar o usuário.'); // Mostra uma mensagem de erro
            console.error(error); // Mostra o erro no console
        }
    };

    // Função que exibe o modal de confirmação para excluir um usuário
    const confirmDeleteUser = (id) => {
        setUserIdToDelete(id); // Define o ID do usuário que será excluído
        setShowConfirm(true); // Exibe o modal de confirmação
    };

    // Função para excluir um usuário
    const deleteUser = async () => {
        try {
            await axios.delete(`${API_URL}/${userIdToDelete}`); // Faz uma requisição DELETE para a API
            alert('Usuário excluído com sucesso!'); // Mostra uma mensagem de sucesso
            setShowConfirm(false); // Fecha o modal de confirmação
            setUserIdToDelete(null); // Reseta o estado de exclusão
            fetchUsers(); // Atualiza a lista de usuários
        } catch (error) {
            alert('Não foi possível excluir o usuário.'); // Mostra uma mensagem de erro
            console.error(error); // Mostra o erro no console
        }
    };

    // Função que preenche os campos para edição de um usuário
    const handleEdit = (user) => {
        setEditId(user.id); // Define o ID do usuário que está sendo editado
        setNome(user.nome); // Preenche o campo "nome" com o valor do usuário
        setSobrenome(user.sobrenome); // Preenche o campo "sobrenome" com o valor do usuário
        setEmail(user.email); // Preenche o campo "email" com o valor do usuário
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Gerenciar Usuários</Text>
            {/* Campos de entrada de texto para nome, sobrenome e email */}
            <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
                style={styles.input}
            />
            <TextInput
                value={sobrenome}
                onChangeText={setSobrenome}
                placeholder="Sobrenome"
                style={styles.input}
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input}
            />
            {/* Botão para adicionar ou atualizar usuário */}
            <Button
                title={editId ? "Atualizar Usuário" : "Adicionar Usuário"}
                onPress={addUser}
                color="#4CAF50"
            />
            {/* Lista de usuários */}
            <FlatList
                data={users}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <View style={styles.userInfo}>
                            <Text style={styles.userText}>{item.nome} {item.sobrenome}</Text>
                            <Text style={styles.userText}>{item.email}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {/* Botão para editar usuário */}
                            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.buttonEdit}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            {/* Botão para excluir usuário */}
                            <TouchableOpacity onPress={() => confirmDeleteUser(item.id)} style={styles.buttonDelete}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Modal de Confirmação */}
            {showConfirm && (
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>Você tem certeza que deseja excluir este usuário?</Text>
                        <View style={styles.modalButtonContainer}>
                            <Button title="Cancelar" onPress={() => setShowConfirm(false)} color="#888" />
                            <Button title="Excluir" onPress={deleteUser} color="#f44336" />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

// Estilos para o layout
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff'
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2
    },
    userInfo: {
        flex: 1
    },
    userText: {
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    buttonEdit: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginRight: 5
    },
    buttonDelete: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center'
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});
