import React, { useState, useEffect } from 'react'; // Importa React, hooks e componentes necessários
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Importa componentes e estilos do React Native
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Define a URL da API
const API_URL = 'http://localhost:3000/users';

export default function App() {
 // Define estados para armazenar usuários, campos de input e ID de edição
 const [users, setUsers] = useState([]);
 const [nome, setNome] = useState('');
 const [sobrenome, setSobrenome] = useState('');
 const [email, setEmail] = useState('');
 const [editId, setEditId] = useState(null);

 // Usa o hook useEffect para buscar usuários ao montar o componente
 useEffect(() => {
     fetchUsers();
 }, []);

 // Função para buscar usuários da API
 const fetchUsers = async () => {
     try {
         const response = await axios.get(API_URL);
         setUsers(response.data); // Atualiza o estado com a lista de usuários
     } catch (error) {
         console.error(error); // Loga erros no console
     }
 };

 // Função para adicionar ou atualizar um usuário
 const addUser = async () => {
     try {
         if (editId) {
             // Atualiza o usuário existente
             await axios.put(`${API_URL}/${editId}`, { nome, sobrenome, email });
         } else {
             // Adiciona um novo usuário
             await axios.post(API_URL, { nome, sobrenome, email });
         }
         // Limpa os campos de input e ID de edição
         setNome('');
         setSobrenome('');
         setEmail('');
         setEditId(null);
         fetchUsers(); // Atualiza a lista de usuários
     } catch (error) {
         console.error(error); // Loga erros no console
     }
 };

 // Função para excluir um usuário
 const deleteUser = async (id) => {
     Alert.alert(
         'Confirmar Exclusão',
         'Você tem certeza que deseja excluir este usuário?',
         [
             {
                 text: 'Cancelar',
                 style: 'cancel' // Botão para cancelar a exclusão
             },
             {
                 text: 'Excluir',
                 onPress: async () => {
                     try {
                         await axios.delete(`${API_URL}/${id}`);
                         fetchUsers(); // Atualiza a lista de usuários após exclusão
                     } catch (error) {
                         console.error(error); // Loga erros no console
                     }
                 },
                 style: 'destructive' // Botão para confirmar a exclusão
             }
         ]
     );
 };

 // Função para preencher os campos de input com os dados do usuário selecionado para edição
 const handleEdit = (user) => {
     setNome(user.nome);
     setSobrenome(user.sobrenome);
     setEmail(user.email);
     setEditId(user.id);
 };

 return (
     <View style={styles.container}>
         <Text style={styles.header}>Gerenciar Usuários</Text>
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
         <Button
             title={editId ? "Atualizar Usuário" : "Adicionar Usuário"}
             onPress={addUser}
             color="#4CAF50" // Cor do botão
         />
         <FlatList
             data={users}
             keyExtractor={item => item.id.toString()} // Define a chave para cada item
             renderItem={({ item }) => (
                 <View style={styles.userContainer}>
                     <View style={styles.userInfo}>
                         <Text style={styles.userText}>{item.nome} {item.sobrenome}</Text>
                         <Text style={styles.userText}>{item.email}</Text>
                     </View>
                     <View style={styles.buttonContainer}>
                         <TouchableOpacity onPress={() => handleEdit(item)} style={styles.buttonEdit}>
                             <Text style={styles.buttonText}>Editar</Text>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.buttonDelete}>
                             <Text style={styles.buttonText}>Excluir</Text>
                         </TouchableOpacity>
                     </View>
                 </View>
             )}
         />
     </View>
 );
}

// Define os estilos do aplicativo
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0' // Cor de fundo
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center' // Alinha o texto no centro
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff' // Cor de fundo do input
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
        elevation: 2 // Adiciona sombra ao contêiner do usuário
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
    }
});
