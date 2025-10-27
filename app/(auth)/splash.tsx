import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import splashLogo from '../../assets/images/react-logo.png';

export default function SplashScreen() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(tabs)/home')
        }, 3000)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <View style={styles.container}>
            <Image source={splashLogo} style={styles.imgCenter} />
            <Text style={styles.textSplash}>Ghibli App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#fff"
    },
    textSplash: {
        fontSize: 20,
        textAlign: "center"
    },
    imgCenter: {
        alignSelf: "center",
        width: 150,
        height: 150
    }
})