import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { windowHeight } from '../../constants/globalConstants';
import { colors } from '../../constants/colors';
import { globalStyleDefinitions } from '../../constants/globalStyleDefinitions';

interface iProps {
  height?: number;
  children: any;
}

const RBSheet = forwardRef((props: iProps, ref) => {
  const {height = 'auto', children = <View />} = props;

  const [modalVisible, setModalVisible] = useState(false);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  useImperativeHandle(ref, () => ({
    open: () => handleSetVisible(true),
    close: () => handleSetVisible(false),
  }));

  const createPanResponder = () => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (e, gestureState) => gestureState.dy > 0,

      onPanResponderMove: (e, gestureState) => {
        gestureState.dy > 0 &&
          Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(
            e,
            gestureState,
          );
      },

      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          handleSetVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start();
        }
      },
    });
  };

  const panResponder = useRef(createPanResponder()).current;

  const handleSetVisible = (visible: boolean) => {
    if (visible) {
      setModalVisible(visible);
      Animated.timing(animatedHeight, {
        useNativeDriver: true,
        toValue: height == 'auto' ? windowHeight * 0.2 : height,
        duration: 200,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: true,
        toValue: 0,
        duration: 200,
      }).start(() => {
        setModalVisible(visible);
        pan.setValue({x: 0, y: 0});
      });
    }
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      testID="Modal"
      transparent
      visible={modalVisible}
      animationType="slide"
      onRequestClose={onModalClose}>
      <KeyboardAvoidingView
        testID="KeyboardAvoidingView"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}>
        <TouchableOpacity
          testID="TouchableOpacity"
          style={styles.mask}
          activeOpacity={1}
          onPress={onModalClose}
        />
        <Animated.View
          testID="AnimatedView"
          style={[
            styles.container,
            {transform: pan.getTranslateTransform()},
            {height: height},
          ]}>
          <View
            testID="DraggableView"
            {...panResponder.panHandlers}
            style={styles.draggableContainer}>
            <View testID="DraggableIcon" style={styles.draggableIcon} />
          </View>
          <View testID="InnerContainer" style={styles.innerContainer}>
            {children}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.black + '75',
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 4 * globalStyleDefinitions.br_10.borderRadius,
    borderTopRightRadius: 4 * globalStyleDefinitions.br_10.borderRadius,
  },
  innerContainer: {
    flex: 1,
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: colors.mediumgray,
    width: 45,
  },
});
export default memo(RBSheet);
