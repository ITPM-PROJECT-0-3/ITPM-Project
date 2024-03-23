import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './sachini_styles/Assignment.css';
import Footer from '../../components/Footer/Footer'; 
import NavigationBar from '../../components/NavigationBar/NavigationBar'; 

const AssignmentStatusForDoc2 = () => {
    const { groupId } = useParams(); 
    const [assignmentStatus, setAssignmentStatus] = useState({
        
        fileLink: 'Not submitted',
        updatedDate: 'Not submitted yet',
        updatedTime: 'Not submitted yet',
        groupId: groupId, 
        status: 'Not submitted', 
        remainDays: 'Not submitted', 
        grade: 'Not Granted' 
    });

    useEffect(() => {
        
        fetch(`http://localhost:8000/student/assignmentStatus2/${groupId}`)
            .then(response => response.json())
            .then(data => {
                
                if (data.fileLink) {
                    setAssignmentStatus(data);
                } else {
                    
                    setAssignmentStatus({
                        fileLink: 'Not submitted',
                        updatedDate: 'Not submitted',
                        updatedTime: 'Not submitted',
                        groupId: groupId,
                        status: 'Not submitted', 
                        remainDays: 'Not submitted', 
                        grade: 'Not Granted' 
                    });
                }
            })
            .catch(error => console.error('Error fetching assignment status:', error));
    }, [groupId]); 

    const handleDownload = () => {
        if (assignmentStatus.fileLink !== 'Not submitted') {
            
            const link = document.createElement('a');
            link.href = assignmentStatus.fileLink;
            link.setAttribute('download', ''); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
      <div>
        <NavigationBar />
        <div id="sachini-assignment-status">
          <form id="sachini-assignment-form">
          <h2>Document 2 Assignment Status</h2>
            <table id="sachini-assignment-table">
              <tbody>
                <tr>
                    <td><strong>Status</strong></td>
                    <td><span>{assignmentStatus.status}</span></td>
                </tr>
                <tr>
                    <td><strong>Group ID</strong></td>
                    <td><span>{assignmentStatus.groupId}</span></td>
                </tr>
                <tr>
                    <td className="remain-days"><strong>Remain Days</strong></td>
                    <td className="remain-days"><span>{}</span></td>
                </tr>
                <tr>
                  <td><strong>Uploaded File</strong></td>
                  <td>
                    {assignmentStatus.fileLink !== 'Not submitted' ? (
                      <a href="#" onClick={handleDownload}>Download File</a>
                    ) : (
                      <span>{assignmentStatus.fileLink}</span>
                    )}
                  </td>
                  </tr>
                  <tr>
                  <td><strong>Uploaded Date</strong></td>
                  <td><span>{assignmentStatus.updatedDate}</span></td>
                </tr>
                <tr>
                  <td><strong>Uploaded Time</strong></td>
                  <td><span>{assignmentStatus.updatedTime}</span></td>
                </tr>
                <tr>
                  <td><strong>Grade</strong></td>
                  <td><span>Not Granted</span></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <Footer />
        </div>
      );      
};

export default AssignmentStatusForDoc2;



