import  { useState, useEffect } from 'react';
import axios from 'axios';

const AssignGroup = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [groups, setGroups] = useState([]); // Replace with your group data fetching logic
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [error, setError] = useState(null);

  // Fetch supervisors list on component mount
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/supervisor/get');
        setSupervisors(response.data.allSupervisors);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSupervisors();
  }, []);

  // Fetch group data here (replace with your actual logic)
  // ... (e.g., fetch groups from a separate API endpoint)

  const handleSupervisorChange = (e) => {
    setSelectedSupervisor(e.target.value);
  };

  const handleGroupChange = (e) => {
    const selected = [...selectedGroups];
    if (e.target.checked) {
      selected.push(e.target.value);
    } else {
      const index = selected.indexOf(e.target.value);
      selected.splice(index, 1);
    }
    setSelectedGroups(selected);
  };

  const handleSubmit = async () => {
    if (!selectedSupervisor || selectedGroups.length === 0) {
      setError('Please select a supervisor and at least one group.');
      return;
    }

    try {
      const data = { groupDetails: selectedGroups };
      const response = await axios.put("http://localhost:8000/supervisor/assign-group/:id", data);

      console.log('Assignment successful:', response.data);
      // Handle success (e.g., clear selection, show confirmation message)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Assign Group to Supervisor</h2>
      {error && <p className="error">Error: {error}</p>}
      <select value={selectedSupervisor} onChange={handleSupervisorChange}>
        <option value="">Select Supervisor</option>
        {supervisors.map((supervisor) => (
          <option key={supervisor._id} value={supervisor._id}>
            {supervisor.name} - {supervisor.email}
          </option>
        ))}
      </select>

      <h3>Groups</h3>
      {groups.length > 0 ? (
        <ul>
          {groups.map((group) => (
            <li key={group._id}>
              <input
                type="checkbox"
                value={group._id}
                checked={selectedGroups.includes(group._id)}
                onChange={handleGroupChange}
              />
              {group.topic}
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups found.</p>
      )}

      <button onClick={handleSubmit} disabled={!selectedSupervisor || selectedGroups.length === 0}>
        Assign Group
      </button>
    </div>
  );
};

export default AssignGroup;
