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
    const [disable, setDisable] = useState(false);

    // login with states.
    const tryLogin = async () => {
        // return username == "1" && password == "1" && serverAddr == "1";
        try {
            const response = await fetch("http://192.168.0.124/api/login", {
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const OnLogin = async () => {
        setDisable(true);
        console.log(
            ` username: ${username}\n password: ${password}\n serverAddr: ${serverAddr}\n`
        );
        if (await tryLogin()) {
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
                // retrieve credentials.
                try {
                    // get login info.
                    await Keychain.getGenericPassword();
                } catch (error) {
                    console.log("Keychain couldn't be accessed!", error);
                }
            });
            // navigation.navigate("Main");
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
        setDisable(false);
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
