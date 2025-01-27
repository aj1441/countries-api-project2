/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import { useState } from "react";

function UserForm({ countries, onSubmit }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        country: "",
        bio: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit(formData); // Pass form data to the parent component
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>My Profile</h2>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Country:
                    <select name="country" value={formData.country} onChange={handleChange}>
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.cca3} value={country.name.common}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

// UserForm.propTypes = {
//     countries: PropTypes.array.isRequired,
//     onSubmit: PropTypes.func.isRequired, // New prop type for the submit handler
// };

export default UserForm;


// import { div } from 'framer-motion/client';
// import '../App.css';
// import PropTypes from 'prop-types';
// import { useState } from 'react';

// function UserForm({countries}) {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         country: '',
//         bio: ''
//     });

//     // let [user, setUser] = useState("")

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent default form submission
//         let dataObj = formData;
//         console.log(dataObj);
//         // send form data to local storage
//         localStorage.setItem("profile", JSON.stringify(formData));
//     };

//     // useEffect(() => {
//     //     // Returning User
//     //     if (localStorage.getItem("profile")) {
//     //     let profileInfo = JSON.parse(localStorage.getItem("profile"));
//     //    console.log (profileInfo)
//     //     setUser(profileInfo.fullName)
//     //     }
//     // }, []);

//     return (
//         <div>
//         <form onSubmit={handleSubmit}>
//             <h2>My Profile</h2>
//             <label>
//                 Full Name:
//                 <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                 />
//             </label>
//             <label>
//                 Email:
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />
//             </label>
//             <label>
//                 Country:
//                 <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//           >
//   


