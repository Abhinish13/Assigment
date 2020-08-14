import React from "react";
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],  
      id:0,
      name: '',
      email: '',
      password: ''
    };
  }
  

  componentDidMount() {
    axios.get('http://localhost/api')
    .then((res) => {
      this.setState({
        users:res.data,
        id:0,
        name: '',
        email: '',
        password: ''
      })
      console.log(res.data)
    })
  }
  
  nameChange = event => {
    this.setState({
      name:event.target.value
    })
  }
  emailChange = event => {
    this.setState({
      email:event.target.value
    })
  }
  passwordChange = event => {
    this.setState({
      password:event.target.value
    })
  }
  submit(event,id) {
    event.preventDefault()
    if(id === 0) {
      axios.post('http://localhost/api',{name:this.state.name,email:this.state.email,password:this.state.password}).then(()=>
      this.componentDidMount()
      )
      
    }else {
      axios.put(`http://localhost/api/${id}`,{name:this.state.name,email:this.state.email,password:this.state.password})
      .then(()=>
      this.componentDidMount()
      )
  }
}
  
  onDelete(id){
    axios.delete(`http://localhost/api/${id}`)
    .then(()=>{
      this.componentDidMount()
    })
 }

 onEdit(id){
   axios.get(`http://localhost/api/${id}`)
   .then((res)=>{
     this.setState({
       id: res.data._id,
       name:res.data.name,
       email:res.data.email,
       password:res.data.password
     })
   })
 }

  render() {
  return (
    <div className="row">
      <div className="col s6">
        <form onSubmit={(e) => this.submit(e,this.state.id)}>
          <div className="input-field col s12">
            <i className="material-icons prefix">person</i>
            <input value={this.state.name} onChange={(e) => this.nameChange(e)} type="text"  className="autocomplete" />
            <label htmlFor="autocomplete-input">Person Name</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">mail</i>
            <input  value={this.state.email } onChange={(e) => this.emailChange(e)} type="email"  className="autocomplete" />
            <label htmlFor="autocomplete-input">Email</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input value={this.state.password} onChange={(e) => this.passwordChange(e)}
              type="password"
              
              className="autocomplete"
            />
            <label htmlFor="autocomplete-input">Password</label>
          </div>

          <button
            className="btn waves-effect waves-light right"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
      <div className="col s6">
        <table>
          <thead>
            <tr>
              <th>
                <i className="material-icons prefix">person</i> Name
              </th>
              <th>
                <i className="material-icons prefix">mail</i> Email
              </th>
              <th>
                <i className="material-icons prefix">lock</i> Password
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
          {
            this.state.users.map(user=> 
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={(e)=>this.onEdit(user._id)}
                  className="btn waves-effect waves-light "
                  type="submit"
                  name="action"
                >
                  <i className="material-icons">edit</i>
                </button>
              </td>
              <td>
                <button onClick={(e)=>this.onDelete(user._id)}
                  className="btn waves-effect waves-light "
                  type="submit"
                  name="action"
                >
                  <i className="material-icons ">delete</i>
                </button>
              </td>
            </tr>
          )
          }

          </tbody>
        </table>
      </div>
    </div>
  );
}
}


export default App;
