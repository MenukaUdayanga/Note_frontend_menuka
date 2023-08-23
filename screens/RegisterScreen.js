import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const Register = () => {
    fetch('http://192.168.37.76:3000/api/us/user_register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        email: email,
        phoneNo: phone,
        userName: username,
        password: password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };


  return (
    <View style={styles.mainContainer}>

      <View style={styles.conOne}>
        <Text style={styles.register}>Registration</Text>
      </View>

      <View style={styles.conTwo}>

        <TextInput style={styles.fileds} label="First Name" value={fname} onChangeText={(text) => setFname(text)} />

        <TextInput style={styles.fileds} label="Last Name" value={lname} onChangeText={(text) => setLname(text)} />

        <TextInput style={styles.fileds} label="Email Address" value={email} onChangeText={(text) => setEmail(text)} />

        <TextInput style={styles.fileds} label="Phone Number" value={phone} onChangeText={(text) => setPhone(text)} />

        <TextInput style={styles.fileds} label="Username" value={username} onChangeText={(text) => setUsername(text)} />

        <TextInput style={styles.fileds} label="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />

        <Button style={styles.regbtn} icon="login" mode="contained" onPress={() => {
          Register(),
          navigation.navigate('Login')
        }}>
          Register
        </Button>

        <Text style={styles.account}>Already You have a accout.!</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.alaccount}>Login Now</Text>
        </TouchableOpacity>




      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  conOne: {
    flex: 1

  },
  conTwo: {
    flex: 10,
  },
  register: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20
  },
  fileds: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 20
  },
  regbtn: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 30
  },
  account: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10
  },
  alaccount: {
    color: '#4cdbf5',
    marginLeft: 80,
    fontSize: 17,
    textDecorationLine: 'underline'
  }
})