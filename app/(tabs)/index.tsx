import { Image, StyleSheet, Platform, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('Nome de usuário');
  const [timeGreeting, setTimeGreeting] = useState<string>('Olá');
  const [showAlternateText, setShowAlternateText] = useState(false);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setTimeGreeting('Bom dia');
      } else if (hour >= 12 && hour < 18) {
        setTimeGreeting('Boa tarde');
      } else {
        setTimeGreeting('Boa noite');
      }
    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  function handleSubmit() {
    setDisplayText(inputText || 'Nome de usuário');
    setInputText('');
  }

  function handleChange(inputText: string) {
    setInputText(inputText);
  }

  function handleClear() {
    setDisplayText('Nome de usuário');
    setInputText('');
  }

  function toggleText() {
    setShowAlternateText(!showAlternateText);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        {showAlternateText ? (
          <ThemedText type="title">Bem-vindo(a) ao nosso App, "{displayText}!"</ThemedText>
        ) : (
          <ThemedText type="title">Olá "{displayText}"! {timeGreeting}!</ThemedText>
        )}
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={handleChange}
          placeholder="Nome de usuário"
        />
        <Button title='Atualizar' onPress={handleSubmit} />
        <Button
          title="Limpar"
          onPress={handleClear}
        />
      </ThemedView>
      <Button title={showAlternateText ? "Voltar" : "Prosseguir"} onPress={toggleText} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    color: "white",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
