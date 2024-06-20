'use client'
import fetcher from '@/_utils/fetcher';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetcher('/v1/user/profile');
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200"></div>
        <div>
          <h2 className="text-xl font-semibold">{`${profile.firstName} ${profile.lastName}`}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Username</h3>
        <p className="text-gray-600">{profile.username}</p>
      </div>
    </div>
  );
};

export default Profile;
