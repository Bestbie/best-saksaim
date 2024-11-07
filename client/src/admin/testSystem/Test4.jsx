// การแสดงค่าจากการคำนวณ (Expression) ใน JSX

import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
export default function Test4() {
  const data1 = 20;
  const data2 = 15; 
  return (
    <View>
      <Text style={StyleSheet.container}>
        Result: {data1+data2}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  body: {
    fontSize: 50,
    textAlign: "center"
  }
});

// บรรทัด 6 ประกาศตัวแปรที่ชื่อว่า data1 ที่เก็บตัวเลข 20
// บรรทัด 7 ประกาศตัวแปรที่ชื่อว่า data2 ที่เก็บตัวเลข 15
// บรรทัด 11 คำสั่ง { data1 + data2 } หมายถึงการนำค่าจากตัวแปร data1 ไปบวกกับค่าในตัวแปร data2 ได้ผลลัพธ์เท่าไหร่ ก็จะนำมาแสดงที่ Text Component

 