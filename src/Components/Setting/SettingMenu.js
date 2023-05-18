import { TouchableOpacity, View, Text, Image, SafeAreaView, ImageBackground } from 'react-native'
import { useState } from 'react'
import Dialog from "react-native-dialog"
import Icon from 'react-native-vector-icons/Ionicons'

import styles from '../Styles'
import { RFPercentage } from 'react-native-responsive-fontsize'

const SettingMenu = ({ navigation }) => {
    const [isLogoutButtonPress, setIsLogoutButtonPress] = useState(false)

    return (
        <SafeAreaView style={[styles.screen, styles.screen_setting]}>
            <View style={{ width: '80%', alignItems: 'flex-start' }}>
                <Text style={[styles.text_title]}>설정</Text>
            </View>
            <View style={[styles.box, styles.box_setting]}>
                <TouchableOpacity style={[styles.iconList]} onPress={() => navigation.navigate('SettingFan')}>
                    <Image source={require('../../../assets/image/icon_fan.png')} style={[styles.iconList_icon]} />
                    <View style={[styles.list, styles.iconList_content]}>
                        <Text style={[styles.text_name]}>팬 속도</Text>
                        <Icon name='chevron-forward-outline' style={[styles.icon_arrow]} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconList]} onPress={() => navigation.navigate('SettingTemp')}>
                    <Image source={require('../../../assets/image/icon_temp.png')} style={[styles.iconList_icon]} />
                    <View style={[styles.list, styles.iconList_content]}>
                        <Text style={[styles.text_name]}>온도</Text>
                        <Icon name='chevron-forward-outline' style={[styles.icon_arrow]} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconList]} onPress={() => navigation.navigate('SettingProd')}>
                    <Image source={require('../../../assets/image/icon_prod.png')} style={[styles.iconList_icon]} />
                    <View style={[styles.list, styles.list_end, styles.iconList_content]}>
                        <Text style={[styles.text_name]}>제품 정보</Text>
                        <Icon name='chevron-forward-outline' style={[styles.icon_arrow]} />
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.box, styles.box_setting]} onPress={() => setIsLogoutButtonPress(true)}>
                <Text style={{ fontSize: RFPercentage(2), color: 'red', paddingVertical: '5%' }}>로그아웃</Text>
            </TouchableOpacity>
            <ImageBackground source={require('../../../assets/image/vora.png')} style={styles.voraBackground} />

            <Dialog.Container visible={isLogoutButtonPress} contentStyle={styles.dialog}>
                <Dialog.Description>로그아웃 하시겠습니까?</Dialog.Description>
                <Dialog.Button
                    label='예'
                    color='black'
                    onPress={() => {
                        setIsLogoutButtonPress(false)
                        navigation.reset({ routes: [{ name: 'Logout' }] })
                    }}
                ></Dialog.Button>
                <Dialog.Button label='아니오' color='black' onPress={() => setIsLogoutButtonPress(false)}></Dialog.Button>
            </Dialog.Container>
        </SafeAreaView>
    )
}

export default SettingMenu
