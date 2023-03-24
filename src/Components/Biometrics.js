import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
});

export const biometricAvailable = () => {
    return rnBiometrics
        .isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject;

            if (available && biometryType === BiometryTypes.TouchID) {
                // console.log("TouchID is supported");
                return { result: true, type: biometryType };
            } else if (available && biometryType === BiometryTypes.FaceID) {
                // console.log("FaceID is supported");
                return { result: true, type: biometryType };
            } else if (available && biometryType === BiometryTypes.Biometrics) {
                // console.log("Biometrics is supported");
                return { result: true, type: biometryType };
            } else {
                // console.log("Biometrics not supported");
                return { result: false, type: null };
            }
        })
        .catch(() => {
            return { result: false, type: null };
        });
};
