import React, { useState } from 'react';
import './RegistrationPage.css';

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
        console.log('Group Registered:', result);
        window.alert('Group registered successfully!');
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

        <input
          type="text"
          name="supervisor"
          placeholder='Supervisor'
          value={formData.supervisor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="coSupervisor"
          placeholder='Co-Supervisor'
          value={formData.coSupervisor}
          onChange={handleChange}
        />

      {formData.members.map((member, memberIndex) => (
        <div key={memberIndex}>
          <h5>Member {memberIndex + 1}</h5>
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
  );
};

export default RegistrationForm;


