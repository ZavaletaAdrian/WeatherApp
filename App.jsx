import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const API_KEY = 'c6cd058eb7654f19962200434242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData;
    }
  }, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Weather App! ☀️</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your location"
        value={city}
        onChangeText={text => {
          setCity(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.weatherText}>Get Weather 🌡️</Text>
      </TouchableOpacity>
      {error && (
        <Text>{error}</Text>
      )}
      {weatherData && (
        <View>
          <Text>City: {weatherData.location.name}</Text>
          <Text>Temperature: {weatherData.current.temp_c}</Text>
          <Text>Description: {weatherData.current.condition.text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: '20%',
    width: 250,
  },
  button: {
    backgroundColor: 'blue',
    width: 250,
    height: 35,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20%',
  },
  weatherText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
