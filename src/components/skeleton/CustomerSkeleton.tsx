import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import SkeletonBox from '../skeleton/SkeletonBox';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';


const CustomerSkeleton = () => {
    return (
        <View>
            {Array.from({ length: 4 }).map((_, index) => (
                <View style={styles.container} key={index}>
                    <SkeletonBox style={styles.image} />
                    <View style={styles.content}>

                        <SkeletonBox width={wp(30)} height={hp(1.5)} borderRadius={wp(1)} style={{marginBottom:hp(1)}}/>
                        <SkeletonBox width={wp(35)} height={hp(1.5)} borderRadius={wp(1)} />
                    </View>


                    <SkeletonBox width={wp(6)} height={wp(6)} borderRadius={wp(1)}/>
                </View>
            ))}


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        padding: wp(3),
        borderRadius: wp(3),
        alignItems: 'center',
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: Colors.border,
    },
    image: {
        //borderWidth: 0.3,
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),

    },
    content: {
        marginLeft: wp(3),
        flex: 1
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});

//make this component available to the app
export default CustomerSkeleton;
