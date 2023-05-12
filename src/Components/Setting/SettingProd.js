import { View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from '../Styles'
import TopNavi from './TopNavi'
import { useQuery } from 'react-query'

/**
 * ===== Todo =====
 * 불러오는게 오래걸리는데 불러오는동안 로딩창 혹은 스켈레톤 띄우기
 * 반복되는 구문 줄이기
 * 데이터 캐싱
 */

const SettingProd = ({ navigation }) => {
    const [isFolder, setIsFolder] = useState(true)
    const [productData, setProductData] = useState(null)


    // const getProduct = async () => {
    //     const res = await axios.get('/api/product')
    //     console.log('product 불러옴')
    //     return res.data
    // }
    // const { data, isLoading, isError, error, refetch } = useQuery('nodes', getProduct)

    useEffect(() => {
        axios.get('/api/product')
            .then(({ data }) => {
                setProductData(data)
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: '#363D58', alignItems: 'center', paddingTop: '5%' }}>
            <TopNavi navigation={navigation} title='제품 정보' />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                <Image
                    source={require('../../../assets/image/product.png')}
                    style={{
                        flex: 1,
                        resizeMode: 'contain',
                        width: '70%',
                    }}
                />

                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={[styles.settingList, { width: '90%' }]}>
                        <View style={styles.settingMenu}>
                            <View style={[styles.settingInnerMenu]}>
                                <Text style={[styles.settingContentText, styles.textBase, styles.fontBold, { marginLeft: '5%', marginVertical: 0 }]}>
                                    제품명
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {productData ? productData.productName : <ActivityIndicator/>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text style={[styles.settingContentText, styles.textBase, { marginLeft: '5%' }]}>Version</Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {productData ? productData.version: <ActivityIndicator/>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text style={[styles.settingContentText, styles.textBase, { marginLeft: '5%' }]}>Serial</Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {productData ? productData.serial: <ActivityIndicator/>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text style={[styles.settingContentText, styles.textBase, { marginLeft: '5%' }]}>information</Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {productData ? productData.information: <ActivityIndicator/>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>Location</Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {productData ? productData.location: <ActivityIndicator/>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>Email</Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {productData ? productData.email: <ActivityIndicator/>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={[styles.settingInnerMenu]}>
                                <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>Hostname</Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {productData ? productData.hostname: <ActivityIndicator/>}
                                </Text>
                            </View>
                        </View>
                        {isFolder && (
                            <TouchableOpacity style={styles.settingMenu} onPress={() => setIsFolder(false)}>
                                <View style={[styles.settingInnerMenu, { borderBottomWidth: 0 }]}>
                                    <Text style={[styles.settingContentText, { fontSize: 15, marginLeft: '5%' }]}>Network</Text>
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
                                </View>
                            </TouchableOpacity>
                        )}
                        {!isFolder && (
                            <View>
                                <View style={styles.settingMenu}>
                                    <View style={[styles.settingInnerMenu]}>
                                        <Text
                                            style={[
                                                styles.settingContentText,
                                                {
                                                    fontSize: 15,
                                                    marginLeft: '5%',
                                                },
                                            ]}
                                        >
                                            DHCP
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                marginRight: '5%',
                                            }}
                                        >
                                            {productData ? productData.network.dhcp ? 'true' : 'false' : <ActivityIndicator/>}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.settingMenu}>
                                    <View style={[styles.settingInnerMenu]}>
                                        <Text
                                            style={[
                                                styles.settingContentText,
                                                {
                                                    fontSize: 15,
                                                    marginLeft: '5%',
                                                },
                                            ]}
                                        >
                                            Address
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                marginRight: '5%',
                                            }}
                                        >
                                            {productData ? productData.network.address: <ActivityIndicator/>}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.settingMenu}>
                                    <View style={[styles.settingInnerMenu]}>
                                        <Text
                                            style={[
                                                styles.settingContentText,
                                                {
                                                    fontSize: 15,
                                                    marginLeft: '5%',
                                                },
                                            ]}
                                        >
                                            Gateway
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                marginRight: '5%',
                                            }}
                                        >
                                            {productData ? productData.network.gateway: <ActivityIndicator/>}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.settingMenu}>
                                    <View style={[styles.settingInnerMenu, { borderBottomWidth: 0 }]}>
                                        <Text
                                            style={[
                                                styles.settingContentText,
                                                {
                                                    fontSize: 15,
                                                    marginLeft: '5%',
                                                },
                                            ]}
                                        >
                                            DNS
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                marginRight: '5%',
                                            }}
                                        >
                                            {productData ? productData.network.dns: <ActivityIndicator/>}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{ alignItems: 'center' }}
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
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingProd
