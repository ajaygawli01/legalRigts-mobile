import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker, Alert, Image } from 'react-native';
import axios from 'axios';
import config from '../config/config';

function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async () => {
    console.log("hgk")
    if (!firstName || !lastName || !email || !password ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${config.baseURL}/user/register`, {
        firstName,
        lastName,
        email,
        password,
        role:"customer"
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Signup successful');
        console.log('Signup successful', response.data);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Signup error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View  style={styles.displayCenter}>
      <Image style={styles.img} source={require("../assets/signup.jpg")}/>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      /> 
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
      >
        <Picker.Item label="Select Role" value="" />
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Customer" value="customer" />
      </Picker> */}
      <Button title="Sign Up" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Log in
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor:"white"
  },

  img:{
    width:"100%",
    height:"50%"
  },

  displayCenter:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  input: {
    width:"80%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius:5,
    
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  link: {
    marginTop: 16,
    color: 'blue',
  },
});

export default SignupScreen;
