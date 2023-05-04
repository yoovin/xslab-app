import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
// import Toast from 'react-native-toast-message'
// import SplashScreen from 'react-native-splash-screen'
// import CodePush from 'react-native-code-push'

import Login from './src/Components/Login'
import Main from './src/Components/Main'
import Logout from './src/Components/Logout'


const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Main" component={Main}/>
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