import React from "react";
import { View, StyleSheet} from 'react-native';


const Spacer2 = ({ children }) =>{
    return <View style= {styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
    spacer:{
        marginHorizontal: 14,
        marginVertical: 6
    }
});


export default Spacer2;