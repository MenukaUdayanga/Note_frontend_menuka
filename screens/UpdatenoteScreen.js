import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';

export default function UpdatenoteScreen({ navigation }) {
  const route = useRoute();
  const { itemId } = route.params;


  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [des, setDes] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // Fetch existing data and populate the form fields
    fetch(`http://192.168.164.76:3000/api/usnt/getById/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
  
        
        console.log('Subject:', data[0].subject);
        console.log('Topic:', data[0].topic);
        console.log('Description:', data[0].des);
        console.log('Image:', data[0].image);
  
        setSubject(data[0].subject);
        setTopic(data[0].topic);
        setDes(data[0].des);
        setImage(data[0].image);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  const handleImagePicker = () => {
    let options = {
      storageOptions: {
        path: '../images',
      },
    };

    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        setImage(response.uri);
      }
    });
  };

  const Update = () => {
    fetch(`http://192.168.164.76:3000/api/usnt/note_update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        subject: subject,
        topic: topic,
        des: des,
        image: image,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('Update response:', json);
        // After successful update, navigate back to Home or handle as needed
        navigation.navigate('Home');
      })
      .catch(error => console.error('Error updating data:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>The Editing Page</Text>

      <TextInput
        style={styles.fields}
        label="Enter Subject"
        value={subject}
        onChangeText={text => setSubject(text)}
      />

      <TextInput
        style={styles.fields}
        label="Subject Topic"
        value={topic}
        onChangeText={text => setTopic(text)}
      />

      <TextInput
        style={styles.fields}
        label="Take a Note"
        multiline={true}
        numberOfLines={16}
        value={des}
        onChangeText={text => setDes(text)}
      />

      <Button icon="image" style={styles.addbtn} onPress={handleImagePicker}>
        Pick Image
      </Button>

      <Button
        style={styles.addbtn}
        icon="plus"
        mode="contained"
        onPress={Update}>
        Update Note
      </Button>

      <Button
        style={styles.addbtn}
        icon="arrow-left"
        mode="contained"
        onPress={() => {
          navigation.navigate('Home');
        }}>
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
  addbtn: {
    marginTop: 20,
  },
});
