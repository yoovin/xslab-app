import { View, Text, TouchableOpacity, SafeAreaView, Animated, Easing, Switch, Alert } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dialog from 'react-native-dialog'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FanData } from '../recoil/atom'
import { useRecoilState } from 'recoil'
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
        if (fanData.rpm) {
            for (let i = 0; i < fanData.rpm.length; i++) {
                if (fanData.rpm[i] > 480) {
                    if (!fanAniWorks[i]) {
                        Animated.loop(
                            Animated.timing(fanAnimations[i], {
                                toValue: 1,
                                duration: 2000,
                                useNativeDriver: true,
                                easing: Easing.linear,
                            })
                        ).start()
                        // 애니메이션 실행중인것으로 체크
                        setFanAniWorks((val) => {
                            const newVal = [...val]
                            newVal[i] = true
                            return newVal
                        })
                    }
                } else {
                    // 팬이 돌고있지않으면 애니메이션 정지
                    fanAnimations[i].stopAnimation()
                    // 애니메이션 정지중인것으로 체크
                    setFanAniWorks((val) => {
                        const newVal = [...val]
                        newVal[i] = false
                        return newVal
                    })
                }
            }
        }

        // Fan 애니메이션 각도 지정
        for (let i = 0; i < 4; i++) {
            setAnimationRotate((val) => [
                ...val,
                fanAnimations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            ])
        }
        setIsAuto(fanData.auto)
        setIsUpdate(false)
    }, [fanData])

    useEffect(() => {
        // 사용자경험을 위해 버튼값은 처음에 받아오는 데이터로 지정하고 이후부터는 버튼과 동시상태값은 별개
        setIsAuto(fanData.auto)
    }, [])

    const validCheck = () => {
        if (inputVal.current > 512) {
            Alert.alert('설정 실패', '속도 값은 0~512범위 내의 값이어야 합니다.', [
                {
                    text: '확인',
                    style: 'cancel',
                },
            ])
        }
        else if (inputVar === 'min') {
            if (inputVal.current > fanData.speed.maximum) {
                Alert.alert('설정 실패', '최고 속도 값보다 낮아야 합니다.', [
                    {
                        text: '확인',
                        style: 'cancel',
                    },
                ])
            } else {
                setIsUpdate(true)
                axios
                    .put('/api/fan', {
                        auto: fanData.auto,
                        speed: { ...fanData.speed, minimum: inputVal.current },
                        temperature: fanData.temperature,
                    })
                    .then(() => setIsTyping(false))
                    // .catch((err) => console.error(err))
            }
        } else if (inputVar === 'max') {
            if (inputVal.current < fanData.speed.minimum) {
                Alert.alert('설정 실패', '최소 속도 값보다 높아야 합니다.', [
                    {
                        text: '확인',
                        style: 'cancel',
                    },
                ])
            } else {
                setIsUpdate(true)
                axios
                    .put('/api/fan', {
                        auto: fanData.auto,
                        speed: { ...fanData.speed, maximum: inputVal.current },
                        temperature: fanData.temperature,
                    })
                    .then(() => setIsTyping(false))
                    // .catch((err) => console.error(err))
            }
        }
    }

    return (
        <SafeAreaView style={[styles.screen, styles.screen_setting]}>
            <TopNavi navigation={navigation} title='팬 속도' />
            <KeyboardAwareScrollView contentContainerStyle={[styles.scroll_content]} style={[styles.scroll_style]}>
                <View style={[styles.box, styles.box_setting]}>
                    <TouchableOpacity
                        style={[styles.list]}
                        disabled={isUpdate}
                        onPress={() => {
                            setInputVar('min')
                            setIsTyping(true)
                        }}
                    >
                        <Text style={[styles.text_name]}>최소 속도</Text>
                        <Text style={[styles.text_val]}>{fanData ? fanData.speed.minimum : '-'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.list, styles.list_end]}
                        disabled={isUpdate}
                        onPress={() => {
                            setInputVar('max')
                            setIsTyping(true)
                        }}
                    >
                        <Text style={[styles.text_name]}>최고 속도</Text>
                        <Text style={[styles.text_val]}>{fanData ? fanData.speed.maximum : '-'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.box, styles.box_setting]}>
                    <Text style={[styles.text_subtitle]}>현재 팬 속도</Text>
                    <View style={[styles.list_horizon]}>
                        {fanData.rpm &&
                            fanData.rpm.map((item, idx) => (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }} key={idx}>
                                    <Text style={[styles.infoViewText, { marginBottom: 5, color: 'white' }]}>{idx + 1}번 팬</Text>
                                    {animationRotate[idx] && (
                                        <Animated.View style={{ transform: [{ rotate: animationRotate[idx] }] }}>
                                            <MaterialCommunityIcons
                                                name='fan'
                                                size={30}
                                                color={fanAniWorks[idx] && '#5d66a4'}
                                            ></MaterialCommunityIcons>
                                        </Animated.View>
                                    )}
                                    {/* Fan RPM 480이면 멈춰있는상태같음 */}
                                    <Text style={[styles.infoViewText, { marginTop: 5 }, fanAniWorks[idx] && { color: '#5d66a4' }]}>
                                        {item > 480 ? item : '-'}
                                    </Text>
                                </View>
                            ))}
                    </View>
                </View>

                <View style={[styles.box, styles.box_setting]}>
                    <View style={[styles.list, styles.list_end]}>
                        <Text style={[styles.text_name]}>팬 속도 자동 조절</Text>
                        <View style={[styles.text_val]}>
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
                                        // .then(() => console.log('FAN: 펜 설정 완료'))
                                        // .catch((err) => console.error(err))
                                }}
                                value={isAuto}
                            ></Switch>
                        </View>
                    </View>
                </View>

                <Dialog.Container visible={isTyping} contentStyle={styles.dialog}>
                    <Dialog.Title>{inputVar === 'min' ? '최소 속도' : '최고 속도'}</Dialog.Title>
                    <Dialog.Description>속도 값을 입력해주세요.</Dialog.Description>
                    <Dialog.Input keyboardType='number-pad' inputMode='numeric' onChangeText={(val) => (inputVal.current = val)}></Dialog.Input>
                    <Dialog.Button label='취소' color='black' onPress={() => setIsTyping(false)}></Dialog.Button>
                    <Dialog.Button label='확인' color='black' onPress={() => validCheck()}></Dialog.Button>
                </Dialog.Container>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SettingFan
