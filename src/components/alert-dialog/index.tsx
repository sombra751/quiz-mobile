import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

interface Props {
  dialog: boolean;
  score: number;
  onClose: () => void;
}

const ErrorDialog: React.FC<Props> = ({ dialog, score, onClose }) => {
  const navigation = useNavigation(); // Use useNavigation

  const handleWrongQuestion = () => {
    onClose();
    navigation.navigate("Home"); // Navegue para a tela 'Home'
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={dialog}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            Que pena, você errou! ({score} / 25)
          </Text>
          <Text style={styles.modalText}>
            Não fique triste, tente novamente e sinta-se feliz por chegar até aqui. Você é incrível!
          </Text>
          <TouchableOpacity
            style={styles.openButton}
            onPress={handleWrongQuestion}
          >
            <Text style={styles.textStyle}>Recomeçar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default ErrorDialog;