import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import InLineError from '../messages/InLineError';
import '../../style/modalContentStyle.css';
import axios from 'axios';
import Validator from "validator";
import DatabaseBoxError from '../messages/DatabaseBoxError'


class ImoneAdd extends Component {

  state = {
    data: {
      Pavadinimas: '' ,
      Adresas: '',
      Telefono_numeris: ''
    },
    errors: {}
  };

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
      url: `/List/Companies/add`
    })
    .then(response => {
      if(response.status === 200)
        console.log("Sekmingai pridetas");
        this.props.history.push(`/List/Companies`);
        window.location.reload();

    })
    .catch(err => {
      this.setState( { errors: err.response.data.errors });
    });
  }

  componentDidMount() {
    document.getElementById('myModal').style.display = "block";
  }

  closeModal = _ => {
    document.getElementById('myModal').style.display = "none";
    this.props.history.push(`/List/Companies`);
  }


  render () {
      const { errors } = this.state;
      return (
        <div id="myModal" className="modal">
            <div className="modalContent">
              <div className="closeCursor" onClick={this.closeModal}>&times;</div>
              {errors.globalErr && (<DatabaseBoxError text={errors.globalErr.sqlMessage}/>)}
                <Message
                  attached
                  header='Add new company'
                />
              <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.Pavadinimas}>
                  <label>Name*</label>
                  <input name="Pavadinimas" onChange={this.onChange} />
                  {errors.Pavadinimas && <InLineError text={errors.Pavadinimas} />}
                </Form.Field>
                <Form.Field error={!!errors.Adresas}>
                  <label>Address*</label>
                  <input name="Adresas" onChange={this.onChange} />
                  {errors.Adresas && <InLineError text={errors.Adresas} />}
                </Form.Field>
                <Form.Field error={!!errors.Telefono_numeris}>
                  <label>Phone*</label>
                  <input name="Telefono_numeris" onChange={this.onChange} />
                  {errors.Telefono_numeris && <InLineError text={errors.Telefono_numeris} />}
                </Form.Field>
                <Button type='submit'>Add</Button>
            </Form>
      </div>
    </div>
    );
  }
}

export default ImoneAdd;
