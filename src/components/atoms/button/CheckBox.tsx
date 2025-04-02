import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../constants/colors';

interface iProps {
  onPress?: () => void;
  checked?: boolean;
}

const Checkbox = ({onPress, checked = false}: iProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      {checked ? (
        <MaterialIcons name="check-box" color={colors.disable} size={20} />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          color={colors.disable}
          size={20}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(Checkbox);
