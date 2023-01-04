import React, { useState } from 'react';
import './form.css'

function UserCreationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    // submit formData to server
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <label htmlFor="email" className="register-form__label">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="register-form__input"
      />
      <br />
      <label htmlFor="password" className="register-form__label">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="register-form__input"
      />
      <br />
      <label htmlFor="confirmPassword" className="register-form__label">
        Confirm Password:
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="register-form__input"
      />
      <br />
      <button type="submit" className="register-form__button">
        Submit
      </button>
    </form>
  );
}

export default UserCreationForm;
