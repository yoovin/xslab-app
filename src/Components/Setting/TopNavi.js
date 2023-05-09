import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Styles from '../Styles'

const TopNavi = ({navigation, title}) => {
    return (
        <View style={{
                flex: 0.05,
                width: '100%',
                justifyContent: 'center',
                paddingHorizontal: '3%',
            }}
        >
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity 
                style={{flex:1, flexDirection: 'row', alignItems:'center'}}
                onPress={() => {navigation.pop()}}>
                    {/* 뒤로가기 버튼 */}
                    <Icon
                        name='chevron-back-outline'
                        size={20}
                        style={{ color: '#92A2D9'}}
                    />
                    <Text style={{ color: '#92A2D9' }}>설정</Text>
                </TouchableOpacity>
                <Text style={[Styles.textLg, {flex:1.5, color: 'white' }]}>
                    {/* 타이틀 */}
                    {title}
                </Text>
            </View>
        </View> 
    )
}

export default TopNavi