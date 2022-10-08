import { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';

import Login from './src/Login';
import TaskList from './src/components/TaskList';

import firebase from './src/services/firebaseConfig';

export default function App() {

  const inputRef = useRef(null)

  const [user, setUser] = useState(null)
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [key, setKey] = useState('')

  useEffect(() => {

    function getUser(){
      if(!user){
        return
      }
      firebase.database().ref('todos').child(user).once('value', (snapshot) => {
        setTasks([])

        snapshot?.forEach(childItem => {
          let data = { key: childItem.key, name: childItem.val().name }
          setTasks(old => [...old, data])
        })
      })
    }
    getUser()

  }, [user])
  

  const handleAdd = async() => {
    if(newTask === ''){
      alert('Vamos lá! Digite sua primeira tarefa!')
      return
    }

    if(key !== ''){
      firebase.database().ref('todos').child(user).child(key).update({
        name: newTask
      })
      .then(() => {
        
        const taskIndex = tasks.findIndex(item => item.key === key)
        let taskClone = tasks
        taskClone[taskIndex].name = newTask
        setTasks([...taskClone])
      })
      Keyboard.dismiss()
      setNewTask('')
      setKey('')
      return
    }

    let todo = firebase.database().ref('todos').child(user)
    let chave = todo.push().key

    todo.child(chave).set({
      name: newTask
    })
      .then(() => {
        const data = {
          key: chave,
          name: newTask
        }
        setTasks(old => [...old, data])
      })
    setNewTask('')
    Keyboard.dismiss()
  }

  const handleDelete = async(key) => {
    firebase.database().ref('todos').child(user).child(key).remove()
      .then(() => {
        const findTaks = tasks.filter(item => item.key !== key)
        setTasks(findTaks)
      })
  }
  const handleEdit = async(data) => {
    setKey(data.key)
    setNewTask(data.name)
    inputRef.current.focus()
  }

  if(!user){
    return <Login 
      changeStatus={(user) => setUser(user)}
    />
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.containerInput}>
        <TextInput
          placeholder='Qual sua prómixa tarefa!'
          style={styles.input}
          value={newTask}
          onChangeText={value => setNewTask(value)}
          ref={inputRef}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleAdd}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskList 
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6f4'
  },
  containerInput:{
    flexDirection: 'row',
    marginTop: 15,
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#141414',
    height: 45,
  },
  button: {
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 22
  }
});
