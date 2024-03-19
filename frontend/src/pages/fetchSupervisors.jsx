import  { useState, useEffect } from 'react';
import axios from 'axios';

const SupervisorList = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/supervisor/get'); // Assuming your backend route
        setSupervisors(response.data.allSupervisors);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSupervisors();
  }, []);

  return (
    <div>
      <h2>Supervisors List</h2>
      {error && <p className="error">Error: {error}</p>}
      {supervisors.length > 0 ? (
        <ul>
          {supervisors.map((supervisor) => (
            <li key={supervisor._id}>
              {supervisor.name} - {supervisor.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No supervisors found.</p>
      )}
    </div>
  );
};

export default SupervisorList;
