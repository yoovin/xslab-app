import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./Styles";

const Login = () => {
    const userList = [
        {
            id: "123",
            password: "123",
            server: "123",
        },
    ];

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [server, setServer] = useState("");

    const OnLogin = () => {
        if (id == "123" && password == "123") {
            // 기기내 저장된 유저의 서버 리스트
        } else {
            Alert.alert(
                "기기내 유저 정보가 없습니다.",
                "서버주소 입력으로 유저 정보를 저장할 수 있습니다.",
                [
                    { text: "이동", onPress: () => {}, style: "cancel" },
                    { text: "취소", onPress: () => {}, style: "default" },
                ],
                { cancelable: true, onDismiss: () => {} }
            );
        }
    };

    return (
        <View style={styles.loginScreen}>
            <View style={styles.loginTitle}>
                <Image
                    source={require("../../assets/image/logo.png")}
                    style={styles.TitleIcon}
                />
                <Text style={styles.TitleText}>XMAS CORE</Text>
            </View>
            <View style={styles.loginInput}>
                {/* <TextInput
                    style={[styles.InputBox, { backgroundColor: "#F3F3F3" }]}
                    placeholder="아이디"
                    onChangeText={(text) => setId(text)}
                />
                <TextInput
                    style={[styles.InputBox, { backgroundColor: "#F3F3F3" }]}
                    placeholder="패스워드"
                    onChangeText={(text) => setPassword(text)}
                /> */}
                <TextInput
                    style={[styles.InputBox, { backgroundColor: "#F3F3F3" }]}
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
    );
};

export default Login;
