import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated, Easing} from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Navi from './Navi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Dialog from "react-native-dialog"
import Swiper from 'react-native-swiper'
import { WithLocalSvg } from 'react-native-svg'
import { swiperScrolling, BmcTemperature, FanData, Fahrenheit, AlertTemperature } from './recoil/atom'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import styles from './Styles'
import lightningIcon from '../../assets/image/lightning.svg'
import checkIcon from '../../assets/image/xmascore.svg'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

/*
    ===== TODOS =====
    
*/

const { width, height } = Dimensions.get('window')


const Home = () => {
    const queryClient = useQueryClient()
    const [mounted, setMounted] = useState(false) // 초기 설정을 위한 state
    const [isMulti, setIsMulti] = useState(false)
    const [currentPage, setCurrentPage] = useState(0) // Home 화면 위아래 scroll
    /**
     * Home, Setting 사이 스크롤링 가능 여부
     */
    const setScrolling = useSetRecoilState(swiperScrolling)

    /* 
    ===== Info =====
    */
    // 노드 전원 [on, off]
    const [power, setPower] = useState([0, 0])
    const [demonConnected, setdemonConnected] = useState(0)
    const [powerConsumption, setpowerConsumption] = useState(0)

    const [bmcTemperature, setBmcTemperature] = useRecoilState(BmcTemperature)
    const [bmcHumidity, setBmcHumidity] = useState(0)
    const [isFahrenheit, setIsFahrenheit] = useRecoilState(Fahrenheit)
    const [nodeTemperatures, setNodeTemperatures] = useState([])
    const [fanData, setFanData] = useRecoilState(FanData)
    const [alertTemperature, setAlertTemperature] = useRecoilState(AlertTemperature)

    /* 
    ===== Node =====
    */
    const [nodes, setNodes] = useState([])
    const [isNodeSelected, setIsNodeSelected] = useState(false)
    const [selectedNode, setSelectedNode] = useState([])
    // 선택한 노드의 전원 켜짐/꺼짐 여부
    const [isSelectedNodeOn, setIsSelectedNodeOn] = useState(false)
    const [isNodePaging, setIsNodePaging] = useState(false)

    /*
    ===== Animation value =====
    */

    // Fan 개수는 4개로 고정해두었습니다.
    // 추후 서버 Fan 개수 수정 가능 시 변동적이게 만들어야함.
    const fanAnimations = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current
    ]

    /**
     *  Fan 애니메이션이 실행중인지 여부 확인
     */
    const [fanAniWorks, setFanAniWorks] = useState([
        false, false, false, false
    ])

    const [animationRotate, setAnimationRotate] = useState([])

    const title = 
    <TouchableOpacity>
        <Image source={require("../../assets/image/title.png")} style={{width: 130, height: 17, resizeMode: 'contain'}}/>
    </TouchableOpacity>

    const getPower = async () => {
        const res = await axios.get('/api/power')
        console.log('power불러옴')
        return res.data
    }
    
    const { data, isLoading, isError, error, refetch } = useQuery('nodes', getPower)


    /**
     *  node의 전원값을 가져와서 설정한다.
     */    
    const setNode = async () => {
        setPower([0, 0]) // 파워값 초기화
        setNodes([]) // 노드값 초기화
        console.log(data)
        const nodes = [] // 노드 리스트 초기화
        for(let i = 0; i < data.node.length; i++){
            // console.log(node)
            const powerStatus = data.node[i]
            if(powerStatus > 0){
                let node = {
                    nodeid: i+1,
                    temp: 0.0,
                    ref: null,
                    isOn: powerStatus > 1 // 전원 켜짐 여부
                }
                setPower(val => {
                    const newVal = [...val]
                    if(powerStatus > 1){
                        newVal[0]++
                    }else{
                        newVal[1]++
                    }
                    return newVal
                })
                nodes.push(node)
            }
        }
        setNodes(nodes)
    }

    /**
     *  node의 온도값을 가져와서 설정한다.
     */
    const getTemperature = async () => {
        console.log('온도 받아옴')
        const res = await axios.get('/api/temperature')
        return res.data
    }

    const temperatures = useQuery('temperatures', getTemperature)
    
    /**
     *  팬 데이터를 가져와서 설정한다.
     */
    const getFan = async () => {
        console.log('팬 rpm 받아옴')
        const res = await axios.get('/api/fan')
        return res.data
    }

    const fans = useQuery('fans', getFan)

    /**
     *  노드의 전력값을 가져와서 설정한다.
     */
    const getPowerConsumption = () => {
        console.log('전력 받아옴')
        axios.get('/api/power/consumption')
        .then(({data}) => {
            setpowerConsumption(data.consumption)
        })
    }


    const nodePowerMutation = useMutation(
        option => axios.put(`/api/node/${option.nodeId}`, {power: option.working}),
            {
                onSuccess: () => {
                    // 데이터 업데이트 성공 시 캐시를 갱신합니다.
                    queryClient.resetQueries("nodes")
                },
            }
        )

    const turnNodePower = (nodeId, working) => {
        nodePowerMutation.mutate({nodeId, working})
    }

    /**
     * node의 경고온도를 가져와서 설정한다.
     */
    const getAlertTemp = async () => {
        const res = await axios.get('/api/temperature/alert')
        console.log('경고온도불러옴')
        return res.data
    }

    const alertTemp = useQuery('curAlertTemp', getAlertTemp)

    /**
     * 스크롤 정도를 확인하고 페이징 합니다.
     * @param {*} event 
     */
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const page = Math.floor(offsetY / height)
        setCurrentPage(page);
    }

    useEffect(() => {
        setMounted(true)
        // 애니메이션 값들을 넣어줌
        // Fan 애니메이션 각도 지정
        for(let i = 0; i < 4; i++){
            setAnimationRotate(val => ([...val, fanAnimations[i].interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })]))
        }

        // info값 불러오기 (이부분 함수 작성하여 간략화 할 필요 있음.)
        getPowerConsumption()
        const intervalGet = setInterval(() => {
            refetch()
            temperatures.refetch()
            fans.refetch()
            getPowerConsumption()
            alertTemp.refetch()
        }, 3000) // 3초마다 온도 가져옴
        return () => clearInterval(intervalGet)
    }, [])

    useEffect(() => {
        setNode()
    }, [data])

    useEffect(() => {
        if(temperatures.data){
            setIsFahrenheit(temperatures.data.fahrenheit)
            setBmcTemperature(temperatures.data.bmc.toFixed(1))
            setBmcHumidity(Math.round(temperatures.data.external.humidity))
            setNodeTemperatures(temperatures.data.node)
        }
    }, [temperatures.data])

    useEffect(() => {
        if(fans.data){
            setFanData(fans.data)
        }
    }, [fans.data])


    useEffect(() => {
        if(nodes.length > 0){
            console.log('노드 온도 설정')
            setNodes(val => {
                const newVal = [...val]
                newVal.map(item => {
                    item.temp = nodeTemperatures[item.nodeid-1].toFixed(1)
                    return item
                })
                return newVal
            })
        }
    }, [nodeTemperatures])

    useEffect(() => {
        if(alertTemp.data){
            setAlertTemperature(alertTemp.data.value)
        }
    }, [alertTemp.data])

    useEffect(() => {
        // 선택된 노드들을 초기화해줌
        setSelectedNode([])
    }, [isMulti])


    useEffect(() => {
        if(fanData.rpm){
            for(let i = 0; i < fanData.rpm.length; i++){
                if(fanData.rpm[i] > 480){
                    if(!fanAniWorks[i]){
                        Animated.loop(
                            Animated.timing(fanAnimations[i], {
                                toValue: 1,
                                duration: 2000,
                                useNativeDriver: true,
                                easing: Easing.linear
                            })
                        ).start()
                        // 애니메이션 실행중인것으로 체크
                        setFanAniWorks(val => {
                            const newVal = [...val]
                            newVal[i] = true
                            return newVal
                        })
                    }
                }else{
                    // 팬이 돌고있지않으면 애니메이션 정지
                    fanAnimations[i].stopAnimation()
                    // 애니메이션 정지중인것으로 체크
                    setFanAniWorks(val => {
                        const newVal = [...val]
                        newVal[i] = false
                        return newVal
                    })
                }
            }
        }
    }, [fanData])

    return (
        <View style={{flex:1}}>
        <Navi title={title}/>
        <ScrollView 
        contentContainerStyle={{height: (height-(height/10 * 1.6))*2}} 
        style={{height}}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
        bounces={false}
        >
            <View style={[styles.infoContainer, {height: height-(height/10 * 1.6)}]}>
                {/* 
                    ===== 부팅 View =====
                */}

                
                    <TouchableOpacity style={[styles.infoView]}
                    onPress={() => {
                            // pressInfo(0)
                            // console.log(nodes)
                        }}
                        activeOpacity={1}>
                        <Text style={{fontWeight:'bold', marginBottom:'5%'}}>부팅</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                                <Ionicons name="power" size={20} color='blue'></Ionicons>
                                    <Text style={styles.infoViewText}>{power[0]}</Text>
                                    <Text style={styles.infoViewText}>ON</Text>
                            </View>
                            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                                <Ionicons name="power" size={20} color='red'></Ionicons>
                                    <Text style={styles.infoViewText}>{power[1]}</Text>
                                    <Text style={styles.infoViewText}>OFF</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                {/* 
                    ===== 데몬 View =====
                */}
                    <TouchableOpacity style={[styles.infoView]}
                    onPress={() => {
                        }}
                        activeOpacity={1}>
                        <Text style={{fontWeight:'bold', marginBottom:'5%'}}>데몬 연결</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <MaterialCommunityIcons name="transit-connection-variant" size={20} color='#455053'></MaterialCommunityIcons>
                                    <Text style={styles.infoViewText}>{power[0]}</Text>
                                    <Text style={styles.infoViewText}>연결</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                {/* 
                    ===== 온,습도 View =====
                    Swiper로 스크롤링 구현
                */}
                <View style={[styles.infoView]}>
                        <Swiper containerStyle={[styles.swiper, {height: 100}]} loop={false}
                        dotStyle={{top: '25%'}}
                        activeDotStyle={{top: '25%', backgroundColor: '#4B4F55'}}>
                            <View style={{}}>
                                <Text style={{fontWeight:'bold', marginBottom:'5%'}}>온도</Text>
                                    <View style={{alignItems: 'center'}}>
                                    <MaterialCommunityIcons name="thermometer-low" size={20} color='#455053'></MaterialCommunityIcons>
                                            <Text style={[styles.infoViewText, {margin: 0}]}>{bmcTemperature}{isFahrenheit ? '°F' : '°C'}</Text>
                                            <Text style={[styles.infoViewText, {margin: 0}]}>내부 온도</Text>
                                    </View>
                            </View>
                            <View style={{}}>
                                <Text style={{fontWeight:'bold', marginBottom:'5%'}}>습도</Text>
                                    <View style={{alignItems: 'center'}}>
                                    <MaterialCommunityIcons name="thermometer-lines" size={20} color='#455053'></MaterialCommunityIcons>
                                            <Text style={[styles.infoViewText, {margin: 0}]}>{bmcHumidity}%</Text>
                                            <Text style={[styles.infoViewText, {margin: 0}]}>외부 습도</Text>
                                    </View>
                            </View>
                        </Swiper>
                </View>

                {/* 
                    ===== 전력 View =====
                */}

                    <TouchableOpacity style={[styles.infoView]}
                    onPress={() => {}}
                    activeOpacity={1}>
                    <Text style={{fontWeight:'bold', marginBottom:'5%'}}>전력</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <WithLocalSvg width={20} height={20} asset={lightningIcon}/>
                                <Text style={[styles.infoViewText, {margin: 0}]}>{powerConsumption}W</Text>
                                <Text style={[styles.infoViewText, {margin: 0}]}>소비 전력</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

        {/* 
            ===== Fan View =====
        */}
                    <TouchableOpacity style={[styles.infoView, {width: '92%', height: '20%'}]}
                    onPress={() => {}}
                    activeOpacity={1}>
                    <Text style={{fontWeight:'bold'}}>현재 팬 속도</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                            {fanData.rpm && fanData.rpm.map((item, idx) => (
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text style={[styles.infoViewText, {marginBottom: 5}]}>{idx+1}번 팬</Text>
                                    <Animated.View style={{transform:[{rotate: animationRotate[idx]}]}}>
                                        <MaterialCommunityIcons name="fan" size={30} color={fanAniWorks[idx] && '#5d66a4'}></MaterialCommunityIcons>
                                    </Animated.View>
                                    {/* 480이면 꺼져있는 상태같음. */}
                                    <Text style={[styles.infoViewText, {marginTop: 5}, fanAniWorks[idx] && {color: '#5d66a4'}]}>{item > 480 ? item : '-'}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    </TouchableOpacity>
            </View>


        
        <View style={[styles.nodeContainer, {height: height-(height/10 * 1.5)}]}>
            <Text style={[styles.infoViewText, {paddingHorizontal:'5%'}]}>서버 노드 리스트</Text>
            <ScrollView style={[styles.nodeScrollView, {marginBottom: '5%'}, isMulti && {marginBottom: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0}]}
            contentContainerStyle={{paddingBottom: '10%'}}
            nestedScrollEnabled={true}
            >
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
                            // 노드 한개 개별 선택
                            setSelectedNode([item.nodeid])
                            setIsSelectedNodeOn(item.isOn)
                            setIsNodeSelected(true)
                        }
                        
                    }}
                    onLongPress={() => {setIsMulti(true)}}>
                        <Text style={styles.nodeText}>노드 #{item.nodeid}</Text>
                        <Text style={[styles.nodeText, item.temp > alertTemperature && {color: 'red', fontWeight: 'bold'}]}>{item.temp}{isFahrenheit ? '°F' : '°C'}</Text>
                        {isMulti &&
                        <BouncyCheckbox
                        size={10}
                        innerIconStyle={{size: 30}}
                        fillColor="rgba(0,0,0,0)"
                        onPress={(isChecked) => {
                            if(isChecked){ // 체크되면
                                setSelectedNode(state => {
                                    const selectedNode = state.concat(item.nodeid)
                                    return selectedNode
                                })
                            }else{ // 체크 풀리면
                                setSelectedNode(state => {
                                    const selectedNode = [...state]
                                    selectedNode.splice(selectedNode.indexOf(item.nodeid), 1)
                                    return selectedNode
                                })
                            }
                        }}
                        ref={ref => item.ref = ref}
                        checkIconImageSource={require("../../assets/image/xmascore.png")}
                        />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {isMulti && 
            [
            ,<View style={[styles.nodeScrollView, {
                flexDirection: 'row',
                alignItems:'center',
                height:'8%',
                marginTop:0,
                borderTopWidth:1,
                borderTopColor:'#D9D9D9',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                padding: '2%'
            }]}>
                <TouchableOpacity
                style={styles.onOffButton}
                onPress={() => {
                    if(selectedNode.length > 0){
                        console.log(selectedNode)
                        setIsNodeSelected(true)
                        setIsSelectedNodeOn(false)
                    }else{
                        setIsMulti(false)
                    }
                }}
                activeOpacity={0.5}>
                    <Text style={[{}]}>켜기</Text>
                </TouchableOpacity>
                <View style={{width: 1, height: '140%', backgroundColor: '#D9D9D9'}}></View>
                <TouchableOpacity
                style={styles.onOffButton}
                onPress={() => {
                    if(selectedNode.length > 0){
                        console.log(selectedNode)
                        setIsNodeSelected(true)
                        setIsSelectedNodeOn(true)
                    }else{
                        setIsMulti(false)
                    }
                }}
                activeOpacity={0.5}>
                    <Text style={[{}]}>끄기</Text>
                </TouchableOpacity>
                
            </View>
        ]}
        </View>
        </ScrollView>
        <Dialog.Container visible={isNodeSelected} contentStyle={styles.dialog}>
                <Dialog.Description>
                    {isSelectedNodeOn ? '선택한 노드의 전원을 종료하시겠습니까?' : '선택한 노드의 전원을 켜시겠습니까?'}
                </Dialog.Description>
                <Dialog.Button label="예" color="black"
                onPress={async () => {
                    console.log(selectedNode)
                    if(isSelectedNodeOn){
                        for(let nodeid of selectedNode){
                            turnNodePower(nodeid, 0)
                        }
                    }else{
                        // 전원 온
                        for(let nodeid of selectedNode){
                            turnNodePower(nodeid, 1)
                        }
                    }

                    setIsMulti(false)
                    setIsNodeSelected(false)
                }}></Dialog.Button>
                <Dialog.Button label="아니오" color="black" onPress={()=>setIsNodeSelected(false)}></Dialog.Button>
        </Dialog.Container>
    </View>
    )
}

export default Home