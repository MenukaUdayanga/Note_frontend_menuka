import { View, Text, FlatList, StyleSheet,Alert,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { Avatar, Card, FAB } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function App({ navigation }) {

  const [data, setData] = useState([])
  const [isLoad, setIsload] = useState(false)
  const [isIntervalActive, setIsIntervalActive] = useState(true);

  useEffect(() => {
    DataAll();

    if (isIntervalActive) {
      const interval = setInterval(DataAll, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isIntervalActive]);

  const DataAll = () => {

    fetch('http://192.168.164.76:3000/api/usnt/getAllnote')
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        setIsload(true);

      });
  }

  const Delete = (itemId) => {
    fetch(`http://192.168.164.76:3000/api/usnt/note_delete/${itemId}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.ok) {
        // Note deleted successfully, you might want to refresh the data.
        DataAll();
        
      } else {
        console.error('Error deleting note:', response.status);
      }
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
    });
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Delete(itemId),
        },
      ],
      { cancelable: true }
    );
  };

  
 
 
  

 
  return (
    <View style={{ flex: 1 }}>

      <View style={styles.onecon}>
        <Text style={styles.homeText}>Home Page</Text>
      </View>

      {isLoad ? <View style={{ flex: 10, paddingBottom: 20 }}>




        <FlatList

          data={data}
          renderItem={({ item }) => {
            const formattedDate = new Date(item.date).toLocaleDateString();
            return (
              <View style={styles.edit}>
                <Text style={styles.date}>Date-{formattedDate}</Text>
                <Text style={styles.time}>Time-{item.time}</Text>
                <Text style={styles.sub}>Subject-{item.subject}</Text>
                <Text style={styles.topic}>Topic-{item.topic}</Text>
                <Text style={styles.note}>Note-{item.des}</Text>

                <Button style={styles.update} icon="pencil" mode="contained" onPress={() => navigation.navigate('Updatenote', { itemId: item.id })}>
                  Update
                </Button>

                <Button style={styles.delete} icon="delete" mode="contained"  onPress={() => confirmDelete(item.id)}>
                  Delete
                </Button>

              </View>
            )
          }}
          keyExtractor={item => item.id}
        />

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('Addnote')}
        />

      </View> : <ActivityIndicator color={MD2Colors.red800} />}

    </View>
  )
}

const styles = StyleSheet.create({

  edit: {
    marginTop: '5%',
    borderWidth: 2,
    borderColor: 'red',
    padding: 20,
    width: '90%',
    marginLeft: '5%'

  },
  onecon: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'black',
  },
  date: {
    color: 'black'
  },
  time: {
    color: 'black',
    position: 'relative',
    left: 200,
    bottom: 21
  },
  sub: {
    color: 'black'
  },
  topic: {
    paddingTop: 10,
    color: 'black'
  },
  note: {
    paddingTop: 10,
    color: 'black'
  },
  update: {
    backgroundColor: '#31d6e8',
    width: '40%',
    height: 50,
    position: 'relative',
    top: 50,
   
  },
  delete: {
    backgroundColor: '#e83143',
    width: '40%',
    height: 50,
    position: 'relative',
    left: 170
  }



})