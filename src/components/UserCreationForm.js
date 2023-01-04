import React, { useState, useEffect } from 'react';
import '../styles/form.css'

function UserCreationForm() {

  const [dogImage, setDogImage] = useState(null)
  const [error, setError] = useState(null);
  // const [occupationList, setOccupationList] = useState(['tech'])
  // const [stateList, setStateList] = useState(['ca'])

    // 3. Create out useEffect function
  useEffect(() => {
    const fetchData = () => {
      // https://frontend-take-home.fetchrewards.com/form
      return fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => setDogImage(data.message))
    }
    fetchData()
  },[])

  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      occupation: '',
      state: '',
      });

  const [formIsValid, setFormIsValid] = useState(true)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
        // submit formData to server
        setFormIsValid(true)
        console.log("Success!", formData)
        fetch('https://httpbin.org/post', { 

          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)

        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => setError(error));
      } else {
        setFormIsValid(false)
        console.log('something is wrong', formData)
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.name) {
      isValid = false;
    }
    if (!formData.email) {
      isValid = false;
    } 
    if (!formData.password) {
      isValid = false;
    }
    if (!formData.occupation) {
      isValid = false;
    }
    if (!formData.state) {
      isValid = false;
    }

    return isValid
  };

  const occupationList = ['Tech', 'Sales'];
  const stateList = ['Alabama', 'Alaska', 'Arizona', 'Arkansas'];

  return (
    <>
    <h3>Create user</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-form__label">
          Name
          <span title="Required" className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
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
          id="email"
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
          id="password"
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
          id="occupation"
          data-testid="occupation-input"
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
          id="state"
          data-testid="state-input"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="register-form__input"
        >
          {stateList.map((state) => (
            <option key={state} value={state}>
              {state}
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
        <img alt="dog" src={dogImage} />
      </form>
    </>
  );
}

export default UserCreationForm;
