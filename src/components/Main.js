import React, { Component } from "react";
import './Main.css'

import Form from "./Form";
import Tarefas from "./Tarefas";


export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1, // index: -1 não estou editando / index !== -1 editando a tarefa
  }

  // Função do react que é executadp quado o componente é contruído
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if(!tarefas) return;

    this.setState({
      tarefas,
    })
  }

  // Função do react que é executada quando o componente é atualizado
  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if(tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas } = this.state;
    let { novaTarefa, index } = this.state;

    novaTarefa = novaTarefa.trim(); //o Trim() elimina os espaços do começo e final da string

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    if(index === -1 ) {
      this.setState({
        tarefas: [...tarefas, novaTarefa],
        novaTarefa: '',
      })
    } else {
      tarefas[index] = novaTarefa;

      this.setState({
        tarefas,
        novaTarefa: '',
        index: -1,
      })

      localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    })
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index]
    })
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    tarefas.splice(index, 1)

    this.setState({
      tarefas,
    })

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tarefas={tarefas}
        />
      </div>
    );
  };
}
