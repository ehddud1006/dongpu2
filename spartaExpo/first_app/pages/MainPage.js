import React, { useState, useEffect } from 'react';
import main from '../assets/main.png';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import data from '../data.json';
import Card from '../components/Card';
import Loading from '../components/Loading';
export default function MainPage() {
  console.disableYellowBox = true;
  //return 구문 밖에서는 슬래시 두개 방식으로 주석
  const [state, setState] = useState([]);
  //컴포넌트에 상태를 여러개 만들어도 됨
  //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
  //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
  const [ready, setReady] = useState(true);
  useEffect(() => {
    //뒤의 1000 숫자는 1초를 뜻함
    //1초 뒤에 실행되는 코드들이 담겨 있는 함수
    setTimeout(() => {
      setState(data);
      setReady(false);
    }, 1000);
  }, []);
  // let tip = data.tip;
  let tip = state.tip;
  let todayWeather = 10 + 17;
  let todayCondition = '흐림';
  //처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
  //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
  return ready ? (
    <Loading />
  ) : (
    /*
return 구문 안에서는 {슬래시 + * 방식으로 주석
*/
    <ScrollView style={styles.container}>
      <Text style={styles.title}>나만의 꿀팁</Text>
      <Text style={styles.weather}>
        오늘의 날씨: {todayWeather + '°C ' + todayCondition}{' '}
      </Text>
      <Image style={styles.mainImage} source={main} />
      <ScrollView
        style={styles.middleContainer}
        horizontal
        indicatorStyle={'white'}
      >
        <TouchableOpacity style={styles.middleButton01}>
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02}>
          <Text style={styles.middleButtonText}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03}>
          <Text style={styles.middleButtonText}>반려견</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton04}>
          <Text style={styles.middleButtonText}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
        {/* 하나의 카드 영역을 나타내는 View */}
        {tip.map((content, i) => {
          return <Card content={content} key={i} />;
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: '#fff',
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop: 50,
    //왼쪽 공간으로 부터 이격
    marginLeft: 20,
  },
  weather: {
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width: '90%',
    //컨텐츠의 높이 값
    height: 200,
    //컨텐츠의 모서리 구부리기
    borderRadius: 10,
    marginTop: 20,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf: 'center',
  },
  middleContainer: {
    marginTop: 20,
    marginLeft: 10,
    height: 60,
  },
  middleButton01: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: '#fdc453',
    borderColor: 'deeppink',
    borderRadius: 15,
    margin: 7,
  },
  middleButton02: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: '#fe8d6f',
    borderRadius: 15,
    margin: 7,
  },
  middleButton03: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: '#9adbc5',
    borderRadius: 15,
    margin: 7,
  },
  middleButtonText: {
    color: '#fff',
    fontWeight: '700',
    //텍스트의 현재 위치에서의 정렬
    textAlign: 'center',
  },
  middleButton04: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: '#f886a8',
    borderRadius: 15,
    margin: 7,
  },
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
});
