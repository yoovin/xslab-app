import { View, Text, TouchableOpacity, Image, ScrollView, Touchable } from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import Navi from './Navi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './Styles'
import BottomNavi from './BottomNavi'

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

const nodes = [
    {
        nodeNum: 1,
        temp: 37.0,
        isOn: false,
    },
    {
        nodeNum: 2,
        temp: 37.0,
        isOn: true,
    },
    {
        nodeNum: 3,
        temp: 37.0,
        isOn: true,
    },
    {
        nodeNum: 4,
        temp: 37.0,
        isOn: true,
    },
    {
        nodeNum: 5,
        temp: 37.0,
        isOn: true,
    },
    {
        nodeNum: 6,
        temp: 37.0,
        isOn: false,
    },
    {
        nodeNum: 7,
        temp: 37.0,
        isOn: false,
    },
    {
        nodeNum: 8,
        temp: 37.0,
        isOn: false,
    },
    {
        nodeNum: 9,
        temp: 37.0,
        isOn: false,
    },
    {
        nodeNum: 10,
        temp: 37.0,
        isOn: true,
    },
    {
        nodeNum: 11,
        temp: 37.0,
        isOn: true,
    },
    {
        nodeNum: 12,
        temp: 37.0,
        isOn: false,
    },
    {
        nodeNum: 13,
        temp: 37.0,
        isOn: false,
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
        <View style={[styles.nodeContainer]}>
            <Text style={[styles.infoViewText, {paddingHorizontal:'5%'}]}>서버 노드 리스트</Text>
            <ScrollView style={[styles.nodeScrollView, isMulti && {marginBottom: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0}]}
            contentContainerStyle={{paddingBottom: '10%'}}>
                {nodes.map(item => (
                    <TouchableOpacity 
                    style={[styles.nodeView, {backgroundColor: item.isOn ? '#A2B2FD' : '#EEA4A0'}]}
                    
                    onLongPress={() => {setIsMulti(true)}}>
                        {isMulti && <CheckBox/>}
                        <Text style={styles.nodeText}>노드 #{item.nodeNum}</Text>
                        <Text style={styles.nodeText}>{item.temp}°C</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {isMulti && 
            [
            ,<TouchableOpacity style={[styles.nodeScrollView, {
                // justifyContent: 'center',
                alignItems:'center',
                height:'11%',
                // paddingTop: 10,
                marginTop:0,
                borderTopWidth:1,
                borderTopColor:'#D9D9D9',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            }]}
            onPress={() => setIsMulti(false)}
            activeOpacity={0.8}>
                <Text style={[styles.nodeText, {marginVertical: 0, color: 'black'}]}>완료</Text>
            </TouchableOpacity>
        ]}
        </View>
        <BottomNavi/>
    </View>
    )
}

export default Main