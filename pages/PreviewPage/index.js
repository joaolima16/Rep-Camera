import { ImageBackground, StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"
import {useSelector, useDispatch} from 'react-redux';
import * as MediaLibrary from 'expo-media-library';

export default function PreviewPage({ navigation }) {
    const states = useSelector(state=>state);
    const dispatch = useDispatch();

    function closePreview(){
        dispatch({type:'CLOSE_PREVIEW'});
        dispatch({type:'DELETE_PICTURE'});
        navigation.navigate('Cam');
    }

    function savePhoto(){
        MediaLibrary.saveToLibraryAsync(states.Picture.value)
        .then(()=>dispatch({type:'DELETE_PICTURE'}));
    }

    function imagePreview(){
        return(
            <ImageBackground style={styles.picture} source={{ uri: states.Picture.value }} resizeMode="cover">
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.downloadButton} onPress={()=>savePhoto()}>
                        <FontAwesome name='upload' size={35} color="#a1e3da"></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeBtn} onPress={()=>closePreview()}>
                        <FontAwesome name='close' size={35} color="#a1e3da">
                        </FontAwesome>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {states.Picture.value != '' && imagePreview()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnWrapper: {
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal:25,
    },
    closeBtn: {
        margin:10,
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:1000,
        borderWidth:2,
        borderColor:'#a1e3da',
        backgroundColor:'#fff',
    },
    downloadButton: {
        margin:10,
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:1000,
        borderWidth:2,
        borderColor:'#a1e3da',
        backgroundColor:'#fff'
    },
    picture:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
});
