import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import LikeCard from '../components/LikeCard';
import Card from '../components/Card';
import { firebase_db } from '../firebaseConfig';
import Constants from 'expo-constants';
import LikeLoading from '../components/LikeLoading';
export default function LikePage({ navigation, route }) {
  const [ready, setReady] = useState(true);
  const [tip, setTip] = useState([
    {
      idx: 3,
      category: '재테크',
      title: '잠자는 내 돈을 찾아라',
      image:
        'https://storage.googleapis.com/sparta-image.appspot.com/lecture/money1.png',
      desc: '‘새는 돈’에는 미처 몰랐던 카드 포인트, 휴면예금이나 환급금도 포함됩니다. 확실히 파악하지 못한 잠자는 돈을 찾아보고 자투리 돈들을 모으',
      date: '2020.09.09',
    },
    {
      idx: 4,
      category: '재테크',
      title: '할인행사, 한정할인판매 문구의 함정 탈출!',
      image:
        'https://storage.googleapis.com/sparta-image.appspot.com/lecture/money2.png',
      desc: '‘안 사면 100% 할인’이라는 말 들어보셨나요? 견물생심, 좋은 물건을 보면 사고 싶기 마련입니다. 특히 대대적인 ‘할인 행사’ 중인 대형 마',
      date: '2020.09.09',
    },
  ]);
  useEffect(() => {
    navigation.setOptions({
      title: '꿀팁 찜',
    });
    const user_id = Constants.installationId;
    // console.log(user_id);
    firebase_db
      .ref('/like/' + user_id)
      .once('value')
      .then((snapshot) => {
        console.log('파이어베이스에서 데이터 가져왔습니다!!');
        // console.log(snapshot.val());
        let gg = snapshot.val();
        let size = Object.keys(gg).length;
        console.log(size);
        console.log('ww');
        let arr = [];
        for (let go in gg) {
          // console.log(gg[go]);
          arr.push(gg[go]);
        }
        console.log(arr);
        // let tip = snapshot.val();
        console.log(typeof size);
        if (size >= 1) {
          console.log('ww');
          setTip(arr);
          setReady(false);
        }
      });
  }, []);
  const reload = () => {
    const user_id = Constants.installationId;
    firebase_db
      .ref('/like/' + user_id)
      .once('value')
      .then((snapshot) => {
        //snapshot에 값이 있는지 없는지 체크하는 exists 함수 사용
        if (snapshot.exists()) {
          let tip = snapshot.val();
          let tip_list = Object.values(tip);
          setTip(tip_list);
        } else {
          setReady(true);
          setTip([]);
        }
      });
  };
  return ready ? (
    <LikeLoading />
  ) : (
    <ScrollView style={styles.container}>
      {tip.map((content, i) => {
        return (
          <LikeCard
            key={i}
            reload={reload}
            content={content}
            navigation={navigation}
          />
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
