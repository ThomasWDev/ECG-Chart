import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ECGChart from "./src/components/ECGChart";
import CanvasTest from "./src/components/CanvasTest";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ECGChart/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
