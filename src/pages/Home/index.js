import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground  } from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
     <ImageBackground
      style={styles.wave} 
      source={require('../../../assets/wave.png')}
      >
        <Image
        style={styles.photos} 
        source={require('../../../assets/undraw_photos_re_pvh3.png')}
        />
        <TouchableOpacity 
            style={styles.btn} 
            onPress={() => navigation.navigate('Camera')}>
                <Text style={styles.textButton}>Acessar câmera</Text>
        </TouchableOpacity>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500
  },
  wave: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  photos: {
    width: 270,
    height: 234,
  },
  btn: {
    width: 195,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1e3da',
    borderRadius: 10,
    marginTop: 100
  },
  textButton: {
    color: '#fff',
    fontSize: 18
  }
});
