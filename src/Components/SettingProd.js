import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './Styles'

const SettingProd = () => {
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

    useEffect(async () => {
        await axios
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
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: '#363D58',
                    width: '100%',
                    paddingTop: '5%',
                    paddingBottom: '20%',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        width: '90%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 50,
                            height: 50,
                        }}
                    >
                        <Icon
                            name='chevron-back-outline'
                            style={{ color: '#92A2D9', fontSize: 20 }}
                        />
                        <Text style={{ color: '#92A2D9' }}>설정</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: 'white' }}>
                        제품 정보
                    </Text>
                </View>

                <Image
                    source={require('../../assets/image/product.png')}
                    style={{
                        flex: 1,
                        resizeMode: 'contain',
                        width: '70%',
                        marginTop: '10%',
                    }}
                />

                <View style={{ flex: 5, marginTop: '5%' }}>
                    <View style={[styles.settingList, { width: '100%' }]}>
                        <View style={styles.settingMenu}>
                            <View style={styles.settingInnerMenu}>
                                <Text
                                    style={[
                                        styles.settingContentText,
                                        { fontSize: 15, marginLeft: '5%' },
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
            </View>
        </ScrollView>
    )
}

export default SettingProd
