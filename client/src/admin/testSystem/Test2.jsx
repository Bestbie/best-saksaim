import React from 'react'; // import React จากไลบรารี react
import { View, Text, Image } from 'react-native'; // import {Image,View, Text} จากไลบรารี react-native

export default function Test2() { //คำสั่ง export คือการนุญาติให้ไฟล์อื่นๆ สามารถใช้งาน Test2 Componentอื่นๆ
  return (
    <View>
      <Image source={{ uri: '/logo512.png' }} style={{ width: 100, height: 100 }} />
      <Text>
        เนื้อหาที่แสดงใน Test2 Component!!!
      </Text>
    </View>
    //บรรทัดที่ 6-11 คำสั่ง JSX ที่ใช้แสดงเนื้อหาของ Component
    //บรรทัดที่ 7 แสดงรูปภาพด้วย Image Component โดยใช้ Tag <Image /> ด้วยมี uri:เป็นตัวเรียนรูปภาพจาก '/logo512.png' และมี style กำหนดขนาด กว้างและยาว = 100 (สังเกตว่า Image Componentอยู่ภายใน View Component)
  );
}
