import { TouchableOpacity, View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './Styles'

const SettingMenu = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#363D58',
            }}
        >
            <View style={{ width: '80%', alignItems: 'flex-start' }}>
                <Text style={styles.settingTitleText}>설정</Text>
            </View>
            <View style={styles.settingList}>
                <TouchableOpacity
                    style={styles.settingMenu}
                    onPress={() => navigation.navigate('Setting')}
                >
                    <Image
                        source={require('../../assets/image/icon_none.png')}
                        style={{ marginLeft: '3%', marginBottom: '5%' }}
                    />
                    <View style={styles.settingInnerMenu}>
                        <Text
                            style={[
                                styles.settingContentText,
                                { fontSize: 15 },
                            ]}
                        >
                            개인 정보
                        </Text>
                        <Icon
                            name='chevron-forward-outline'
                            style={{ color: '#92A2D9', fontSize: 20 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.settingMenu}
                    onPress={() => navigation.navigate('SettingFan')}
                >
                    <Image
                        source={require('../../assets/image/icon_fan.png')}
                        style={{ marginLeft: '3%', marginBottom: '5%' }}
                    />
                    <View style={styles.settingInnerMenu}>
                        <Text
                            style={[
                                styles.settingContentText,
                                { fontSize: 15 },
                            ]}
                        >
                            팬 속도
                        </Text>
                        <Icon
                            name='chevron-forward-outline'
                            style={{ color: '#92A2D9', fontSize: 20 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.settingMenu}
                    onPress={() => navigation.navigate('SettingTemp')}
                >
                    <Image
                        source={require('../../assets/image/icon_temp.png')}
                        style={{ marginLeft: '3%', marginBottom: '5%' }}
                    />
                    <View style={styles.settingInnerMenu}>
                        <Text
                            style={[
                                styles.settingContentText,
                                { fontSize: 15 },
                            ]}
                        >
                            온도
                        </Text>
                        <Icon
                            name='chevron-forward-outline'
                            style={{ color: '#92A2D9', fontSize: 20 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.settingMenu}
                    onPress={() => navigation.navigate('SettingProd')}
                >
                    <Image
                        source={require('../../assets/image/icon_prod.png')}
                        style={{ marginLeft: '3%', marginBottom: '5%' }}
                    />
                    <View
                        style={[
                            styles.settingInnerMenu,
                            { borderBottomWidth: 0 },
                        ]}
                    >
                        <Text
                            style={[
                                styles.settingContentText,
                                { fontSize: 15 },
                            ]}
                        >
                            제품 정보
                        </Text>
                        <Icon
                            name='chevron-forward-outline'
                            style={{ color: '#92A2D9', fontSize: 20 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SettingMenu
