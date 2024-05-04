/*
import React, { useState } from 'react';
import './RegistrationPage.css';
import Footer from '../../components/Footer/Footer'; 
import NavigationBar from '../../components/NavigationBar/NavigationBar'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    topic: '',
    supervisor: '',
    coSupervisor: '',
    members: [
      {
        ITNumber: '',
        nameAsRegistered: '',
        email: '',
        phone: '',
        specialization: '',
        labGroup: '',
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMemberChange = (memberIndex, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      members: prevData.members.map((member, i) =>
        i === memberIndex ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleAddMember = () => {
    if (formData.members.length < 4) {
      setFormData((prevData) => ({
        ...prevData,
        members: [
          ...prevData.members,
          {
            ITNumber: '',
            nameAsRegistered: '',
            email: '',
            phone: '',
            specialization: '',
            labGroup: '',
          },
        ],
      }));
    }
  };

  const specializations = ['Computer Science and Network Engineering', 'Cyber Security', 'Information Technology', 'Interactive Media', 'Software Engineering', 'System Engineering'];
  const isValidLabGroup = (input) => /^[0-9.]*$/.test(input);
  const supervisors = ['Supervisor 1', 'Supervisor 2', 'Supervisor 3']; // Define your list of supervisors here

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flattenedMembers = formData.members.map((member) => ({
      ITNumber: member.ITNumber,
      nameAsRegistered: member.nameAsRegistered,
      email: member.email,
      phone: member.phone,
      specialization: member.specialization,
      labGroup: member.labGroup,
    }));

    try {
      const response = await fetch('http://localhost:8000/student/registerGrp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          supervisor: formData.supervisor,
          coSupervisor: formData.coSupervisor,
          members: flattenedMembers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Group Registered:', result, result.groupId);
        window.alert(`YOUR GROUP NO IS ${result.groupId}`);

      } else {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            window.alert('Error registering group: ' + errorData.message);
          } else {
            window.alert('Error registering group: ' + response.statusText);
          }
      }
    } catch (error) {
      console.error('Error:', error.message);
      window.alert('Error registering group: ' + error.message);
    }
  };
  */

  import React, { useState, useEffect } from 'react';
import './RegistrationPage.css';
import Footer from '../../components/Footer/Footer'; 
import NavigationBar from '../../components/NavigationBar/NavigationBar'; 
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    topic: '',
    supervisor: '',
    coSupervisor: '',
    members: [
      {
        ITNumber: '',
        nameAsRegistered: '',
        email: '',
        phone: '',
        specialization: '',
        labGroup: '',
      },
    ],
  });

  const [supervisors, setSupervisors] = useState([]); 
  const [coSupervisorOptions, setCoSupervisorOptions] = useState([]);
  const navigate = useNavigate();
  const [supervisorCounts, setSupervisorCounts] = useState({});
  const [coSupervisorCounts, setCoSupervisorCounts] = useState({});

  useEffect(() => {
    // Fetch supervisor names from the backend
    const fetchSupervisors = async () => {
      try {
        const response = await fetch('http://localhost:8000/supervisor/get-all-supervisors');
        if (response.ok) {
          const data = await response.json();
          // Extract supervisor names from the response and set the state
          const supervisorNames = data.allSupervisors.map(supervisor => supervisor.name);
          setSupervisors(supervisorNames);
        } else {
          console.error('Failed to fetch supervisors');
        }
      } catch (error) {
        console.error('Error fetching supervisors:', error);
      }
    };

    fetchSupervisors(); // Call the function to fetch supervisors when the component mounts
  }, []);

  useEffect(() => {
    // Fetch co-supervisor names from the backend
    const fetchCosupervisors = async () => {
      try {
        const response = await fetch('http://localhost:8000/cosupervisor/get-all-cosupervisors');
        if (response.ok) {
          const data = await response.json();
          // Extract co-supervisor names from the response and set the state
          const cosupervisorNames = data.allCoSupervisors.map(cosupervisor => cosupervisor.name);
          setCoSupervisors(cosupervisorNames);
        } else {
          console.error('Failed to fetch co-supervisors');
        }
      } catch (error) {
        console.error('Error fetching co-supervisors:', error);
      }
    };

    fetchCosupervisors(); // Call the function to fetch co-supervisors when the component mounts
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMemberChange = (memberIndex, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      members: prevData.members.map((member, i) =>
        i === memberIndex ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleAddMember = () => {
    if (formData.members.length < 4) {
      setFormData((prevData) => ({
        ...prevData,
        members: [
          ...prevData.members,
          {
            ITNumber: '',
            nameAsRegistered: '',
            email: '',
            phone: '',
            specialization: '',
            labGroup: '',
          },
        ],
      }));
    }
  };

  const specializations = ['Computer Science and Network Engineering', 'Cyber Security', 'Information Technology', 'Interactive Media', 'Software Engineering', 'System Engineering'];
  const isValidLabGroup = (input) => /^[0-9.]*$/.test(input);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flattenedMembers = formData.members.map((member) => ({
      ITNumber: member.ITNumber,
      nameAsRegistered: member.nameAsRegistered,
      email: member.email,
      phone: member.phone,
      specialization: member.specialization,
      labGroup: member.labGroup,
    }));

    try {
      const response = await fetch('http://localhost:8000/student/registerGrp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          supervisor: formData.supervisor,
          coSupervisor: formData.coSupervisor,
          members: flattenedMembers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Group Registered:', result, result.groupId);
        window.alert(`As First Time Login You Must Use The Group ID And Leader's Student ID`);
        window.alert(`YOUR GROUP NO IS ${result.groupId}`);
        navigate('/');

      } else {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            window.alert('Error registering group: ' + errorData.message);
          } else {
            window.alert('Error registering group: ' + response.statusText);
          }
      }
    } catch (error) {
      console.error('Error:', error.message);
      window.alert('Error registering group: ' + error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
    <div>
    <form id="sachini_registrationform" onSubmit={handleSubmit}>
    <div id="sachini_formTitle" className="centeredTitle">
             REGISTER GROUP HERE
        </div>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={(e) => {
            const input = e.target.value;
            if (/^[A-Za-z\s]*$/.test(input)) {
              setFormData((prevData) => ({
                ...prevData,
                topic: input,
              }));
            }
          }}
          placeholder='Topic'
        />

        {/* <input
          type="text"
          name="supervisor"
          placeholder='Supervisor'
          value={formData.supervisor}
          onChange={handleChange}
        /> */}

          <select
            id="reg-selection"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            placeholder='Supervisor'
          >
            <option value="" disabled>Select Supervisor</option>
            {supervisors.map((supervisor, index) => (
              <option key={index} value={supervisor}>
                {supervisor}
              </option>
            ))}
          </select>

        {/* <input
          type="text"
          name="coSupervisor"
          placeholder='Co-Supervisor'
          value={formData.coSupervisor}
          onChange={handleChange}
        /> */}

      <select
        id="reg-selection"
        name="coSupervisor"
        value={formData.coSupervisor}
        onChange={handleChange}
        placeholder='Co-Supervisor'
      >
        <option value="" disabled>Select Co-Supervisor</option>
        {supervisors.map((cosupervisor, index) => (
          <option key={index} value={cosupervisor}>
            {cosupervisor}
          </option>
        ))}
      </select>

      {formData.members.map((member, memberIndex) => (
        <div key={memberIndex}>
          <h5>Member {memberIndex + 1} {memberIndex === 0 ? <strong>Leader</strong> : ''}</h5>
            <input
              type="text"
              placeholder='Student Number'
              name={`members[${memberIndex}].ITNumber`}
              value={member.ITNumber}
              onChange={(e) =>
                handleMemberChange(memberIndex, 'ITNumber', e.target.value)
              }
            /> 

            <input
              type="text"
              placeholder='Name'
              name={`members[${memberIndex}].nameAsRegistered`}
              value={member.nameAsRegistered}
              onChange={(e) => {
                const input = e.target.value;
                if (/^[A-Za-z\s]*$/.test(input)) {
                  handleMemberChange(memberIndex, 'nameAsRegistered', input);
                }
              }}
            /> 

            <input
              type="text"
              placeholder='Email'
              name={`members[${memberIndex}].email`}
              value={member.email}
              onChange={(e) =>
                handleMemberChange(memberIndex, 'email', e.target.value)
              }
            />
            <input
              type="text"
              placeholder='Contact No'
              name={`members[${memberIndex}].phone`}
              value={member.phone}
              onChange={(e) => {
                const input = e.target.value;
                const sanitizedInput = input.replace(/\D/g, ''); 
                const formattedInput = sanitizedInput.slice(0, 10); 
                handleMemberChange(memberIndex, 'phone', formattedInput);
              }}
            />

            <select
              id="sachini_specializationSelect"
              name={`members[${memberIndex}].specialization`}
              value={member.specialization}
              onChange={(e) =>
                handleMemberChange(memberIndex, 'specialization', e.target.value)
              }
            >
              <option value="" disabled>Select Specialization</option>
              {specializations.map((specialization, index) => (
                <option key={index} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
                
          <input
            type="text"
            placeholder='Lab Group'
            name={`members[${memberIndex}].labGroup`}
            value={member.labGroup}
            onChange={(e) => {
              const input = e.target.value;
              if (isValidLabGroup(input)) {
                handleMemberChange(memberIndex, 'labGroup', input);
              }
            }}
          />

        </div>
      ))}

      {formData.members.length < 4 && (
        <button type="button" onClick={handleAddMember}>
          Add Member
        </button>
      )}
      <div id="sachini_regButton">
         <button type="submit">Register Group</button>
      </div>
    </form>
    </div>
    <Footer />
    </div>
  );
};

export default RegistrationForm;


