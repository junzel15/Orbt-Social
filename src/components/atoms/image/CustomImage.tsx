import React, {memo} from 'react';
import {Image, ImageStyle} from 'react-native';

interface iProps {
  url: any;
  width?: number;
  height?: number;
  tintColor?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch';
  imageStyle?:ImageStyle
}

const CustomImage = ({
  url,
  width = 10,
  height = 10,
  tintColor,
  resizeMode = 'contain',
  imageStyle
}: iProps) => {
  const style = {width: width, height: height,...imageStyle};

  return (
    <Image
      source={url}
      style={style}
      resizeMode={resizeMode}
      tintColor={tintColor}
    />
  );
};

export default memo(CustomImage);
