import { useState } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import Login from './src/Login';
import TaskList from './src/components/TaskList';

export default function App() {

  const tasks = [
    {
      key: '1',
      name: 'Comprar Coca'
    },
    {
      key: '2',
      name: 'Estudar Facu'
    }
  ]

  const [user, setUser] = useState(123)
  const [newTask, setNewTask] = useState('')

  if(!user){
    return <Login changeStatus={(user) => setUser(user)}/>
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.containerInput}>
        <TextInput
          placeholder='Qual sua prómixa tarefa!'
          style={styles.input}
          value={newTask}
          onChangeText={value => setNewTask(value)}
        />
        <TouchableOpacity 
          style={styles.button}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskList data={item}/>
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
