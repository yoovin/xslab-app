import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import Styles from './Styles'

const BottomNavi = () => {
  return (
    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'center' ,backgroundColor: '#2A2F42'}}>
        <TouchableOpacity style={Styles.button}
        activeOpacity={0.5}>
        <Image source={require("../../assets/image/home.png")} style={{width: 35, height: 35, resizeMode: 'contain'}}/>
        </TouchableOpacity>
        <View style={{width: 3, height: '80%', borderRadius: 2, backgroundColor: 'white'}}></View>
        {/* <Text style={{fontSize: 50, color: 'white'}}>|</Text> */}
        <TouchableOpacity style={Styles.button}
        activeOpacity={0.5}>
        <Image source={require("../../assets/image/setting.png")} style={{width: 35, height: 35, resizeMode: 'contain'}}/>
        </TouchableOpacity>
        
    </View>
  )
}

export default BottomNavi