import {Component} from 'react';
import './App.css';
import axios from 'axios';

class Login extends Component {

  async buttonsubmit(){
    const json = { username: document.getElementById('email').value, password: document.getElementById('pwd').value};
    console.log(json)
    await axios
      .post("http://localhost:9001/",json)
      .then(res => {alert(res.data)})
      .catch(err => alert(err))         
  };

  render (){
    return(
        <div style={{backgroundColor:'#202833', minHeight:'100vh', overflowX:'hidden',verticalAlign:'50%'}}>
          <div className="container " >
          <div className="row">
            <div className="col"></div>
            <div className="col" style={{color:"#017d87",paddingTop:'150px'}}>
            <span >Email </span>
            <input className="Itext mt-2 mb-2" id="email" type="email" placeholder="Email" required  name="email" />
            <span >Password </span> 
            <input type="password" className="Itext mt-2 mb-3" id="pwd" placeholder="Password" required  name="pwd"/> 
            <div style={{textAlign:'center'}}>
                <input type="button" className="button" onClick={this.buttonsubmit.bind(this)} value="Login"/>
                 </div>  
                  <div className='row mt-3' style={{color:"#017d87",justifyContent:'center'}}>New account <a href="signup" className='ml-1' target="_self"> Signup </a></div>
                </div>
            <div className="col"></div>
          </div>
          </div>
                  

    </div>
    )
}
}
export default Login;