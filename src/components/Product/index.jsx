import React,{useEffect,useState} from 'react'
import Format from '../numberFormat'
import { Card, Image, Label, Button } from 'semantic-ui-react'
import firebase, {firestore,auth} from'./../firebase'
import Login from '../InicioSesion/Login';
const uuidv4 = require('uuid/v4');

function Product(props) {

  const [user,setUser]=useState(null);
  const [id,setId]=useState('exampleModal'+uuidv4())
  useEffect(()=>{
     auth.onAuthStateChanged(user=>{
      console.log(user)
      setUser(user); 
    })
   
  

  })

  return(
    <Card style={{ marginTop: 15 }}>
      <Image size="small" src={props.picture}  />
      <Card.Content>
        <Card.Header style={{fontSize: 15}}>{props.name}</Card.Header>
        <Card.Meta>
          <Format number={props.price}/>
        </Card.Meta>
        <Card.Description>
          <Label>{props.marca}</Label>
          <Label>{props.status} en stock</Label>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#${id}`}>
            Detalles
          </button>
          <div class="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Detalles</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {
                    props.detalle
                  }
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                
                </div>
              </div>
            </div>
          </div>
        </Card.Description>
      </Card.Content>
      {
       user?
      <Card.Content extra>
        <Button
          basic
          compact
          color='blue'
          floated='right'
          onClick={props.onSaveProduct}
        >
          Agregar al carrito
        </Button>
      </Card.Content>:null}
      <Card.Content extra>
        { 
         user? 
        <Button.Group floated='right'>
          <Button
            compact
            onClick={props.onIncrementProduct}
            >+</Button>
          <Button
            compact
            onClick={props.onRemoveProduct}
            >-</Button>
        </Button.Group>:null}
      </Card.Content>
    </Card>
  )
}

export default Product
