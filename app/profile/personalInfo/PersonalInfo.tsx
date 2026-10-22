import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useUser } from '../../../src/hooks/useUser';
import { useUpdateUserName } from '../../../src/hooks/useUpdateUsername';
import Header from '../../../src/components/common/Header';
import styles from './personalStyle';
import Input from '../../../src/components/common/Input';
import Button from '../../../src/components/common/Button';
import CustomToast from '../../../src/components/common/CustomToast';
const PersonalInfo = () => {
    const { data, isLoading } = useUser()
    const { mutateAsync: updateMutation, isPending: updating } = useUpdateUserName()
    const userName = data?.user_metadata?.name
    const email = data?.email || 'No Email'
    const [showInput1, setShowInput1] = useState(false)
    const [showInput2, setShowInput2] = useState(false)
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [toatsType, setToastType] = useState<'error' | 'success'>('error')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (data) {
            setNewName(userName ?? '')
            setNewEmail(email ?? '')
        }
    }, [data])
    const isNameChanged = newName.trim() !== (userName ?? '').trim()
    const disabled = isLoading || !newName.trim() || !isNameChanged
    const handleSave = async () => {
        const Name = newName.trim()
        try {
            await updateMutation(Name)
            setToastType('success')
            setTitle('Details Updated')
            setDescription('Your personal details have been updated successfully.')
            setShowToast(true)
            setTimeout(()=>{
                router.back()
            }, 2500)
        } catch (error) {
            setToastType('error')
            setTitle('Unable to update profile')
            setDescription('Something went wrong! Please try again.')
            setShowToast(true)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                showToast && (
                    <CustomToast
                    type={toatsType}
                    messageTitle={title}
                    messageDescription={description}
                    visible={showToast}
                    onHide={()=>setShowToast(false)}
                    />
                )
            }
            <Header title='Personal Information' onPress={() => router.back()} />
            <View style={{ flex: 1 }}>
                <Text style={styles.subHeading}>Manage you personal details</Text>
                <Input
                    title='Full Name'
                    placeholder=''
                    value={newName}
                    onChangeText={setNewName}
                    isEditable={showInput1}
                    onPressEdit={() => setShowInput1(true)}
                    autoFocus={showInput1}
                    onBlur={() => setShowInput1(false)}
                />
                {/* <Input
                    title='Email'
                    placeholder=''
                    value={newEmail}
                    // onChangeText={setNewEmail}
                    isEditable={showInput2}
                    // onPressEdit={() => setShowInput2(true)}
                    // autoFocus={showInput2}
                    // onBlur={()=>setShowInput2(false)}
                /> */}
            </View>
            {
                isNameChanged && (
                    <View style={styles.buttonContainer}>
                        <Button
                            title='Save Changes'
                            onPress={handleSave}
                            disabled={disabled}
                            isLoading={updating}
                        />
                    </View>
                )
            }

        </SafeAreaView>
    );
};

export default PersonalInfo;
