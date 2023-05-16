import { TouchableOpacity, View, Text, Image, SafeAreaView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from '../Styles'

const SettingMenu = ({ navigation }) => {
    return (
        <SafeAreaView style={[styles.screen, styles.screen_setting]}>
            <View style={{ width: '80%', alignItems: 'flex-start' }}>
                <Text style={[styles.text_title]}>설정</Text>
            </View>
            <View style={[styles.box, styles.box_setting]}>
                <TouchableOpacity style={[styles.iconList]} onPress={() => {}}>
                    <Image source={require('../../../assets/image/icon_info.png')} style={[styles.iconList_icon]} />
                    <View style={[styles.list, styles.iconList_content]}>
                        <Text style={[styles.text_name]}>개인 정보</Text>
                        <Icon name='chevron-forward-outline' style={[styles.icon_arrow]} />
                    </View>
                </TouchableOpacity>
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
            <ImageBackground source={require('../../../assets/image/vora.png')} style={styles.voraBackground} />
        </SafeAreaView>
    )
}

export default SettingMenu
