import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import React, {useState} from 'react'

import firebase from "./services/firebaseConfig"

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [type, setType] = useState('login')

  const handleSignIn = () => {
    
    if(type === 'login'){
      //login

      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          
        }).catch(err => {
          alert('Opss! Parece que ouve um erro!')
          return
        })

    } else {
      // register

      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {

        }).catch(err => {
          alert('Opss! Parece que ouve um erro!')
          return
        })

    }

  }

  return (
    <SafeAreaView style={styles.container}>
      
      <TextInput
        placeholder='Seu E-mail'
        style={styles.input}
        value={email}
        onChangeText={value => setEmail(value)}
      />

      <TextInput
        placeholder='x**xx*x*'
        style={styles.input}
        value={password}
        onChangeText={value => setPassword(value)}
      />

      <TouchableOpacity 
        style={[styles.handleLogin, {
          backgroundColor: type === 'login' ? '#fca213' : '#141414'
        }]} 
        onPress={handleSignIn}
      >
        <Text style={styles.loginText}>{type === 'login' ? 'Acessar' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}>
        <Text style={{textAlign: 'center'}}>
          {type === 'login' ? 'Criar Conta!' : 'Já tenho uma conta!'}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f2f6fc',
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414'
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
  }
})