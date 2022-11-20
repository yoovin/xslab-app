import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Navi from './Navi'

import styles from './Styles'

const infos = [
    {
        infoTitle:"부팅",
        infoIcon:[],
        infoNum: [],
        infoText: [],
    }
]

const Main = () => {

    const title = <TouchableOpacity>
        <Image source={require("../../assets/image/title.png")} style={{width: 130, height: 17, resizeMode: 'contain'}}/>
    </TouchableOpacity>

  return (
    <View style={{flex:1}}>
        <Navi title={title}/>
      <View style={styles.infoContainer}>
            <View style={styles.infoView}>
                <Text>부팅</Text>
            </View>
            <View style={styles.infoView}></View>
            <View style={styles.infoView}></View>
            <View style={styles.infoView}></View>
      </View>
      <View style={{flex:5, backgroundColor: 'aqua'}}>
            
      </View>
      <View style={{flex:1, backgroundColor: 'pink'}}>
            
      </View>

    </View>
  )
}

export default Main