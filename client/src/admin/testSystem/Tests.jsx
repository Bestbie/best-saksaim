import React from 'react'  // import React จากไลบรารี react
import { View, Text } from 'react-native'; // import {View, Text} จากไลบรารี react-native

const Tests = () => { //กำหนด Function Component โดยประกาศ Tests ในแบบ Function
  return (  //return ส่วนติดต่อกับผู้ใช้
    <View> 
      <Text>Hello World!</Text> 
    </View>
    //บรรทัดที่ 6-8 เป็นเนื้อหาที่แสดงใน Component
  )
}
export default Tests

