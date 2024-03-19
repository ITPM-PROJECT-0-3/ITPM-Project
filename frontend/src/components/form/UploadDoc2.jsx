import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import app from '../../firebase';
import './sachini_styles/Upload.css';

const UploadDoc2 = () => {
    const { groupId } = useParams(); 
    const [doc, setDoc] = useState(null);
    const [newFileName, setNewFileName] = useState(''); 
    const [uploadProgress, setUploadProgress] = useState(0); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const fileInputRef = useRef(null); 
    const navigate = useNavigate(); 

    const handleUpload = async () => {
        if (!doc) {
            setErrorMessage('Please select a file.'); 
            return;
        }

        if (!newFileName.trim()) {
            setErrorMessage('Please enter a new file name.'); 
            return;
        }

        try {
            const storage = getStorage(app);
            const fileName = newFileName || new Date().getTime() + '_' + doc.name; 
            const storageRef = ref(storage, `documents/doc1/${groupId}/${fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, doc);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Error uploading file:', error);
                    setErrorMessage('Error uploading file. Please try again later.'); 
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at:', downloadURL);

                        const response = await fetch(`http://localhost:8000/student/saveDownloadURLForDoc2/${groupId}`, {
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
                        console.error('Error saving download URL:', error);
                        setErrorMessage('Error saving download URL. Please try again later.'); 
                    }
                }
            );
        } catch (error) {
            console.error('Error initiating upload:', error);
            setErrorMessage('Error initiating upload. Please try again later.'); 
        }
    };

    const handleFileChange = (e) => {
        setDoc(e.target.files[0]); 
        setErrorMessage(''); 
    };

    const handleCancel = () => {
        setDoc(null); 
        fileInputRef.current.value = null; 
    };

    const handleShowChanges = () => {
        navigate(`/AssignmentStatusForDoc2/${groupId}`); 
    };

    const handleFileNameChange = (e) => {
        setNewFileName(e.target.value);
        setErrorMessage(''); 
    };

    return (
        <div id="sachini_assignment_upload">
            <div>
                <h3>UPLOAD YOUR ASSIGNMENT HERE</h3>
                <label id="sachini-doc-lbl" htmlFor="document">Document 2</label>
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
                    onChange={handleFileNameChange}
                    required 
                />
            </div>
            <br />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message in red color */}
            <progress value={uploadProgress} max="100"></progress> {/* Display upload progress */}
            <br />
            <button id="sachini-ass-upload-btn" onClick={handleUpload}>Upload</button>
            {doc && uploadProgress === 0 && <button id="sachini-canclbtn" onClick={handleCancel}>Cancel</button>}
            <button id="sachini-save-changes-btn" onClick={handleShowChanges}>Show changes</button>
        </div>
    );
};

export default UploadDoc2;
