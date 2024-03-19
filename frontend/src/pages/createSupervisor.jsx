import  { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const CreateSupervisor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // Prevent form submission if there are errors
    }

    try {
      const newSupervisor = {
        name,
        email,
      };
     
      await axios.post("http://localhost:8000/supervisor/register", newSupervisor);

      setName("");
      setEmail("");
      Swal.fire({
        icon: "success",
        title: "Supervisor Added",
        text: "Supervisor has been added successfully!",
      });
    } catch (error) {
      console.error("Error adding supervisor:", error);
    }
  };

  return (
    <div>
      <h2>Create Supervisor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>} {/* Display name error if exists */}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>} {/* Display email error if exists */}
        </div>
        <button type="submit">Create Supervisor</button>
      </form>
    </div>
  );
};

export default CreateSupervisor;
