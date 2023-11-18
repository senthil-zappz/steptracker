// screens/UserProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    weight: '',
    height: '',
    stepGoal: '',
  });

  useEffect(() => {
    // Load data from local storage when the component mounts
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          // If data is available, parse and set it in the form
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Convert the form data to a JSON string
      const formDataString = JSON.stringify(userData);

      // Save the form data to AsyncStorage
      await AsyncStorage.setItem('userData', formDataString);

      alert('Form data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={userData.age}
        onChangeText={(text) => handleInputChange('age', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={userData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={userData.weight}
        onChangeText={(text) => handleInputChange('weight', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={userData.height}
        onChangeText={(text) => handleInputChange('height', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Step Goal"
        value={userData.stepGoal}
        onChangeText={(text) => handleInputChange('stepGoal', text)}
        keyboardType="numeric"
      />
      <Button title="Save Profile" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
});

export default UserProfileScreen;
