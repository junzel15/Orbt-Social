import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorageKeys from './asyncStorageKeys';

export async function getAccessToken() {
  let accessToken: string =
    (await AsyncStorage.getItem(asyncStorageKeys.ACCESS_TOKEN)) || '';
  return accessToken?.toString();
}

export async function saveAccessToken(data: string) {
  await AsyncStorage.setItem(asyncStorageKeys.ACCESS_TOKEN, data?.toString());
}

export async function clearAccessToken() {
  await AsyncStorage.removeItem(asyncStorageKeys.ACCESS_TOKEN);
}
