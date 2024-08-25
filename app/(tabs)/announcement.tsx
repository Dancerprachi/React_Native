import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TextInput, Button, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const announcementsData = [
  { id: '1', title: 'Exam Schedule Released', content: 'The exam schedule for the upcoming semester has been released.' },
  { id: '2', title: 'Holiday Notice', content: 'The college will remain closed on 15th August due to Independence Day.' },
  { id: '3', title: 'Workshop on AI', content: 'A workshop on Artificial Intelligence will be conducted next week.' },
  // Add more announcements here
];

// Announcements tab content
const Announcements = () => (
  <View style={styles.announcementContainer}>
    <FlatList
      data={announcementsData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.announcementItem}>
          <Text style={styles.announcementTitle}>{item.title}</Text>
          <Text style={styles.announcementContent}>{item.content}</Text>
        </View>
      )}
    />
  </View>
);

// Permission tab content
const Permission = () => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim()) {
      Alert.alert('Leave Request Submitted', `Reason: ${reason}`);
      setReason(''); // Clear the text input after submission
    } else {
      Alert.alert('Error', 'Please enter a reason for leave.');
    }
  };
  

  return (
    <View style={styles.permissionContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your reason for leave"
        value={reason}
        onChangeText={setReason}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default function Announcement() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'announcements', title: 'Announcements ' },
    { key: 'permission', title: 'Permission' },
  ]);

  const renderScene = SceneMap({
    announcements: Announcements,
    permission: Permission,
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FCE38A', dark: '#e7e7b4' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
          />
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 40,
    width: 190,
    bottom: 20,
    left: 20,
    position: 'absolute',
  },
  announcementContainer: {
    flex: 1,
    padding:10,
  },
  announcementItem: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2, //  shadow  Android
    shadowColor: '#000', // shadow iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  announcementContent: {
    fontSize: 16,
    color: '#364F6B',
  },
  permissionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  permissonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  tabBar: {
    backgroundColor: '#FCE38A',
  },
  tabLabel: {
    color: '#364F6B',
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: '#364F6B',
  },
});