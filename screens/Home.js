import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import config from '../config/config';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
// import PreviewTemplate from './PreviewTemplate'; // Assuming you have a PreviewTemplate component

const Home = ({route}) => {
  const { template } = route.params;
  const [formData, setFormData] = useState({
    colonyName: '',
    category: '',
    propertyType: '',
    minLandRate: '',
    costOfConstruction: '',
    totalFlatArea: '',
    numberOfFloors: '',
    isLiftProvided: false,
    yearOfConstruction: '',
    typeOfColony: '',
    buildingStatus: '',
    useFactor: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [desc, setDesc]=useState('')
  const _editor = React.createRef();

  useEffect(()=>{
    fetchpost()
  },[])

  const fetchpost=async()=>{
    try {
      const res = await axios.get(`${config.baseURL}/api/posts/6662e49baea70f1dc0c59c5c`)
      console.log(res.data.post.description)
      setDesc(res.data.post.description)

    } catch (error) {
      
    }
  }
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/sale-main-documents',
        formData
      );
      console.log('Data posted successfully!');
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error posting data:', error);
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  // Define field configurations
  const fields = [
    { id: 'colonyName', label: 'Name of Colony', type: 'text' },
    { id: 'category', label: 'Category of Colony', type: 'text' },
    { id: 'propertyType', label: 'Type of Property', type: 'text' },
    { id: 'minLandRate', label: 'Minimum Rate of Land Notified by Govt. per Sq.Mtrs.', type: 'text' },
    { id: 'costOfConstruction', label: 'Cost of Construction notified by Government in Sq.Mtrs.', type: 'text' },
    { id: 'totalFlatArea', label: 'Total Flat Area in Sq.Mtrs.', type: 'text' },
    { id: 'numberOfFloors', label: 'Number of Floors', type: 'number' },
    { id: 'isLiftProvided', label: 'Lift provided', type: 'checkbox' },
    { id: 'yearOfConstruction', label: 'Year of Construction', type: 'text' },
    { id: 'typeOfColony', label: 'Type of Colony', type: 'text' },
    { id: 'buildingStatus', label: 'Status of Building', type: 'text' },
    { id: 'useFactor', label: 'Use Factor', type: 'text' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
{/* <Text> {desc}</Text> */}

<QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml="<h1>Quill Editor for react-native</h1>"
      />
      <QuillToolbar editor={_editor} options="full" theme="light" />
     
      {/* <View style={styles.header}>
        <Icon name="file-text-o" size={24} />
        <Text style={styles.headerText}>Sale Main Document Form</Text>
      </View>

      <View style={styles.formSection}>
        {fields.slice(0, 6).map((field) => (
          <View key={field.id} style={styles.formGroup}>
            <Text style={styles.label}>{field.label}</Text>
            {field.type === 'checkbox' ? (
              <CheckBox
                value={formData[field.id]}
                onValueChange={(value) => handleChange(field.id, value)}
              />
            ) : (
              <TextInput
                style={styles.input}
                value={formData[field.id]}
                onChangeText={(value) => handleChange(field.id, value)}
                keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                secureTextEntry={field.type === 'password'}
              />
            )}
            {errors[field.id] && <Text style={styles.error}>{errors[field.id]}</Text>}
          </View>
        ))}
      </View>

      <View style={styles.formSection}>
        {fields.slice(6).map((field) => (
          <View key={field.id} style={styles.formGroup}>
            <Text style={styles.label}>{field.label}</Text>
            {field.type === 'checkbox' ? (
              <CheckBox
                value={formData[field.id]}
                onValueChange={(value) => handleChange(field.id, value)}
              />
            ) : (
              <TextInput
                style={styles.input}
                value={formData[field.id]}
                onChangeText={(value) => handleChange(field.id, value)}
                keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                secureTextEntry={field.type === 'password'}
              />
            )}
            {errors[field.id] && <Text style={styles.error}>{errors[field.id]}</Text>}
          </View>
        ))}
        <Button
          title={loading ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View> */}

      {submitted && <Text style={styles.successMessage}>Data submitted successfully! Thank you.</Text>}

      {/* <PreviewTemplate /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
  successMessage: {
    color: 'green',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default Home;
