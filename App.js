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
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1"; // npm install uuid --save

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
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
            onSubmitEditing={this._addToDo} // 키패드에서 return 키를 눌렀을 때
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* toDos가 배열이었다면, toDos.map(toDo => <ToDo />) 식으로 넘김 */}
            {Object.values(toDos)
              .sort((a, b) => {
                return a.id < b.id;
              })
              .map(toDo => (
                <ToDo
                  key={toDo.id}
                  {...toDo}
                  deleteToDo={this._deleteToDo}
                  uncompleteToDo={this._uncompleteToDo}
                  completeToDo={this._completeToDo}
                  updateToDo={this._updateToDo}
                />
              ))}
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

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();

        // 새로운 object 생성
        const newToDoObject = {
          // ID를 대괄호로 감싸야 변수 값으로 쓸 수 있음
          // ES6에서 추가된 Computed(Dynamic) Property Name
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };

        // 이전 state + 새로운 object
        const newState = {
          ...prevState,
          newToDo: "", // 입력 창 비우기
          toDos: {
            ...prevState.toDos, // 이전 to dos
            ...newToDoObject // 새로운 to do
          }
        };
        return { ...newState };
      });
    }
  };

  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      console.log(id);
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      return { ...newState };
    });
  };

  // 나머지 state는 그대로 가져가고, isCompleted만 덮어씀
  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      return { ...newState };
    });
  };
  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      return { ...newState };
    });
  };

  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDo,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      };
      return { ...newState };
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
