import React, { useState, useEffect } from 'react';
import './userProfile.css';
import ProfileHeader from './UserProfileComponents/ProfileHeader';
import ProfileCompletion from './UserProfileComponents/ProfileCompletion';
import PersonalInfo from './UserProfileComponents/PersonalInfo';
import CareerProfile from './UserProfileComponents/CareerProfile';
import Education from './UserProfileComponents/Education';
import Experience from './UserProfileComponents/Experience';
import Projects from './UserProfileComponents/Projects';
import Skills from './UserProfileComponents/Skills';
import Languages from './UserProfileComponents/Languages';
import SocialLinks from './UserProfileComponents/SocialLinks';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'John Doe',
      headline: 'Senior Software Developer',
      location: 'Bangalore, India',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      image: 'https://via.placeholder.com/150',
      dob: '1990-05-15',
      gender: 'Male',
      maritalStatus: 'Single'
    },
    careerProfile: {
      summary: 'Experienced software developer with 5+ years in web development. Specialized in React and Node.js.',
      currentIndustry: 'Information Technology',
      functionalArea: 'Software Development',
      role: 'Frontend Developer',
      jobType: 'Permanent',
      employmentType: 'Full Time',
      desiredSalary: '15,00,000',
      desiredLocation: 'Bangalore',
      noticePeriod: '30 days'
    },
    education: [
      {
        degree: 'Master of Computer Applications',
        university: 'Indian Institute of Technology',
        year: '2015 - 2018',
        completed: true
      }
    ],
    experience: [
      {
        title: 'Senior Software Developer',
        company: 'Tech Solutions Inc.',
        duration: '2019 - Present',
        description: 'Developing web applications using React and Node.js'
      }
    ],
    projects: [
      {
        title: 'E-commerce Platform',
        duration: '2020 - 2021',
        description: 'Developed a full-stack e-commerce platform with React and Node.js',
        skills: ['React', 'Node.js', 'MongoDB'],
        link: 'https://github.com/username/ecommerce-platform'
      }
    ],
    skills: ['React', 'JavaScript', 'Node.js', 'HTML/CSS', 'Redux', 'MongoDB'],
    languages: [
      { name: 'English', proficiency: 'Fluent' },
      { name: 'Hindi', proficiency: 'Native' }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/username',
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username',
      portfolio: 'https://username.dev'
    }
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    // Calculate profile completion percentage
    let percentage = 0;
    
    // Personal info (20%)
    if (profileData.personalInfo.name) percentage += 10;
    if (profileData.personalInfo.headline) percentage += 5;
    if (profileData.personalInfo.email) percentage += 3;
    if (profileData.personalInfo.phone) percentage += 2;
    
    // Career profile (15%)
    if (profileData.careerProfile.summary) percentage += 15;
    
    // Education (15%)
    if (profileData.education.length > 0) percentage += 15;
    
    // Experience (20%)
    if (profileData.experience.length > 0) percentage += 20;
    
    // Projects (10%)
    if (profileData.projects.length > 0) percentage += 10;
    
    // Skills (10%)
    if (profileData.skills.length > 0) percentage += 10;
    
    // Languages (5%)
    if (profileData.languages.length > 0) percentage += 5;
    
    // Social links (5%)
    if (profileData.socialLinks.linkedin || profileData.socialLinks.github || 
        profileData.socialLinks.portfolio) percentage += 5;
    
    setCompletionPercentage(Math.min(100, percentage));
  }, [profileData]);

  const handleSave = (section, data) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // In a real app, you would send this to the backend
    console.log(`Saving ${section} data:`, data);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header-section">
        <ProfileHeader 
          data={profileData.personalInfo} 
          socialLinks={profileData.socialLinks}
        />
        <ProfileCompletion percentage={completionPercentage} />
      </div>
      
      <div className="profile-sections">
        <PersonalInfo 
          data={profileData.personalInfo} 
          onSave={(data) => handleSave('personalInfo', data)} 
        />
        
        <CareerProfile
          data={profileData.careerProfile}
          onSave={(data) => handleSave('careerProfile', data)}
        />
        
        <Education 
          data={profileData.education} 
          onSave={(data) => handleSave('education', data)} 
        />
        
        <Experience 
          data={profileData.experience} 
          onSave={(data) => handleSave('experience', data)} 
        />
        
        <Projects
          data={profileData.projects}
          onSave={(data) => handleSave('projects', data)}
        />
        
        <Skills 
          data={profileData.skills} 
          onSave={(data) => handleSave('skills', data)} 
        />
        
        <Languages
          data={profileData.languages}
          onSave={(data) => handleSave('languages', data)}
        />
        
        <SocialLinks
          data={profileData.socialLinks}
          onSave={(data) => handleSave('socialLinks', data)}
        />
      </div>
    </div>
  );
};

export default UserProfile;