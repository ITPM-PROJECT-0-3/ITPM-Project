import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentAndGroupManagementAdmin.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


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

// const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.autoTable({
//       head: [['Group ID', 'Topic', 'Supervisor / Co-Supervisor', 'Members']],
//       body: groups.map(group => [group.groupId, group.topic, `${group.supervisor} / ${group.coSupervisor}`, group.members.map(member => `${member.studentID}: ${member.name}`).join('\n')]),
//     });
//     doc.save('student_groups.pdf');
//   };

const downloadPDF = () => {
    const doc = new jsPDF();
    
    const topic = 'Student And Group Management';
    doc.setFontSize(16);
    doc.text(topic, 10, 60); 
    
    const generatedDateTime = `Generated Date and Time: ${new Date().toLocaleString()}`;
    doc.setFontSize(10);
    doc.text(generatedDateTime, 10, 75); 
  
    doc.autoTable({
      head: [['Group ID', 'Topic', 'Supervisor\nCo-Supervisor', 'Members']],
      body: groups.map(group => [
        group.groupId,
        group.topic,
        `${group.supervisor}\n${group.coSupervisor}`,
        group.members.map(member => `${member.studentID} : ${member.name} - ${abbreviateSpecialization(member.specialization)}`).join('\n')
      ]),
      columnStyles: {
        0: { cellWidth: 38 }, 
        1: { cellWidth: 35 }, 
        2: { cellWidth: 30 }, 
      },
      startY: 85, 
    });
  
    doc.save('student_groups.pdf');
  };
  
  
  const abbreviateSpecialization = (specialization) => {
    const abbreviations = {
        "Information Technology": "IT",
        "Computer Science and Network Engineering": "CSNE",
        "Cyber Security": "CS",
        "Interactive Media": "IM",
        "Software Engineering": "SE",
        "System Engineering": "SysE",
    };

    if (specialization in abbreviations) {
        return abbreviations[specialization];
    } else {
        return specialization;
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
            <th className="topic-column">Topic</th>
            <th>Supervisor <br></br> Co-Supervisor</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index}>
              <td>{group.groupId}</td>
              <td className="topic-column">{group.topic}</td>
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
                        <td>{abbreviateSpecialization(member.specialization)}</td>
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
    <button id="sachini-admin-btn" onClick={downloadPDF}>Download</button>
    </div>
  );
};

export default StudentAndGroupManagementAdmin;
