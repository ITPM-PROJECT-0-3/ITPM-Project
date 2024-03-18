import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import app from '../../firebase';
import './sachini_styles/Upload.css';

const Upload = () => {
    const { groupId } = useParams(); // Extract groupId from URL params
    const [doc, setDoc] = useState(null);
    const [newFileName, setNewFileName] = useState(''); // State to store new file name
    const [uploadProgress, setUploadProgress] = useState(0); // State to store upload progress
    const fileInputRef = useRef(null); // Ref to the file input element
    const navigate = useNavigate(); 

    const handleUpload = async () => {
        if (!doc) {
            console.error('No file selected');
            alert('No file selected');
            return;
        }

        if (!newFileName.trim()) {
            console.error('New file name is required');
            alert('Rename the file is must');
            return;
        }    

        try {
            const storage = getStorage(app);
            const fileName = newFileName || new Date().getTime() + '_' + doc.name; // Use new file name if provided, else use default
            const storageRef = ref(storage, `documents/${groupId}/${fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, doc);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Update upload progress in state
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Error uploading file:', error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at:', downloadURL);

                        const response = await fetch(`http://localhost:8000/student/saveDownloadURLForDoc1/${groupId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ downloadURL }),
                        });

                        if (response.ok) {
                            console.log('Download URL saved successfully');
                            alert('Saved file successfully');
                        } else {
                            throw new Error('Failed to save download URL: ' + response.statusText);
                        }
                    } catch (error) {
                        alert('Error saving download URL: ' + error.message);
                    }
                }
            );
        } catch (error) {
            alert('Error initiating upload: ' + error.message);
        }
    };

    const handleFileChange = (e) => {
        setDoc(e.target.files[0]); 
    };

    const handleCancel = () => {
        setDoc(null); 
        fileInputRef.current.value = null; 
    };

    const handleShowChanges = () => {
        navigate(`/AssignmentStatus/${groupId}`); 
    };

    return (
        <div id="sachini_assignment_upload">
            <div>
                <h3>UPLOAD YOUR ASSIGNMENT HERE</h3>
                <label id="sachini-doc-lbl" htmlFor="document">Document 1</label>
                <br />
                <input
                    type="file"
                    accept="document/*"
                    id="document"
                    onChange={handleFileChange}
                    ref={fileInputRef} 
                />
            </div>
            <div>
                <label id="sachini-doc-lbl2" htmlFor="newFileName">Save as</label>
                <input
                    type="text"
                    id="newFileName"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    required 
                />
            </div>
            <br />
            <progress value={uploadProgress} max="100"></progress> {/* Display upload progress */}
            <br />
            <button id="sachini-ass-upload-btn" onClick={handleUpload}>Upload</button>
            {doc && <button id="sachini-canclbtn" onClick={handleCancel}>Cancel</button>}
            <button id="sachini-save-changes-btn" onClick={handleShowChanges}>Show changes</button>
        </div>
    );
};

export default Upload;




