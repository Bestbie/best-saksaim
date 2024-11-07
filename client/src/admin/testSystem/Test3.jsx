import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Test3() {
    return (
        <View style={styles.container}>
            <Text style={styles.body}>Hello World!!!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        flex: 1,
        justifyContent: "center"
    },
    body: {
        color: "white",
        fontSize: 50,
        textAlign: "center"
    }
});


// คำอธิบาย

// บรรทัดที่ 2 import {StyleSheet,View, Text} จากไลบรารี react-native
// บรรทัดที่ 6 กำหนดสไตล์ให้กับ View Component โดยใช้ข้อมูลที่อยู่ในออบเจ็กต์ styles.container (ออบเจ็กต์บรรทัดที่ 13)
// บรรทัดที่ 7 กำหนดสไตล์ให้กับ Text Component โดยใช้ข้อมูลจากออบเจ็กต์ style.body (ออบเจ็กต์บรรทัดที่ 18)
// บรรทัดที่ 12 ประกาศตัวแปร styles เก็บออบเจ็กต์ที่ได้จาก method StyleSheet.create
// บรรทัดที่ 13 ตั้งชื่อพร๊อกเพอร์ตี้ตามต้องการ ในที่นี้ตั้งชื่อเป็น container เนื่องจากต้องการนำไปกำหนดให้กับ View Component ซึ่งทำหน้าที่เป็น Container
// บรรทัดที่ 14 กำหนดให้พื้นหลังเป็นสีเทา
// บรรทัดที่ 15 กำหนดให้ความสูงเต็มขนาดหน้าจอ
// บรรทัดที่ 16 กำหนดเนื้อหาอยู่กึ่งกลาง (ในแนวตั้ง)
// บรรทัดที่ 18 ตั้งชื่อพร๊อกเพอร์ตี้ตามต้องการ ในที่นี้ตั้งชื่อเป็น body จุดประสงค์ คือ เก็บออบเจ็กต์สำหรับปรับแต่งข้อความใน Text Component
// บรรทัดที่ 19 กำหนดให้ตัวหนังสือเป็นสีขาว
// บรรทัดที่ 20 กำหนดให้ขนาดตัวอักษรเป็น 50 พอยต์
// บรรทัดที่ 21 กำหนดข้อความจัดอยู่กึ่งกลาง (ในแนวนอน)
