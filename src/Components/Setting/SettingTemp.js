import { View, Text, SafeAreaView, ImageBackground, useWindowDimensions, TouchableOpacity, TextInput, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import Dialog from "react-native-dialog"
import { RadialSlider } from 'react-native-radial-slider'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import styles from '../Styles'
import { swiperScrolling, BmcTemperature, Fahrenheit } from '../recoil/atom'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import TopNavi from './TopNavi'


const SettingTemp = ({navigation}) => {
    const queryClient = useQueryClient()
    const [currentGoalTemp, setCurrentGoalTemp] = useState(0)
    const [alertTemp, setAlertTemp] = useState(0)
    
    // 섭씨, 화씨 여부 참일시 화씨
    const [isFahrenheit, setIsFahrenheit] = useRecoilState(Fahrenheit)
    const bmcTemperature = useRecoilValue(BmcTemperature)

    const getAlertTemp = async () => {
        const res = await axios.get('/api/temperature/alert')
        console.log('경고온도불러옴')
        return res.data
    }

    const curAlertTemp = useQuery('curAlertTemp', getAlertTemp)

    /**
     * 
     */
    const changeAlertTempMutation = useMutation(
        option => axios.put('/api/temperature/alert', option),
            {
                onSuccess: () => {
                    // 데이터 업데이트 성공 시 캐시를 갱신합니다.
                    queryClient.resetQueries("curAlertTemp")
                },
            }
        )

    /**
     * 섭씨, 화씨 값 변경 뮤테이션
     */
    const changeTempUnitMutation = useMutation(
        fahrenheit => axios.put('/api/temperature/unit', {fahrenheit}),
            {
                onSuccess: () => {
                    // 데이터 업데이트 성공 시 캐시를 갱신합니다.
                    queryClient.resetQueries("temperatures")
                    queryClient.resetQueries("curAlertTemp")
                },
            }
        )

    const currentGoalTempPrompt = () => {
        Alert.prompt("서버 목표 온도", "", [
            {
                text: '취소',
                onPress: () => null
            },
            {
                text: '완료',
                onPress: (num) => {
                    if(num >= 0 && num <= 100){
                        setCurrentGoalTemp(Number(num))
                    }else{
                        Alert.alert("온도값은 0~100 사이여야 합니다.")
                    }
                }
            }
        ],'plain-text', currentGoalTemp.toString(), 'number-pad')
    }

    useEffect(() => {
        if(curAlertTemp.data){
            setAlertTemp(curAlertTemp.data.value)
        }
    }, [])

    useEffect(() => {
    }, [curAlertTemp.data])

    return (
        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: '#363D58', alignItems: 'center'}}>
            <TopNavi navigation={navigation} title="온도"/>
            <View style={styles.settingView}>
                <View style={{flex:1}}>
                    <Text style={[styles.textBase, styles.fontBold, {color: 'white'}]}>서버 목표 온도</Text>
                    <View style={{marginVertical: 30}}>
                        <Text style={styles.settingContentText}>현재 온도: {bmcTemperature}{isFahrenheit ? '°F' : '°C'}</Text>
                        <Text style={styles.settingContentText}>목표 온도: {currentGoalTemp}{isFahrenheit ? '°F' : '°C'}</Text>
                        {/* <TextInput value={currentGoalTemp} onChange={setCurrentGoalTemp} placeholder=""/> */}
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems:'center'}}>
                    <RadialSlider value={currentGoalTemp} min={0} max={100}
                    radius={70}
                    sliderWidth={5}
                    style={{bottom: 10}}
                    centerContentStyle={styles.tempSliderCenter}
                    valueStyle={styles.tempSliderValueText}
                    unitStyle={styles.tempSliderValueText}
                    thumbRadius={5}
                    thumbColor='black'
                    thumbBorderWidth={0}
                    // lineColor={'black'}
                    linearGradient = {
                        currentGoalTemp > 50 
                        ? [ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#D63170' }] 
                        : [ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#9b3a71' }] 
                    }
                    onChange={(num) => {
                        
                        setCurrentGoalTemp(num)
                    }}
                    onComplete={() => {
                        
                    }}
                    onPress={(num) => {
                        console.log(num)
                        console.log("눌러짐")
                    }}

                    // buttonContainerStyle={{padding: 0, margin: 0, width: 0, height: 0}}
                    
                    // subTitle={'직접 입력하려면 온도를 더블 클릭하세요'}
                    // subTitleStyle={styles.tempSliderGuideText}
                    // sliderTrackColor={''}
                    isHideLines={true}
                    isHideSubtitle={true}
                    isHideTitle={true}
                    isHideButtons={true}
                    // isHideTailText={true}
                    unit="°"
                    />
                    <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={currentGoalTempPrompt}>
                        <Text style={[styles.tempSliderGuideText]}>직접 입력하려면 클릭하세요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton}
                    activeOpacity={0.8}>
                        <Text style={{color:'white'}}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.settingView}>
                <View style={{flex:1, marginVertical: 10, alignItems:'center'}}>
                    <Text style={[styles.textBase, {color: 'white'}]}>온도 경고 표시 기준</Text>
                    <View style={{marginVertical: 20, alignItems:'center'}}>
                        <Text style={styles.settingContentText}>현재 경고 표시 기준</Text>
                        <Text style={styles.settingContentText}>{curAlertTemp.data && curAlertTemp.data.value}{isFahrenheit ? '°F' : '°C'}</Text>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems:'center'}}>
                    <RadialSlider value={curAlertTemp.data && curAlertTemp.data.value} min={0} max={100}
                    radius={70}
                    centerContentStyle={styles.tempSliderCenter}
                    valueStyle={styles.tempSliderValueText}
                    unitStyle={styles.tempSliderValueText}
                    thumbRadius={5}
                    thumbColor='black'
                    thumbBorderWidth={0}
                    linearGradient = {
                        alertTemp > 50 
                        ? [ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#D63170' }] 
                        : [ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#9b3a71' }] 
                    }
                    onChange={(num) => {
                        setAlertTemp(num)
                    }}
                    onPress={(num) => {
                        console.log(num)
                        console.log("눌러짐")
                    }}
                    isHideLines={true}
                    isHideTitle={true}
                    isHideSubtitle={true}
                    isHideTailText={true}
                    unit="°"
                    sliderWidth={5}
                    />
                    <TouchableOpacity style={styles.confirmButton}
                    onPress={() => {
                        changeAlertTempMutation.mutate({fahrenheit: isFahrenheit, value: alertTemp})
                    }}
                    activeOpacity={0.8}>
                        <Text style={{color:'white'}}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* 로그아웃 삭제예정
            <View>
                <TouchableOpacity style={styles.logoutButton}
                onPress={() => setIsLogoutButtonPress(true)}>
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            </View>

            <Dialog.Container visible={isLogoutButtonPress} contentStyle={styles.dialog}>
                <Dialog.Description>
                    로그아웃 하시겠습니까?
                </Dialog.Description>
                <Dialog.Button label="예" color="black" 
                onPress={() => {
                    setIsLogoutButtonPress(false)
                    navigation.reset({routes: [{name: "Logout"}]})
                }}></Dialog.Button>
                <Dialog.Button label="아니오" color="black" onPress={()=>setIsLogoutButtonPress(false)}></Dialog.Button>
        </Dialog.Container> */}

                {/* 온도 단위 설정 */}
                <View style={{width: '90%', justifyContent: 'flex-start'}}>
                    <Text style={[{color: 'white'}]}>온도 단위</Text>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <View style={[styles.settingList, {width: '90%'}]}>
                        <TouchableOpacity
                            style={styles.settingMenu}
                            onPress={() => {
                                changeTempUnitMutation.mutate(false)
                            }}
                        >
                            <View
                                style={[
                                    styles.settingInnerMenu,
                                    {paddingHorizontal: '8%'},
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        styles.textBase,
                                    ]}
                                >
                                    섭씨(°C)
                                </Text>
                                {!isFahrenheit && <Icon name='checkmark-sharp' size={25} color='#92A2D9'/>}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.settingMenu}
                            onPress={() => {
                                changeTempUnitMutation.mutate(true)
                            }}
                        >
                            <View
                                style={[
                                    styles.settingInnerMenu,
                                    { borderBottomWidth: 0, paddingHorizontal: '8%'},
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        styles.textBase,
                                    ]}
                                >
                                    화씨(°F)
                                </Text>
                                {isFahrenheit && <Icon name='checkmark-sharp' size={25} color='#92A2D9'/>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

        </SafeAreaView>
        
    )
}

export default SettingTemp