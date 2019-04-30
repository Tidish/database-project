import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import InLineError from '../messages/InLineError';
import '../../style/modalContentStyle.css';
import axios from 'axios';
import Validator from "validator";
import DatabaseBoxError from '../messages/DatabaseBoxError'


class RestoranasAdd extends Component {

  state = {
    data: {
      id_RESTORANAS: '',
      Pavadinimas:  '' ,
      Adresas: '',
      Telefono_numeris:  '',
      Vadovo_vardas:  '',
      Vadovo_pavarde: '',
      Vadovo_telefono_numeris:  '',
      Vadovo_pastas: '',
      dropdown: ''
    },
    errors: {},
    secondaryItems: []
  };

  componentDidMount() {
    document.getElementById('myModal').style.display = "block";
    this.getDropdown();
  }

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value}
  });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0) {
      this.addData(this.state.data);
    }
  }

  validate = (data) => {
    const errors = {};
    const errText = "Can't be empty";
    if(!this.state.data.Pavadinimas) errors.Pavadinimas = errText;
    if(!this.state.data.Adresas) errors.Adresas = errText;
    if(!Validator.isMobilePhone(this.state.data.Telefono_numeris)) errors.Telefono_numeris = errText + " or a wrong number format";
    if(!this.state.data.Vadovo_vardas) errors.Vadovo_vardas = errText;
    if(!this.state.data.Vadovo_pavarde) errors.Vadovo_pavarde = errText;
    if(!Validator.isMobilePhone(this.state.data.Vadovo_telefono_numeris)) errors.Vadovo_telefono_numeris = errText + " or a wrong number format";
    if(!Validator.isEmail(this.state.data.Vadovo_pastas)) errors.Vadovo_pastas = errText + " or an invalid email";
    return errors;
  }

  addData = (data) => {
    axios({
      method: 'post',
      data: data,
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
      url: `/Restaurants/add`
    })
    .then(response => {
      if(response.status === 200)
        console.log("Sekmingai pridetas");
        this.props.history.push(`/Restaurants`);
        window.location.reload();

    })
    .catch(err => {
      this.setState( { errors: err.response.data.errors });
    });
  }

  closeModal = _ => {
    document.getElementById('myModal').style.display = "none";
    this.props.history.push(`/Restaurants`);
  }

  getDropdown = _ => {
    axios.get('/Companies')
    .then(response => {
      this.setState({
        secondaryItems: response.data.results
      });
      console.log(this.state.secondaryItems);
    })
    .catch(error => console.log(error));
  }

  render () {
      const { errors, data } = this.state;
      let dropdownItems = this.state.secondaryItems.map((dropdownItem) =>
           <option key={dropdownItem.id_IMONE} value={dropdownItem.id_IMONE}>{dropdownItem.Pavadinimas}</option>
       );
      return (
        <div id="myModal" className="modal">
            <div className="modalContent">
              <div className="closeCursor" onClick={this.closeModal}>&times;</div>
              {errors.globalErr && (<DatabaseBoxError text={errors.globalErr.sqlMessage}/>)}
              <Message
                  attached
                  header= "Add a new restaurant"
                />
                <Form onSubmit={this.onSubmit}>
                  <Form.Field error={!!errors.Pavadinimas}>
                    <label>{"Restaurant's Name"}</label>
                    <input name="Pavadinimas" placeholder={this.props.Pavadinimas} value={data.Pavadinimas}
                      onChange={this.onChange} />
                    {errors.Pavadinimas && <InLineError text={errors.Pavadinimas} />}
                  </Form.Field>
                  <Form.Field>
                    <label>{"Company"}</label>
                      <select name="dropdown" value={data.dropdown} onChange={this.onChange}>
                        {dropdownItems}
                      </select>
                  </Form.Field>
                  <Form.Field error={!!errors.Adresas}>
                    <label>Address</label>
                    <input name="Adresas" placeholder={this.props.Adresas} value={data.Adresas}
                      onChange={this.onChange} />
                    {errors.Adresas && <InLineError text={errors.Adresas} />}
                  </Form.Field>
                  <Form.Field error={!!errors.Telefono_numeris}>
                    <label>Phone</label>
                    <input name="Telefono_numeris" placeholder={this.props.Telefono_numeris} value={data.Telefono_numeris}
                      onChange={this.onChange} />
                    {errors.Telefono_numeris && <InLineError text={errors.Telefono_numeris} />}
                  </Form.Field>
                  <Form.Field error={!!errors.Vadovo_vardas}>
                    <label>Vadovo vardas</label>
                    <input name="Vadovo_vardas" placeholder={this.props.Vadovo_vardas} value={data.Vadovo_vardas}
                      onChange={this.onChange} />
                    {errors.Vadovo_vardas && <InLineError text={errors.Vadovo_vardas} />}
                  </Form.Field>
                  <Form.Field error={!!errors.Vadovo_pavarde}>
                    <label>Vadovo pavarde</label>
                    <input name="Vadovo_pavarde" placeholder={this.props.Vadovo_pavarde} value={data.Vadovo_pavarde}
                      onChange={this.onChange} />
                    {errors.Vadovo_pavarde && <InLineError text={errors.Vadovo_pavarde} />}
                  </Form.Field>
                  <Form.Field error={!!errors.Vadovo_telefono_numeris}>
                    <label>Vadovo telefono numeris</label>
                    <input name="Vadovo_telefono_numeris" placeholder={this.props.Vadovo_telefono_numeris} value={data.Vadovo_telefono_numeris}
                      onChange={this.onChange} />
                    {errors.Vadovo_telefono_numeris && <InLineError text={errors.Vadovo_telefono_numeris} />}
                  </Form.Field>
                  <Form.Field error={!!errors.Vadovo_pastas}>
                    <label>Vadovo pastas</label>
                    <input name="Vadovo_pastas" placeholder={this.props.Vadovo_pastas} value={data.Vadovo_pastas}
                      onChange={this.onChange} />
                    {errors.Vadovo_pastas && <InLineError text={errors.Vadovo_pastas} />}
                  </Form.Field>
                  <Button type='submit'>Add</Button>
              </Form>
            </div>
          </div>
      );
  }
}

export default RestoranasAdd;
