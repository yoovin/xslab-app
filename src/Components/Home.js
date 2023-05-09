import { View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions, Animated, Easing} from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Navi from './Navi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Dialog from "react-native-dialog"
import Swiper from 'react-native-swiper'
import { WithLocalSvg } from 'react-native-svg'
import { swiperScrolling, BmcTemperature } from './recoil/atom'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import styles from './Styles'
import lightningIcon from '../../assets/image/lightning.svg'
import checkIcon from '../../assets/image/xmascore.svg'
import axios from 'axios'

/*
    ===== TODOS =====
    ㅇ. 나중에 react query로 바꾸기
*/


const Home = () => {
    const queryClient = useQueryClient()
    const [mounted, setMounted] = useState(false) // 초기 설정을 위한 state
    const [isMulti, setIsMulti] = useState(false)
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
    const [nodeTemperatures, setNodeTemperatures] = useState([])
    const [fanRpms, setFanRpms] = useState([])


    const [isInfoSelected, setIsInfoSelected] = useState(false) // info 블럭이 선택되어 풀스크린 여부
    const [selectedInfo, setSelectedInfo] = useState(null) // 눌린 info 블럭의 index

    /* 
    ===== Node =====
    */
    const [nodes, setNodes] = useState([])
    const [isNodeSelected, setIsNodeSelected] = useState(false)
    const [selectedNode, setSelectedNode] = useState([])
    // 선택한 노드의 전원 켜짐/꺼짐 여부
    const [isSelectedNodeOn, setIsSelectedNodeOn] = useState(false)

    /*
    ===== Animation value =====
    */
    const animations = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current
    ]

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

    const [animationValues, setAnimationValues] = useState({
        tops: [],
        lefts: [],
        widths: [],
        heights: [],
        rollings:[]
    })

    const [animationRotate, setAnimationRotate] = useState([])

    // /**
    //  * 
    //  * @param {Number} index
    //  * index에 맞는 애니메이션을 실행시킴
    //  */
    // const animateIn = (index) => {
    //     Animated.timing(animations[index], {
    //         toValue: 1,
    //         duration: 500,
    //         useNativeDriver: false,
    //     }).start()
    // }

    // /**
    //  * 
    //  * @param {number} index
    //  * index에 맞는 실행했던 애니메이션을 되돌림
    //  */
    // const animateOut = (index) => {
    //     Animated.timing(animations[index], {
    //         toValue: 0,
    //         duration: 500,
    //         useNativeDriver: false,
    //     }).start()
    // }

    // /**
    //  * 
    //  * @param {number} index 
    //  * info 블럭이 눌릴 시 index에 해당하는 애니메이션 실행
    //  */
    // const pressInfo = (index) => {
    //     animateIn(index)
    //     setSelectedInfo(index)
    //     setIsInfoSelected(true)
    //     setScrolling(false)
    // }

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
    const getTemperature = () => {
        console.log('온도 받아옴')
        axios.get('/api/temperature')
        .then(({data}) => {
            setBmcTemperature(data.bmc.toFixed(1))
            setNodeTemperatures(data.node)
        })
    }

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

    const getFan = () => {
        console.log('팬 rpm 받아옴')
        axios.get('/api/fan')
        .then(({data}) => {
            setFanRpms(data.rpm)
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

        // Fan 애니메이션 각도 지정
        for(let i = 0; i < 4; i++){
            setAnimationRotate(val => ([...val, fanAnimations[i].interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })]))
        }

        // info값 불러오기 (이부분 함수 작성하여 간략화 할 필요 있음.)
        getPowerConsumption()
        getTemperature()
        getFan()
        const intervalGet = setInterval(() => {
            refetch()
            getTemperature()
            getPowerConsumption()
            getFan()
        }, 3000) // 3초마다 온도 가져옴
        return () => clearInterval(intervalGet)
    }, [])

    useEffect(() => {
        setNode()
    }, [data])

    useEffect(() => {
        if(nodes.length > 0){
            console.log('온도 설정')
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
        // 선택된 노드들을 초기화해줌
        setSelectedNode([])
    }, [isMulti])


    useEffect(() => {
        for(let i = 0; i < fanRpms.length; i++){
            if(fanRpms[i] > 480){
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
    }, [fanRpms])

    return (
        <View style={{flex:10}}>
        <Navi title={title}/>
        <View style={{flex: 7}}></View>
        {/* {isInfoSelected && <TouchableOpacity style={styles.fullscreenBackground}
        onPress={() => {
            animateOut(selectedInfo)
            setIsInfoSelected(false)
            setSelectedInfo(null)
            setScrolling(true)
        }}
        activeOpacity={0}
        ></TouchableOpacity>} */}

        {/* 
            ===== 부팅 View =====
        */}
        <Animated.View style={[styles.infoView, infoAnimationStyle(0)]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {
                    // pressInfo(0)
                    // console.log(nodes)
                }}>
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
        </Animated.View>

        {/* 
            ===== 데몬 View =====
        */}
        <Animated.View style={[styles.infoView, infoAnimationStyle(1)]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {
                    // pressInfo(1)
                    // getTemperature()
                }}>
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
                {/* <TouchableOpacity style={{width: '100%', height: '100%'}}
                onPress={() => {}}> */}
                <Swiper containerStyle={[styles.swiper]} loop={false}
                dotStyle={{top: '25%'}}
                activeDotStyle={{top: '25%', backgroundColor: '#4B4F55'}}>
                    <View style={{}}>
                        <Text style={{fontWeight:'bold', marginBottom:'5%'}}>온도</Text>
                            <View style={{alignItems: 'center'}}>
                            <MaterialCommunityIcons name="thermometer-low" size={20} color='#455053'></MaterialCommunityIcons>
                                    <Text style={[styles.infoViewText, {margin: 0}]}>{bmcTemperature}°C</Text>
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
                {/* </TouchableOpacity> */}
        </Animated.View>

        {/* 
            ===== 전력 View =====
        */}
        <Animated.View style={[styles.infoView, infoAnimationStyle(3)]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {}}>
            <Text style={{fontWeight:'bold', marginBottom:'5%'}}>전력</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <WithLocalSvg width={20} height={20} asset={lightningIcon}/>
                        <Text style={[styles.infoViewText, {margin: 0}]}>{powerConsumption}W</Text>
                        <Text style={[styles.infoViewText, {margin: 0}]}>소비 전력</Text>
                </View>
            </View>
            </TouchableOpacity>
        </Animated.View>

        {/* 
            ===== Fan View =====
        */}
        <Animated.View style={[styles.infoView, {top: '44%', left:'8%', width: '84%', height: '17%', padding:'5%', }]}>
            <TouchableOpacity style={{width: '100%', height: '100%'}}
            onPress={() => {}}>
            <Text style={{fontWeight:'bold'}}>현재 팬 속도</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    {fanRpms.map((item, idx) => (
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={[styles.infoViewText, {marginBottom: 5}]}>{idx+1}번 팬</Text>
                            <Animated.View style={{transform:[{rotate: animationRotate[idx]}]}}>
                                <MaterialCommunityIcons name="fan" size={30} color={fanAniWorks[idx] && '#5d66a4'}></MaterialCommunityIcons>
                            </Animated.View>
                            {/* Fan RPM 480이면 멈춰있는상태같음 */}
                            <Text style={[styles.infoViewText, {marginTop: 5}, fanAniWorks[idx] && {color: '#5d66a4'}]}>{item > 480 ? item : '-'}</Text>
                        </View>
                    ))}
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
                            // 노드 한개 개별 선택
                            setSelectedNode([item.nodeid])
                            setIsSelectedNodeOn(item.isOn)
                            setIsNodeSelected(true)
                        }
                        
                    }}
                    onLongPress={() => {setIsMulti(true)}}>
                        <Text style={styles.nodeText}>노드 #{item.nodeid}</Text>
                        <Text style={styles.nodeText}>{item.temp}°C</Text>
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
                height:'15%',
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
                <View style={{width: 1, height: '150%', backgroundColor: '#D9D9D9'}}></View>
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