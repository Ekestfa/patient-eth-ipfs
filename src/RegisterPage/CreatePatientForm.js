
import React, { useState } from 'react';
import '../App/App.scss';
import useForm from './useForm';
import validate from './validateRegister';
import {default as Web3} from 'web3';
import ipfs from '../App/ipfs';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import patientindex_artifacts from '../abi/PatientIndex'
import React from 'react';
import './App.scss';
import useForm from './useForm';
import validate from './validateRegister';


const CreatePatientForm = (props) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
    fname:"",
    surname:"",
    email:"",
    age:"",
    sex:"",
    id:"",
    ins:"",
    message:""
  }

  const {handleSubmit, handleChange, values, errors} = useForm(submit,INITIAL_STATE,validate);

  function submit(){
    console.log("submitted successfully")
  }

    return(
<div class="col-lg-3 mt-1 mb-1">
<div class="card card-profile-signup p-1">
  <form onSubmit={handleSubmit} className='formbase' noValidate>
    <div class="card-body">
      <h5 class="card-title">Create your profile</h5>
      <div class="form-group">
        <label for="username">Username</label>
        <input name="username"
               value={values.username}
               type="text" 
               class="form-control" 
               id="sign-up-username" 
               required="required"
               onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input name="password"
               value={values.password}
               type="password" 
               class="form-control" 
               id="sign-up-password" 
               required="required"
               onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div class="form-group">
        <label for="name">First Name</label>
        <input type="text" 
               name="fname"
               value={values.fname}
               class="form-control" 
               id="sign-up-name"
               onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input name="surname"
               value={values.surname}
               type="text" class="form-control" 
               id="sign-up-srname"
               onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" 
               value={values.email}
               name="email" 
               class="form-control" 
               id="sign-up-email"
               onChange={handleChange}
               
        />
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input type="text"
               value={values.age}
               name="age" class="form-control" 
               id="sign-up-age"
               onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="sex">Sex</label>
        <input type="text"
               value={values.sex}
               name="sex" 
               class="form-control" 
               id="sign-up-sex"
               onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="id">Identity No.</label>
        <input type="text"
               value={values.id}
               name="id" class="form-control" 
               id="sign-up-idno"
               onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="ins">Insurance No.</label>
        <input type="text"
               name="ins" 
               value={values.ins}
               class="form-control" 
               id="sign-up-insno"
               onChange={handleChange}
        />
      </div>
      {/* <div class="form-group">
        <label for="username">Short intro</label>
        <textarea class="form-control" id="sign-up-intro" rows="2"></textarea>
      </div> */}
      <p>ETH Address:
        <span class="eth-address"></span>
        <input type="text"
               name="ethaddress" 
               class="form-control" id="sign-up-eth-address" 
               value={props.message} 
               disabled
               onChange={handleChange}
        />
      </p>
      <button type="submit" class="btn btn-primary" id="sign-up-button">Sign Up</button>
    </div>
  </form>
</div>
</div>
    );
}

export default CreatePatientForm;
