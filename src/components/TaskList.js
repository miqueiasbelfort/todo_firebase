import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native'
import React from 'react'

export default function TaskList({data}) {
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {

    }
})