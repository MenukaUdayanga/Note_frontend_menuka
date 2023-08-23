import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';


export default function AddNoteScreen({ navigation }) {

  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [des, setDes] = useState('');
  const [image, setImage] = useState('');

  const NoteSave = () => {
    fetch('http://192.168.37.76:3000/api/usnt/note_save', {
      method: 'POST',
      body: JSON.stringify({
        subject:subject,
        topic:topic,
        des:des,
        image:image
       
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleImagePicker = () => {

    let options = {
      storageOptions: {
        path: '../images'
      }
    }

    launchImageLibrary(options, response => {
      console.log(response);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>The Adding Page</Text>

      <TextInput
        style={styles.fields}
        label="Enter Subject"
        value={subject} 
        onChangeText={(text) => setSubject(text)}
      />

      <TextInput
        style={styles.fields}
        label="Subject Topic"
        value={topic} 
        onChangeText={(text) => setTopic(text)}
      />

      <TextInput
        style={styles.fields}
        label="Take a Note"
        multiline={true}
        numberOfLines={16}
        value={des} 
        onChangeText={(text) => setDes(text)}
      />

      <Button icon="image" style={styles.addbtn} onPress={handleImagePicker} value={image} 
        onChangeText={(text) => setImage(text)}>Pick Image</Button>

      <Button style={styles.addbtn} icon="plus" mode="contained" onPress={() => {
          NoteSave(),
          navigation.navigate('Home')
        }}>
        Add Note
      </Button>

      <Button style={styles.addbtn} icon="arrow-left" mode="contained" onPress={() => {navigation.navigate('Home')}}>
        Back to the Home
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#dde2eb',
  },
  heading: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  fields: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  addbtn:{
    marginTop:20
  }
});
