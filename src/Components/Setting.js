import { View, Text, SafeAreaView, ImageBackground, useWindowDimensions} from 'react-native'
import React from 'react'

import styles from './Styles'


const setting = () => {
    return (
        <SafeAreaView style={{flex: 1, alignItems:'center', backgroundColor: '#363D58'}}>
            <View style={{width: '80%', alignItems:'flex-start'}}>
                <Text>설정</Text>
            </View>
            <View style={styles.settingView}>

            </View>
            <ImageBackground source={require("../../assets/image/vora.png")} 
            style={{
                position: 'absolute',
                top:'75%',
                left:'6%',
                width: '100%', 
                height: '79%', 
                resizeMode: 'contain', 
                opacity: 0.5
                }}/>
        </SafeAreaView>
    )
}

export default setting