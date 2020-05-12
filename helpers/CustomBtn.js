import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomBtn({
  children,
  onPress,
  btnStyle = {},
  txtStyle = {},
  disabled = false
}) {
  const disabledButton = disabled ? styles.btnDisabled : {};
  const disabledBtnStatus = disabled ? styles.btnTextDisabled : {};
  return (
    <View style={styles.btnwrapper}>
      <TouchableOpacity
        // style={[styles.btn, btnStyle, disabled ? styles.btnDisabled : null]}
        style={[styles.btn, btnStyle, disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.btnText,
            txtStyle,
            // disabled ? styles.btnTextDisabled : {}
            disabledBtnStatus
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnwrapper: {
    alignItems: 'center',
    marginBottom: 20
  },
  btn: {
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 1,
  },
  btnDisabled: {
    backgroundColor: '#cbcbcb',
    borderColor: 'transparent'
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnTextDisabled: {
    color: '#8f8f8f'
  }
});

CustomBtn.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  btnStyle: PropTypes.object,
  txtStyle: PropTypes.object,
  disabled: PropTypes.bool
};
