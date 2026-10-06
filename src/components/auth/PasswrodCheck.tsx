import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
 import fonts, {fontSize} from '../../constants/typography';
 import Colors from '../../constants/colors';
interface Props{
  password: string;
};

const PasswordRequirements:React.FC<Props> = ({password}) => {
  const requirements = [
    {
      label: 'At least 8 characters',
      valid: password.length >= 8,
    },
    {
      label: 'One uppercase letter',
      valid: /[A-Z]/.test(password),
    },
    {
      label: 'One lowercase letter',
      valid: /[a-z]/.test(password),
    },
    {
      label: 'One number',
      valid: /[0-9]/.test(password),
    },
    {
      label: 'One special character',
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  if (!password) {
    return null;
  }

  return (
    <View style={styles.container}>
      {requirements.map((requirement) => (
        <View key={requirement.label} style={styles.row}>
          <Text
            style={[
              styles.icon,
              requirement.valid && styles.validIcon,
            ]}
          >
            {requirement.valid ? '✓' : '○'}
          </Text>

          <Text
            style={[
              styles.text,
              requirement.valid && styles.validText,
            ]}
          >
              {requirement.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2)
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  icon: {
    fontSize: fontSize.smallText,
    fontFamily: fonts.medium,
    color: Colors.textSecondary
  },

  text: {
    fontSize: fontSize.smallText,
    fontFamily: fonts.medium,
    color: Colors.textSecondary
  },

  validIcon: {
   
    color: Colors.primary
  },

  validText: {
    
    color: Colors.primary
  },
});

export default PasswordRequirements;