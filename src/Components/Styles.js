import { StyleSheet } from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize"

// const mainColor = ''

export default StyleSheet.create({
    /*
    ===== NAVI COMPONENT =====
    */

    viewContainer: {
        flex:1.5
    },
    contentContainer: {
        flex: 1,
        flexDirection:'row'
    },
    leftView:{
        flex:1
    },
    titleView: {
        flex: 4.5,
        alignItems:'center',
    },
    titleText: {
        // fontFamily: 'BMJUA',
        fontSize: RFPercentage(3),
        color: 'white',
    },
    rightView: {
        flex: 1
    },
    navi: {
        width: '100%',
        height: '10%',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },


    /*
    ===== LOGIN COMPONENT =====
    */


    /*
    ===== MAIN COMPONENT =====
    */

    infoContainer: {
        flex:3, 
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-around',
        alignItems:'center',
        paddingHorizontal:'5%',
        backgroundColor: '#F6F6F9',
        
    },

    infoView: {
        width: '43%',
        height:'40%',
        margin: '3%',
        padding: '5%',
        borderRadius:10,
        backgroundColor:"#ffffff"
    },

    infoViewText: {
        marginVertical:'3%',
        // fontWeight:'bold',
        fontSize:RFPercentage(1.7),
    },

    nodeView: {
        width: '93%',
        height:'85%',
        margin: '3%',
        padding: '5%',
        borderRadius:10,
        backgroundColor:"#ffffff"
    }

});