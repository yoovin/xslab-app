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
import {
    biometricAvailable,
    bioLogin,
} from "./Biometrics";

const Login = ({ navigation }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [server, setServer] = useState("");

    const onBioLogin = async () => {
        const isBioAvailable = await biometricAvailable();
        if (isBioAvailable?.result) {
            console.log(isBioAvailable);
        }
    };

    const OnLogin = () => {
        console.log(` id: ${id}\n password: ${password}\n server: ${server}\n`);
        if (id == "123" && password == "123" && server == "123") {
            navigation.navigate("Main");
        } else {
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

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.loginScreen}
            onPress={Keyboard.dismiss}
        >
            <View style={styles.loginTitle}>
                <Image
                    source={require("../../assets/image/logo.png")}
                    style={styles.TitleIcon}
                />
                <Text style={styles.TitleText}>XMAS CORE</Text>
            </View>
            <View style={styles.loginInput}>
                <TextInput
                    style={styles.InputBox}
                    placeholder="아이디"
                    onChangeText={(text) => setId(text)}
                />
                <TextInput
                    style={styles.InputBox}
                    placeholder="패스워드"
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.InputBox}
                    placeholder="서버 주소"
                    onChangeText={(text) => setServer(text)}
                />
                <TouchableOpacity
                    style={[styles.InputBox, styles.InputButton]}
                    // onPress={OnLogin}
                    onPress={onBioLogin}
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
