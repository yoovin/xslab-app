import { View, Text, SafeAreaView, ImageBackground, useWindowDimensions, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'

import styles from './Styles'


const Logout = () => {
    const [isLogoutButtonPress, setIsLogoutButtonPress] = useState(false)

    return (
        <SafeAreaView style={{flex: 1, alignItems:'center', backgroundColor: '#363D58'}}>
            <View style={{flex:3, width:"100%", justifyContent:"center", alignItems:"center", backgroundColor: "aqua"}}>
                <Text>로그아웃 되었습니다.</Text>
            </View>
            <View style={{flex:3, width:"100%", justifyContent:"center", backgroundColor:'pink'}}>
                <ImageBackground source={require("../../assets/image/vora.png")} style={styles.logoutVoraBackground}/>
            </View>
            <View style={{flex:1, width:"100%", justifyContent:"center", alignItems:'center'}}>
                <ImageBackground source={require("../../assets/image/logo.png")} style={styles.logoBackground}/>
            </View>
        </SafeAreaView>
    )
}

export default Logout