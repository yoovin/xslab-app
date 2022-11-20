import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Navi from './Navi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './Styles'

const infos = [
    {
        infoTitle:"부팅",
        infoContent:[
            {
                icon:<Ionicons name="power" size={20} color='blue'></Ionicons>,
                num: "6",
                text: "ON",
            },
            {
                icon:<Ionicons name="power" size={20} color='red'></Ionicons>,
                num: "5",
                text: "OFF",
            }
        ]
    },
    {
        infoTitle:"연결",
        infoContent:[
            {
                icon:<MaterialCommunityIcons name="transit-connection-variant" size={20} color='black'></MaterialCommunityIcons>,
                num: "5",
                text: "연결",
            },
        ]
    },
    {
        infoTitle:"온습도",
        infoContent:[
            {
                icon:<MaterialCommunityIcons name="thermometer-low" size={20} color='black'></MaterialCommunityIcons>,
                num: "37.0°C",
                text: "내부 온도",
            },
            {
                icon:<MaterialCommunityIcons name="thermometer-lines" size={20} color='black'></MaterialCommunityIcons>,
                num: "0.0°C / 0.0%",
                text: "외부 온습도",
            }
        ]
    },
    {
        infoTitle:"전력",
        infoContent:[
            {
                icon:<MaterialIcons name="electrical-services" size={20} color='black'></MaterialIcons>,
                num: "240W",
                text: "소비 전력",
            },
        ]
    },
]

const Main = () => {
    const [isMulti, setIsMulti] = useState(false)

    const title = <TouchableOpacity>
        <Image source={require("../../assets/image/title.png")} style={{width: 130, height: 17, resizeMode: 'contain'}}/>
    </TouchableOpacity>

  return (
    <View style={{flex:1}}>
        <Navi title={title}/>
      <View style={styles.infoContainer}>
        {infos.map(item => (
            <View style={styles.infoView}>
                <Text style={{fontWeight:'bold', marginBottom:'5%'}}>{item.infoTitle}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                {item.infoContent.map(info => (
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            {info.icon}
                            <Text style={styles.infoViewText}>{info.num}</Text>
                            <Text style={styles.infoViewText}>{info.text}</Text>
                        </View>
                ))}
                </View>
            </View>
        ))}
      </View>
      <View style={[styles.infoContainer, {flex:5, justifyContent:'flex-start'}]}>
            <Text style={[styles.infoViewText, {paddingHorizontal:'5%'}]}>서버 노드 리스트</Text>
            <View style={styles.nodeView}></View>
      </View>
      <View style={{flex:1, backgroundColor: 'pink'}}>
            
      </View>

    </View>
  )
}

export default Main