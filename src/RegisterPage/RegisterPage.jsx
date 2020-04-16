import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
// import {ipfs} from '../_constants';
// import { userActions } from '../_actions';
import {userActions} from '../_actions'
import { store } from '../_helpers';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                ethadd: 'Please Enable Ethereum'
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ethereumButton = this.ethereumButton.bind(this);
        // store.subscribe(() => {
        //     // When state will be updated(in our case, when items will be fetched), 
        //     // we will update local component state and force component to rerender 
        //     // with new data.
                
        //     this.setState({
        //         user:{ethadd: this.props.changedEthAddr}
                
        //     });
        // });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password && user.ethadd) {
            this.props.register(user);
        }
    }

      

    ethereumButton(){
        if(ethereum){
        web3.eth.getAccounts((err, accounts) => {
          if (accounts.length === 0) {
              // there is no active accounts in MetaMask
              this.console.log('there is no active accounts in MetaMask')
          }else {
              // It's ok
              this.props.enableEthereum(ethereum.selectedAddress)
              this.setState({user:{ethadd:this.props.changedEthAddr}})
              web3.eth.getAccounts("ETHEREUM ACCOUNT:" + console.log);
              ethereum.on('accountsChanged',function(accounts){
                console.log("ethereum.on")
                this.setState({user:{ethadd:this.props.changedEthAddr}})
              });
          }
      });
  }
  ethereum.on('accountsChanged',function(accounts){
    this.setState({user:{ethadd:this.props.changedEthAddr}})
  })
    this.setState({user:{ethadd:this.props.changedEthAddr}})
}

    render() {
        const { registering, ethadd } = this.props;
        const { user, submitted } = this.state;
        console.log(user.ethadd)
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="ethacc">Ethereum Account:</label>
                        <input type="text"
                        name="ethadd" 
                        className="form-control" id="sign-up-eth-address" 
                        value={user.ethadd}
                        disabled
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
                <button onClick={this.ethereumButton} className="enableEtherumButton">Enable Ethereum</button>
            </div>
        );
    }
}


function mapStateToProps(state){
    // const { registering, ethadd } = state;//.registration;
    // return { registering, ethadd };
    // return { ethadd : state.ethadd}
    // const {ethadd} = state
    // console.log(ethadd)
    // return {ethadd}
    return {
        changedEthAddr: state.ethaddr
    }
}

const actionCreators = {
    // register: userActions.register,
    enableEthereum: userActions.enableEthereum
}

const connectedRegisterPage = connect(mapStateToProps, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };