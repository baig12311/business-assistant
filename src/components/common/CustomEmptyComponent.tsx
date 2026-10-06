import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fonts, { fontSize } from '../../constants/typography';
import Colors from '../../constants/colors';
import Button from './Button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
  mainText?: string
  subText?: string
  illustration?: any

}
const CustomEmptyComponent: React.FC<Props> = ({ mainText, subText, illustration }) => {
  return (


    <View style={styles.emptyContainer}>
      {
        illustration && (
          <Image source={illustration} style={styles.illustration} />
        )
      }

      <Text style={styles.emptyTitle}>{mainText}</Text>
      <Text style={styles.emptyText}>{subText}</Text>

      {/* <View style={{ alignSelf: 'center' }}>
        {
          buttonTitle && (<Button title={buttonTitle} onPress={onPress} />)
        }
        

      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: fontSize.subHeading,
    fontFamily: fonts.semiBold,
    marginBottom: hp(1.5)
  },

  emptyText: {
    fontSize: fontSize.smallText,
    fontFamily: fonts.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: hp(5),
  },
  emptyText1: {

  },
  illustration: {
    width: wp(80),
    height: hp(30),
    opacity: 0.5
  }
});

//make this component available to the app
export default CustomEmptyComponent;
