import {Dimensions, StatusBar} from 'react-native';

export const windowWidth: number = Dimensions.get('window').width;
export const windowHeight: number = Dimensions.get('window').height + (StatusBar.currentHeight || 0);;
