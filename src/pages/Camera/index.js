import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Camera } from "expo-camera";

import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons'; 

import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen(navigation) {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [Permisson, setPermisson] = useState(null);
  const [capturarFoto, setCapturarFoto] = useState(null);
  const [abrir, setAbrir] = useState(false);
  const [Flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  //Permissão do cliente

  //Permissão para abrir camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermisson(status === "granted");
    })();
  }, []);

  //Permissão para salvar a imagem
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setPermisson(status === "granted");
    })();
  }, []);

  if (Permisson === null) {
    return <View />;
  }

  if (Permisson === false) {
    return <Text>Acesso negado</Text>;
  }
  //Tirar foto
  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturarFoto(data.uri);
      setAbrir(true);
    }
  }

  async function salvePicture() {}

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef} flashMode={Flash}>
        <View style={styles.contentButtons}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <FontAwesome
              name="exchange"
              size={23}
              color="#a1e3da"
            ></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tiraFoto} onPress={takePicture}>
            <FontAwesome name="camera" size={23} color="#fff"></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonFlash}
            onPress={()=>
              Flash == Camera.Constants.FlashMode.off

                ? setFlash(Camera.Constants.FlashMode.torch)
                : setFlash(Camera.Constants.FlashMode.off)
            }
          >
          <Octicons name="light-bulb" size={24} color="#a1e3da" />
          </TouchableOpacity>
          
        </View>
      </Camera>
      {capturarFoto && (
        <Modal animationType="slide" transparent={true} visible={abrir}>
          <View style={styles.contentModal}>
            <View style={styles.modalButtons}>
              <TouchableOpacity

                onPress={() => {
                  setAbrir(false);
                }}
              >
                <FontAwesome name="close" size={50} color="#fff"></FontAwesome>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.baixarButton}
                onPress={() => {
                  salvePicture;
                }}
              >
                <FontAwesome name="upload" size={50} color="#fff"></FontAwesome>
              </TouchableOpacity>
            </View>
            <Image
              style={styles.imgFoto}
              source={{ uri: capturarFoto }}
            ></Image>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  contentButtons: {
    flex: 1,
    alignItems:  "flex-end",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 30,
  },
  buttonFlash: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  buttonFlip: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  tiraFoto: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a1e3da",
    height: 60,
    width: 60,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5
  },
  contentModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
  },
  imgFoto: {
    width: "100%",
    height: 400,
  }, 
  modalButtons: {
    display: 'flex',
    width: "80%",
    height: "10%",
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: "row",
  }
});
