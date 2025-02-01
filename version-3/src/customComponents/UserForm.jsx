/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";


function UserForm({ countries, onSubmit}) {
    
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        country: "",
        bio: "",
    });

    function writeUserData( name, email, country, bio) {
        const db = getDatabase();
        set(ref(db, 'users/' + 1), {
          name: name,
          email: email,
          country: country,
          bio: bio,
        });
      }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value } ));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        writeUserData( formData.fullName, formData.email, formData.country, formData.bio); // Save to firebase
        localStorage.setItem("profile", JSON.stringify(formData));
        onSubmit(formData); // Pass form data to parent (if needed)
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



export default UserForm;




