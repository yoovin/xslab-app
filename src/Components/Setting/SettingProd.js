import { View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from '../Styles'
import TopNavi from './TopNavi'

const SettingProd = ({ navigation }) => {
    const [name, setName] = useState('-')
    const [version, setVersion] = useState('-')
    const [serial, setSerial] = useState('-')
    const [info, setInfo] = useState('-')
    const [location, setLocation] = useState('-')
    const [email, setEmail] = useState('-')
    const [hostname, setHostname] = useState('-')
    const [dhcp, setDhcp] = useState(false)
    const [address, setAddress] = useState('-')
    const [netmask, setNetmask] = useState('-')
    const [gateway, setGateway] = useState('-')
    const [dns, setDns] = useState('-')
    const [isFolder, setIsFolder] = useState(true)

    useEffect(() => {
        axios
            .get('/api/product')
            .then(({ data }) => {
                setName(data.productName)
                setVersion(data.version)
                setSerial(data.serial)
                setInfo(data.information)
                setLocation(data.location)
                setEmail(data.email)
                setHostname(data.hostname)
                setDhcp(data.network.dchp)
                setAddress(data.network.address)
                setNetmask(data.network.netmask)
                setGateway(data.network.gateway)
                setDns(data.network.dns)
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <>
        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: '#363D58', alignItems: 'center'}}>
            <TopNavi navigation={navigation} title="제품 정보"/>
            <ScrollView style={{ flex: 1 }}>
                <Image
                    source={require('../../../assets/image/product.png')}
                    style={{
                        flex: 1,
                        resizeMode: 'contain',
                        width: '70%',
                        marginTop: '10%',
                    }}
                />

                <View style={{}}>
                    <View style={[styles.settingList, { width: '100%' }]}>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        styles.textBase
                                        
                                    ]}
                                >
                                    제품명
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {name}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        { fontSize: 15, marginLeft: '5%' },
                                    ]}
                                >
                                    Version
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {version}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        { fontSize: 15, marginLeft: '5%' },
                                    ]}
                                >
                                    Serial
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {serial}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        { fontSize: 15, marginLeft: '5%' },
                                    ]}
                                >
                                    information
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {info}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        { fontSize: 15, marginLeft: '5%' },
                                    ]}
                                >
                                    Location
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {location}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        { fontSize: 15, marginLeft: '5%' },
                                    ]}
                                >
                                    Email
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {email}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.settingMenu}>
                            <View style={[styles.settingInnerMenu]}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        { fontSize: 15, marginLeft: '5%' },
                                    ]}
                                >
                                    Hostname
                                </Text>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginRight: '5%',
                                    }}
                                >
                                    {hostname}
                                </Text>
                            </View>
                        </View>
                        {isFolder && (
                            <TouchableOpacity
                                style={styles.settingMenu}
                                onPress={() => setIsFolder(false)}
                            >
                                <View
                                    style={[
                                        styles.settingInnerMenu,
                                        { borderBottomWidth: 0 },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.settingContentText,
                                            { fontSize: 15, marginLeft: '5%' },
                                        ]}
                                    >
                                        Network
                                    </Text>
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
                                        {dhcp && (
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    marginRight: '5%',
                                                }}
                                            >
                                                true
                                            </Text>
                                        )}
                                        {!dhcp && (
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    marginRight: '5%',
                                                }}
                                            >
                                                false
                                            </Text>
                                        )}
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
                                            {address}
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
                                            {gateway}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.settingMenu}>
                                    <View
                                        style={[
                                            styles.settingInnerMenu,
                                            { borderBottomWidth: 0 },
                                        ]}
                                    >
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
                                            {dns}
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
        </>
    )
}

export default SettingProd
