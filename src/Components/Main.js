import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Navi from './Navi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Dialog from "react-native-dialog"

import styles from './Styles'
import BottomNavi from './BottomNavi'


/*
    ===== DUMMY DATA =====
*/
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
        ref: null,
    },
    {
        nodeNum: 2,
        temp: 37.0,
        isOn: true,
        ref: null,
    },
    {
        nodeNum: 3,
        temp: 37.0,
        isOn: true,
        ref: null,
    },
    {
        nodeNum: 4,
        temp: 37.0,
        isOn: true,
        ref: null,
    },
    {
        nodeNum: 5,
        temp: 37.0,
        isOn: true,
        ref: null,
    },
    {
        nodeNum: 6,
        temp: 37.0,
        isOn: false,
        ref: null,
    },
    {
        nodeNum: 7,
        temp: 37.0,
        isOn: false,
        ref: null,
    },
    {
        nodeNum: 8,
        temp: 37.0,
        isOn: false,
        ref: null,
    },
    {
        nodeNum: 9,
        temp: 37.0,
        isOn: false,
        ref: null,
    },
    {
        nodeNum: 10,
        temp: 37.0,
        isOn: true,
        ref: null,
    },
    {
        nodeNum: 11,
        temp: 37.0,
        isOn: true,
        ref: null,
    },
    {
        nodeNum: 12,
        temp: 37.0,
        isOn: false,
        ref: null,
    },
    {
        nodeNum: 13,
        temp: 37.0,
        isOn: false,
        ref: null,
    },
]

const Main = () => {
    const [isMulti, setIsMulti] = useState(false)
    const [isNodeSelected, setIsNodeSelected] = useState(false)
    const [selectedNode, setSelectedNode] = useState([])

    const title = 
    <TouchableOpacity>
        <Image source={require("../../assets/image/title.png")} style={{width: 130, height: 17, resizeMode: 'contain'}}/>
    </TouchableOpacity>

    useEffect(() => {
        // 선택된 노드들을 초기화해줌
        setSelectedNode([])
    }, [isMulti])

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
                    activeOpacity={0.5}
                    onPress={() => {
                        if(item.ref != null){ // Multi node select 일때 
                            item.ref.onPress()
                        }else{
                            setIsNodeSelected(true)
                        }
                        
                    }}
                    onLongPress={() => {setIsMulti(true)}}>
                        {isMulti &&
                        <BouncyCheckbox 
                        size={20}
                        iconStyle={{borderRadius: 5, borderWidth: 0}}
                        fillColor="#D9D9D9"
                        unfillColor="#FFFFFF" 
                        innerIconStyle={{borderRadius: 5, borderWidth: 0}}
                        onPress={() => {
                            setSelectedNode(state => {
                                const selectedNode = state.concat(item.nodeNum)
                                return selectedNode
                            })
                        }}
                        ref={ref => item.ref = ref}
                        />}
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
            onPress={() => {
                console.log(selectedNode)
                setIsNodeSelected(true)
            }}
            activeOpacity={0.5}>
                <Text style={[styles.nodeText, {marginVertical: 0, color: 'black'}]}>완료</Text>
            </TouchableOpacity>
        ]}
        </View>
        <BottomNavi/>

        <Dialog.Container visible={isNodeSelected} contentStyle={styles.dialog}>
                <Dialog.Description>
                    선택한 노드의 전원을 켜시겠습니까?
                </Dialog.Description>
                <Dialog.Button label="아니오" color="black" onPress={()=>setIsNodeSelected(false)}></Dialog.Button>
                <Dialog.Button label="예" color="black" 
                onPress={() => {
                    setIsMulti(false)
                    setIsNodeSelected(false)
                }}></Dialog.Button>
        </Dialog.Container>
    </View>
    )
}

export default Main