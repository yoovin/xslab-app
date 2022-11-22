import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { WithLocalSvg } from 'react-native-svg'
import homeIcon from '../../assets/image/home.svg'
import settingIcon from '../../assets/image/setting.svg'

import Styles from './Styles'

const BottomNavi = (props) => {
  return (
    <View style={{flex:0.7, flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'center' ,backgroundColor: '#2A2F42'}}>
        <TouchableOpacity style={Styles.button}
        activeOpacity={0.5}
        onPress={() => {props.setCurrentScreenIndex(0)}}>
        {/* <Image source={require("../../assets/image/home.png")} style={{width: 35, height: 35, resizeMode: 'contain'}}/> */}
        <WithLocalSvg width={30} height={30} asset={homeIcon}/>
        </TouchableOpacity>
        <View style={{width: 3, height: '80%', borderRadius: 2, backgroundColor: 'white'}}></View>
        <TouchableOpacity style={Styles.button}
        activeOpacity={0.5}
        onPress={() => {props.setCurrentScreenIndex(1)}}>
        {/* <Image source={require("../../assets/image/setting.png")} style={{width: 35, height: 35, resizeMode: 'contain'}}/> */}
        <WithLocalSvg width={30} height={30} asset={settingIcon}/>
        </TouchableOpacity>
        
    </View>
  )
}

export default BottomNavi