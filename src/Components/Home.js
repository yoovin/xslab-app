import { View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions, Animated} from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Navi from './Navi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Dialog from "react-native-dialog"
import Swiper from 'react-native-swiper'
import { WithLocalSvg } from 'react-native-svg'
import { swiperScrolling } from './recoil/atom'
import { useSetRecoilState } from 'recoil'

import styles from './Styles'
import lightningIcon from '../../assets/image/lightning.svg'
import checkIcon from '../../assets/image/xmascore.svg'

/*
    ===== TODOS =====
*/

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

const Home = () => {
    const [mounted, setMounted] = useState(false) // 초기 설정을 위한 state
    const [isMulti, setIsMulti] = useState(false)
    /**
     * Home, Setting 사이 스크롤링 가능 여부
     */
    const setScrolling = useSetRecoilState(swiperScrolling)

    /* 
    ===== Info =====
    */
    const [isInfoSelected, setIsInfoSelected] = useState(false) // info 블럭이 선택되어 풀스크린 여부
    const [selectedInfo, setSelectedInfo] = useState(null) // 눌린 info 블럭의 index

    /* 
    ===== Node =====
    */
    const [isNodeSelected, setIsNodeSelected] = useState(false)
    const [selectedNode, setSelectedNode] = useState([])

    /*
    ===== Animation value =====
    */
    const animations = [
        useState(new Animated.Value(0))[0],
        useState(new Animated.Value(0))[0],
        useState(new Animated.Value(0))[0],
        useState(new Animated.Value(0))[0],
    ]

    const [animationValues, setAnimationValues] = useState({
        tops: [],
        lefts: [],
        widths: [],
        heights: [],
        rollings:[]
    })

    /**
     * 
     * @param {Number} index
     * index에 맞는 애니메이션을 실행시킴
     */
    const animateIn = (index) => {
        Animated.timing(animations[index], {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    /**
     * 
     * @param {number} index
     * index에 맞는 실행했던 애니메이션을 되돌림
     */
    const animateOut = (index) => {
        Animated.timing(animations[index], {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    /**
     * 
     * @param {number} index 
     * info 블럭이 눌릴 시 index에 해당하는 애니메이션 실행
     */
    const pressInfo = (index) => {
        animateIn(index)
        setSelectedInfo(index)
        setIsInfoSelected(true)
        setScrolling(false)
    }

    /**
     * 
     * @param {number} index 
     * @returns info 블럭의 animation 실행을 위한 style을 반환
     */
    const infoAnimationStyle = (index) => {
        return [{
            top: animationValues.tops[index], 
            left: animationValues.lefts[index], 
            width:animationValues.widths[index], 
            height: animationValues.heights[index],
            transform: [animationValues.rollings[index] ? {rotateY: animationValues.rollings[index]} : {rotateY: '0deg'}],
        }, selectedInfo === index && {zIndex: 999}]
    }

    const title = 
    <TouchableOpacity>
        <Image source={require("../../assets/image/title.png")} style={{width: 130, height: 17, resizeMode: 'contain'}}/>
    </TouchableOpacity>

    // if(!mounted){
    // }

    useEffect(() => {
        setMounted(true)
        // 애니메이션 값들을 넣어줌
        const infoTops = ['12%', '12%', '28%', '28%'] // 디자인에 맞는 값들
        const infoLefts = ['8%', '52%', '8%', '52%']

        for(let i = 0; i < 4; i++){
            setAnimationValues(value => ({
                ...value,
                tops: [...value.tops, animations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [infoTops[i], '25%']
                })],

                lefts: [...value.lefts, animations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [infoLefts[i], '8%']
                })],

                widths: [...value.widths, animations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['40%', '84%']
                })],

                heights: [...value.heights, animations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['15%', '50%']
                })],

                rollings: [...value.rollings, animations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                })],
            }))
        }
    }, [])

    useEffect(() => {
        // 선택된 노드들을 초기화해줌
        setSelectedNode([])
    }, [isMulti])

    useEffect(() => {

    }, [selectedInfo])

    return (
        <View style={{flex:10}}>
        <Navi title={title}/>
        <View style={{flex: 3}}></View>
        {isInfoSelected && <TouchableOpacity style={styles.fullscreenBackground}
        onPress={() => {
            animateOut(selectedInfo)
            setIsInfoSelected(false)
            setSelectedInfo(null)
            setScrolling(true)
        }}
        activeOpacity={0}
        ></TouchableOpacity>}

        {/* 
            ===== 부팅 View =====
        */}
        <Animated.View style={[styles.infoView, infoAnimationStyle(0)]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {pressInfo(0)}}>
                <Text style={{fontWeight:'bold', marginBottom:'5%'}}>부팅</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name="power" size={20} color='blue'></Ionicons>
                            <Text style={styles.infoViewText}>6</Text>
                            <Text style={styles.infoViewText}>ON</Text>
                    </View>
                    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name="power" size={20} color='red'></Ionicons>
                            <Text style={styles.infoViewText}>5</Text>
                            <Text style={styles.infoViewText}>OFF</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>

        {/* 
            ===== 데몬 View =====
        */}
        <Animated.View style={[styles.infoView, infoAnimationStyle(1)]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {pressInfo(1)}}>
                <Text style={{fontWeight:'bold', marginBottom:'5%'}}>데몬 연결</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <MaterialCommunityIcons name="transit-connection-variant" size={20} color='#455053'></MaterialCommunityIcons>
                            <Text style={styles.infoViewText}>5</Text>
                            <Text style={styles.infoViewText}>연결</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>

        {/* 
            ===== 온,습도 View =====
            Swiper로 스크롤링 구현
        */}
        <Animated.View style={[styles.infoView, infoAnimationStyle(2)]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {pressInfo(2)}}>
            <Swiper containerStyle={[styles.swiper]} loop={false}
            dotStyle={{top: '25%'}}
            activeDotStyle={{top: '25%', backgroundColor: '#4B4F55'}}>
                <View style={{}}>
                    <Text style={{fontWeight:'bold', marginBottom:'5%'}}>온도</Text>
                        <View style={{alignItems: 'center'}}>
                        <MaterialCommunityIcons name="thermometer-low" size={20} color='#455053'></MaterialCommunityIcons>
                                <Text style={[styles.infoViewText, {margin: 0}]}>37.0°C</Text>
                                <Text style={[styles.infoViewText, {margin: 0}]}>내부 온도</Text>
                        </View>
                </View>
                <View style={{}}>
                    <Text style={{fontWeight:'bold', marginBottom:'5%'}}>습도</Text>
                        <View style={{alignItems: 'center'}}>
                        <MaterialCommunityIcons name="thermometer-lines" size={20} color='#455053'></MaterialCommunityIcons>
                                <Text style={[styles.infoViewText, {margin: 0}]}>00%</Text>
                                <Text style={[styles.infoViewText, {margin: 0}]}>외부 습도</Text>
                        </View>
                </View>
            </Swiper>
            </TouchableOpacity>
        </Animated.View>

        {/* 
            ===== 전력 View =====
        */}
        <Animated.View style={[styles.infoView, infoAnimationStyle(3)]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {pressInfo(3)}}>
            <Text style={{fontWeight:'bold', marginBottom:'5%'}}>전력</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <WithLocalSvg width={20} height={20} asset={lightningIcon}/>
                        <Text style={[styles.infoViewText, {margin: 0}]}>240W</Text>
                        <Text style={[styles.infoViewText, {margin: 0}]}>소비 전력</Text>
                </View>
            </View>
            </TouchableOpacity>
        </Animated.View>

        
        <View style={[styles.nodeContainer]}>
            <Text style={[styles.infoViewText, {paddingHorizontal:'5%'}]}>서버 노드 리스트</Text>
            <ScrollView style={[styles.nodeScrollView, isMulti && {marginBottom: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0}]}
            contentContainerStyle={{paddingBottom: '10%'}}>
                {isMulti &&
                    <View style={{flexDirection: 'row-reverse'}}>
                        <BouncyCheckbox
                        size={20}
                        fillColor="#EAEAEA"
                        unfillColor="#EAEAEA"
                        iconStyle={{borderRadius: 5, borderWidth: 0}}
                        innerIconStyle={{borderRadius: 5, borderWidth: 0}}
                        onPress={(isChecked) => {
                            if(isChecked){
                                nodes.map((item, idx) => {
                                    if(item.ref != null){
                                        if(selectedNode.indexOf(idx+1) == -1){
                                            item.ref.onPress()
                                        }
                                    }
                                })
                            }else{
                                nodes.map((item, idx) => {
                                    if(item.ref != null){
                                        if(selectedNode.indexOf(idx+1) > -1){
                                            item.ref.onPress()
                                        }
                                    }
                                })
                            }
                        }}
                        />
                        {/* <Text>  </Text> */}
                        <Text style={[styles.infoViewText, {marginHorizontal: '2%'}]}>전체 선택하기</Text>
                    </View>
                }
                {nodes.map((item, idx) => (
                    <TouchableOpacity 
                    key={idx}
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
                        <Text style={styles.nodeText}>노드 #{item.nodeNum}</Text>
                        <Text style={styles.nodeText}>{item.temp}°C</Text>
                        {isMulti &&
                        <BouncyCheckbox
                        size={10}
                        innerIconStyle={{size: 30}}
                        fillColor="rgba(0,0,0,0)"
                        // unfillColor="#FFFFFF" 
                        // innerIconStyle={{borderRadius: 5, borderWidth: 0}}
                        onPress={(isChecked) => {
                            if(isChecked){ // 체크되면
                                setSelectedNode(state => {
                                    const selectedNode = state.concat(item.nodeNum)
                                    return selectedNode
                                })
                            }else{ // 체크 풀리면
                                setSelectedNode(state => {
                                    const selectedNode = [...state]
                                    selectedNode.splice(selectedNode.indexOf(item.nodeNum), 1)
                                    return selectedNode
                                })
                            }
                        }}
                        ref={ref => item.ref = ref}
                        // ImageComponent={<WithLocalSvg width={30} height={30} asset={checkIcon}/>}
                        // IconComponent={<Image source={require("../../assets/image/xmascore.png")} style={{width: 50, height: 50}}/>}
                        checkIconImageSource={require("../../assets/image/xmascore.png")}

                        />}
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
                if(selectedNode.length > 0){
                    console.log(selectedNode)
                    setIsNodeSelected(true)
                }else{
                    setIsMulti(false)
                }
            }}
            activeOpacity={0.5}>
                <Text style={[styles.nodeText, {marginVertical: 0, color: 'black'}]}>완료</Text>
            </TouchableOpacity>
        ]}
        </View>
        <Dialog.Container visible={isNodeSelected} contentStyle={styles.dialog}>
                <Dialog.Description>
                    선택한 노드의 전원을 켜시겠습니까?
                </Dialog.Description>
                <Dialog.Button label="예" color="black" 
                onPress={() => {
                    setIsMulti(false)
                    setIsNodeSelected(false)
                }}></Dialog.Button>
                <Dialog.Button label="아니오" color="black" onPress={()=>setIsNodeSelected(false)}></Dialog.Button>
        </Dialog.Container>
    </View>
    )
}

export default Home