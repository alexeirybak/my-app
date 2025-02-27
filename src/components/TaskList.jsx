import { Component } from "react";

export class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  addTask = () => {
    const { tasks, newTask } = this.state;
    if (newTask.trim()) {
      this.setState({
        tasks: [...tasks, newTask],
        newTask: "",
      });
    }
    console.log(tasks);
  };

  render() {
    return (
      <div>
        <h1>Список задач</h1>
        <input
          type="text"
          value={this.state.newTask}
          onChange={this.handleInputChange}
        />
        <button onClick={this.addTask}>Добавить задачу</button>
        <ul>
          {this.state.tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    );
  }
}
