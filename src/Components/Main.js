import { View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions, Settings} from 'react-native'
import React, { useState, useEffect } from 'react'
import Swiper from 'react-native-swiper'

import styles from './Styles'
import BottomNavi from './BottomNavi'
import Home from './Home';
import Setting from './Setting'

import { swiperScrolling} from './recoil/atom'
import { useRecoilValue } from 'recoil'

const Main = ({navigation}) => {
    const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
    const scrolling = useRecoilValue(swiperScrolling)
    return (
        <View style={{flex:1}}>
            <Swiper containerStyle={{flex:10}} loop={false} showsPagination={false}
            index={currentScreenIndex}
            scrollEnabled={scrolling}
            // bounces={true}
            onIndexChanged={(idx) => setCurrentScreenIndex(idx)}>
                <Home/>
                <Setting navigation = {navigation}/>
            </Swiper>
            <BottomNavi currentIdx={currentScreenIndex}/>
        </View>
    )
}

export default Main