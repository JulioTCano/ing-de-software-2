//--- Estructura de un componente ---//
//importar cabeceras y librerias 
import React from 'react';
import'./App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter  } from 'reactstrap';

//arreglo / base de datos
const data = [
  { id: 1, personaje:"Luffy", anime:"OnePiece"},
  { id: 2, personaje:"Zoro", anime:"OnePiece"},
  { id: 3, personaje:"Sukuna", anime:"JujutsuKaisen"},
  { id: 4, personaje:"Gojo", anime:"JujutsuKaisen"},
  { id: 5, personaje:"Naruto", anime:"Naruto"},
  { id: 6, personaje:"Pain", anime:"Naruto"},
];

//se transforma de clase a componente y su estructura
class App extends React.Component{

  //estado, se importa o se agregan los datos al componente
  state={
    data:data,
    modelActualizar:false,
    modalInsertar:false,
    form:{
      id:"",
      personaje:"",
      anime:"",
    },
  }

  mostrarModalActualizar = (dato) =>{
    this.setState({
      form:dato,
      modalActualizar:true
    })
  }
  
  cerrarModalActualizar=(dato) =>{
    this.setState({
      modalActualizar:false
    })
  };

  mostrarModalInsertar =() => {
    this.setState({
      modalInsertar:true,
    });
  };

  cerrarModalInsertar =()=>{
    this.setState({
      modalInsertar:false,
    });
  };

  editar =(dato)=>{
    var contador=0;
    var arreglo=this.state.data;
    arreglo.map((registro)=>{
      if(dato.id==registro.id){
        arreglo[contador].personaje=dato.personaje;
        arreglo[contador].anime=dato.anime;
      }
      contador++;
    });
    this.setState({data:arreglo, modalActualizar:false});
  };

  eliminar =(dato)=>{
    var opcion = window.confirm("Estas seguro que deseas ELIMINAR el elemento "+dato.id);
    if(opcion == true ){
      var contador =0;
      var arreglo = this.state.data;
      arreglo.map((registro)=>{
        if(dato.id == registro.id){
        arreglo.splice(contador,1);
      }
      contador++;
    });
    this.setState({data:arreglo, modalActualizar:false});
    }
    };

  insertar = ()=>{
    var valorNuevo = {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({data:lista, modalInsertar:false});
  }
  
  handleChange = (e) =>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render(){
    //return 
    return(
      <>
      <Container>
        <br/>
        <Button color="success" 
        onClick={()=>this.mostrarModalInsertar()}
        >Insertar Nuevo personaje</Button>
        <br/><br/>
        <Table>
          <thead>
            <th>Id</th>
            <th>Personaje</th>
            <th>Anime</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {this.state.data.map((elemento)=>(
              <tr>
                
                <td>{elemento.id}</td>
                <td>{elemento.personaje}</td>
                <td>{elemento.anime}</td>
                <td> <Button color="primary" onClick={()=>this.mostrarModalActualizar(elemento)}> Editar </Button> {""}
                <Button color ="danger" 
                onClick={()=>this.eliminar}> Eliminar </Button></td>               
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
               Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
            
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
               Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
               Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
             
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
            
      </> )
  }
}
//se exporta el componente
export default App;