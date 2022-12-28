import { View, Text, SafeAreaView, ImageBackground, useWindowDimensions, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Dialog from "react-native-dialog"
import { RadialSlider } from 'react-native-radial-slider';

import styles from './Styles'
import { swiperScrolling } from './recoil/atom';
import { useSetRecoilState } from 'recoil';


const Setting = ({navigation}) => {
    const [isLogoutButtonPress, setIsLogoutButtonPress] = useState(false)
    const [currentGoalTemp, setCurrentGoalTemp] = useState(0)
    const [currentWarningTemp, setCurrentWarningTemp] = useState(0)
    const setScrolling = useSetRecoilState(swiperScrolling)

    return (
        <SafeAreaView style={{flex: 1, alignItems:'center', backgroundColor: '#363D58'}}>
            <View style={{width: '80%', alignItems:'flex-start'}}>
                <Text style={styles.settingTitleText}>설정</Text>
            </View>
            <View style={styles.settingView}>
                <View style={{flex:1}}>
                    <Text style={styles.settingViewTitleText}>서버 목표 온도</Text>
                    <View style={{marginVertical: 30}}>
                        <Text style={styles.settingContentTitleText}>현재 온도: 00°C</Text>
                        <Text style={styles.settingContentTitleText}>목표 온도: {currentGoalTemp}°C</Text>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems:'center'}}>
                    <RadialSlider value={currentGoalTemp} min={0} max={100}
                    radius={70}
                    centerContentStyle={styles.tempSliderCenter}
                    valueStyle={styles.tempSliderValueText}
                    unitStyle={styles.tempSliderValueText}
                    thumbRadius={5}
                    thumbColor='black'
                    thumbBorderWidth={0}
                    linearGradient = {[ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#D63170' }] }
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
                    isHideLines={true}
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
            <View style={styles.settingView}>
                <View style={{flex:1}}>
                    <Text style={styles.settingViewTitleText}>온도 경고 표시 기준</Text>
                    <View style={{marginVertical: 30}}>
                        <Text style={styles.settingContentTitleText}>현재 경고 표시 기준</Text>
                        <Text style={styles.settingContentTitleText}>{currentWarningTemp}°C</Text>
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
                    linearGradient = {[ { offset: '0%', color:'#26B8C7' }, { offset: '100%', color: '#D63170' }] }
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
                onPress={() => {
                    setIsLogoutButtonPress(false)
                    navigation.reset({routes: [{name: "Logout"}]})
                }}></Dialog.Button>
                <Dialog.Button label="아니오" color="black" onPress={()=>setIsLogoutButtonPress(false)}></Dialog.Button>
        </Dialog.Container>
        </SafeAreaView>
        
    )
}

export default Setting