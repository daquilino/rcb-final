import React, { Component } from 'react';
import NavBar from './panels/NavBar';
import { Route, Link, Redirect } from 'react-router-dom';

const LandingPageContainer = {
	height: '100vh',
	width: '320px',
	backgroundImage: 'url(/images/avatars/landing-bg1.png)',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	color: 'white',
	border: '1px solid'
}

const LandingEmblem = {
	margin: '0 auto',
	width: '35%'
}

const GameDescriptionStyling = {
	paddingLeft: '2%'
}

const InputStyling = {
	color: 'black'
}

const SignUpModalStyling = {
	color: 'black'
}


class Landing extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	value: '',
    	name: '',
    	password: '',
    	confirmPassword: '',
			fireRedirect: false,

	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePasswordChange(event) {
  	this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
  	this.setState({confirmPassword: event.target.value});
  }

  handleSubmit(event) {
  	event.preventDefault();
  	console.log(this.props.socket);
  	let socket = this.props.socket;
  	
    if (this.state.value === '') {
    	alert("Please type in a nickname.");
    }
    else {
    	socket.emit("playerJoined", this.state.value);
    	this.setState({fireRedirect: true});
    	console.log('A name was submitted: ' + this.state.value);
    }
  }

  handleSignUpSubmit(event) {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.name);
    console.log('Password was submitted: ' + this.state.password);
    
    let socket = this.props.socket;
    let self = this;

    if (this.state.password === this.state.confirmPassword){
    	console.log('Both passwords match: ' + this.state.password + ' & ' + this.state.confirmPassword);

      //build data to send to back end
      var userInfo = {};
      userInfo.username = this.state.name;
      userInfo.password = this.state.password;
      userInfo.passwordConfirm = this.state.confirmPassword;
      console.log("data object built");
      console.log(userInfo);

      //Make post request to register new user
      $.ajax(
      {
        url: "/api/register",
        method: "POST",
        data: userInfo
      }).done(function(response)
      {
        if (response.success) {
          socket.emit("playerJoined", self.state.name);
          self.setState({fireRedirect: true});
          console.log(self.state.name);
          $(".modal-backdrop").remove();

        }
        else {
          alert("Player did not sign up");
        }
      });
    }
    else {
    	console.log('Please make sure both password inputs are identical');
    }
    
  }


	render() {

		if (this.state.fireRedirect === true) {
			return <Redirect to='/lobby' />

		} else {
			
		

		return (
			<div className="container-fluid" style={LandingPageContainer}>
				<NavBar socket={this.props.socket} />

				<div className="col-xs-12">
					<div className="row">
						<div className="col-xs-12" >
							<img src={"/images/avatars/emblem.png"} alt="Wrong" className="img-responsive" style={LandingEmblem} />
						</div>

						<div className="row">
							<div className="col-xs-12">
								<h4 id="game-description" style={GameDescriptionStyling}>Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
								Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
								i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst. 
								Mange webside- og sideombrekkingsprogrammer
								</h4>
							</div>
						</div>	
					</div>
				</div>
				
				<div className="col-xs-12">
					<div className="row">
						<div className="col-xs-10 col-xs-offset-1 text-center">
							<form onSubmit={this.handleSubmit}>
								<h3>Play as a Guest or sign up below!</h3>
								<div className="input-group">
			          	<input type="text" className="form-control" placeholder="Nickname" value={this.state.value} onChange={this.handleChange} style={InputStyling}/>
			       			<span className="input-group-btn">
			       				<button type="submit" value="Submit" className="btn btn-default" style={InputStyling}>Go</button>
			       			</span>
			       		</div>
				      </form>

				      <div className='col-xs-12' data-toggle="modal" data-target="#signUpModal">
			        	<h1>Sign Up Now!</h1>
			        </div>

			        <div className="modal fade" id="signUpModal">
	              <div className="modal-dialog" style={SignUpModalStyling}>
	                <div className="modal-content">
	                  <div className="modal-header">
	                    <h3 className="modal-title pull-left">Sign Up</h3>
	                    <button type="button" className="close" data-dismiss="modal" title="Close"> 
	                    	<span className="glyphicon glyphicon-remove"></span>
	                    </button>
	                  </div>

	                  <div className="modal-body">
	        						<form action="/api/register" method="POST" onSubmit={this.handleSignUpSubmit}>
	        							<div className="form-group">
		        							<label className="pull-left" htmlFor="userName">
		        								Name:
		        							</label>
		      								<input type="text" name="username" className="form-control" placeholder="Username" value={this.state.name} onChange={this.handleNameChange} />
	      								</div>

	      								<div className="form-group">
		        							<label className="pull-left" htmlFor="signUpPassword">
		        								Password:
		        							</label>
		        							<input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}  />
	        							</div>

	        							<div className="form-group">
		        							<label className="pull-left" htmlFor="signUpConfirmPassword">
		        								Confirm Password:
		        							</label>
		        							<input type="password" name="passwordConfirm" className="form-control" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
	        							</div>

	        							<button type="submit" value="Submit" className="btn btn-default">Submit</button>
	        							
	        						</form>
	                  </div>

	                </div>
	              </div>
            	</div>

						</div>
					</div>
				</div>
			</div>

		  
		)
	}}
}
export default Landing;

// <Link to="/signup"><h1>SIGN UP NOW</h1></Link>

// <footer class="footer">
// 		    <div class="container">
// 		      <div class="row">
// 		        <div class="col-xs-12">
// 		          <div class="col-xs-10 col-xs-offset-1 text-center footer-padding-copyright footer-text">
// 		            <p>Copyright 2017 | NEW TITLE HERE</p>
// 		            <div class="col-xs-6 footer-padding">
// 		              <h4>Team Members:</h4>
// 		              <p>Doug Aquilino</p>
// 		              <p>Daniel Cross</p>
// 		              <p>Christian Liguori</p>
// 		              <p>Thomas Yu</p>
// 		            </div>
// 		            <div class="col-xs-6 footer-padding">
// 		              <h4>Check Us Out</h4>
// 		              <p><a href="https://github.com/dlcNine/rcb-final" target="_blank">Github</a></p>
// 		            </div>
// 		          </div>
// 		        </div>
// 		      </div>
// 		    </div>
// 		  </footer>
