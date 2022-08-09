import { FontAwesome } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Octicons } from '@expo/vector-icons'; 

export default function CamPage({ navigation }) {
    const camRef = useRef(null);
    const dispatch = useDispatch();
    const states = useSelector(state=>state);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [permisson, setPermisson] = useState(null);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    
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

    if (permisson === null) {
        return <Text>Permissão não concedida</Text>
    }

    if (permisson === false) {
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
            {!states.Preview.value && 
                <Camera style={styles.camera} type={type} ref={camRef} flashMode={flash}>
                    <View style={styles.contentButtons}>
                        <TouchableOpacity style={styles.buttonFlip} onPress={()=>setType(type == Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
                            <FontAwesome name="exchange" size={30} color="#a1e3da">
                            </FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tiraFoto} onPress={()=>takePicture()}>
                            <FontAwesome name='camera' size={30} color="#fff">
                            </FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonFlash} onPress={()=>setFlash(flash == Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)}>
                            <Octicons name="light-bulb" size={30} color="#a1e3da" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex:1,
        justifyContent:'flex-end'
    },
    contentButtons: {
        height:180,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'space-around',
    },
    buttonFlip: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        width: 60,
        borderRadius: 50
    },
    tiraFoto: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#a1e3da',
        height: 60,
        width: 60,
        borderRadius: 50
    },
    buttonFlash: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        borderRadius: 50,
    },
});
