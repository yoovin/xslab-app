import { View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from '../Styles'
import TopNavi from './TopNavi'

/**
 * ===== Todo =====
 * 불러오는게 오래걸리는데 불러오는동안 로딩창 혹은 스켈레톤 띄우기
 * 반복되는 구문 줄이기
 */

const SettingProd = ({ navigation }) => {
    const [isFolder, setIsFolder] = useState(true)
    const [isLoad, setIsLoad] = useState(false)
    const [productData, setProductData] = useState({})

    useEffect(() => {
        axios
            .get('/api/product')
            .then(({ data }) => {
                setProductData(data)
            })
            .then(() => {
                setIsLoad(true)
            })
    }, [])

    return (
        <SafeAreaView style={[styles.screen, styles.screen_setting]}>
            {/* <View style={{ backgroundColor: '#000000', opacity: 0.3, position: 'absolute', width: '100%', height: '150%', zIndex: 2 }}></View> */}
            <TopNavi navigation={navigation} title='제품 정보' />
            <Image
                source={require('../../../assets/image/product.png')}
                style={{
                    resizeMode: 'contain',
                    width: '70%',
                    marginVertical: '10%',
                }}
            />
            <ScrollView style={[styles.scroll_style]} contentContainerStyle={[styles.scroll_content]}>
                <View style={[styles.box, styles.box_setting]}>
                    <View style={[styles.list]}>
                        <Text style={[styles.text_name, styles.fontBold]}>제품명</Text>
                        <Text style={[styles.text_val]}>{isLoad ? productData.productName : '-'}</Text>
                        {/* <Text style={[styles.text_val]}>{productData.productName}</Text> */}
                    </View>
                    <View style={[styles.list]}>
                        <Text style={[styles.text_name]}>Version</Text>
                        <Text style={[styles.text_val]}>{isLoad ? productData.version : '-'}</Text>
                    </View>
                    <View style={[styles.list]}>
                        <Text style={[styles.text_name]}>Serial</Text>
                        <Text style={[styles.text_val]}>{isLoad ? productData.serial : '-'}</Text>
                    </View>
                    <View style={[styles.list]}>
                        <Text style={[styles.text_name]}>Information</Text>
                        <Text style={[styles.text_val]}>{isLoad ? productData.information : '-'}</Text>
                    </View>
                    <View style={[styles.list]}>
                        <Text style={[styles.text_name]}>Location</Text>
                        <Text style={[styles.text_val]}>{isLoad ? productData.location : '-'}</Text>
                    </View>
                    <View style={[styles.list]}>
                        <Text style={[styles.text_name]}>Email</Text>
                        <Text style={[styles.text_val]}>{isLoad ? productData.email : '-'}</Text>
                    </View>
                    <View style={[styles.list]}>
                        <Text style={[styles.text_name]}>Hostname</Text>
                        <Text style={[styles.text_val]}>{isLoad ? productData.hostname : '-'}</Text>
                    </View>
                    {isFolder && (
                        <TouchableOpacity style={[styles.list, styles.list_end]} onPress={() => setIsFolder(false)}>
                            <Text style={[styles.text_name]}>Network</Text>
                            <Icon
                                name='chevron-down-outline'
                                style={[
                                    styles.icon_arrow,
                                    {
                                        position: 'absolute',
                                        left: '45%',
                                        bottom: 0,
                                    },
                                ]}
                            />
                        </TouchableOpacity>
                    )}
                    {!isFolder && (
                        <>
                            <View style={[styles.list]}>
                                <Text style={[styles.text_name]}>DHCP</Text>
                                <Text style={[styles.text_val]}>{isLoad ? (productData.network.dhcp ? 'true' : 'false') : '-'}</Text>
                            </View>
                            <View style={[styles.list]}>
                                <Text style={[styles.text_name]}>Address</Text>
                                <Text style={[styles.text_val]}>{isLoad ? productData.network.address : '-'}</Text>
                            </View>
                            <View style={[styles.list]}>
                                <Text style={[styles.text_name]}>Gateway</Text>
                                <Text style={[styles.text_val]}>{isLoad ? productData.network.gateway : '-'}</Text>
                            </View>
                            <View style={[styles.list]}>
                                <Text style={[styles.text_name]}>DNS</Text>
                                <Text style={[styles.text_val]}>{isLoad ? productData.network.dns : '-'}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.list, styles.list_end, { justifyContent: 'center' }]}
                                onPress={() => {
                                    setIsFolder(true)
                                }}
                            >
                                <Icon name='chevron-up-outline' style={[styles.icon_arrow]} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingProd