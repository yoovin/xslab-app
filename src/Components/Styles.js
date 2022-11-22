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
    ===== BOTTOM NAVI COMPONENT =====
    */
    button: {
        padding: '7%',
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
        marginVertical:'1%',
        // fontWeight:'bold',
        fontSize:RFPercentage(1.7),
    },

    nodeContainer:{
        flex:5, 
        flexDirection:'column',
        flexWrap:'wrap',
        // justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingHorizontal:'5%',
        backgroundColor: '#F6F6F9',
    },

    nodeScrollView: {
        width: '93%',
        height:'100%',
        padding: '5%',
        margin: '3%',
        borderRadius:10,
        backgroundColor:"#ffffff"
    },

    nodeView:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center',
        width: '100%',
        // height: '10%',
        marginVertical: '2%',
        borderRadius: 5,
    },

    nodeText: {
        // marginVertical:'3%',
        // fontWeight:'bold',
        marginVertical: '3%',
        fontSize:RFPercentage(1.5),
        color: 'white',
    },

    dialog: {
        fontSize: RFPercentage(1),
        backgroundColor:'white'
    },
});