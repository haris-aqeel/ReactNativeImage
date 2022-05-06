import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function App() {
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState('');

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <TouchableOpacity onPress={showImagePicker} style={styles.attachmentContainer}>
                    <Text>+</Text>
                    <Text>Select an image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openCamera} style={styles.attachmentContainer}>
                    <Text>Use Camera</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.image}
                    />
                }
            </View>
        </View>
    );
}

export default App;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageContainer: {
        padding: 30
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'cover'
    },
    attachmentContainer: {
        height: "100%",
        flex: 0.95,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f1f1',
        borderRadius: 10,
        margin: 4

    },
    camera: {
        height: "100%",
        flex: 0.95,
        borderRadius: 10
    },
    container: {
        flex: 1,
        width: "100%",
        padding: 7,
        alignSelf: "center",
        height: 200,
        flexDirection: 'row',
        alignItems: 'space-between',
    },
});
