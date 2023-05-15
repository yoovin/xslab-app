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
    const [productData, setProductData] = useState({})

    useEffect(() => {
        axios
            .get('/api/product')
            .then(({ data }) => {
                console.log(data)
                setProductData(data)
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <SafeAreaView style={[styles.screen, { paddingBottom: '15%' }]}>
            <TopNavi navigation={navigation} title='제품 정보' />
            <Image
                source={require('../../../assets/image/product.png')}
                style={{
                    resizeMode: 'contain',
                    width: '70%',
                    marginVertical: '10%',
                }}
            />
            <ScrollView style={[styles.scrollScreen]} contentContainerStyle={[styles.scrollScreenContent, { paddingBottom: '5%' }]}>
                <View style={[styles.list]}>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listContentName, styles.listContentTitle, styles.fontBold]}>제품명</Text>
                        <Text style={[styles.listConentVal]}>{productData.productName}</Text>
                    </View>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listContentName]}>Version</Text>
                        <Text style={[styles.listConentVal]}>{productData.version}</Text>
                    </View>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listContentName]}>Serial</Text>
                        <Text style={[styles.listConentVal]}>{productData.serial}</Text>
                    </View>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listContentName]}>Information</Text>
                        <Text style={[styles.listConentVal]}>{productData.information}</Text>
                    </View>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listContentName]}>Location</Text>
                        <Text style={[styles.listConentVal]}>{productData.location}</Text>
                    </View>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listContentName]}>Email</Text>
                        <Text style={[styles.listConentVal]}>{productData.email}</Text>
                    </View>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listContentName]}>Hostname</Text>
                        <Text style={[styles.listConentVal]}>{productData.hostname}</Text>
                    </View>
                    {isFolder && (
                        <TouchableOpacity style={[styles.listContent, styles.listContentEnd]} onPress={() => setIsFolder(false)}>
                            <Text style={[styles.listContentName]}>Network</Text>
                            <Icon
                                name='chevron-down-outline'
                                style={{
                                    color: '#92A2D9',
                                    fontSize: 20,
                                    position: 'absolute',
                                    left: '50%',
                                    bottom: 0,
                                }}
                            />
                        </TouchableOpacity>
                    )}
                    {!isFolder && (
                        <>
                            <View style={[styles.listContent]}>
                                <Text style={[styles.listContentName]}>DHCP</Text>
                                <Text style={[styles.listConentVal]}>{productData.network.dhcp ? 'true' : 'false'}</Text>
                            </View>
                            <View style={[styles.listContent]}>
                                <Text style={[styles.listContentName]}>Address</Text>
                                <Text style={[styles.listConentVal]}>{productData.network.address}</Text>
                            </View>
                            <View style={[styles.listContent]}>
                                <Text style={[styles.listContentName]}>Gateway</Text>
                                <Text style={[styles.listConentVal]}>{productData.network.gateway}</Text>
                            </View>
                            <View style={[styles.listContent]}>
                                <Text style={[styles.listContentName]}>DNS</Text>
                                <Text style={[styles.listConentVal]}>{productData.network.dns}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.listContent, styles.listContentEnd, { justifyContent: 'center' }]}
                                onPress={() => {
                                    setIsFolder(true)
                                }}
                            >
                                <Icon
                                    name='chevron-up-outline'
                                    style={{
                                        color: '#92A2D9',
                                        fontSize: 20,
                                    }}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingProd
