import { useState } from 'react';
import { Modal, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import InputProduct from './components/input-product';
import ProductItem from './components/product-item';
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

  const renderItem = ({ item }) => <ProductItem item={item} onPressItem={onHandlerModal} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <InputProduct
          borderColor={borderColor}
          onHandlerFocus={onHandlerFocus}
          onHandlerBlur={onHandlerBlur}
          onHandlerChangeText={onHandlerChangeText}
          product={product}
          onHandlerCreateProduct={onHandlerCreateProduct}
        />
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
