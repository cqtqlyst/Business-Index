import Nav from "@/components/nav";
import Head from "next/head";
import { collection, addDoc, query, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import db from './firebase';

const backupData = async () => {
    try {
        // Get all documents from the businesses collection
        const businessesCollection = collection(db, "businesses");
        const businessesSnapshot = await getDocs(businessesCollection);
        const businessesData = businessesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Get all documents from the backup collection
        const backupCollection = collection(db, "backup");
        const backupSnapshot = await getDocs(backupCollection);
        const backupData = backupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Create a map for the backup data for quick lookup
        const backupMap = new Map(backupData.map(doc => [doc.id, doc]));

        // Sync each document in the businesses collection with the backup collection
        for (const business of businessesData) {
            const backupDocRef = doc(db, "backup", business.id);
            const backupDoc = await getDoc(backupDocRef);

            if (!backupDoc.exists() || JSON.stringify(backupDoc.data()) !== JSON.stringify(business)) {
                // If the document doesn't exist in the backup collection or it has different data, add/update it
                await setDoc(backupDocRef, business);
            }
        }

        console.log("Backup complete.");
    } catch (error) {
        console.error("Error backing up data: ", error);
    }
};

backupData();

export default backupData;
