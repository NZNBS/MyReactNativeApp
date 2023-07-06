import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { styles } from './styles';

export default function App() {
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [borderColor, setBorderColor] = useState('#C5C9E7');

  const onHandlerFocus = () => {
    setBorderColor('#424D9E');
  };

  const onHandlerBlur = () => {
    setBorderColor('#C5C9E7');
  };

  const onHandlerChangeText = (text) => {
    setProduct(text);
  };

  const onHandlerCreateProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        value: product,
      },
    ]);

    setProduct('');
  };

  const onHandlerModal = (item) => {
    setIsVisible(true);
    setSelectedTask(item);
  };

  const onHandleDelete = (id) => {
    setProducts((prevProduct) => prevProduct.filter((product) => product.id !== id));
    setIsVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onHandlerModal(item)} style={styles.containerItem}>
      <Text style={styles.listItem}>{item.value}</Text>
      <Text style={styles.icon}>X</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor }]}
            placeholder="Añade un nuevo producto"
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
        <FlatList
          data={products}
          renderItem={renderItem}
          style={styles.listContainer}
          contentContainerStyle={styles.list}
          alwaysBounceVertical={false}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal visible={isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalle de producto</Text>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalDetailMessage}>
              Estas seguro que quieres eliminar este producto?
            </Text>
            <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button title="Cancelar" color="#424D9E" onPress={() => setIsVisible(false)} />
            <Button title="Borrar" color="red" onPress={() => onHandleDelete(selectedTask?.id)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
