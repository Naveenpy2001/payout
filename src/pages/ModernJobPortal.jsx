import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiArrowLeft, FiBookmark, FiShare2, FiMapPin, FiDollarSign, FiClock, FiBriefcase } from 'react-icons/fi';
import { jobs, userProfile } from './jobs';
import './ModernJobPortal.css';

const ModernJobPortal = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [mobileView, setMobileView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    experience: '',
    salary: '',
    jobType: ''
  });

  // Filter jobs based on search and filters
  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = location === '' || 
        job.location.toLowerCase().includes(location.toLowerCase());
      
      const matchesFilters = (
        (filters.experience === '' || job.experience.includes(filters.experience)) &&
        (filters.salary === '' || job.salary.includes(filters.salary)) &&
        (filters.jobType === '' || job.type.toLowerCase().includes(filters.jobType.toLowerCase()))
      );
      
      return matchesSearch && matchesLocation && matchesFilters;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, location, filters]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    if (window.innerWidth < 768) {
      setMobileView('detail');
    }
  };

  const handleBackToList = () => {
    setMobileView('list');
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  return (
    <div className="modern-job-portal">
      {/* Header */}
      <header className="portal-header">
        <div className="header-content">
          <h1 className="portal-logo">CareerConnect</h1>
          <div className="header-actions">
            <button className="notifications-btn">
              <span className="notification-badge">3</span>
              <i className="icon-bell"></i>
            </button>
            <div className="user-avatar">
              <img src={userProfile.avatar} alt={userProfile.name} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="portal-main">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <div className="search-input-group">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Job title, skills, or company" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-input-group">
              <FiMapPin className="search-icon" />
              <input 
                type="text" 
                placeholder="Location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="search-btn">Find Jobs</button>
          </div>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Experience Level</label>
              <select 
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
              >
                <option value="">All Experience</option>
                <option value="0-1">Fresher</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Salary Range</label>
              <select 
                value={filters.salary}
                onChange={(e) => setFilters({...filters, salary: e.target.value})}
              >
                <option value="">All Salaries</option>
                <option value="0-3">0-3 LPA</option>
                <option value="3-6">3-6 LPA</option>
                <option value="6-10">6-10 LPA</option>
                <option value="10+">10+ LPA</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Job Type</label>
              <select 
                value={filters.jobType}
                onChange={(e) => setFilters({...filters, jobType: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            
            <div className="filter-actions">
              <button className="apply-filters" onClick={() => applyFilters(filters)}>
                Apply Filters
              </button>
              <button className="reset-filters" onClick={() => setFilters({
                experience: '',
                salary: '',
                jobType: ''
              })}>
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="job-listings-container">
          {/* Job List */}
          {(mobileView === 'list' || window.innerWidth >= 768) && (
            <div className="job-list">
              <div className="list-header">
                <h2>
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                  {filteredJobs.length > 0 && (
                    <span className="relevance-sort">Sorted by Relevance</span>
                  )}
                </h2>
              </div>
              
              <div className="jobs-scroll-container">
                {filteredJobs.length === 0 ? (
                  <div className="no-jobs-found">
                    <img src="/images/no-jobs.svg" alt="No jobs found" />
                    <h3>No jobs match your search</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button 
                      className="reset-all-btn"
                      onClick={() => {
                        setSearchTerm('');
                        setLocation('');
                        setFilters({
                          experience: '',
                          salary: '',
                          jobType: ''
                        });
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredJobs.map(job => (
                    <div 
                      key={job.id}
                      className={`job-card ${selectedJob?.id === job.id ? 'active' : ''}`}
                      onClick={() => handleJobSelect(job)}
                    >
                      <div className="card-header">
                        <div className="company-logo">
                          <img src={job.logo} alt={job.company} />
                        </div>
                        <div className="job-title-container">
                          <h3>{job.title}</h3>
                          <p className="company-name">{job.company}</p>
                          <div className="job-highlights">
                            <span><FiMapPin /> {job.location}</span>
                            <span><FiDollarSign /> {job.salary}</span>
                          </div>
                        </div>
                        <button className="save-job-btn">
                          <FiBookmark />
                        </button>
                      </div>
                      
                      <div className="job-meta">
                        <span><FiBriefcase /> {job.experience}</span>
                        <span><FiClock /> {job.posted}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                      
                      <div className="job-skills">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="more-skills">+{job.skills.length - 4} more</span>
                        )}
                      </div>
                      
                      <div className="job-actions">
                        <button className="apply-btn">Apply Now</button>
                        <button className="view-details-btn">View Details</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Job Details */}
          {(mobileView === 'detail' || window.innerWidth >= 768) && (
            <div className="job-details">
              {selectedJob ? (
                <>
                  {window.innerWidth < 768 && (
                    <button className="back-to-list" onClick={handleBackToList}>
                      <FiArrowLeft /> Back to Jobs
                    </button>
                  )}
                  
                  <div className="details-header">
                    <div className="company-logo">
                      <img src={selectedJob.logo} alt={selectedJob.company} />
                    </div>
                    <div className="job-info">
                      <h2>{selectedJob.title}</h2>
                      <p className="company-name">{selectedJob.company}</p>
                      <div className="job-meta">
                        <span><FiMapPin /> {selectedJob.location}</span>
                        <span><FiDollarSign /> {selectedJob.salary}</span>
                        <span><FiBriefcase /> {selectedJob.experience}</span>
                        <span><FiClock /> {selectedJob.posted}</span>
                      </div>
                    </div>
                    <div className="job-actions">
                      <button className="save-btn">
                        <FiBookmark /> Save
                      </button>
                      <button className="share-btn">
                        <FiShare2 /> Share
                      </button>
                    </div>
                  </div>
                  
                  <div className="details-content">
                    <div className="section">
                      <h3>Job Description</h3>
                      <p>{selectedJob.description}</p>
                    </div>
                    
                    <div className="section">
                      <h3>Requirements</h3>
                      <ul className="requirements-list">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="section">
                      <h3>Skills Required</h3>
                      <div className="skills-container">
                        {selectedJob.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="section">
                      <h3>About {selectedJob.company}</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                    </div>
                  </div>
                  
                  <div className="details-footer">
                    <button className="apply-now-btn">Apply Now</button>
                    <button className="save-for-later-btn">Save for Later</button>
                  </div>
                </>
              ) : (
                <div className="no-job-selected">
                  <img src="/images/select-job.svg" alt="Select a job" />
                  <h3>Select a job to view details</h3>
                  <p>Click on any job from the list to see complete information</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {window.innerWidth < 768 && (
        <nav className="mobile-nav">
          <button className={`nav-item ${mobileView === 'list' ? 'active' : ''}`}>
            <i className="icon-home"></i>
            <span>Jobs</span>
          </button>
          <button className="nav-item">
            <i className="icon-saved"></i>
            <span>Saved</span>
          </button>
          <button className="nav-item">
            <i className="icon-applications"></i>
            <span>Applications</span>
          </button>
          <button className="nav-item">
            <i className="icon-profile"></i>
            <span>Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default ModernJobPortal;