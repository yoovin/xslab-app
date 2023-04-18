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
import React, { useState } from "react";
import styles from "./Styles";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [serverAddr, setServerAddr] = useState("http://192.168.0.124"); // temporary variable
    const [disable, setDisable] = useState(false);

    const onLogin = async () => {
        setDisable(true);

        try {
            const response = await fetch(`${serverAddr}/api/login`, {
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
            const responseJSON = await response.json();
            if (responseJSON.detail) {
                throw new Error(responseJSON.detail);
            }
            navigation.navigate("Main");
        } catch (error) {
            // login fail
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
                    onPress={onLogin}
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
