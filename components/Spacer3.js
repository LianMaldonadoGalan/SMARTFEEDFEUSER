import React from "react";
import { View, StyleSheet} from 'react-native';


const Spacer3 = ({ children }) =>{
    return <View style= {styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
    spacer:{
        marginVertical: 14
    }
});


export default Spacer3;