import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function SelectnoteScreen() {
  return (
    <View style={styles.container}>
      
    <View style={styles.onecon}></View>
    <View style={styles.twocon}></View>

    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'white'
    },
    onecon:{

        flex:1,
        backgroundColor:'purple'
    },
    twocon:{

        flex:1
    }
    
})