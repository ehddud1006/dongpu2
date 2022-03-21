//import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/auth";
import 'firebase/database';
//import "firebase/firestore";
//import "firebase/functions";
import 'firebase/storage';
// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: 'AIzaSyCT-Jyu6WZGCLLx5TQpgN6tO_fwzhMbHKQ',
  authDomain: 'sparta-myhoneytip-4690b.firebaseapp.com',
  databaseURL:
    'https://sparta-myhoneytip-4690b-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sparta-myhoneytip-4690b',
  storageBucket: 'sparta-myhoneytip-4690b.appspot.com',
  messagingSenderId: '953793229921',
  appId: '1:953793229921:web:a99f861318f0940d58a620',
  measurementId: 'G-4NYESLEE8E',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const firebase_db = firebase.database();
