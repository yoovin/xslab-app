import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Styles from '../Styles'

const TopNavi = ({navigation, title}) => {
    return (
        <View style={{
                // flex: 0.1,
                width: '100%',
                justifyContent: 'center',
                paddingHorizontal: '3%',
            }}
        >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity 
                style={{position:'absolute', left: '0%', flexDirection: 'row', alignItems:'center'}}
                onPress={() => {navigation.pop()}}>
                    {/* 뒤로가기 버튼 */}
                    <Icon
                        name='chevron-back-outline'
                        size={20}
                        style={{ color: '#92A2D9'}}
                    />
                    <Text style={{ color: '#92A2D9' }}>설정</Text>
                </TouchableOpacity>
                <Text style={[Styles.textLg, {color: 'white', justifyContent: 'center'}]}>
                    {/* 타이틀 */}
                    {title}
                </Text>
            </View>
        </View> 
    )
}

export default TopNavi