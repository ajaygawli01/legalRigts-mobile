// screens/LoginScreen.js
import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import config from '../config/config';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import {loginimg} from "../assets/login.webp"
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password');
      return;
    }
  const data ={
    email :email,
    password:password
  }
  console.log(data)
    try {
      const res = await axios.post(`${config.baseURL}/login/auth`, data);
  
      console.log("Response:", res);
  
      if (res.status === 200) {
        // Handle successful login (e.g., navigate to a different screen, save token, etc.)
        // Alert.alert('Success', 'Login successful');
        navigation.navigate('Template');
        console.log('Login successful', res.data);
      } else {
        // Handle login error
        Alert.alert('Error', 'Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Login error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img}  source={require("../assets/login.webp")}/>
   
   <View style={styles.displayCenter}>
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
      <Button  style={styles.login} title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
        Don't have an account? Sign up
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
    backgroundColor: "white",
    
    
  },

  displayCenter:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  img :{
    width:400,
    height:400
  },
  login:{
    width:"60%"
  },

  input: {
    width:"80%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    textTransform:"lowercase",
    borderRadius:5,
  },
  link: {
    marginTop: 16,
    color: 'blue',
  },
});

export default LoginScreen;
