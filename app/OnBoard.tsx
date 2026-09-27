import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import onBoardingData from '../src/services/data/onboardingData';
import { router } from 'expo-router';
import { onBoardType } from '../src/types/onBoardType';
import Colors from '../src/constants/colors';
import OnBoard from '../src/components/onBoard/OnBoard';
import Button from '../src/components/common/Button';
import OnboardingIndicator from '../src/components/onBoard/OnBoardIndicator';
const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const renderData = ({ item }: { item: onBoardType }) => {
    return (
      <View style={styles.dataContainer}>
        <OnBoard
          image={item.image}
          mainText={item.mainText}
          subText={item.subText}
        />
      </View>

    )
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.mainContainer}>
        <FlatList
          data={onBoardingData}
          renderItem={renderData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / wp(100)
            );

            setCurrentIndex(index);
          }}
        />
        
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.mapperContainer}>
          {onBoardingData.map((_, index) => (
    <OnboardingIndicator
        key={index}
        active={currentIndex === index}
    />
))}

        </View>
        <Button
          title='Get Started'
          onPress={()=>router.push('(auth)/login/Login')}
        />
      </View> 
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: wp(10)
  },
  mainContainer: {
    //flex: 1,
    //alignSelf: 'center'
   
  },
  dataContainer: {
    width: wp(100),
    //alignSelf: 'center',
    
  },
  actionContainer: {
    flex:1,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between'
  },
  mapperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: hp(5)
  },
  mapper: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(3),
    //backgroundColor: Colors.textMuted
  }
});
export default OnBoarding 
