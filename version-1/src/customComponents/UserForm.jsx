import '../App.css';
import { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataObj = formData;
    console.log(dataObj);
    setFormData({ name: '', email: '', phone: '' }); // Reset the form
    //send dataObj to backend
  };
    return (
        <form className="user-form" onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
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
    )
}

export default UserForm;