import React, { useState } from 'react';
import { View, ScrollView, Text, Alert, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Button as RNButton } from 'react-native';
import Header from "../components/molecules/TopBar";
import { globalStyles } from '../components/styles/globalStyles';
import Button from "../components/atoms/BottomButton";

const initialData = [
  { id: 1, name: "Alice Dupont", email: "alice.dupont@example.com" },
  { id: 2, name: "Bob Martin", email: "bob.martin@example.com" },
  { id: 3, name: "Charlie Durand", email: "charlie.durand@example.com" },
  { id: 4, name: "Diane Leroy", email: "diane.leroy@example.com" },
  { id: 5, name: "Eve Moreau", email: "eve.moreau@example.com" },
  { id: 6, name: "Alice Dupont", email: "alice.dupont@example.com" },
  { id: 7, name: "Bob Martin", email: "bob.martin@example.com" },
  { id: 8, name: "Charlie Durand", email: "charlie.durand@example.com" },
  { id: 9, name: "Diane Leroy", email: "diane.leroy@example.com" },
  { id: 10, name: "Eve Moreau", email: "eve.moreau@example.com" }
];

const ManagerList = () => {
  const [data, setData] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const addMember = () => {
    if (!newEmail.includes('@')) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
      return;
    }
    const newId = data.length + 1;
    const newMember = { id: newId, name: newName, email: newEmail };
    setData([...data, newMember]);
    setModalVisible(false);
    setNewName('');
    setNewEmail('');
  };

  const deleteMember = (id) => {
    setData(data.filter(member => member.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>Mon Équipe</Text>
        {data.length === 0 ? (
          <Text style={styles.emptyMessage}>Il n'y a personne dans le groupe.</Text>
        ) : (
          <View style={styles.userListContainer}>
            {data.map((item, index) => (
              <View key={index}>
                <View style={styles.item}>
                  <View style={styles.row}>
                    <View style={styles.info}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.email}>{item.email}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => Alert.alert('Delete', `Are you sure you want to delete ${item.name}?`, [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'OK', onPress: () => deleteMember(item.id) },
                      ])}
                      style={styles.button}
                    >
                      <Image
                        source={require('../../assets/images/trash.png')}
                        style={styles.buttonImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {index < data.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button style={styles.centeredButton} title="Ajouter une personne à l'équipe" onPress={() => setModalVisible(true)} />
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Ajouter un nouveau membre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
          />
          <View style={styles.buttonContainer}>
            <RNButton title="Annuler" onPress={() => setModalVisible(false)} />
            <RNButton title="Ajouter" onPress={addMember} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#F8EFEA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center',
    //borderWidth: 1,
    //borderColor: '#000000', // Couleur de la bordure
  },
  title: {
    marginBottom: 10,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  center: {
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  userListContainer: {
    backgroundColor: '#F6EBE5', // Couleur de fond pour le conteneur de la liste des utilisateurs
    borderRadius: 10,
    padding: 10,
  },
  item: {
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  centeredButton: {
    bottom: 0,
    padding: 35,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonImage: {
    width: 20,
    height: 20
  },
  separator: {
    height: 1,            // Taille séparateurs
    backgroundColor: '#3B2414',     // Couleur séparateur
    marginVertical: 5,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  }
});

export default ManagerList;
