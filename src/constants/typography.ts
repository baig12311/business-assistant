import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
const fonts = {
  // regular: 'Inter_400Regular',
  // medium: 'Inter_500Medium',
  // semiBold: 'Inter_600SemiBold',
  // bold: 'Inter_700Bold',

  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semiBold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extraBold: 'Manrope_800ExtraBold'
}

export const fontSize = {
  largeHeading:wp(7),
  heading:wp(6),
  subHeading:wp(5),
  text:wp(4),
  smallText:wp(3.5)
}

export default fonts