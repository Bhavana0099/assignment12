import React, {Component} from "react";
import './App.css';
import Filter from './Filter';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

//Initialized the list of products
let PRODUCTS = {
    '1' : {id: 1, name: 'Clarinet', category: 'Music', price: '$459.99'},
    '2' : {id: 2, name: 'Cello', category: 'Music', price: '$5000'},
    '3' : {id: 3, name: 'Tuba', category: 'Music', price: '$4500'},
    '4' : {id: 4, name: 'Chaise Lounge', category: 'Furniture', price: '$799'},
    '5' : {id: 5, name: 'Dining Table', category: 'Furniture', price: '$1300'},
    '6' : {id: 6, name: 'Bean Bag', category: 'Furniture', price: '$100'}
};

//Added the constructor and super() to the Products class and passed in props
class Product extends Component {
    constructor(props) {
        super(props);
        //Create two properties in state: filterText = ‘’ and products = PRODUCTS
        this.state = {
            products : PRODUCTS,
            filterText: ''
        }
    }
    handleFilter = (filterInput) => {
        this.setState(filterInput);
    }
    handleSave = (product) => {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        this.setState((prevState) => {
            let products = prevState.products
            product.price  = '$'+product.price;
            products[product.id] = product
            return { products }
        });
    }
    handleDestroy = (productId) => {
        this.setState((prevState) => {
             let products = prevState.products
             delete products[productId]
             return { products }
        });
    }
    render() {
        return (
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                <h1>My Inventory</h1>
                <Filter
                    onFilter={this.handleFilter}/>

                <ProductTable 
                    products={this.state.products} //Passing the state of the current list of products down to the ProductTable component
                    filterText={this.state.filterText} //Passing the state of filterText down to the ProductTable component
                    onDestroy={this.handleDestroy}/>
    
                <ProductForm
                    onSave={this.handleSave}/>
                </div>
            </div>
          </div>
        )
    }
}
export default Product;



