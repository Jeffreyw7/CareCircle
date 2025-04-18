import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  {/* function that submits the form information when the submit button is clicked. */}
  const submit = async () => {
    if(!form.username || !form.email || !form.password || !form.confirmPassword){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    if(form.password !== form.confirmPassword){
      Alert.alert('Error', 'Passwords do not match')
    }

    setisSubmitting(true);

    try{
      const result = await createUser(form.email, form.password, form.username)
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Purple curved background */}
      <View className="absolute top-0 left-0 w-[100px] h-[100px] bg-carecircle-purple-light rounded-br-full" />
      <View className="absolute right-0 top-0 w-[120px] h-[120px] bg-carecircle-purple-dark rounded-bl-full" />
      
      <ScrollView className="flex-1 px-6">
        {/* Back button */}
        <Link href="/" className="mt-4 text-carecircle-purple font-medium">
          <Text className="text-carecircle-purple font-medium">← Back</Text>
        </Link>

        {/* Main content */}
        <View className="mt-8">
          <Text className="text-carecircle-purple text-3xl font-bold mb-8">Sign Up</Text>

          <FormField 
            title="Full Name"
            value={form.username}
            handleChangeText={(e) => setform({...form, username: e})}
            otherStyles="mb-4"
          />
          
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({...form, email: e})}
            otherStyles="mb-4"
            keyboradType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({...form, password: e})}
            otherStyles="mb-4"
            secureTextEntry
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="bg-[#6A2FEE] rounded-xl py-4"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/sign-in" className="text-[#6A2FEE] font-medium">Sign In</Link>
          </View>
        </View>
      </ScrollView>

      {/* Bottom curved shapes */}
      <View className="absolute bottom-0 right-0 w-[130px] h-[130px] bg-carecircle-purple-light rounded-tl-full" />
      <View className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-carecircle-purple-dark rounded-tr-full" />
    </SafeAreaView>
  )
}

export default SignUp