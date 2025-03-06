import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

interface GuestProps {
  open: boolean;
  onClose: () => void;
  onStartGame: (name: string) => void;
  display: boolean;
}

const Guest: React.FC<GuestProps> = ({ open, onClose, onStartGame, display }) => {
  const [name, setName] = useState("");

  const handleStartGame = () => {
    if (name) {
      onStartGame(name);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, display ? styles.visible : styles.hidden]}>
          <Text style={styles.modalTitle}>Insira seu nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            autoFocus={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={handleStartGame}>
              <Text style={styles.buttonText}>JOGAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Adjust width as needed
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    color: 'black'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
    flex: 1,
    marginRight: 5,
  },
  playButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  hidden: {
    display: 'none'
  },
  visible: {
    display: 'flex'
  }
});

export default Guest;