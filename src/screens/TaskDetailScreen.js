import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function TaskDetailScreen({ navigation, route }) {
  const { task, userId } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'O título não pode ficar vazio.');
      return;
    }

    try {
      const response = await fetch(`http://10.0.0.193:3000/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          image: task.image || '',
          userId,
          completed: task.completed
        })
      });

      if (!response.ok) {
        Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
        return;
      }

      Alert.alert('Sucesso', 'Tarefa atualizada!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro de comunicação com o banco de dados.');
    }
  };

  const handleDelete = () => {
    Alert.alert('Excluir tarefa', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`http://10.0.0.193:3000/tasks/${task._id}`, {
              method: 'DELETE'
            });

            if (!response.ok) {
              Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
              return;
            }

            Alert.alert('Sucesso', 'Tarefa excluída!');
            navigation.goBack();
          } catch (error) {
            Alert.alert('Erro', 'Erro de comunicação com o banco de dados.');
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Tarefa</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>EXCLUIR TAREFA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f6ff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});