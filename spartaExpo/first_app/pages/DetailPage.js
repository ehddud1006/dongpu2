import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import * as Linking from 'expo-linking';
import { firebase_db } from '../firebaseConfig';
import Constants from 'expo-constants';
export default function DetailPage({ navigation, route }) {
  //초기 컴포넌트의 상태값을 설정
  //state, setState 뿐 아니라 이름을 마음대로 지정할 수 있음!
  const [tip, setTip] = useState({
    idx: 9,
    category: '재테크',
    title: '렌탈 서비스 금액 비교해보기',
    image:
      'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Frental.png?alt=media&token=',
    desc: '요즘은 정수기, 공기 청정기, 자동차나 장난감 등 다양한 대여서비스가 활발합니다. 사는 것보다 경제적이라고 생각해 렌탈 서비스를 이용하는 분들이',
    date: '2020.09.09',
  });
  useEffect(() => {
    console.log(route);
    //Card.js에서 navigation.navigate 함수를 쓸때 두번째 인자로 content를 넘겨줬죠?
    //content는 딕셔너리 그 자체였으므로 route.params에 고대~로 남겨옵니다.
    //즉, route.params 는 content죠!
    navigation.setOptions({
      //setOptions로 페이지 타이틀도 지정 가능하고
      title: route.params.title,
      //StackNavigator에서 작성했던 옵션을 다시 수정할 수도 있습니다.
      headerStyle: {
        backgroundColor: '#000',
        shadowColor: '#000',
      },
      headerTintColor: '#fff',
    });
    // setTip(route.params);
    const { idx } = route.params;
    firebase_db
      .ref('/tip/' + idx)
      .once('value')
      .then((snapshot) => {
        let tip = snapshot.val();
        setTip(tip);
      });
  }, []);
  const like = () => {
    // like 방 안에
    // 특정 사용자 방안에
    // 특정 찜 데이터 아이디 방안에
    // 특정 찜 데이터 몽땅 저장!
    // 찜 데이터 방 > 사용자 방 > 어떤 찜인지 아이디
    const user_id = Constants.installationId;
    firebase_db
      .ref('/like/' + user_id + '/' + tip.idx)
      .set(tip, function (error) {
        console.log(error);
        Alert.alert('찜 완료!');
      });
  };
  const share = () => {
    Share.share({
      message: `${tip.title} \n\n ${tip.desc} \n\n ${tip.image}`,
    });
  };
  const link = () => {
    Linking.openURL('https://spartacodingclub.kr');
  };
  return (
    // ScrollView에서의 flex 숫자는 의미가 없습니다. 정확히 보여지는 화면을 몇등분 하지 않고
    // 화면에 넣은 컨텐츠를 모두 보여주려 스크롤 기능이 존재하기 때문입니다.
    // 여기선 내부의 컨텐츠들 영역을 결정짓기 위해서 height 값과 margin,padding 값을 적절히 잘 이용해야 합니다.
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: tip.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.desc}>{tip.desc}</Text>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.button} onPress={() => like()}>
            <Text style={styles.buttonText}>팁 찜하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => share()}>
            <Text style={styles.buttonText}>팁 공유하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => link()}>
            <Text style={styles.buttonText}>외부 링크</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  image: {
    height: 400,
    margin: 10,
    marginTop: 40,
    borderRadius: 20,
  },
  textContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#eee',
  },
  desc: {
    marginTop: 10,
    color: '#eee',
  },
  button: {
    width: 100,
    marginTop: 20,
    padding: 10,
    marginHorizontal: '2%',
    borderWidth: 1,
    borderColor: 'deeppink',
    borderRadius: 7,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  bottomButtons: {
    display: 'flex',
    alignContent: 'space-around',
    flexDirection: 'row',
  },
});
