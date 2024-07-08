import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator ,Button,Alert} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import config from '../config/config';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

const Editor = ({ route }) => {
  const { template } = route.params;
  const [creatingPost, setCreatingPost] = useState(false);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const _editor = useRef(null);
  const navigation = useNavigation();
  useEffect(() => {
    fetchPost();
  }, []);


//   useEffect(() => {
//     if (_editor.current && desc !== '') {
//       _editor.current.setContents(desc);
//     }
//   }, [desc]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${config.baseURL}/api/posts-by-name/${template}`);
      console.log(res.data.post.description);
      setDesc(res.data.post.description);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (html) => {
    setDesc(html);
  };

  const createPost = async () => {
    setCreatingPost(true);
    try {
      const res = await axios.post(`${config.baseURL}/api/create-posts`, {
        description: desc.html,
        Name: template, // Replace with actual data
        Templeate: false, // Assuming template is a string or can be sent directly
      });
      console.log('Post created:', res.data);
      Alert.alert('Success', 'Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setCreatingPost(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <QuillEditor
            style={styles.editor}
            ref={_editor}
            initialHtml={desc}
            onHtmlChange={handleChange}
          />  
          <QuillToolbar editor={_editor} options="full" theme="light" />
          <Button 
            title={creatingPost ? "Creating..." : "Create Post"} 
            onPress={createPost} 
            disabled={creatingPost}
          />

<Button 
style={styles.historybtn}
            title="Post History"
            onPress={()=>{  navigation.navigate('UserHistory')}} 
        
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  editor: {
    height: 400,
    backgroundColor: '#fff',
  },

  historybtn:{
    marginTop:10
  }
});

export default Editor;


