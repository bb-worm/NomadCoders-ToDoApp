import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }

  static propTypes = {
    // check props
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func.isRequired
  };

  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ""
  };

  render() {
    // const isEditing = this.state.isEditing 와 동일
    const { isEditing, toDoValue } = this.state;
    const { isCompleted, text, id, deleteToDo } = this.props;

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
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              blurOnSubmit={true}
              onBlur={this._finishEditing}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            >
              {text}
            </Text>
          )}
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
            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
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
    const { id, isCompleted, completeToDo, uncompleteToDo } = this.props;
    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }

    // setState는 첫번째 인자로 updater를 가짐
    // updater는 (state, props)을 인자로 가져서 state를 변화시킬 수 있음
    // this.setState(prevState => {
    //   return {
    //     isCompleted: !prevState.isCompleted
    //   };
    // });

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

  _controlInput = text => {
    this.setState({ toDoValue: text });
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
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  input: {
    marginVertical: 20
  }
});
