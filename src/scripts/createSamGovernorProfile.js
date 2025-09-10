// Script to create Sam Hivanek's governor profile in Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDb2i4UdzhB6ChT30ljwRXSIjBM8LMT318",
  authDomain: "blackbull-4b009.firebaseapp.com",
  projectId: "blackbull-4b009",
  storageBucket: "blackbull-4b009.firebasestorage.app",
  messagingSenderId: "600574134239",
  appId: "1:600574134239:web:377484c5db15edf320a66a",
  measurementId: "G-PS64KEQB6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createSamGovernorProfile() {
  try {
    console.log('🔥 Creating Sam Hivanek governor profile...');
    
    const userId = '2cSQTHfSSPUXAVaSKGl8zdO9hiC3'; // Exact Firebase Auth UID
    const email = 'sam@interactivebrokers.us';
    const name = 'Sam Hivanek';
    
    // First check if the document already exists
    const existingDoc = await getDoc(doc(db, 'users', userId));
    if (existingDoc.exists()) {
      console.log('⚠️ User document already exists, updating...');
    }
    
    const governorData = {
      name: name,
      email: email,
      role: 'governor',
      profilePic: '',
      country: 'United States',
      location: 'Connecticut',
      joinDate: new Date().toISOString().split('T')[0],
      initialDeposit: 0,
      currentBalance: 0,
      isActive: true,
      accountStatus: 'Active',
      accountType: 'Governor',
      governorLevel: 'Supreme',
      permissions: {
        systemControl: true,
        accountManagement: true,
        financialAdjustments: true,
        userRoleChanges: true,
        systemSettings: true,
        auditAccess: true,
        emergencyControls: true
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Create the user document with the exact Firebase Auth UID
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, governorData, { merge: true });
    
    // Verify the document was created
    const verifyDoc = await getDoc(docRef);
    if (verifyDoc.exists()) {
      console.log('✅ Document verified in Firestore');
      console.log('📊 Document data:', verifyDoc.data());
    } else {
      console.error('❌ Document was not created in Firestore');
    }
    
    console.log('✅ Sam Hivanek governor profile created successfully!');
    console.log('📊 Profile Details:');
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Role: Governor`);
    console.log(`   User ID: ${userId}`);
    console.log(`   Country: United States`);
    console.log(`   Account Type: Governor`);
    console.log(`   Governor Level: Supreme`);
    console.log('\n🔐 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: [Use the password set in Firebase Auth]`);
    console.log('\n✅ Sam can now log in with full Governor access!');
    console.log('\n🔍 Check Firestore Console:');
    console.log('   https://console.firebase.google.com/project/blackbull-4b009/firestore/data');
    console.log(`   Look for document: users/${userId}`);
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error creating Sam governor profile:', error);
    process.exit(1);
  }
}

createSamGovernorProfile();