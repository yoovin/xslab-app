import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import styles from './Styles'

const Logout = ({ navigation }) => {
    const [isLogoutButtonPress, setIsLogoutButtonPress] = useState(false)

    const onLogout = async () => {
        axios.post('/api/logout')
    }

    useEffect(() => {
        onLogout()
        setTimeout(() => {
            navigation.reset({ routes: [{ name: 'Login' }] }) // 5초 뒤 로그인 화면으로 이동
        }, 5000)
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#363D58',
            }}
        >
            <View
                style={{
                    flex: 3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Ionicons
                    name="checkmark-circle-outline"
                    size={50}
                    color="white"
                ></Ionicons>
                <Text> </Text>
                <Text style={{ color: 'white' }}>로그아웃 되었습니다.</Text>
            </View>
            <View style={{ flex: 3, width: '100%', justifyContent: 'center' }}>
                <ImageBackground
                    source={require('../../assets/image/vora.png')}
                    style={styles.logoutVoraBackground}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageBackground
                    source={require('../../assets/image/logo.png')}
                    style={styles.logoBackground}
                />
            </View>
        </SafeAreaView>
    )
}

export default Logout
