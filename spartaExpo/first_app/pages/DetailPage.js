import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
export default function DetailPage() {
  const tip = {
    idx: 9,
    category: '재테크',
    title: '렌탈 서비스 금액 비교해보기',
    image:
      'https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Frental.png?alt=media&token=',
    desc: '요즘은 정수기, 공기 청정기, 자동차나 장난감 등 다양한 대여서비스가 활발합니다. 사는 것보다 경제적이라고 생각해 렌탈 서비스를 이용하는 분들이',
    date: '2020.09.09',
  };
  const popup = () => {
    Alert.alert('팝업!!');
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
        <TouchableOpacity style={styles.button} onPress={() => popup()}>
          <Text style={styles.buttonText}>팁 찜하기</Text>
        </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: 'deeppink',
    borderRadius: 7,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
