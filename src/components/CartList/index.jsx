import React, { Component } from 'react'
import Format from '../numberFormat'
import { Card, Icon, Button, Grid } from 'semantic-ui-react'

import Cart from '../Cart'

class CartList extends Component {
  constructor(props) {
    super(props)
  }

  numberFormat(amount, decimals) {
    decimals = decimals || 0;
    if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);
    amount = '' + amount.toFixed(decimals);
    var amount_parts = amount.split('.'), regexp = /(\d+)(\d{3})/;
    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
    return amount_parts.join('.');
  }

  render() {
    return(
      <Card>
        <Card.Content>
          <Card.Header>
            Carrito de Compras
            <Icon size="large"  />
          </Card.Header>
        </Card.Content>
        <Card.Content>
        {this.props.items.map(p => {
          return (
          <Cart
            key={p.id}
            img={p.img}
            name={p.name}
            total={this.numberFormat(p.total)}
            order={p.order}
          />
          )
        })}
        </Card.Content>
        <Card.Content extra>
          <Button
            basic
            color='green'
            compact
            size="medium"
            onClick={this.props.onOpenOrder}
            >Proceder al Pago ({this.props.total} productos)
          </Button>
        </Card.Content>
    
        {/* <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"> 
          <input type="hidden" name="cmd" value="_s-xclick"/>
          <input type="hidden" name="hosted_button_id" value="7EFYRT5JSBQH6"/>
          <table>
          <tr><td><input type="hidden" name="on0" value="Articulos"/>Articulos</td></tr><tr><td><select name="os0">
            <option value="1">1 $10.00 USD</option>
           </select> </td></tr>
           </table>
           <input type="hidden" name="currency_code" value="USD"/>
           <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
           <img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1"/>
          </form>
       */}

      </Card>
      
    )
  }
}

export default CartList;
