// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { FaUser, FaGlobe, FaEnvelope, FaTag } from 'react-icons/fa';
import userService from '../services/userService';
import authService from '../services/authService';
import { Card, CardBody } from '@nextui-org/react';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          const userProfile = await userService.getCurrentUserProfile(currentUser.email);
          setProfile(userProfile);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-dark-text"></div>
      </div>
    );
  }

  if (!profile) return <div className="text-center text-dark-text">No profile found</div>;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardBody className="">
          <div className="text-center mb-6">
            <div className="mx-auto w-24 h-24 bg-dark-bg rounded-full flex items-center justify-center text-dark-text text-4xl mb-4">
              {profile.firstName[0].toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-dark-text">
              {profile.firstName} {profile.lastName}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center bg-dark-bg p-3 rounded-lg">
              <FaUser className="mr-3 text-dark-text" />
              <div>
                <p className="text-sm text-dark-text">Full Name</p>
                <p className="font-semibold text-dark-text">{profile.firstName} {profile.lastName}</p>
              </div>
            </div>
            <div className="flex items-center bg-dark-bg p-3 rounded-lg">
              <FaEnvelope className="mr-3 text-dark-text" />
              <div>
                <p className="text-sm text-dark-text">Email</p>
                <p className="font-semibold text-dark-text">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center bg-dark-bg p-3 rounded-lg">
              <FaGlobe className="mr-3 text-dark-text" />
              <div>
                <p className="text-sm text-dark-text">Country</p>
                <p className="font-semibold text-dark-text">{profile.country}</p>
              </div>
            </div>
            <div className="flex items-center bg-dark-bg p-3 rounded-lg">
              <FaTag className="mr-3 text-dark-text" />
              <div>
                <p className="text-sm text-dark-text">Role</p>
                <p className="font-semibold text-dark-text">{profile.role}</p>
              </div>
            </div>
          </div>
          {error && (
            <p className="mt-4 text-red-500 text-center bg-red-800 p-2 rounded">
              {error}
            </p>
          )}
        </CardBody>
      </Card>
    </div>
    // <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
    //   <div className="bg-dark-card p-8 rounded-xl shadow-lg w-full max-w-md">
    //     <div className="text-center mb-6">
    //       <div className="mx-auto w-24 h-24 bg-dark-bg rounded-full flex items-center justify-center text-dark-text text-4xl mb-4">
    //         {profile.firstName[0].toUpperCase()}
    //       </div>
    //       <h2 className="text-2xl font-bold text-dark-text">
    //         {profile.firstName} {profile.lastName}
    //       </h2>
    //     </div>
    //     <div className="space-y-4">
    //       <div className="flex items-center bg-dark-bg p-3 rounded-lg">
    //         <FaUser className="mr-3 text-dark-text" />
    //         <div>
    //           <p className="text-sm text-dark-text">Full Name</p>
    //           <p className="font-semibold text-dark-text">{profile.firstName} {profile.lastName}</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center bg-dark-bg p-3 rounded-lg">
    //         <FaEnvelope className="mr-3 text-dark-text" />
    //         <div>
    //           <p className="text-sm text-dark-text">Email</p>
    //           <p className="font-semibold text-dark-text">{profile.email}</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center bg-dark-bg p-3 rounded-lg">
    //         <FaGlobe className="mr-3 text-dark-text" />
    //         <div>
    //           <p className="text-sm text-dark-text">Country</p>
    //           <p className="font-semibold text-dark-text">{profile.country}</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center bg-dark-bg p-3 rounded-lg">
    //         <FaTag className="mr-3 text-dark-text" />
    //         <div>
    //           <p className="text-sm text-dark-text">Role</p>
    //           <p className="font-semibold text-dark-text">{profile.role}</p>
    //         </div>
    //       </div>
    //     </div>
    //     {error && (
    //       <p className="mt-4 text-red-500 text-center bg-red-800 p-2 rounded">
    //         {error}
    //       </p>
    //     )}
    //   </div>
    // </div>
  );
};

export default UserProfile;