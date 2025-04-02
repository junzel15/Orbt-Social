import {PixelRatio} from 'react-native';

export function getScaledFontSize(size: any) {
  return size / PixelRatio.getFontScale();
}

export const validateEmail = (email: string) => {
  var validate =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validate.test(String(email).toLowerCase());
};
