import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  };

  render() {
    const { isCompleted, isEditing } = this.state;
    // const isCommpleted = this.state.isCompleted 와 동일
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              // style 여러개 넣을 때는 배열 사용
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}
          >
            This is Test To do
          </Text>
        </View>

        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _toggleComplete = () => {
    // setState는 첫번째 인자로 updater를 가짐
    // updater는 (state, props)을 인자로 가져서 state를 변화시킬 수 있음
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });

    // 아래처럼 쓸 수도 있지만,
    // render() 안에서 isCompleted 변수가 다른 용도로도 사용되므로 위와 같이 사용하는게 나을 듯 함.

    // const { isCompleted } = this.state;
    // this.setState({
    //   isCompleted: !isCompleted
    // });

    // 또는
    // this.setState({
    //   isCompleted: !this.state.isCompleted
    // });
  };

  _startEditing = () => {
    this.setState({
      isEditing: true
    });
  };

  _finishEditing = () => {
    this.setState({
      isEditing: false
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: { borderColor: "#bbb" }, // 완료한 경우 circle
  uncompletedCircle: { borderColor: "red" }, // 완료하지 않은 경우 circle
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  // 완료한 경우 text
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  // 완료하지 않은 경우 text
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    justifyContent: "space-between"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});
