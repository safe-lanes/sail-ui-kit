# CrewCard Component Guide

## Overview
The CrewCard component displays crew member information, qualifications, and status for maritime applications. It provides comprehensive crew management functionality with TMSA-compliant styling optimized for personnel management and deployment systems.

## Component Interface

```typescript
interface CrewCardProps {
  crewMember: CrewMemberData;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'summary' | 'detailed' | 'deployment';
  showActions?: boolean;
  showCertifications?: boolean;
  onEdit?: (id: string) => void;
  onDeploy?: (id: string) => void;
  onContact?: (id: string) => void;
  className?: string;
}

interface CrewMemberData {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    nationality: string;
    dateOfBirth: string;
    seamanBookNumber: string;
    passportNumber: string;
    contactInfo: ContactInfo;
  };
  position: {
    rank: string;
    department: string;
    experience: number;
    joinDate?: string;
    contractEnd?: string;
  };
  certifications: Certification[];
  qualifications: Qualification[];
  medicalInfo: {
    medicalCertificate: CertificateInfo;
    visaStatus: string;
    vaccinations: Vaccination[];
  };
  deploymentStatus: 'available' | 'on-vessel' | 'on-leave' | 'training' | 'medical-leave';
  currentVessel?: string;
  performance: {
    rating: number;
    lastAppraisal: string;
    competencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  };
  emergencyContact: ContactInfo;
}
```

## Key Features
- **Comprehensive Profiles**: Complete crew member information management
- **Certification Tracking**: Real-time certificate status and renewal monitoring
- **Deployment Management**: Crew availability and vessel assignment tracking
- **Performance Metrics**: Competency assessment and appraisal integration
- **Compliance Monitoring**: STCW, MLC, and medical certification compliance

## Basic Usage

```tsx
import { CrewCard } from 'scomp-ui/sail-ui-kit';

function CrewManagementDashboard() {
  const crewMember = {
    id: 'CREW-001',
    personalInfo: {
      firstName: 'James',
      lastName: 'Morrison',
      nationality: 'United Kingdom',
      dateOfBirth: '1978-05-15',
      seamanBookNumber: 'UK123456789',
      passportNumber: 'UK987654321',
      contactInfo: {
        email: 'j.morrison@email.com',
        phone: '+44-7700-900123',
        address: 'Portsmouth, UK'
      }
    },
    position: {
      rank: 'Master',
      department: 'Navigation',
      experience: 25,
      joinDate: '2020-03-15',
      contractEnd: '2025-03-15'
    },
    certifications: [
      {
        name: 'Master Mariner License',
        issueDate: '2015-03-20',
        expiryDate: '2025-03-20',
        authority: 'UK MCA',
        status: 'valid'
      }
    ],
    deploymentStatus: 'on-vessel',
    currentVessel: 'MV Container Express',
    performance: {
      rating: 4.8,
      lastAppraisal: '2024-01-15',
      competencyLevel: 'expert'
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Crew Management
      </h3>
      
      <CrewCard
        crewMember={crewMember}
        variant="detailed"
        showActions={true}
        showCertifications={true}
        onEdit={(id) => console.log('Edit crew member:', id)}
        onDeploy={(id) => console.log('Deploy crew member:', id)}
        onContact={(id) => console.log('Contact crew member:', id)}
      />
    </div>
  );
}
```

## Crew Roster Dashboard

```tsx
function CrewRosterDashboard() {
  const crewRoster: CrewMemberData[] = [
    {
      id: 'CREW-001',
      personalInfo: {
        firstName: 'James',
        lastName: 'Morrison',
        nationality: 'United Kingdom',
        dateOfBirth: '1978-05-15',
        seamanBookNumber: 'UK123456789',
        passportNumber: 'UK987654321',
        contactInfo: {
          email: 'j.morrison@email.com',
          phone: '+44-7700-900123',
          address: 'Portsmouth, UK'
        }
      },
      position: {
        rank: 'Master',
        department: 'Navigation',
        experience: 25,
        joinDate: '2020-03-15',
        contractEnd: '2025-03-15'
      },
      certifications: [
        {
          name: 'Master Mariner License',
          issueDate: '2015-03-20',
          expiryDate: '2025-03-20',
          authority: 'UK MCA',
          status: 'valid'
        },
        {
          name: 'GMDSS Certificate',
          issueDate: '2020-06-10',
          expiryDate: '2025-06-10',
          authority: 'UK MCA',
          status: 'valid'
        }
      ],
      qualifications: [
        {
          name: 'Bridge Resource Management',
          level: 'Advanced',
          certifyingBody: 'Warsash Maritime Academy',
          completionDate: '2019-08-15'
        }
      ],
      medicalInfo: {
        medicalCertificate: {
          issueDate: '2023-12-15',
          expiryDate: '2025-12-15',
          authority: 'UK MCA Approved Doctor',
          status: 'valid'
        },
        visaStatus: 'Valid - Multiple Entry',
        vaccinations: [
          {
            type: 'Yellow Fever',
            date: '2023-01-15',
            expiryDate: '2033-01-15',
            certificate: 'YF123456'
          }
        ]
      },
      deploymentStatus: 'on-vessel',
      currentVessel: 'MV Container Express',
      performance: {
        rating: 4.8,
        lastAppraisal: '2024-01-15',
        competencyLevel: 'expert'
      },
      emergencyContact: {
        name: 'Sarah Morrison',
        relationship: 'Spouse',
        phone: '+44-7700-900456',
        email: 's.morrison@email.com'
      }
    },
    {
      id: 'CREW-002',
      personalInfo: {
        firstName: 'Maria',
        lastName: 'Rodriguez',
        nationality: 'Philippines',
        dateOfBirth: '1985-08-22',
        seamanBookNumber: 'PH987654321',
        passportNumber: 'PH123456789',
        contactInfo: {
          email: 'm.rodriguez@email.com',
          phone: '+63-917-123-4567',
          address: 'Manila, Philippines'
        }
      },
      position: {
        rank: 'Chief Engineer',
        department: 'Engineering',
        experience: 15,
        joinDate: '2021-06-01',
        contractEnd: '2024-12-01'
      },
      certifications: [
        {
          name: 'Chief Engineer License',
          issueDate: '2018-04-10',
          expiryDate: '2024-04-10',
          authority: 'Philippines MARINA',
          status: 'expires-soon'
        },
        {
          name: 'Basic Safety Training',
          issueDate: '2021-01-15',
          expiryDate: '2026-01-15',
          authority: 'Philippines MARINA',
          status: 'valid'
        }
      ],
      qualifications: [
        {
          name: 'Engine Room Resource Management',
          level: 'Advanced',
          certifyingBody: 'MAAP Philippines',
          completionDate: '2020-03-20'
        }
      ],
      medicalInfo: {
        medicalCertificate: {
          issueDate: '2024-01-10',
          expiryDate: '2026-01-10',
          authority: 'Philippines DOH',
          status: 'valid'
        },
        visaStatus: 'Valid - Work Visa',
        vaccinations: [
          {
            type: 'COVID-19',
            date: '2023-06-15',
            expiryDate: '2024-06-15',
            certificate: 'CV789012'
          }
        ]
      },
      deploymentStatus: 'available',
      currentVessel: undefined,
      performance: {
        rating: 4.5,
        lastAppraisal: '2023-12-01',
        competencyLevel: 'advanced'
      },
      emergencyContact: {
        name: 'Carlos Rodriguez',
        relationship: 'Father',
        phone: '+63-917-987-6543',
        email: 'c.rodriguez@email.com'
      }
    },
    {
      id: 'CREW-003',
      personalInfo: {
        firstName: 'Ahmed',
        lastName: 'Hassan',
        nationality: 'Egypt',
        dateOfBirth: '1990-12-08',
        seamanBookNumber: 'EG456789123',
        passportNumber: 'EG789123456',
        contactInfo: {
          email: 'a.hassan@email.com',
          phone: '+20-100-123-4567',
          address: 'Alexandria, Egypt'
        }
      },
      position: {
        rank: 'Second Officer',
        department: 'Navigation',
        experience: 8,
        joinDate: '2022-09-15',
        contractEnd: '2024-09-15'
      },
      certifications: [
        {
          name: 'Officer of the Watch License',
          issueDate: '2019-07-20',
          expiryDate: '2024-07-20',
          authority: 'Egypt AMSA',
          status: 'expires-soon'
        },
        {
          name: 'ECDIS Certificate',
          issueDate: '2021-03-15',
          expiryDate: '2026-03-15',
          authority: 'Egypt AMSA',
          status: 'valid'
        }
      ],
      qualifications: [
        {
          name: 'ARPA Training',
          level: 'Intermediate',
          certifyingBody: 'Arab Academy for Science',
          completionDate: '2021-11-10'
        }
      ],
      medicalInfo: {
        medicalCertificate: {
          issueDate: '2023-09-15',
          expiryDate: '2025-09-15',
          authority: 'Egypt Ministry of Health',
          status: 'valid'
        },
        visaStatus: 'Valid - Seafarer Visa',
        vaccinations: [
          {
            type: 'Hepatitis B',
            date: '2022-05-20',
            expiryDate: '2027-05-20',
            certificate: 'HB567890'
          }
        ]
      },
      deploymentStatus: 'training',
      currentVessel: undefined,
      performance: {
        rating: 4.2,
        lastAppraisal: '2023-09-15',
        competencyLevel: 'intermediate'
      },
      emergencyContact: {
        name: 'Fatima Hassan',
        relationship: 'Wife',
        phone: '+20-100-987-6543',
        email: 'f.hassan@email.com'
      }
    },
    {
      id: 'CREW-004',
      personalInfo: {
        firstName: 'Thomas',
        lastName: 'Anderson',
        nationality: 'Norway',
        dateOfBirth: '1982-03-25',
        seamanBookNumber: 'NO789123456',
        passportNumber: 'NO456789123',
        contactInfo: {
          email: 't.anderson@email.com',
          phone: '+47-123-45-678',
          address: 'Bergen, Norway'
        }
      },
      position: {
        rank: 'Bosun',
        department: 'Deck',
        experience: 20,
        joinDate: '2019-11-01',
        contractEnd: '2024-11-01'
      },
      certifications: [
        {
          name: 'Proficiency in Survival Craft',
          issueDate: '2020-02-15',
          expiryDate: '2025-02-15',
          authority: 'Norway NMA',
          status: 'valid'
        },
        {
          name: 'Advanced Fire Fighting',
          issueDate: '2021-05-10',
          expiryDate: '2026-05-10',
          authority: 'Norway NMA',
          status: 'valid'
        }
      ],
      qualifications: [
        {
          name: 'Crane Operations',
          level: 'Advanced',
          certifyingBody: 'Norwegian Maritime School',
          completionDate: '2018-09-12'
        }
      ],
      medicalInfo: {
        medicalCertificate: {
          issueDate: '2023-11-01',
          expiryDate: '2025-11-01',
          authority: 'Norway Health Authority',
          status: 'valid'
        },
        visaStatus: 'EU Citizen - No Visa Required',
        vaccinations: [
          {
            type: 'Tetanus',
            date: '2023-08-15',
            expiryDate: '2033-08-15',
            certificate: 'TT345678'
          }
        ]
      },
      deploymentStatus: 'on-leave',
      currentVessel: undefined,
      performance: {
        rating: 4.6,
        lastAppraisal: '2023-11-01',
        competencyLevel: 'expert'
      },
      emergencyContact: {
        name: 'Lars Anderson',
        relationship: 'Brother',
        phone: '+47-987-65-432',
        email: 'l.anderson@email.com'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on-vessel': return 'bg-blue-100 text-blue-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'training': return 'bg-purple-100 text-purple-800';
      case 'medical-leave': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'on-vessel': return <Ship className="h-4 w-4" />;
      case 'on-leave': return <Calendar className="h-4 w-4" />;
      case 'training': return <BookOpen className="h-4 w-4" />;
      case 'medical-leave': return <Heart className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600';
      case 'expires-soon': return 'text-yellow-600';
      case 'expired': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getExperienceLevel = (years: number) => {
    if (years >= 20) return 'Senior';
    if (years >= 10) return 'Experienced';
    if (years >= 5) return 'Intermediate';
    return 'Junior';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Crew Roster Management
        </h1>
        <p className="text-gray-600">
          Comprehensive crew member profiles and deployment status
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Crew</p>
              <p className="text-2xl font-bold text-gray-900">{crewRoster.length}</p>
            </div>
            <Users className="h-6 w-6 text-[#16569e]" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">
                {crewRoster.filter(crew => crew.deploymentStatus === 'available').length}
              </p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Vessel</p>
              <p className="text-2xl font-bold text-blue-600">
                {crewRoster.filter(crew => crew.deploymentStatus === 'on-vessel').length}
              </p>
            </div>
            <Ship className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600">
                {crewRoster.filter(crew => crew.deploymentStatus === 'on-leave').length}
              </p>
            </div>
            <Calendar className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Training</p>
              <p className="text-2xl font-bold text-purple-600">
                {crewRoster.filter(crew => crew.deploymentStatus === 'training').length}
              </p>
            </div>
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Crew Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {crewRoster.map((crewMember) => (
          <div key={crewMember.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 bg-[#16569e] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {crewMember.personalInfo.firstName[0]}{crewMember.personalInfo.lastName[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {crewMember.personalInfo.firstName} {crewMember.personalInfo.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {crewMember.position.rank} • {crewMember.position.department}
                  </p>
                  <p className="text-xs text-gray-500">
                    {crewMember.personalInfo.nationality} • {getExperienceLevel(crewMember.position.experience)} ({crewMember.position.experience} years)
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crewMember.deploymentStatus)}`}>
                {getStatusIcon(crewMember.deploymentStatus)}
                <span className="ml-1 capitalize">{crewMember.deploymentStatus.replace('-', ' ')}</span>
              </span>
            </div>

            {/* Current Assignment */}
            {crewMember.currentVessel && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Ship className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Current Assignment</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">{crewMember.currentVessel}</p>
                {crewMember.position.contractEnd && (
                  <p className="text-xs text-blue-600 mt-1">
                    Contract ends: {formatDate(crewMember.position.contractEnd)}
                  </p>
                )}
              </div>
            )}

            {/* Performance & Certifications */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Performance Rating</div>
                <div className={`text-lg font-bold ${getPerformanceColor(crewMember.performance.rating)}`}>
                  {crewMember.performance.rating}/5.0
                </div>
                <div className="text-xs text-gray-500">
                  Competency: {crewMember.performance.competencyLevel}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Certifications</div>
                <div className="space-y-1">
                  {crewMember.certifications.slice(0, 2).map((cert, index) => (
                    <div key={index} className={`text-xs ${getCertificationStatusColor(cert.status)}`}>
                      {cert.name}
                    </div>
                  ))}
                  {crewMember.certifications.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{crewMember.certifications.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Medical & Documentation */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Medical Cert:</span>
                  <div className={`${getCertificationStatusColor(crewMember.medicalInfo.medicalCertificate.status)}`}>
                    {crewMember.medicalInfo.medicalCertificate.status === 'valid' ? 'Valid' : 'Expired'}
                  </div>
                  <div className="text-xs text-gray-500">
                    Expires: {formatDate(crewMember.medicalInfo.medicalCertificate.expiryDate)}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Visa Status:</span>
                  <div className="text-gray-600">{crewMember.medicalInfo.visaStatus}</div>
                  <div className="text-xs text-gray-500">
                    Seaman Book: {crewMember.personalInfo.seamanBookNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Contact:</span>
                  <div className="text-gray-600">{crewMember.personalInfo.contactInfo.email}</div>
                  <div className="text-gray-600">{crewMember.personalInfo.contactInfo.phone}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Emergency Contact:</span>
                  <div className="text-gray-600">
                    {crewMember.emergencyContact.name} ({crewMember.emergencyContact.relationship})
                  </div>
                  <div className="text-gray-600">{crewMember.emergencyContact.phone}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  View Profile
                </button>
                <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Edit
                </button>
              </div>
              <div className="flex space-x-2">
                {crewMember.deploymentStatus === 'available' && (
                  <button className="px-3 py-1 text-xs bg-[#16569e] text-white rounded-md hover:bg-[#134a87]">
                    Deploy
                  </button>
                )}
                <button className="px-3 py-1 text-xs border border-[#16569e] text-[#16569e] rounded-md hover:bg-blue-50">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Deployment Panel */}
      <div className="bg-[#16569e] text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Deployment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold">
              {crewRoster.filter(crew => crew.deploymentStatus === 'available').length}
            </div>
            <div className="text-sm opacity-90">Available for Deployment</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {crewRoster.filter(crew => 
                crew.certifications.some(cert => cert.status === 'expires-soon')
              ).length}
            </div>
            <div className="text-sm opacity-90">Certification Renewals Needed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {Math.round(crewRoster.reduce((acc, crew) => acc + crew.performance.rating, 0) / crewRoster.length * 10) / 10}
            </div>
            <div className="text-sm opacity-90">Average Performance Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {crewRoster.filter(crew => crew.deploymentStatus === 'training').length}
            </div>
            <div className="text-sm opacity-90">Currently in Training</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Data Virtualization**: Efficient rendering for large crew rosters
- **Image Optimization**: Optimized crew photo loading and caching
- **Search & Filter**: Fast crew member search and filtering capabilities
- **Real-time Updates**: Live status updates for deployment changes

## Accessibility Features

- **Screen Reader Support**: Proper ARIA labels for crew information
- **Keyboard Navigation**: Full keyboard accessibility for all actions
- **High Contrast**: WCAG compliant color schemes
- **Alternative Text**: Descriptive text for visual elements

## Common Patterns

```tsx
// Basic crew summary
<CrewCard
  crewMember={crewData}
  variant="summary"
  size="md"
/>

// Detailed crew profile
<CrewCard
  crewMember={crewData}
  variant="detailed"
  showCertifications={true}
  showActions={true}
/>

// Deployment management
<CrewCard
  crewMember={crewData}
  variant="deployment"
  onDeploy={handleDeploy}
  onContact={handleContact}
/>
```

## Integration with Maritime Systems

The CrewCard component integrates seamlessly with:
- **Crew Management**: Personnel records and deployment systems
- **Training Systems**: Certification tracking and training management
- **Payroll Systems**: Contract and compensation management
- **Compliance Systems**: STCW and MLC compliance monitoring
- **Communication Systems**: Crew contact and emergency notification

Use this component to maintain comprehensive crew member profiles and ensure efficient personnel management across maritime operations.