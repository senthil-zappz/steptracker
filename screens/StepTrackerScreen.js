// screens/StepTrackerScreen.js

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {StyleSheet,Text,View,ImageBackground,Dimensions,Button} from "react-native";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from '@react-native-async-storage/async-storage';


const StepTrackerScreen = ({ navigation }) => {
  
  const [PedomaterAvailability, SetPedomaterAvailability] = useState(""); 
  const [StepCount, SetStepCount] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    weight: '',
    height: '',
    stepGoal: '',
  });

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        // If data is available, parse and set it in the form
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  loadData();

  if (userData.stepGoal=="")
  {
    userData.stepGoal=6500;
  }


  var WindowHeight = Dimensions.get("window").height;
  var Dist = StepCount / 1300;
  var DistanceCovered = Dist.toFixed(4);
 
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);
 
useEffect(() => {
 
    subscribe();

  }, []);
 
 subscribe = () => {

  const subscription = Pedometer.watchStepCount((result) => {

    SetStepCount(result.steps);

  });

    Pedometer.isAvailableAsync().then(

      (result) => {
 
        SetPedomaterAvailability(String(result));
 
      },
 
      (error) => {
 
        SetPedomaterAvailability(error);
 
      }
    )};


  return (
 
    <View style={styles.container}>
 
      <ImageBackground
 
        style={{ flex: 1 }}
 
        source={require("../assets/jogging2.png")}
 
        resizeMode="cover"
 
      >

  <View style={styles.fixToText}>
    <Text style={styles.headingDesign}> Pedometer : {PedomaterAvailability}</Text>
    <Button title="Profile" onPress={() => navigation.navigate('UserProfile')} />
  </View>

        <View style={{ flex: 3, justifyContent: "center" }}>
 
          <CircularProgress
 
            value={StepCount}
 
            maxValue={6500}
 
            radius={190}
 
            textColor={"#ecf0f1"}
 
            activeStrokeColor={"#337CFF"}
 
            inActiveStrokeColor={"#33D3FF"}
 
            inActiveStrokeOpacity={0.5}
 
            inActiveStrokeWidth={40}
 
            activeStrokeWidth={40}
 
            title={"Step Count"}
 
            titleColor={"#337CFF"}
 
            titleStyle={{ fontWeight: "bold" }}
 
          />
 
        </View>
 
  
 
        <View style={{ flex: 1, justifyContent: "center" }}>
 
          <View style={{ flex: 1 }}>
 
            <Text
 
              style={[
 
                styles.textDesign,
 
                { paddingLeft: 20, marginLeft: '23%' },
 
              ]}
 
            >
 
              Target : {userData.stepGoal} Steps
 
            </Text>
 
          </View>
 
  
 
          <View style={{ flex: 1 }}>
 
            <Text
 
              style={[
 
                styles.textDesign,
 
                { width: "93%", paddingLeft: 20, marginLeft: '-3.5%' },
            
              ]}
 
            >
 
              Distance Covered : {DistanceCovered} km
 
            </Text>
 
          </View>
 
  
 
          <View style={{ flex: 1 }}>
 
            <Text
 
              style={[
 
                styles.textDesign,
 
                {  paddingLeft: 10, marginLeft: '23%' },
 
              ]}
 
            >
 
              Calories Burnt : {caloriesBurnt}
 
            </Text>
 
          </View>
 
  
 
          <StatusBar style="auto" />
 
        </View>
 
      </ImageBackground>
 
    </View>
 
  );
};


const styles = StyleSheet.create({

  container: {
 
    flex: 1,
 
    backgroundColor: "#fff",
 
  },
 
  headingDesign: {
 
    backgroundColor: "blue",
 
    alignSelf: "center",
 
    fontSize:16,
 
    color: "white",
 
    fontWeight: "bold",
 
    paddingLeft: 10,
 
    paddingRight: 10
 
  },
 
  textDesign: {
 
    backgroundColor: "blue",
 
    height: 30,
 
    width : '85%',
 
    borderColor: "white",
 
    borderWidth: 1,
 
    borderRadius: 20,
 
    overflow: "hidden",
 
    fontSize: 20,
 
    color: "white",
 
    fontWeight: "bold",
 
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 
 });
 


export default StepTrackerScreen;
