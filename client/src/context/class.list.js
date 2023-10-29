import React, { Component } from 'react';

// Define la clase Nodo para representar los elementos de la lista.
class Nodo {
  constructor(id, componente) {
    this.id = id;
    this.componente = componente;
    this.anterior = null;
    this.siguiente = null;
  }
}

// Define la clase ListaDobleEnlazada para administrar la lista.
class ListaDobleEnlazada {
  constructor() {
    this.primerNodo = null;
    this.ultimoNodo = null;
    this.tamaño = 0;
  }

  // Agregar un componente al final de la lista.
  agregarAlFinal(id, componente) {
    const nuevoNodo = new Nodo(id, componente);
    if (this.tamaño === 0) {
      this.primerNodo = nuevoNodo;
      this.ultimoNodo = nuevoNodo;
    } else {
      nuevoNodo.anterior = this.ultimoNodo;
      this.ultimoNodo.siguiente = nuevoNodo;
      this.ultimoNodo = nuevoNodo;
    }
    this.tamaño++;
  }

  // Mover un componente hacia adelante en la lista según su ID.
  moverAdelante(id) {
    let nodoActual = this.primerNodo;
    while (nodoActual) {
      if (nodoActual.id === id && nodoActual.siguiente) {
        const nodoSiguiente = nodoActual.siguiente;
        const nodoAnterior = nodoActual.anterior;

        if (nodoAnterior) {
          nodoAnterior.siguiente = nodoSiguiente;
        } else {
          // Si es el primer nodo, actualiza el primer nodo.
          this.primerNodo = nodoSiguiente;
        }

        nodoSiguiente.anterior = nodoAnterior;
        nodoActual.siguiente = nodoSiguiente.siguiente;
        nodoActual.anterior = nodoSiguiente;
        nodoSiguiente.siguiente = nodoActual;

        if (nodoActual === this.ultimoNodo) {
          // Si es el último nodo, actualiza el último nodo.
          this.ultimoNodo = nodoSiguiente;
        }

        break;
      }
      nodoActual = nodoActual.siguiente;
    }
  }

  // Mover un componente hacia atrás en la lista según su ID.
  moverAtras(id) {
    let nodoActual = this.primerNodo;
    while (nodoActual) {
      if (nodoActual.id === id && nodoActual.anterior) {
        const nodoAnterior = nodoActual.anterior;
        const nodoSiguiente = nodoActual.siguiente;

        if (nodoSiguiente) {
          nodoSiguiente.anterior = nodoAnterior;
        } else {
          // Si es el último nodo, actualiza el último nodo.
          this.ultimoNodo = nodoAnterior;
        }

        nodoAnterior.siguiente = nodoSiguiente;
        nodoActual.anterior = nodoAnterior.anterior;
        nodoActual.siguiente = nodoAnterior;
        nodoAnterior.anterior = nodoActual;

        if (nodoActual === this.primerNodo) {
          // Si es el primer nodo, actualiza el primer nodo.
          this.primerNodo = nodoAnterior;
        }

        break;
      }
      nodoActual = nodoActual.siguiente;
    }
  }

  // Obtener el tamaño de la lista.
  obtenerTamaño() {
    return this.tamaño;
  }

  // Obtener un arreglo con los componentes de la lista.
  obtenerComponentes() {
    const componentes = [];
    let nodoActual = this.primerNodo;
    while (nodoActual) {
      componentes.push(nodoActual.componente);
      nodoActual = nodoActual.siguiente;
    }
    return componentes;
  }
}

class ListaDobleEnlazadaComponent extends Component {
  constructor() {
    super();
    this.lista = new ListaDobleEnlazada();
    this.state = {
      componenteNuevo: null,
      componentes: [],
    };
  }

  agregarComponente = () => {
    const { componenteNuevo } = this.state;
    if (componenteNuevo) {
      const nuevoId = Date.now(); // Genera un ID único basado en la marca de tiempo.
      this.lista.agregarAlFinal(nuevoId, componenteNuevo);
      this.setState({
        componenteNuevo: null,
        componentes: this.lista.obtenerComponentes(),
      });
    }
  };

  moverComponenteAdelante = (id) => {
    this.lista.moverAdelante(id);
    this.setState({
      componentes: this.lista.obtenerComponentes(),
    });
  };

  moverComponenteAtras = (id) => {
    this.lista.moverAtras(id);
    this.setState({
      componentes: this.lista.obtenerComponentes(),
    });
  };

  render() {
    const { componenteNuevo, componentes } = this.state;

    return (
      <div>
        <button onClick={() => this.setState({ componenteNuevo: <MiComponente /> })}>
          Crear Nuevo Componente
        </button>
        <button onClick={this.agregarComponente}>Agregar</button>
        <div>
          {componentes.map((componente, index) => (
            <div key={index}>
              {componente}
              <button onClick={() => this.moverComponenteAdelante(index)}>Mover Adelante</button>
              <button onClick={() => this.moverComponenteAtras(index)}>Mover Atrás</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Define un ejemplo de componente que puedas usar en ListaDobleEnlazadaComponent.
class MiComponente extends Component {
  render() {
    return <div>Mi Componente</div>;
  }
}

export default ListaDobleEnlazadaComponent;
