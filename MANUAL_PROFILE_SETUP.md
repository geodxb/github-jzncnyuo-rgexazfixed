# Manual Profile Setup for Sam Hivanek

Due to Firebase connection issues in the WebContainer environment, please manually create Sam's governor profile:

## Step 1: Open Firebase Console
Go to: https://console.firebase.google.com/project/blackbull-4b009/firestore/data

## Step 2: Navigate to Users Collection
1. Click on the `users` collection
2. Click "Add document"

## Step 3: Create Document
1. **Document ID**: `2cSQTHfSSPUXAVaSKGl8zdO9hiC3` (EXACT Firebase Auth UID)
2. Copy the JSON data from `sam-governor-profile.json` file
3. Paste each field manually:

### Required Fields:
- **name** (string): `Sam Hivanek`
- **email** (string): `sam@interactivebrokers.us`
- **role** (string): `governor`
- **profilePic** (string): `` (empty)
- **country** (string): `United States`
- **location** (string): `Connecticut`
- **joinDate** (string): `2025-01-09`
- **initialDeposit** (number): `0`
- **currentBalance** (number): `0`
- **isActive** (boolean): `true`
- **accountStatus** (string): `Active`
- **accountType** (string): `Governor`
- **governorLevel** (string): `Supreme`

### Permissions Object:
Create a **permissions** field as a **map** with these boolean fields:
- **systemControl**: `true`
- **accountManagement**: `true`
- **financialAdjustments**: `true`
- **userRoleChanges**: `true`
- **systemSettings**: `true`
- **auditAccess**: `true`
- **emergencyControls**: `true`

### Timestamps:
- **createdAt** (timestamp): Use "Current timestamp"
- **updatedAt** (timestamp): Use "Current timestamp"

## Step 4: Save Document
Click "Save" to create the document.

## Step 5: Verify
1. Check that the document appears in the `users` collection
2. Verify the Document ID matches: `2cSQTHfSSPUXAVaSKGl8zdO9hiC3`
3. Confirm all fields are present and correct

## Login Credentials
- **Email**: sam@interactivebrokers.us
- **Password**: [Use the password you set in Firebase Auth]

Once created, Sam will have full Governor access to all system functions.