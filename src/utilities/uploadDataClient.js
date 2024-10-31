// Import Firestore instance from firebaseConfig
import { db } from './firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import data from '../../courses.json'; // Adjust the path as needed

// Function to upload JSON data to Firestore
async function uploadJSONData() {
    try {
        // Only use the "courses" part of the data, ignoring the "title"
        const courses = data.courses;
        for (const [key, value] of Object.entries(courses)) {
            // Add each course as a document
            await setDoc(doc(db, 'courses', key), value);
            console.log(`Document ${key} uploaded successfully!`);
        }
        console.log("All documents uploaded successfully.");
    } catch (error) {
        console.error("Error uploading documents:", error);
    }
}

// Execute the function
uploadJSONData();
