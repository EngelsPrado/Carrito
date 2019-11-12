import React, { Component,Fragment,useContext } from 'react';
import { Container, Grid } from 'semantic-ui-react'
import Menu from '../Menu'
import ProductList from '../ProductList'
import CartList from '../CartList'
import Order from '../Order'
import style from './App.css'
import firebase, {firestore,auth} from'./../firebase'
import Header from './Header'
import { UserContext } from './../../Providers/UserProvider'
import Login from '../InicioSesion/Login';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openOrder: false,
      total: 0,
      sum: 0,
      products: [],
      cart: [],
      user:null
    }

    this.handleSaveProduct = this.handleSaveProduct.bind(this)
    this.handlerAddProduct = this.handlerAddProduct.bind(this)
    this.handlerRemoveProduct = this.handlerRemoveProduct.bind(this)
    this.handlerOpenOrder = this.handlerOpenOrder.bind(this)
    this.handlerClearCart = this.handlerClearCart.bind(this)
  }


  
  componentDidMount =async ()=>{
    const datos= await firestore.collection("products").where("status",">",0).get();
    const prod= datos.docs.map(el=>{
      return el.data()
    })
    console.log(prod)
    this.setState(prevState=>({
      products:prod
    }))
    
    auth.onAuthStateChanged(user=>{
      console.log(user)
      this.setState({
        user
      })
    })
   

  }

  handlerClearCart() {

    console.log(this.state.cart)
    const cart=this.state.cart
    
    cart.forEach(val=>{
      console.log(val)

     firestore.collection("products").doc(val.doc).update({
       status:firebase.firestore.FieldValue.increment(-val.order)
     })

    })
    


    this.setState({
      cart: [],
      sum: 0,
      total: 0
    });
  }


  //Se agrega cuando le das el primer click
  sumProducts(array) {
    var total = 0
    console.log(array)
    array.forEach(product =>  total += product.order)
    this.setState({total: total})
    console.log("Total"+total);
  }

  sumTotal(array) {
    var sum = 0
    array.forEach(product => sum += product.total)
    this.setState({sum: sum})
  }

  handlerAddProduct(indexCart, indexProduct){
    var statusCopy = Object.assign({}, this.state);
    if (statusCopy.products[indexProduct].status > 0) {
      statusCopy.cart[indexCart].total += statusCopy.cart[indexCart].price
      statusCopy.cart[indexCart].order += 1
      statusCopy.products[indexProduct].status -= 1
      this.setState(statusCopy)
      this.sumProducts(statusCopy.cart)
      this.sumTotal(statusCopy.cart)
    } else {
      alert('Producto inexistente')
    }
  }

  handlerRemoveProduct(productId) {
    let product = this.state.products.find(p => p.id === productId);
    let indexProduct = this.state.products.findIndex(x => x.id === product.id)
    let cart = this.state.cart.find(p => p.id === productId)
    let indexCart = this.state.cart.findIndex(x => x.id === cart.id)

   

    var statusCopy = Object.assign({}, this.state);
    if(statusCopy.cart[indexCart].total === statusCopy.cart[indexCart].price ){
      statusCopy.sum -= statusCopy.cart[indexCart].price
      indexCart !== -1 && statusCopy.cart.splice( indexCart, 1 );
      statusCopy.total -= 1
     
      this.setState(statusCopy)
      alert('El producto fue eliminado del carrito de compras')
    } else {
      statusCopy.cart[indexCart].total -= statusCopy.cart[indexCart].price
      statusCopy.products[indexProduct].status += 1
      statusCopy.cart[indexCart].order -= 1
      statusCopy.total -= 1
      statusCopy.sum -= statusCopy.cart[indexCart].price
      this.setState(statusCopy)
    }
  }

  //Revisar este metodo
  handleSaveProduct(productId) {
    let product = this.state.products.find(p => p.id === productId);
    let indexProduct = this.state.products.findIndex(x => x.id === product.id)

    var productCart = {
      id: product.id,
      doc:product.doc ,
      name: product.name,
      img: product.picture,
      price: product.price,
      order: 1,
      total: product.price
    }

    var exist = this.state.cart.find(p => p.id === productId)
    console.log(exist)
    if (undefined !== exist && exist !== null) {
      let indexCart = this.state.cart.findIndex(x => x.id === exist.id)
      this.handlerAddProduct(indexCart, indexProduct)
      console.log("Segundo holis")
    }else{
      console.log("holissssss")
      var statusCopy = Object.assign({}, this.state);
      statusCopy.products[indexProduct].status -= 1
      this.sumProducts([productCart])
      this.sumTotal(statusCopy.cart)
      this.setState({
        cart: this.state.cart.concat([productCart]),
        statusCopy
      })
    }
  }

  handlerOpenOrder(event) {
    event.preventDefault()
   
    this.setState({ openOrder: true })
  }

  renderOpenOrder() {
    if (this.state.openOrder) {
      return (
        <Order
          sum={this.state.sum}
          onClearCart={this.handlerClearCart}
        />
      )
    }
  }
   
  render() {
   
    return (
      <Container className={style.root}>
        <Header></Header>
        <Menu/>
        {/* {  !this.state.user?<Login></Login> : */}
        <Grid>
          <Grid.Column width={12}>
            <ProductList
              products={this.state.products}
              onSaveProduct={this.handleSaveProduct}
              onIncrementProduct={this.handleSaveProduct}
              onRemoveProduct={this.handlerRemoveProduct}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <CartList
              items={this.state.cart}
              total={this.state.total}
              onOpenOrder={this.handlerOpenOrder}
            />
            {this.renderOpenOrder()}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default App;
