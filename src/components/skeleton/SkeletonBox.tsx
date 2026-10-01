import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

/*
|--------------------------------------------------------------------------
| Reusable Skeleton Box
|--------------------------------------------------------------------------
| Ye component har skeleton element ke liye use hoga.
|
| Example:
| <SkeletonBox width={40} height={20} />
|
| width / height responsive-screen ke values hain.
|--------------------------------------------------------------------------
*/
interface Props{
    width?:number,
    height?:number,
    borderRadius?:number,
    style?:{}
}
const SkeletonBox:React.FC<Props> = ({
  width,
  height,
  borderRadius = 0,
  style,
}) => {
  const translateX = useRef(new Animated.Value(-wp(100))).current;

  useEffect(() => {
    // Shimmer animation left → right
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: wp(100),
        duration: 1200,
        useNativeDriver: true,
      })
    );

    animation.start();

    // Component unmount hone par animation stop
    return () => {
      animation.stop();
    };
  }, [translateX]);

  return (
    <View
      style={[
        styles.skeleton,
        {
          
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255,255,255,0.55)',
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonBox

const styles=StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },

  /*
  |--------------------------------------------------------------------------
  | Moving Shimmer
  |--------------------------------------------------------------------------
  */

  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: wp(25),
  },

  gradient: {
    flex: 1,
  },
})