import { View, Text, SafeAreaView, ImageBackground, useWindowDimensions, TouchableOpacity, TextInput, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import Dialog from "react-native-dialog"
import { RadialSlider } from 'react-native-radial-slider'

import styles from '../Styles'
import { swiperScrolling, BmcTemperature } from '../recoil/atom'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const Setting = ({navigation}) => {
    const queryClient = useQueryClient()
    const [isLogoutButtonPress, setIsLogoutButtonPress] = useState(false)
    const [currentGoalTemp, setCurrentGoalTemp] = useState(0)
    const [currentWarningTemp, setCurrentWarningTemp] = useState(0)
    const setScrolling = useSetRecoilState(swiperScrolling)
    const bmcTemperature = useRecoilValue(BmcTemperature)

    const getAlertTemp = async () => {
        const res = await axios.get('/api/temperture/alert')
        console.log('경고온도불러옴')
        return res.data
    }

    const alertTemp = useQuery('alertTemp', getAlertTemp)

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
        // setInterval(() => {
        //     setCurrentGoalTemp(n => n+1)
        // }, 1000)
    }, [])

    return (
        <SafeAreaView style={{flex: 1, alignItems:'center', backgroundColor: '#363D58'}}>
            <View style={{width: '80%', alignItems:'flex-start'}}>
                <Text style={styles.settingTitleText}>설정</Text>
            </View>
            <View style={styles.settingView}>
                <View style={{flex:1}}>
                    <Text style={styles.settingViewTitleText}>서버 목표 온도</Text>
                    <View style={{marginVertical: 30}}>
                        <Text style={styles.settingContentText}>현재 온도: {bmcTemperature}°C</Text>
                        <Text style={styles.settingContentText}>목표 온도: {currentGoalTemp}°C</Text>
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
                        setScrolling(false)
                        setCurrentGoalTemp(num)
                    }}
                    onComplete={() => {
                        setScrolling(true)
                    }}
                    onPress={(num) => {
                        // setScrolling(true)
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
                        <Text style={styles.tempSliderGuideText}>직접 입력하려면 클릭하세요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton}
                    activeOpacity={0.8}>
                        <Text style={{color:'white'}}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.settingView}>
                <View style={{flex:1, marginVertical: 10, alignItems:'center'}}>
                    <Text style={styles.settingViewTitleText}>온도 경고 표시 기준</Text>
                    <View style={{marginVertical: 20, alignItems:'center'}}>
                        <Text style={styles.settingContentText}>현재 경고 표시 기준</Text>
                        <Text style={styles.settingContentText}>{currentWarningTemp}°C</Text>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems:'center'}}>
                    <RadialSlider value={currentWarningTemp} min={0} max={100}
                    radius={70}
                    centerContentStyle={styles.tempSliderCenter}
                    valueStyle={styles.tempSliderValueText}
                    unitStyle={styles.tempSliderValueText}
                    thumbRadius={5}
                    thumbColor='black'
                    thumbBorderWidth={0}
                    linearGradient = {
                        currentWarningTemp > 50 
                        ? [ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#D63170' }] 
                        : [ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#9b3a71' }] 
                    }
                    onChange={(num) => {
                        setScrolling(false)
                        setCurrentWarningTemp(num)
                    }}
                    onComplete={() => {
                        setScrolling(true)
                    }}
                    onPress={(num) => {
                        // setScrolling(true)
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
                    activeOpacity={0.8}>
                        <Text style={{color:'white'}}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View> */}
                <TouchableOpacity style={styles.logoutButton}
                onPress={() => setIsLogoutButtonPress(true)}>
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            {/* </View> */}

            <ImageBackground source={require("../../assets/image/vora.png")} style={styles.voraBackground}/>

            <Dialog.Container visible={isLogoutButtonPress} contentStyle={styles.dialog}>
                <Dialog.Description>
                    로그아웃 하시겠습니까?
                </Dialog.Description>
                <Dialog.Button label="예" color="black" 
                onPress={async () => {
                    setIsLogoutButtonPress(false)
                    navigation.reset({routes: [{name: "Logout"}]})
                }}></Dialog.Button>
                <Dialog.Button label="아니오" color="black" onPress={()=>setIsLogoutButtonPress(false)}></Dialog.Button>
        </Dialog.Container>
        </SafeAreaView>
        
    )
}

export default Setting