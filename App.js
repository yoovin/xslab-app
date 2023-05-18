import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import jwtDecode from 'jwt-decode'
// import Toast from 'react-native-toast-message'
// import SplashScreen from 'react-native-splash-screen'
// import CodePush from 'react-native-code-push'

import Login from './src/Components/Login'
import Main from './src/Components/Main'
import Logout from './src/Components/Logout'
// import Setting from './src/Components/Setting'
import SettingTemp from './src/Components/Setting/SettingTemp'
import SettingFan from './src/Components/Setting/SettingFan'
import SettingProd from './src/Components/Setting/SettingProd'
import AsyncStorage from '@react-native-async-storage/async-storage'


/**
 * {"detail": "Authentication failed"}로 에러 받을때 처리 방법도 생각해봐야할듯
 */

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status },
        } = error
        if (status === 401) {
            // isTokenRefreshing = true
            console.log(error.response.data)
            if (error.response.data.detail === "Expired token") {
                console.log("토큰 만료됨")
                const originalRequest = config
                // 새로운 Access token을 받아옴
                await axios.post('/api/refresh', {
                    'access_token': await AsyncStorage.getItem('access_token'),
                    'refresh_token': await AsyncStorage.getItem('refresh_token')
                })
                .then(async (res) => {
                    console.log('토큰 교체')
                    // 새로운 Access token 적용
                    await AsyncStorage.setItem('access_token', res.data.access_token)
                    await AsyncStorage.setItem('refresh_token', res.data.refresh_token)
                    axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
                    originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`

                    // 토큰교체 실패시(리프레시토큰 만료) 강제 로그아웃 시켜야함
                })
                .catch(err => {
                    
                })
                // isTokenRefreshing = false
                return axios(originalRequest)
            }
        }
        // isTokenRefreshing = false
        return Promise.reject(error);
    }
)

const App = () => {
    const navigationRef = useRef(null)

    /**
     * 자동로그인을 위한 로그인 여부 체크
     * @returns 
     */
    const checkLogin = async () => {
        console.log('로그인 체크')
        const accessToken = await AsyncStorage.getItem('access_token')
        const refreshToken = await AsyncStorage.getItem('refresh_token')
        console.log(refreshToken)
        console.log(jwtDecode(refreshToken).exp)
        console.log(new Date().getTime())

        // 가지고 있는 리프레시 토큰이 만료되었는지 확인
        const isExfired = jwtDecode(refreshToken).exp < new Date().getTime() / 1000
        console.log(isExfired)
        if(!isExfired && accessToken && refreshToken && AsyncStorage.getItem('server_address')){
            // 리프레시 토큰이 만료되지않고 인증정보가 모두 있어야 자동로그인 가능하게끔 구현
            axios.defaults.headers.common["Authorization"]  = `Bearer ${accessToken}`
            axios.defaults.baseURL = await AsyncStorage.getItem('server_address')
            return true
        }
        return false
    }

    useEffect(() => {
        // 자동로그인 되면서 화면 전환되는데 스플래시 이미지 오래띄우는거로 가릴까싶음.
        checkLogin()
        .then(result => {
            if(result){
                navigationRef.current.reset({routes: [{name: 'Main'}]})
            }
        })
    }, [])
    
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <NavigationContainer ref={navigationRef}>
                    {/* 나중에 로그인여부에 따라 initialRoute 바꿔줄예정 */}
                    <Stack.Navigator>
                    {/* <Stack.Navigator initialRouteName={'Main'}> */}
                    <Stack.Group screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Main" component={Main}/>
                        <Stack.Screen name="SettingTemp" component={SettingTemp}/>
                        <Stack.Screen name="SettingFan" component={SettingFan}/>
                        <Stack.Screen name="SettingProd" component={SettingProd}/>
                        <Stack.Screen name="Logout" component={Logout}/>
                            </Stack.Group>
                            <Stack.Group screenOptions={{headerShown: false, presentation: 'modal'}}>
                            </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </RecoilRoot>
        </QueryClientProvider>
    )
}

export default App