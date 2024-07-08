import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const TemplateChoose = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigation = useNavigation();

  const handleTemplateSelect = (value) => {
    setSelectedTemplate(value);
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
        console.log(selectedTemplate)
      navigation.navigate('Editor', { template: selectedTemplate });

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Template:</Text>
      <Picker
        selectedValue={selectedTemplate}
        style={styles.picker}
        onValueChange={handleTemplateSelect}
      >
        <Picker.Item label="Select a template" value={null} />
        <Picker.Item label="Sale Deed" value="salesdeed" />
        <Picker.Item label="Rent Deed" value="Rent Deed" />
        <Picker.Item label="Lease Agreement" value="Lease Agreement" />
        <Picker.Item label="Mortgage Deed" value="Mortgage Deed" />
        <Picker.Item label="Gift Deed" value="Gift Deed" />
        <Picker.Item label="Power of Attorney" value="Power of Attorney" />
        <Picker.Item label="Release Deed" value="Release Deed" />
        <Picker.Item label="Trust Deed" value="Trust Deed" />
        <Picker.Item label="Partition Deed" value="Partition Deed" />
        <Picker.Item label="Will" value="Will" />
        {/* Add more deed names as needed */}
      </Picker>
      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={!selectedTemplate}
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor:"white"
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  picker: {
    width: 300,
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
  btn:{
    backgroundColor:"blue"
  },
});

export default TemplateChoose;
