import { FontAwesome } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function CamPage({ navigation }) {
    const camRef = useRef(null);
    const dispatch = useDispatch();
    const states = useSelector(state=>state);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [Permisson, setPermisson] = useState(null);
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaPermission = await  MediaLibrary.requestPermissionsAsync();
            setPermisson(cameraPermission.status === 'granted');
            dispatch({type:'CHANGE_PERMISSION', data:(mediaPermission.status === 'granted')});
        })();
    }, [])

    useEffect(()=>{
        if(states.Picture.value != '') goToPreview();
    },[states.Picture.value]);

    if (Permisson === null) {
        return <Text>Permissão não concedida</Text>
    }

    if (Permisson === false) {
        return <Text>Acesso negado</Text>
    }

    function takePicture() {
        if (camRef) {
            const data = camRef.current.takePictureAsync();
            data.then(({uri})=>dispatch({type:"ADD_PICTURE", data:uri}));
        };
    }

    function goToPreview(){
        dispatch({type:'OPEN_PREVIEW'});
        navigation.navigate('Preview');
    }

    return (
        <SafeAreaView style={styles.container}>
            {!states.Preview.value && <Camera style={styles.camera} type={type} ref={camRef}>
                <View style={styles.contentButtons}>
                    <TouchableOpacity style={styles.buttonFlip} onPress={()=>setType(type == Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
                        <FontAwesome name="exchange" size={30} color="#FF0000">
                        </FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tiraFoto} onPress={()=>takePicture()}>
                        <FontAwesome name='camera' size={30} color="#fff">
                        </FontAwesome>
                    </TouchableOpacity>
                </View>
            </Camera>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    contentButtons: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row"
    },
    buttonFlip: {
        position: "absolute",
        bottom: 50,
        left: 30,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 20,
        height: 60,
        width: 60,
        borderRadius: 50
    },
    tiraFoto: {
        position: "absolute",
        bottom: 50,
        right: 30,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'red',
        margin: 20,
        height: 60,
        width: 60,
        borderRadius: 50
    },
});
