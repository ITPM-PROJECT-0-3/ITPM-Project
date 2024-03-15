import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GroupProfile.css';
import UpdatePswrdForm from './UpdatePswrdForm';

const GroupProfile = () => {
  const { grpId } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [showUpdatePswrdForm, setShowUpdatePswrdForm] = useState(false);
  const [functionDescription, setFunctionDescription] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const specializationAbbreviations = {
    'Computer Science and Network Engineering': 'CSNE',
    'Cyber Security': 'CS',
    'Information Technology': 'IT',
    'Interactive Media': 'IM',
    'Software Engineering': 'SE',
    'System Engineering': 'CSE',
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/student/getOneGroup/${grpId}`);
        setGroupData(response.data.group);
      } catch (error) {
        console.error('Error fetching group data:', error.message);
      }
    };

    fetchGroupData();

  }, [grpId]);

  const handleSettingsClick = () => {
    setShowUpdatePswrdForm(true);
    navigate(`/updatePassword/${grpId}`);
  };
  
  const handleAddFunctionClick = (index) => {
    setSelectedRowIndex(index);
    setFunctionDescription('');
  };

  const handleSaveFunction = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/student/updateFunction/${grpId}`, {
        memberIndex: selectedRowIndex,
        functionDescription: functionDescription,
      });

      if (response.status === 200) {
        const updatedGroupData = { ...groupData };
        updatedGroupData.members[selectedRowIndex].function = functionDescription;
        setGroupData(updatedGroupData);
      }
    } catch (error) {
      console.error('Error saving function:', error.message);
    }

    setSelectedRowIndex(null);
  };

  return (
    <div id="sachini_group_profile">
      <button id="sachini_settings_button" onClick={handleSettingsClick}>
        Settings
      </button>
      {showUpdatePswrdForm && (
        <UpdatePswrdForm grpId={grpId} />
      )}
      {groupData ? (
        <div>
          <h2 id="sachini_group_id">{groupData.groupId}</h2>
          <div id="sachini_topic">{groupData.topic}</div>

          <div id="sachini_member_details">
            <h4>Group Member Details</h4>
            <table id="sachini_member_table">
              <thead>
                <tr>
                  <th>IT Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Specialization</th>
                  <th>Lab Group</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                {groupData.members.map((member, index) => (
                  <tr key={index} style={index === 0 ? { backgroundColor: '#fffd88' } : null}>
                    <td>{member.ITNumber}</td>
                    <td>{member.nameAsRegistered}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.specialization}</td>
                    <td>{`${specializationAbbreviations[member.specialization]}.${member.labGroup}`}</td>
                    <td>
                      {selectedRowIndex === index ? (
                        <div>
                          <input
                            type="text"
                            placeholder="Enter function description"
                            value={functionDescription}
                            onChange={(e) => setFunctionDescription(e.target.value)}
                          />
                          <button onClick={handleSaveFunction}>Save</button>
                        </div>
                      ) : (
                        <button onClick={() => member.function ? setSelectedRowIndex(index) : handleAddFunctionClick(index)}>
                          {member.function ? "View Function" : "Add Function"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div id="sachini_contact_supervisors">
            <h4>Contact Supervisors</h4>
            <table id="sachini_supervisor_table">
              <tbody>
                <tr>
                  <td>Supervisor</td>
                  <td>{groupData.supervisor}</td>
                  <td>{/* Supervisor's Email */}</td>
                </tr>
                <tr>
                  <td>Co-Supervisor</td>
                  <td>{groupData.coSupervisor}</td>
                  <td>{/* Co-Supervisor's Email */}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br></br><br></br>
          <div id="sachini_assignments_schedules">
            ASSIGNMENTS AND SCHEDULES
          </div>
        </div>
      ) : (
        <p>Loading group data...</p>
      )}
    </div>
  );
};


export default GroupProfile;
