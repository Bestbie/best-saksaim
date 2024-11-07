import React from "react";  // import React จากไลบรารี react
import { StyleSheet, Text, View } from 'react-native';  // import {StyleSheet,View, Text} จากไลบรารี react-nativec
export default function Test1() { //คำสั่ง export คือการนุญาติให้ไฟล์อื่นๆ สามารถใช้งาน Test1 Componentอื่นๆ
    return (    //บรรทัดที่ 4-8 returnส่วนติดต่อผู้ใช้ เป็นเนื้อหาที่แสดงใน Test1 Component
        <View style={ styles.container }>
            <Text style={{ fontSize: 50 }}>สวัสดี React Native</Text> 
        </View>
    //บรรทัดที่ 6 ปรับแต่งข้อความ โดยการกำหนดตัวอักษรให้มีขนาด 50
    );
}
const styles = StyleSheet.create({  //ประกาศตัวแปร styles เก็บออบเจ็กต์ที่ได้จาก method StyleSheet.create() ซึ่งออบเจ็กต์ที่เราได้เราจะใช้เพื่อตกแต่งหน้าตาของ Component
    container: { //ตั้งชื่อพร๊อกเพอร์ตี้ สำหรับเก็บออบเจ็กต์สำหรับปรับแต่งส่วนต่างๆ ของ Component ในที่นี้ตั้งชื่อพร๊อกเพอร์ตี้เป็น container
        flex: 1, // ขยายเต็มพื้นที่
        backgroundColor: 'lightblue', //กำหนดสี้พื้นหลังเป็นสีฟ้าอ่อน
        alignItems: 'center', // จัดตำแหน่ง alignItems ให้อยู่กึ่งกลางในแนวแกนขวาง
        justifyContent: 'center', //จัดตำแหน่ง justifyContent ให้อยู่กึ่งกลางในแนวแกนหลัก
        //บรรทัดที่ 13-16 รายละเอียดของอบเจ็กต์ที่ใช้ปรับแต่งหน้าตา Component
    },
});