import '../css/Form.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    countryPhoneCode: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitBtnDisable, setIsSubmitBtnDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [apiAuth, setApiAuth] = useState("") //NOTE - https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
  const [countryDataList, setCountryDataList] = useState([])
  const [countryOption, setCountryOption] = useState(null)
  const [countryPhoneCode, setCountryPhoneCode] = useState([])
  const [states, setStates] = useState([])
  const [statesOption, setStatesOption] = useState(null)
  const [cities, setCities] = useState([])
  const [citiesOption, setCitiesOption] = useState(null)

  //SECTION - Get data from API  country,state,city
  const getCountry = async () => {
    try {
      const response = await fetch(`https://www.universal-tutorial.com/api/getaccesstoken`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "api-token": "7A3dFKSJKvdBwx-7U6j0wm4r8pbJiMZG4SSDOcpHZflV3LNZ4bmA457OhJf2VQiwPr0",
          "user-email": "sobhanparamanik2022@gmail.com"
        }
      })
      const { auth_token } = await response.json();
      const authorization = "Bearer " + auth_token
      setApiAuth(authorization)
      const countryRes = await fetch(`https://www.universal-tutorial.com/api/countries`, {
        method: "GET",
        headers: {
          "Authorization": authorization,
          "Accept": "application/json"
        }
      })
      const countryData = await countryRes.json()
      setCountryDataList(countryData)
    } catch (error) {
      //TODO - 
    }
  }
  const getState = async (country) => {
    try {
      const stateRes = await fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
        method: "GET",
        headers: {
          "Authorization": apiAuth,
          "Accept": "application/json"
        }
      })
      const data = await stateRes.json()
      setStates(data)

    } catch (error) {
      console.error(error);
    }
  }
  const getCity = async (state) => {
    try {
      const cityRes = await fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
        method: "GET",
        headers: {
          "Authorization": apiAuth,
          "Accept": "application/json"
        }
      })
      const data = await cityRes.json()
      setCities(data)

    } catch (error) {

    }
  }
  
//SECTION - Input validator and produce error
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.username) {
      newErrors.username = 'Username is required'

    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 5 characters long'
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.phoneNo) {
      newErrors.phoneNo = 'Phone Number is required'
    } else if (! /^[0-9]+$/.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Phone Number must be numeric'
    }
    else if (formData.phoneNo.length !== 10) {
      newErrors.phoneNo = 'Phone Number must be 10 digits'
    }
    if (!formData.country) newErrors.country = 'Country is required';
    if (states.length > 0 && !formData.state) {
     newErrors.state = 'State is required';
    }

    if (cities.length > 0 && !formData.city) {
       newErrors.city = 'City is required';
    }

    if (!formData.panNo) newErrors.panNo = 'Pan No. is required';
    if (!formData.aadharNo) {
      newErrors.aadharNo = 'Aadhar No. is required';
    } else if (! /^[0-9]+$/.test(formData.phoneNo)) {
      newErrors.aadharNo = 'Aadhar No. must be numeric'
    } else if (formData.aadharNo.length !== 12) {
      newErrors.aadharNo = 'Aadhar No. must be 12 digits'
    }

    if (!formData.password) {
      newErrors.password = {}
      newErrors.password.message = 'Password is required'
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = {}
      newErrors.password.message = 'Password is length at least 6'
    }
    if (!/[0-9]/.test(formData.password)) {
      if (!newErrors.password) {
        newErrors.password = {}
      }
      newErrors.password.number = 'Password must be contain a number'
    }

    if (!/[a-z]/.test(formData.password)) {
   
      if (!newErrors.password) {
        newErrors.password = {}
      }
      newErrors.password.lowercase = 'Password must be contain a lowercase letters'
    }
    if (!/[A-Z]/.test(formData.password)) {
      if (!newErrors.password) {
        newErrors.password = {}
      }
      newErrors.password.upperCase = 'Password must be contain a Uppercase letters'
    }
    if (!/[!@#$%^&*]/.test(formData.password)) {
      if (!newErrors.password) {
        newErrors.password = {}
      }
      newErrors.password.specialChar = "This field must contain at least one of the special characters: @#$&*%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//SECTION - form and error handlers 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      getState(value)

    }
    if (name === "state") {
      getCity(value)
    }
    setFormData({ ...formData, [name]: value });
    setTouched({
      ...touched,
      [name]: true
    })
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setIsSubmitBtnDisable(!validate())
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/submit', { state: formData })
    }
  };


//SECTION - useEffect

  useEffect(() => {
    if (countryDataList.length > 0) {
      const option = countryDataList.map((country, index) => (
        <option key={index} value={country.country_name}>
          {country.country_name}
        </option>
      ))
      setCountryOption(option)

      const phoneCodeOption = countryDataList.map((country, index) => (
        <option key={index} value={country.country_phone_code}>+{country.country_phone_code}</option>
      ))
      setCountryPhoneCode(phoneCodeOption)
    }
  }, [countryDataList])

  useEffect(() => {
    if (states.length > 0) {
      const option = states.map((state, index) => (
        <option key={index}>{state.state_name}</option>
      ))
      setStatesOption(option)

    }
  }, [states])


  useEffect(() => {
    if (cities.length > 0) {
      const option = cities.map((city, index) => (
        <option key={index}>{city.city_name}</option>
      ))
      setCitiesOption(option)

    }
  }, [cities])

  useEffect(() => {
    setIsSubmitBtnDisable(!validate())
  }, [formData])

  useEffect(() => {
    getCountry()
    // eslint-disable-next-line
  }, [])


  return (
    <div className='form-container'>
      <h2 className='form-heading'>React form with Validation</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='name-container'>
          <div className='input-container'>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && touched.firstName && <p className='error'>{errors.firstName}</p>}
          </div>
          <div className='input-container'>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && touched.lastName && <p className='error'>{errors.lastName}</p>}
          </div>
        </div>
        <div className='input-container'>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && <p className='error'>{errors.username}</p>}

        </div>
        <div className='input-container'>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && <p className='error'>{errors.email}</p>}
        </div>

        <div className='input-container'>
          <label>Phone Number</label>
          <select name='countryPhoneCode' value={formData.countryPhoneCode} onChange={handleChange} onBlur={handleBlur}>

            {countryPhoneCode && countryPhoneCode}
          </select>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phoneNo && touched.phoneNo && <p className='error'>{errors.phoneNo}</p>}
        </div>
        <div className='input-container'>
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange} onBlur={handleBlur}>
            <option value="" disabled >Select Country</option>
            {countryOption && countryOption}
          </select>
          {errors.country && touched.country && <p className='error'>{errors.country}</p>}
        </div>
        <div className='input-container'>
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange} onBlur={handleBlur}>
            <option value="" disabled >Select State</option>
            {formData.country && statesOption && statesOption}

          </select>
          {errors.state && touched.state && <p className='error'>{errors.state}</p>}
        </div>

        <div className='input-container'>
          <label>City</label>
          <select name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur} >
            <option value="">Select City</option>
            {formData.country && formData.state && citiesOption && citiesOption}
          </select>
          {errors.city && touched.city && <p className='error'>{errors.city}</p>}
        </div>

        <div className='input-container'>
          <label>Pan No.</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.panNo && touched.panNo && <p className='error'>{errors.panNo}</p>}
        </div>
        <div className='input-container'>
          <label>Aadhar No.</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.aadharNo && touched.aadharNo && <p className='error'>{errors.aadharNo}</p>}
        </div>
        <div >
          <div className='input-container'>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button type="button" className='cursor-pointer p-3' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className='password-error-container'>
            {errors.password && errors.password.message && touched.password && <p className='error'>{errors.password.message}</p>}
            {errors.password && errors.password.number && touched.password && <p className='error'>{errors.password.number}</p>}
            {errors.password && errors.password.lowercase && touched.password && <p className='error'>{errors.password.lowercase}</p>}
            {errors.password && errors.password.upperCase && touched.password && <p className='error'>{errors.password.upperCase}</p>}
            {errors.password && errors.password.specialChar && touched.password && <p className='error'>{errors.password.specialChar}</p>}
          </div>
        </div>
        <button type="submit" className='submit-btn' disabled={isSubmitBtnDisable}>
          Submit
        </button>
      </form>

    </div>
  )
}

export default Form