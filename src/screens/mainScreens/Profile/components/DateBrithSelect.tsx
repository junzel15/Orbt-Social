import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import { iconPath } from '../../../../constants/iconPath';
import { globalStyleDefinitions } from '../../../../constants/globalStyleDefinitions';
import { colors } from '../../../../constants/colors';
import { fonts } from '../../../../constants/fonts';

type DOBBottomSheetProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export type DOBBottomSheetRef = {
  open: () => void;
};

const DOBBottomSheet = forwardRef<DOBBottomSheetRef, DOBBottomSheetProps>(
  ({ date, setDate }, ref) => {
    const sheetRef = useRef<RBSheet>(null);
    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.open(),
    }));

    const formatDate = (date: Date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')
        }/${date.getFullYear()}`;
    };

    return (
      <>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => sheetRef.current?.open()}
        >
          <Image
            source={iconPath.dateBrithIcon}
            style={styles.icon}
          />
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>
        <RBSheet
          ref={sheetRef}
          height={400}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              backgroundColor: colors.lighGrey,
            }
          }}
        >
          <View style={{ flex: 1 }} >
            <Text style={styles.sheetTitle}>Date of Birth</Text>
            <DatePicker
              date={date}
              mode="date"
              onDateChange={setDate}
            />
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={() => sheetRef.current?.close()}
            >
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </>
    );
  }
);

export default DOBBottomSheet;

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.lighGrey,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginTop: globalStyleDefinitions.mt_15.marginTop
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.lighGrey,
    marginRight: globalStyleDefinitions.mt_10.marginTop
  },
  dateText: {
    fontSize: 16,
    fontFamily:fonts.fontRegular
  },
  sheetTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.fontSemiBold
  },
  updateBtn: {
    marginTop: 2* globalStyleDefinitions.mt_10.marginTop,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  updateText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontFamily:fonts.fontSemiBold
  },
});
