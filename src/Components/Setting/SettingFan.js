import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dialog from 'react-native-dialog'

import styles from '../Styles'

const SettingFan = ({ navigation }) => {
    const [minimum, setMinimum] = useState(0)
    const [maximum, setMaximum] = useState(0)
    const [current, setCurrent] = useState(0)
    const [fahrenheit, setFahrenheit] = useState(false)
    const [tempValue, setTempValue] = useState(0)
    const [isAuto, setIsAuto] = useState(false)

    const [fanData, setFanData] = useState({})

    const [isLoad, setIsLoad] = useState(false)

    const [isConfiguring, setIsConfiguring] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const isInterval = useRef(true)

    useEffect(() => {
        axios
            .get('/api/fan')
            .then(({ data }) => {
                setMinimum(data.speed.minimum)
                setMaximum(data.speed.maximum)
                setIsAuto(data.auto)
                setFahrenheit(data.temperature.fahrenheit)
                setTempValue(data.temperature.value)
                setCurrent(data.speed.current)
            })
            .then(() => setIsLoad(true))
            .then(console.log('FAN: 설정값 불러오기'))

        const intervalGet = setInterval(() => {
            if (isInterval.current) {
                axios
                    .get('/api/fan')
                    .then(({ data }) => {
                        setCurrent(data.speed.current)
                    })
                    .then(console.log('FAN: 팬 속도 수정'))
            }
        }, 3000)

        return () => {
            clearInterval(intervalGet)
            console.log('FAN: 팬 정보 불러오기 종료')
        }
    }, [])

    useEffect(() => {
        isConfiguring ? (isInterval.current = false) : (isInterval.current = true)
    }, [isConfiguring])

    const settingPrompt = (settingVar, settingFun) => {
        console.error(settingVar.toString())
        Alert.prompt(
            '팬 속도',
            '',
            [
                {
                    text: '취소',
                    onPress: () => null,
                },
                {
                    text: '완료',
                    onPress: (num) => {
                        if (num >= 0 && num <= 100) {
                            settingFun(Number(num))
                        } else {
                            Alert.alert('속도값은 0~100 사이여야 합니다.')
                        }
                    },
                },
            ],
            'plain-text',
            settingVar.toString(),
            'number-pad'
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#363D58' }}>
            <KeyboardAwareScrollView contentContainerStyle={{ backgroundColor: '#2A2F42', alignItems: 'center', flexGrow: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#363D58', width: '100%', paddingTop: '5%', paddingBottom: '20%' }}>
                    <View style={{ flex: 1, width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                left: 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                            }}
                            onPress={() => navigation.pop()}
                        >
                            <Icon name='chevron-back-outline' style={{ color: '#92A2D9', fontSize: 20 }} />
                            <Text style={{ color: '#92A2D9' }}>설정</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, color: 'white' }}>팬 속도</Text>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                            }}
                            onPress={() => (isConfiguring ? setIsConfiguring(false) : setIsConfiguring(true))}
                        >
                            <Text style={{ color: '#92A2D9' }}>수정</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 7, marginTop: '5%' }}>
                        <View style={[styles.settingList, { width: '100%' }]}>
                            <TouchableOpacity
                                style={styles.settingMenu}
                                disabled={!isConfiguring}
                                onPress={() => settingPrompt(minimum, setMinimum())}
                            >
                                <View style={styles.settingInnerMenu}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>최소 속도</Text>
                                    <Text style={{ color: 'white', marginRight: '5%' }}>{isLoad ? minimum : '-'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.settingMenu} disabled={!isConfiguring}>
                                <View style={styles.settingInnerMenu}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>최고 속도</Text>
                                    <Text style={{ color: 'white', marginRight: '5%' }}>{isLoad ? maximum : '-'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.settingMenu} disabled={!isConfiguring}>
                                <View style={styles.settingInnerMenu}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>현재 속도</Text>
                                    <Text style={{ color: 'white', marginRight: '5%' }}>{isLoad ? current : '-'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.settingMenu}
                                disabled={!isConfiguring}
                                onPress={() => {
                                    isAuto ? setIsAuto(false) : setIsAuto(true)
                                }}
                            >
                                <View style={[styles.settingInnerMenu, { borderBottomWidth: 0 }]}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>자동 조절</Text>
                                    <Text
                                        style={{
                                            color: 'white',
                                            marginRight: '5%',
                                        }}
                                    >
                                        {isLoad ? (isAuto ? '켜기' : '끄기') : '-'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {isConfiguring && (
                                <TouchableOpacity style={styles.settingMenu} onPress={() => setIsSaving(true)}>
                                    <View style={[styles.settingInnerMenu, { borderBottomWidth: 0, borderTopWidth: 2, justifyContent: 'center' }]}>
                                        <Text
                                            style={{
                                                color: 'white',
                                                marginRight: '5%',
                                            }}
                                        >
                                            저장
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>

                <Dialog.Container visible={isSaving} contentStyle={styles.dialog}>
                    <Dialog.Description>변경 내용을 저장하시겠습니까?</Dialog.Description>
                    <Dialog.Button
                        label='예'
                        color='black'
                        onPress={() => {
                            axios
                                .put('/api/fan', {
                                    auto: isAuto,
                                    speed: {
                                        minimum: minimum,
                                        maximum: maximum,
                                        current: current,
                                    },
                                    temperature: {
                                        fahrenheit: fahrenheit,
                                        value: tempValue,
                                    },
                                })
                                .then(() => {
                                    setIsConfiguring(false)
                                    setIsSaving(false)
                                })
                                .then(console.log('FAN: 펜 설정 완료'))
                                .catch((err) => console.error(err))
                        }}
                    ></Dialog.Button>
                    <Dialog.Button label='아니오' color='black' onPress={() => setIsSaving(false)}></Dialog.Button>
                </Dialog.Container>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SettingFan
