import { View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions, Settings} from 'react-native'
import React, { useState, useEffect } from 'react'
import Swiper from 'react-native-swiper'

import styles from './Styles'
import BottomNavi from './BottomNavi'
import Home from './Home';
import Setting from './Setting'

const Main = () => {
    const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
    return (
        <View style={{flex:1}}>
            <Swiper containerStyle={{flex:10}} loop={false} showsPagination={false}
            index={currentScreenIndex}
            onIndexChanged={(idx) => setCurrentScreenIndex(idx)}>
                <Home/>
                <Setting/>
            </Swiper>
            <BottomNavi currentIdx={currentScreenIndex} setCurrentScreenIndex={setCurrentScreenIndex}/>
        </View>
    )
}

export default Main