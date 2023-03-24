import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

export const biometricAvailable = () => {
    return rnBiometrics
        .isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject;

            if (available && biometryType === BiometryTypes.TouchID) {
                return { result: true, type: biometryType };
            } else if (available && biometryType === BiometryTypes.FaceID) {
                return { result: true, type: biometryType };
            } else if (available && biometryType === BiometryTypes.Biometrics) {
                return { result: true, type: biometryType };
            } else {
                return { result: false, type: null };
            }
        })
        .catch(() => {
            return { result: false, type: null };
        });
};

export const createKey = () => {
    return rnBiometrics
        .createKeys()
        .then((resultObject) => {
            const { publicKey } = resultObject;

            // sendPublicKeyToServer(publicKey);
            return { result: true, key: publicKey };
        })
        .catch(() => {
            return { result: false, key: null };
        });
};

export const checkKey = () => {
    return rnBiometrics
        .biometricKeysExist()
        .then((resultObject) => {
            const { keysExist } = resultObject;

            if (keysExist) {
                return true;
            } else {
                return false;
            }
        })
        .catch(() => {
            return false;
        });
};

export const deleteKey = () => {
    return rnBiometrics
        .deleteKeys()
        .then((resultObject) => {
            const { keysDeleted } = resultObject;

            if (keysDeleted) {
                return true;
            } else {
                return false;
            }
        })
        .catch(() => {
            return false;
        });
};

export const bioLogin = (payload, msg) => {
    return rnBiometrics
        .createSignature({
            promptMessage: msg,
            payload: payload,
        })
        .then((resultObject) => {
            const { success, signature } = resultObject;

            if (success) {
                // verifySignatureWithServer(signature, payload);
                return { result: true, key: signature };
            } else {
                return { result: false, key: null };
            }
        })
        .catch((error) => {
            console.log(error);
            return { result: false, key: null, msg: error };
        });
};
