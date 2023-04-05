import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import * as Keychain from "react-native-keychain";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [serverAddr, setServerAddr] = useState("");

    // login with states.
    const tryLogin = () => {
        return username == "1" && password == "1" && serverAddr == "1";
    };

    const OnLogin = async () => {
        console.log(
            ` username: ${username}\n password: ${password}\n serverAddr: ${serverAddr}\n`
        );
        if (tryLogin()) {
            // login success.
            Alert.alert("로그인 성공", "입력하신 정보는 자동으로 저장됩니다.", [
                {
                    text: "확인",
                },
            ]);
            const userInfo = { username: username, serverAddr: serverAddr };
            await Keychain.setGenericPassword(
                JSON.stringify(userInfo),
                password
            ).then(async () => {
                try {
                    // retrieve credentials.
                    await Keychain.getGenericPassword(); // get login info.
                } catch (error) {
                    console.log("Keychain couldn't be accessed!", error);
                }
            });
            navigation.navigate("Main");
        } else {
            // login fail.
            Alert.alert(
                "로그인 실패",
                "입력하신 서버 주소에 로그인 할 수 없습니다.",
                [
                    {
                        text: "확인",
                        style: "cancel",
                    },
                ]
            );
        }
    };

    // check if key exists.
    const keyCheck = async () => {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            const userInfo = JSON.parse(credentials.username);
            setUsername(userInfo.username);
            setPassword(credentials.password);
            setServerAddr(userInfo.serverAddr);
            // navigation.navigate("Main");
        }
    };

    // on mount.
    useEffect(() => {
        keyCheck();
    }, []);

    const deleteKey = async () => {
        console.log(await Keychain.resetGenericPassword());
    };

    // TouchableOpacity of Image is temporal for purpose of debug
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.loginScreen}
            onPress={Keyboard.dismiss}
        >
            <View style={styles.loginTitle}>
                <TouchableOpacity onPress={deleteKey}>
                    <Image
                        source={require("../../assets/image/logo.png")}
                        style={styles.TitleIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.TitleText}>XMAS CORE</Text>
            </View>
            <View style={styles.loginInput}>
                <TextInput
                    style={styles.InputBox}
                    placeholder="아이디"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.InputBox}
                    placeholder="패스워드"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.InputBox}
                    placeholder="서버 주소"
                    value={serverAddr}
                    onChangeText={(text) => setServerAddr(text)}
                />
                <TouchableOpacity
                    style={[styles.InputBox, styles.InputButton]}
                    onPress={OnLogin}
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
