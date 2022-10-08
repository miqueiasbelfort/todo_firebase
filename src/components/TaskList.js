import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import React from 'react'

//icon
import { AntDesign } from '@expo/vector-icons';

export default function TaskList({data, deleteItem, editItem}) {
  return (
    <View style={styles.container}>

      <TouchableOpacity 
        style={{marginRight: 7,}}
        onPress={() => deleteItem(data.key)}
      >
        <AntDesign name="delete" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={{paddingRight: 10}}>
        <TouchableWithoutFeedback 
          onPress={() => editItem(data)}
        >
          <Text
            style={{color: '#fff', paddingRight: 10}}
          >
            {data.name}
          </Text>
        </TouchableWithoutFeedback>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#121212',
      alignItems: 'center',
      padding: 10,
      borderRadius: 4,
      marginBottom: 10
    }
})