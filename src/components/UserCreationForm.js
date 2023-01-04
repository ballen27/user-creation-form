import React, { useState, useEffect } from 'react';
import '../styles/form.css'

function UserCreationForm() {

  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [occupationList, setOccupationList] = useState([])
  const [stateList, setStateList] = useState([])
  const [formIsValid, setFormIsValid] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    state: '',
  });

  useEffect(() => {
    fetch("https://frontend-take-home.fetchrewards.com/form")
    .then(response => response.json())
    .then(data => {
      setStateList(data.states)
      setOccupationList(data.occupations)

      setFormData({
        ...formData,
        occupation: data.occupations[0],
        state: data.states[0].name
      });
    })
  },[])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setFormIsValid(true)
      console.log("Success!", formData)

      fetch('https://frontend-take-home.fetchrewards.com/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) setSuccess(true)
        return response.json()
      })
      .catch(error => setError(error));
    } else {
      setFormIsValid(false)
      console.log('something is wrong', formData)
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.name) isValid = false;
    if (!formData.email) isValid = false;
    if (!formData.password) isValid = false;
    if (!formData.occupation) isValid = false;
    if (!formData.state) isValid = false;
    
    return isValid
  };

  return (
    <>
      <h1 className='register-form__title'>Create a user</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-form__label">
          Name
          <span title="Required" className="text-accent">*</span>
        </label>
        <input
          type="text"
          data-testid="name-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="register-form__input"
        />
        <br />
        <label className="register-form__label">
          Email
          <span title="Required" className="text-accent">*</span>
        </label>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="register-form__input"
        />
        <br />
        <label className="register-form__label">
          Password
          <span title="Required" className="text-accent">*</span>
        </label>
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="register-form__input"
        />
        <br />
        <label className="register-form__label">
          Occupation
          <span title="Required" className="text-accent">*</span>
        </label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="register-form__input"
        >
          {occupationList.map((occupation) => (
            <option key={occupation} value={occupation}>
              {occupation}
            </option>
          ))}
        </select>
        <br />
        <label className="register-form__label">
          State
          <span title="Required" className="text-accent">*</span>
        </label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="register-form__input"
        >
          {stateList.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit"  className={`register-form__button`}>
          Submit
        </button>
        {!formIsValid && (
          <p className="register-form__error"><span title="Required" className="text-accent">*</span> indicates a required field</p>
        )}
      </form>
      {success && (
        <div className='register-form__success'>
          Success! The form has been submitted
        </div>
      )}
      { error && (
        <div className='register-form__submit-error'>
          There was an error submitting the form
        </div>
      )}
    </>
  );
}

export default UserCreationForm;
