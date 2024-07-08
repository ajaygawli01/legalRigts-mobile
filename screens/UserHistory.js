import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Text, View, TextInput, Button, Modal, FlatList, StyleSheet } from 'react-native';
import config from '../config/config';
import { DataTable } from 'react-native-paper'; 
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

const UserHistory = () => {
  const [userRecords, setUserRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [preRecord, setPreRecord] = useState({});
  const _editor = useRef(null);
  useEffect(() => {
    const fetchUserRecords = async () => {
      try {
        const userId = '6661e24b2b74b9b7944d40d5'; // Replace with actual user ID
        const response = await axios.get(`${config.baseURL}/api/posts-by-userid/${userId}`);
        setFilteredRecords(response.data)
        console.log(response.data)
      
      } catch (error) {
        console.error('Error fetching user records:', error);
      }
    };

    fetchUserRecords();
  }, []);

  const handleSearch = (value) => {
    const filtered = userRecords.filter((record) =>
      Object.values(record).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRecords(filtered);
  };

  const previewRecord = (record) => {
    setSelectedRecord(record);
    setPreRecord(record.description);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Edited record:', editedRecord);
    setIsModalVisible(false);
  };

  const RecordItem = ({ item }) => (
    <View style={styles.recordItem}>
      <Text style={styles.recordText}>{item.Name}</Text>
      {/* <Text style={styles.recordText}>{item.description}</Text> */}
      <Text style={styles.recordText}>{item.category}</Text>
      <Button title="Preview" onPress={() => previewRecord(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>User History</Text>
      <TextInput
        placeholder="Search records"
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredRecords}
        renderItem={({ item }) => <RecordItem item={item} />}
        keyExtractor={(item) => item.id}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
        {/* <QuillEditor
            style={styles.editor}
            ref={_editor}
            initialHtml={preRecord}
          
          />   */}
          <Text>
          {preRecord}
          </Text>
          <Button title="Cancel" onPress={handleCancel} />

          {/* <Text>Edit Record</Text>
          <TextInput
            value={editedRecord.colonyName}
            onChangeText={(text) => setEditedRecord({ ...editedRecord, colonyName: text })}
            style={styles.modalInput}
          />
        
          <Button title="Save" onPress={handleSave} />
           */}
        </View>
      </Modal>

{/* <DataTable style={styles.container}> 
      <DataTable.Header style={styles.tableHeader}> 
        <DataTable.Title>S.No</DataTable.Title> 
        <DataTable.Title>Post Name</DataTable.Title> 
        <DataTable.Title>Preview Link</DataTable.Title> 
        <DataTable.Title>Download</DataTable.Title> 
      </DataTable.Header> 
      <DataTable.Row> 
        <DataTable.Cell>1</DataTable.Cell> 
        <DataTable.Cell>Saled Deed</DataTable.Cell> 
        <DataTable.Cell>Preview</DataTable.Cell> 
      </DataTable.Row> 
  
   
    </DataTable>  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tableHeader: { 
    backgroundColor: '#DCDCDC', 
  }, 
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  editor: {
    // height: 200,
    // backgroundColor: '#fff',
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  recordText: {
    flex: 1,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '80%',
  },
});

export default UserHistory;
