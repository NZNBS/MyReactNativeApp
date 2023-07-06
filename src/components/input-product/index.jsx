import { Button, TextInput, View } from 'react-native';

import { styles } from './styles';

const InputProduct = ({
  borderColor,
  onHandlerFocus,
  onHandlerBlur,
  onHandlerChangeText,
  product,
  onHandlerCreateProduct,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder="Crear nuevo producto"
        autoCapitalize="none"
        autoCorrect={false}
        cursorColor="#424D9E"
        selectionColor="#D4D7ED"
        placeholderTextColor="#C5C9E7"
        onFocus={onHandlerFocus}
        onBlur={onHandlerBlur}
        onChangeText={onHandlerChangeText}
        value={product}
      />
      <Button
        disabled={product.length === 0}
        title="Crear"
        color="#424D9E"
        onPress={onHandlerCreateProduct}
      />
    </View>
  );
};

export default InputProduct;
