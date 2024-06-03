import '../css/UserDetails.css'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function UserDetails() {
    const location = useLocation();
    //NOTE - 
    if (!location.state) {
        return (
            <div className='Form-details-container'>
                <h1>Something went to wrong</h1>
                <Link to={"/"} className='back-to-home-link'> &#x2190; Back To Home</Link>

            </div>
        )
    }

    const { firstName,
        lastName,
        username,
        email,
        countryPhoneCode,
        phoneNo,
        country,
        state,
        city,
        panNo,
        aadharNo,
        password } = location.state
    return (
        <div className='Form-details-container'>
           <div className='heading-container'>
           <h2>Form successfully submitted</h2>
            <h4>Find your details bellow 👇👇</h4>
           </div>
            <div className='details-container'>
                <p><strong>First name: </strong><span>{firstName}</span></p>
                <p><strong>Last name: </strong><span>{lastName}</span></p>
                <p><strong>Username: </strong><span>{username}</span></p>
                <p><strong>Email: </strong><span>{email}</span></p>
                {/* <p><span>Country Phone Code: </span><span>{countryPhoneCode}</span></p> */}
                <p><strong>Phone Number: </strong><span>+{countryPhoneCode}{phoneNo}</span></p>
                <p><strong>Country: </strong><span>{country}</span></p>
                <p><strong>State: </strong><span>{state}</span></p>
                <p><strong>City: </strong><span>{city}</span></p>
                <p><strong>PAN Number: </strong><span>{panNo}</span></p>
                <p><strong>Aadhar Number: </strong><span>{aadharNo}</span></p>
                <p><strong>Password: </strong><span>{password}</span></p>
            </div>
            <Link to={"/"} className='back-to-home-link'> &#x2190; Back To Home</Link>
        </div>
    )
}

export default UserDetails