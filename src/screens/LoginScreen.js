import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('Atenção', 'Preencha email e senha.');
    return;
  }

  try {
    const response = await fetch('http://10.0.0.193:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!data.userId) {
      Alert.alert('Erro', 'Login não retornou usuário.');
      return;
    }

    navigation.replace('Home', { userId: data.userId });
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
  }
};

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/906/906334.png' }}
        style={styles.logo}
      />

      <Text style={styles.title}>TaskApp</Text>
      <Text style={styles.subtitle}>Organize suas tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    color: '#475569',
    marginBottom: 30
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});