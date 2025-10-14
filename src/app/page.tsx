import SignUpForm from "../components/auth/signUp";

export default function Home() {
  return (
    <SignUpForm />
  )
}


// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { SignUpData } from '../types';
// import SignUpForm from '../components/forms/SignUpForm';
// import SuccessModal from '../components/modals/SuccessModal';

// // Dummy data storage (replace with actual API calls)
// const dummyUsers: SignUpData[] = [];
// const dummyAgencies: any[] = [];

// const SignUpPage: React.FC = () => {
//   const router = useRouter();
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSignUp = (data: SignUpData) => {
//     // Store in dummy data (replace with API call)
//     dummyUsers.push(data);
    
//     if (data.role === 'agency') {
//       const agencyData = {
//         id: Math.random().toString(36).substr(2, 9),
//         ...data,
//         isActive: true,
//         createdAt: new Date()
//       };
//       dummyAgencies.push(agencyData);
//     }

//     console.log('User registered:', data);
//   };

//   const handleSuccessModalClose = () => {
//     setIsSuccessModalOpen(false);
//     router.push('/login');
//   };

//   const showSuccessModal = (message: string) => {
//     setSuccessMessage(message);
//     setIsSuccessModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <SignUpForm 
//         onSubmit={handleSignUp} 
//         showSuccessModal={showSuccessModal}
//       />
      
//       <SuccessModal
//         isOpen={isSuccessModalOpen}
//         message={successMessage}
//         onClose={handleSuccessModalClose}
//       />
//     </div>
//   );
// };

// export default SignUpPage;