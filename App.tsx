// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { supabase } from './src/lib/supabase';
// export default function App() {
//   const email = 'user1245@gmail.com'
//   const password = '12345678'
//   const handleSignin = async () => {
// console.log('Button Called!');

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     console.log('Sign In Error:', error.message);
//     return;
//   }

//   console.log('Sign In Success:', data);

//   }
//   const handleSignup = async () => {
// console.log('Button Called!');

//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     console.log('Sign Up Error:', error.message);
//     return;
//   }

//   console.log('Sign Up Success:', data);

//   }
//   const createBusiness = async () => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     console.log('No authenticated user');
//     return;
//   }

//   const { data, error } = await supabase
//     .from('businesses')
//     .insert({
//       owner_id: user.id,
//       name: 'Test Business',
//       category: 'Clothing',
//       currency: 'PKR',
//     })
//     .select()
//     .single();

//   if (error) {
//     console.log('Create Business Error:', error.message);
//     return;
//   }

//   console.log('Business Created:', data);
// };
//   return (
//     <View style={styles.container}>
//       {/* <Text style={{fontSize: 20}}onPress={handleSignup}>SignUp</Text> */}
//       <Text style={{fontSize: 20}}onPress={handleSignin}>SignIn</Text>
//             <Text style={{fontSize: 20}}onPress={createBusiness}>Create Business</Text>

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
