import {
    View,
    KeyboardAvoidingView,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./Styles";

const Login = () => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [server, setServer] = useState();

    const OnLogin = () => {
        console.log(` id: ${id}\n password: ${password}\n server: ${server}\n`);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.loginScreen}>
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
                        onPress={OnLogin}
                    >
                        <Text style={{ color: "white" }}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require("../../assets/image/corp.png")}
                    style={styles.corpName}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;
