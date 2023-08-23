import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

export default function ExampleScreen() {
    const openUploader = async () => {
        try {
            const imagePickerResponse = await launchCamera();
            if (imagePickerResponse.assets.length > 0) {
                const imageUri = imagePickerResponse.assets[0].uri;
                const newImageUri = "file:///" + imageUri.split("file:/").join("");

                const formData = new FormData();
                formData.append("image", {
                    uri: newImageUri,
                    type: 'image/jpeg', // Change to the appropriate MIME type
                    name: newImageUri.split("/").pop()
                });

                const response = await fetch("http://192.168.182.76/api/student/upload_image/1", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                console.log(responseData);
            }
        } catch (error) {
            console.log('Image picker error:', error);
        }
    }

    const loadData = async () => {
        try {
            const response = await fetch('http://192.168.182.76:3000/api/student/get_students');
            if (response.ok) {
                const jsonData = await response.json();
                console.log(jsonData);
            } else {
                console.log('Network response was not ok');
            }
        } catch (error) {
            console.log('Fetch error:', error);
        }
    }

    return (
        <View>
            <Text>React Native Image Upload Demo</Text>
            <Button title='Open Uploader' onPress={openUploader} />
            <View style={{ marginBottom: 5 }}></View>
            <Button title='Load Data' onPress={loadData} />
            <View style={{ marginBottom: 5 }}></View>
            <Image
                source={{
                    uri: 'http://192.168.182.76:3000/image_1692528435141.jpg',
                }}
                style={{ width: 300, height: 300 }}
            />
        </View>
    );
}
