/* eslint-disable react/prop-types */
import { useState } from "react";

function UserForm({ countries, onSubmit}) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        country: "",
        bio: "",
    });

// handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value } ));
    };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission


    
    try {
      // Send the form data to the server to save the user
      const response = await fetch("${import.meta.env.VITE_API_URL}/add-user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.fullName,
          user_email: formData.email,
          user_country: formData.country,
          bio: formData.bio,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      // Notify the parent component (SavedCountries.jsx) about the successful submission
      onSubmit(formData);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
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




