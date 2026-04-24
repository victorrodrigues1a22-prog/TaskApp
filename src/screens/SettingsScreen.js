import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen({ navigation }) {
  const { darkMode, setDarkMode, colors } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: () => navigation.replace('Login')
      }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>

      <View style={[styles.option, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>Modo escuro</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={[styles.option, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>Notificações</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <Text style={[styles.info, { color: colors.subtitle }]}>
        Versão: 1.0.0
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  label: {
    fontSize: 16
  },
  info: {
    marginTop: 20,
    textAlign: 'center'
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});