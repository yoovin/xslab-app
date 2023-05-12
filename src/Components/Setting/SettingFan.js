import { View, Text, TouchableOpacity, SafeAreaView, Animated, Easing, Switch } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dialog from 'react-native-dialog'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FanData } from '../recoil/atom'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import styles from '../Styles'
import TopNavi from './TopNavi'

const SettingFan = ({ navigation }) => {
    
    // {
    //     "auto": true, 
    //     "rpm": [480, 620, 3413, 628], 
    //     "speed": {"current": 50, "maximum": 50, "minimum": 20}, 
    //     "temperature": {"fahrenheit": false, "value": 30}
    // }
    
    const [fanData, setFanData] = useRecoilState(FanData)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isAuto, setIsAuto] = useState(false)
    const [inputVar, setInputVar] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const inputVal = useRef(0)

    const [animationRotate, setAnimationRotate] = useState([])
    const [fanAniWorks, setFanAniWorks] = useState([false, false, false, false])
    const fanAnimations = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
    ]


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

        // Fan 애니메이션 각도 지정
        for(let i = 0; i < 4; i++){
            setAnimationRotate(val => ([...val, fanAnimations[i].interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })]))
        }
        setIsUpdate(false)
    }, [fanData])

    useEffect(() => {
        // 사용자경험을 위해 버튼값은 처음에 받아오는 데이터로 지정하고 이후부터는 버튼과 동시상태값은 별개
        setIsAuto(fanData.auto)
    }, [])

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: '#363D58', alignItems: 'center', paddingTop: '5%' }}>
            <TopNavi navigation={navigation} title='팬 속도' />
            <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#363D58', width: '100%', paddingTop: '5%', paddingBottom: '20%' }}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={[styles.settingList, { width: '90%' }]}>
                            <TouchableOpacity
                                style={styles.settingMenu}
                                disabled={isUpdate}
                                onPress={() => {
                                    setInputVar('min')
                                    setIsTyping(true)
                                }}
                            >
                                <View style={styles.settingInnerMenu}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>최소 속도</Text>
                                    <Text style={{ color: 'white', marginRight: '5%' }}>{fanData ? fanData.speed.minimum : '-'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.settingMenu}
                                disabled={isUpdate}
                                onPress={() => {
                                    setInputVar('max')
                                    setIsTyping(true)
                                }}
                            >
                                <View style={[styles.settingInnerMenu, { borderBottomWidth: 0 }]}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>최고 속도</Text>
                                    <Text style={{ color: 'white', marginRight: '5%' }}>{fanData ? fanData.speed.maximum : '-'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.infoView,
                            { position: 'relative', width: '90%', height: '40%', padding: '5%', marginTop: '10%', backgroundColor: '#3D4460' },
                        ]}
                    >
                        <View style={{ width: '100%', height: '100%' }} onPress={() => {}}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>현재 팬 속도</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    {fanData.rpm && fanData.rpm.map((item, idx) => (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} key={item}>
                                            <Text style={[styles.infoViewText, { marginBottom: 5, color: 'white' }]}>{idx + 1}번 팬</Text>
                                            {animationRotate[idx] && <Animated.View style={{ transform: [{ rotate: animationRotate[idx] }] }}>
                                                <MaterialCommunityIcons
                                                    name='fan'
                                                    size={30}
                                                    color={fanAniWorks[idx] ? '#B1B9DE' : 'white'}
                                                ></MaterialCommunityIcons>
                                            </Animated.View>}
                                            {/* Fan RPM 480이면 멈춰있는상태같음 */}
                                            <Text style={[styles.infoViewText, { marginTop: 5 }, fanAniWorks[idx] ? { color: '#B1B9DE' } : { color: 'white'}]}>
                                                {item > 480 ? item : '-'}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '10%' }}>
                        <View style={[styles.settingList, { width: '90%' }]}>
                            <View
                                style={styles.settingMenu}
                                // disabled={isUpdate}
                            >
                                <View style={[styles.settingInnerMenu, { borderBottomWidth: 0 }]}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>팬 속도 자동 조절</Text>
                                    <Text
                                        style={{
                                            color: 'white',
                                            marginRight: '5%',
                                        }}
                                    >
                                        <Switch
                                            disabled={isUpdate}
                                            trackColor={{ false: '#B0BEC5', true: '#4CAF50' }}
                                            thumbColor={fanData.auto ? 'white' : 'white'}
                                            ios_backgroundColor='#3e3e3e'
                                            onValueChange={() => {
                                                setIsAuto(!isAuto)
                                                axios
                                                    .put('/api/fan', {
                                                        auto: fanData.auto ? false : true,
                                                        speed: fanData.speed,
                                                        temperature: fanData.temperature,
                                                    })
                                                    .then(res => console.log('FAN: 펜 설정 완료'))
                                                    .catch((err) => console.error(err))
                                            }}
                                            value={isAuto}
                                        ></Switch>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <Dialog.Container visible={isTyping} contentStyle={styles.dialog}>
                    <Dialog.Title>{inputVar === 'min' ? '최소 속도' : '최고 속도'}</Dialog.Title>
                    <Dialog.Description>속도 값을 입력해주세요.</Dialog.Description>
                    <Dialog.Input keyboardType='number-pad' inputMode='numeric' onChangeText={(val) => (inputVal.current = val)}></Dialog.Input>
                    <Dialog.Button
                        label='확인'
                        color='black'
                        onPress={() => {
                            setIsUpdate(true)
                            if (inputVar === 'min') {
                                axios
                                    .put('/api/fan', {
                                        auto: fanData.auto,
                                        speed: { ...fanData.speed, minimum: inputVal.current },
                                        temperature: fanData.temperature,
                                    })
                                    .catch((err) => console.error(err))
                            } else if (inputVar === 'max') {
                                axios
                                    .put('/api/fan', {
                                        auto: fanData.auto,
                                        speed: { ...fanData.speed, maximum: inputVal.current },
                                        temperature: fanData.temperature,
                                    })
                                    .catch((err) => console.error(err))
                            }
                            setIsTyping(false)
                        }}
                    ></Dialog.Button>
                    <Dialog.Button label='취소' color='black' onPress={() => setIsTyping(false)}></Dialog.Button>
                </Dialog.Container>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SettingFan
