/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentAndGroupManagementAdmin = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8000/student/groups');
      setGroups(response.data.groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  return (
    <div>
      <h2>Group Management</h2>
      <table>
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Topic</th>
            <th>Supervisor / Co-Supervisor</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index}>
              <td>{group.groupId}</td>
              <td>{group.topic}</td>
              <td>{group.supervisor} / {group.coSupervisor}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>IT Number</th>
                      <th>Name</th>
                      <th>Specialization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.members.map((member, idx) => (
                      <tr key={idx}>
                        <td>{member.studentID}</td>
                        <td>{member.name}</td>
                        <td>{member.specialization}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAndGroupManagementAdmin;
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentAndGroupManagementAdmin.css';


const StudentAndGroupManagementAdmin = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8000/student/groups');
      setGroups(response.data.groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  return (
    <div>
        <div id="sachini-admin-topic">
            <h1>Student And Group Management</h1>
        </div>
    <div id="AllSupplier"> {/* Apply CSS class */}
      <table className="table"> {/* Apply CSS class */}
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Topic</th>
            <th>Supervisor <br></br> Co-Supervisor</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index}>
              <td>{group.groupId}</td>
              <td>{group.topic}</td>
              <td>{group.supervisor} <br></br> {group.coSupervisor}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>IT Number</th>
                      <th>Name</th>
                      <th>Specialization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.members.map((member, idx) => (
                      <tr key={idx}>
                        <td>{member.studentID}</td>
                        <td>{member.name}</td>
                        <td>{member.specialization}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default StudentAndGroupManagementAdmin;
