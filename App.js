import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: ""
  };
  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.title}>To Do App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"} // 키패드에서 return 키를 '다음'으로 설정할지 '완료'로 설정할지 등
            autoCorrect={false} // 자동완성 끄기
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* 스타일 넘기기 */}
            <ToDo text={"This is Test"} />
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
}

const styles = StyleSheet.create({
  // 뒷배경
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
  },
  // title 박스
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 40,
    marginBottom: 30,
    fontWeight: "100"
  },
  // card 박스
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      // Platform에 따라 그림자 적용
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  // input 박스
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  // to do list
  toDos: {
    alignItems: "center"
  }
});
