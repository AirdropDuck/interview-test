import React,{Component} from 'react';
import './index.css';
import Listitems from "./listitems";
import Category from "./Category";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            city: '',
            total: 0,
            tax: 0,
            totalwithTax: 0,
            validForm:[false,false,false,false],
            errorsMsg: {
                city: '',
                name: '',
                price: '',
                quantity: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        let validForm = this.state.validForm;
        let errors = this.state.errorsMsg;
        const numReg = /^\d*?$/;
        var spaReg = /^[ ]+$/;
        switch (name) {
            case 'quantity':
                if (!numReg.test(value) || value === ""){
                    errors.quantity = 'quantity not available';
                    validForm[0] = false;
                }
                else {
                    errors.quantity = '';
                    validForm[0] = true;
                }
                break;
            case 'price':
                if(!numReg.test(value) || value === ""){
                    errors.price = 'price not available';
                    validForm[1] = false;
                }
                else {
                    errors.price = '';
                    validForm[1] = true;
                }
                break;
            case 'name':
                if (spaReg.test(value) || value === ""){
                    errors.name = 'name not available';
                    validForm[2] = false;
                }
                else {
                    errors.name = '';
                    validForm[2] = true;
                }
                break;
            case 'city':
                if (!Category.city.includes(value)){
                    errors.city = 'city not available';
                    validForm[3] = false;
                }
                else {
                    errors.city = '';
                    validForm[3] = true;
                    this.setState({
                        city: value
                    });
                }
                break;
            default:
                break;
        }
        console.log(validForm)
        this.setState({errors, [name]: value})
    }

    addItem(event) {
        if (!this.state.validForm.includes(false)) {
            var newItem = {
                name: this.name.value,
                price: this.price.value,
                quantity: this.quantity.value,
                key: Math.round(Math.random()*100)
            };

            var newTotal = this.state.total + this.price.value * this.quantity.value;

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem),
                    total: newTotal
                };
            });

            this.name.value = "";
            this.price.value = "";
            this.quantity.value = "";
        }
        event.preventDefault();
    }

    taxCal(items){
        var total = this.state.total;
        var newTotal = this.state.total;
        var city = this.state.city;
        var tax = 0;
        var totalTax;
        items.map(item => {
            if (Category.food.includes(item.name) || (Category.cloth.includes(item.name) && city === 'NY')){
                newTotal = newTotal - item.price
            }
        })
        switch (city) {
            case "CY":
                tax = newTotal * 0.0975
                break;
            case "NY":
                tax = newTotal * 0.08875
                break;
            default:
                break;
        }
        totalTax = Number(total) + Number((Math.ceil(tax*20)/20).toFixed(2))
        return totalTax
    }

    render(){
        var items = this.state.items;
        var taxCal = this.taxCal(items);

        return (
            <div className="">
                <div className="">
                    food example: ['breads', 'cereals', 'rice', 'pasta', 'noodles', 'grains', 'milk', 'yoghurt', 'cheese', 'alternatives']
                    <br/>
                    cloth example: ['Jackets','coats', 'Trousers', 'shorts', 'underwear', 'suits', 'skirts', 'dresses', 'shoes', 'boots',
                    'slippers', 'boots', 'slippers', 'sweaters','waistcoats']
                    <form onSubmit={this.addItem}>
                        <input name='city' type="text" value={this.state.city} onChange={this.handleChange}
                               placeholder="enter City">
                        </input>
                        <input name='name' ref={(event) => this.name = event} onChange={this.handleChange}
                               placeholder="enter name">
                        </input>
                        <input name='price' ref={(event) => this.price = event} onChange={this.handleChange}
                               placeholder="enter price">
                        </input>
                        <input name='quantity' ref={(event) => this.quantity = event} onChange={this.handleChange}
                               placeholder="enter quantity">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <br/>
                error:
                <li>city: <b>{this.state.errorsMsg.city}</b></li>
                <li>name: <b>{this.state.errorsMsg.name}</b></li>
                <li>price: <b>{this.state.errorsMsg.price}</b></li>
                <li>quantity: <b>{this.state.errorsMsg.quantity}</b></li>

                <br/>
                City: {this.state.city}
                <br/>
                <Listitems entries={items}/>
                <br/>
                Total(Before Tax): {this.state.total}
                <br/>
                Total(After Tax): {taxCal}
            </div>
        );
    }
}

export default App;
