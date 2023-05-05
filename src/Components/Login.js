import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import React, { useState } from "react"
import styles from "./Styles"
import axios from "axios"

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("vraptorbmc") // 테스트용
    const [password, setPassword] = useState("1234") // 테스트용
    const [serverAddr, setServerAddr] = useState("http://192.168.0.124") // temporary variable
    const [disable, setDisable] = useState(false);

    const onLogin = async () => {
        setDisable(true);
        axios.post(`${serverAddr}/api/login`, {
            username: username,
            password: password,
        })
        .then(({data}) => {
            // 로그인 성공 시 엑세스토큰은 헤더로 저장하고 리프레시토큰은 async로 저장합니다.
            // 서버 주소도 axios에 defaults 값으로 넣어줍니다.
            console.log(data)
            axios.defaults.headers.common["Authorization"]  = `Bearer ${data.access_token}`
            axios.defaults.baseURL = serverAddr
            navigation.reset({routes: [{name: 'Main'}]})
        })
        .catch(err => {
            // 로그인 실패
            Alert.alert(
                "로그인 실패",
                "입력하신 서버 주소에 로그인 할 수 없습니다.",
                [
                    {
                        text: "확인",
                        style: "cancel",
                    },
                ]
            )

            setDisable(false);
        })
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.loginScreen}
            // onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.loginTitle}>
                <Image
                    source={require("../../assets/image/xmascore.png")}
                    style={styles.TitleIcon}
                />
                <Text style={styles.TitleText}>XMAS CORE</Text>
            </View>
            <View style={styles.loginInput}>
                <TextInput
                    style={styles.InputBox}
                    placeholder="아이디"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    autoCapitalize={false}
                />
                <TextInput
                    style={styles.InputBox}
                    placeholder="패스워드"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize={false}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.InputBox}
                    placeholder="서버 주소"
                    value={serverAddr}
                    onChangeText={(text) => setServerAddr(text)}
                />
                <TouchableOpacity
                    style={[styles.InputBox, styles.InputButton]}
                    onPress={() => onLogin()}
                    disabled={disable}
                >
                    <Text style={{ color: "white" }}>로그인</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={require("../../assets/image/corp.png")}
                style={styles.corpName}
            />
        </KeyboardAwareScrollView>
    );
};

export default Login;
