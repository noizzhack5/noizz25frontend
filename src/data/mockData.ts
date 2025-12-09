import type { Candidate } from '@/types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    fullName: 'Sarah Mitchell',
    fullNameHebrew: 'שרה מיטשל',
    email: 'sarah.mitchell@email.com',
    phone: '+972-54-123-4567',
    age: 34,
    citizenship: 'Israeli / German',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_recruit',
    jobType: 'headquarters_staff',
    canTravelEurope: true,
    canTravelIsrael: true,
    livesInEurope: true,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTAzNjM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-15'), note: 'CV received from LinkedIn' },
      { status: 'bot_interview', timestamp: new Date('2024-11-16'), note: 'WhatsApp interview started' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-20'), note: 'All information collected' }
    ],
    primaryGroup: {
      groupName: 'Headquarters Staff',
      matchScore: 95
    },
    alternativeGroups: [
      { groupName: 'Sales', matchScore: 78 },
      { groupName: 'Training/Instruction', matchScore: 65 }
    ],
    matchedParameters: [
      { name: 'Israeli origin', matched: true },
      { name: 'Ability to travel to Israel', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Management experience', matched: true },
      { name: 'English fluency', matched: true }
    ],
    aiSkillsSummary: 'Experienced professional with strong background in international operations. Israeli citizen currently residing in Germany. Excellent travel flexibility and demonstrated ability to manage cross-border projects. Strong leadership and communication skills.',
    additionalInfo: [
      { question: 'Israeli Citizenship', answer: 'Yes, dual citizenship (Israel & Germany)' },
      { question: 'Availability to Travel', answer: 'Available for frequent travel to Israel' },
      { question: 'Current Location', answer: 'Berlin, Germany' },
      { question: 'Languages', answer: 'Hebrew (native), English (fluent), German (fluent)' }
    ],
    notes: 'Excellent candidate for HQ position. Strong cultural fit and international experience.',
    manualNotes: 'Follow up scheduled for next week. Very interested in the position.',
    cvUrl: '#',
    createdAt: new Date('2024-11-15'),
    // EXAMPLE: Status was changed 5 seconds ago
    statusChangedAt: new Date(Date.now() - 5000),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Sarah! 👋 Thank you for applying to our position. I\'m the Talently recruitment assistant. I have a few questions to better understand your profile. Is this a good time?', timestamp: new Date('2024-11-16T10:00:00') },
        { sender: 'user', text: 'Yes, sure! Happy to answer.', timestamp: new Date('2024-11-16T10:01:15') },
        { sender: 'bot', text: 'Great! First, do you remember which position you applied for?', timestamp: new Date('2024-11-16T10:01:30') },
        { sender: 'user', text: 'Yes, I applied for the Headquarters Staff position.', timestamp: new Date('2024-11-16T10:02:00') },
        { sender: 'bot', text: 'Perfect! ✓ Now, are you a native Israeli?', timestamp: new Date('2024-11-16T10:02:15') },
        { sender: 'user', text: 'Yes, I was born in Israel.', timestamp: new Date('2024-11-16T10:02:45') },
        { sender: 'bot', text: 'Excellent! ✓ Do you currently live in Europe?', timestamp: new Date('2024-11-16T10:03:00') },
        { sender: 'user', text: 'Yes, I live in Berlin, Germany. I moved here 3 years ago.', timestamp: new Date('2024-11-16T10:03:30') },
        { sender: 'bot', text: 'Great! ✓ Can you travel to Israel if needed for work?', timestamp: new Date('2024-11-16T10:03:45') },
        { sender: 'user', text: 'Absolutely! I visit Israel frequently anyway to see family.', timestamp: new Date('2024-11-16T10:04:20') },
        { sender: 'bot', text: 'Perfect! ✓ And are you able to travel within Europe?', timestamp: new Date('2024-11-16T10:04:35') },
        { sender: 'user', text: 'Yes, no problem at all.', timestamp: new Date('2024-11-16T10:05:00') },
        { sender: 'bot', text: 'Excellent! ✓ Last question - do you speak good English?', timestamp: new Date('2024-11-16T10:05:15') },
        { sender: 'user', text: 'Yes, I\'m fluent in English. I use it daily at work.', timestamp: new Date('2024-11-16T10:05:45') },
        { sender: 'bot', text: 'Perfect! ✓ Thank you so much, Sarah! I have all the information I need. Our recruitment team will review your profile and be in touch soon. Have a great day! 😊', timestamp: new Date('2024-11-16T10:06:00') },
        { sender: 'user', text: 'Thank you!', timestamp: new Date('2024-11-16T10:06:15') }
      ],
      startedAt: new Date('2024-11-16T10:00:00'),
      completedAt: new Date('2024-11-16T10:06:15')
    }
  },
  {
    id: '2',
    fullName: 'Yossi Cohen',
    fullNameHebrew: 'יוסי כהן',
    email: 'yossi.cohen@email.com',
    phone: '+972-52-234-5678',
    age: 32,
    citizenship: 'Israeli',
    campaignSource: 'Facebook Tech Jobs',
    status: 'ready_for_recruit',
    jobType: 'operational_worker',
    canTravelEurope: false,
    canTravelIsrael: true,
    livesInEurope: false,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ5ODc3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-18'), note: 'Applied via Facebook' },
      { status: 'bot_interview', timestamp: new Date('2024-11-19'), note: 'Completed questionnaire' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-21'), note: 'All parameters verified' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 94
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 70 }
    ],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: true },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: true },
      { name: 'Owns a vehicle', matched: true },
      { name: 'Motorcycle', matched: true },
      { name: 'Single', matched: true },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: 'Highly suitable operational worker. 32 years old, freelancer with excellent availability. Israeli citizen living in Tel Aviv. Owns both car and motorcycle. Strong reliability record and very flexible for long-distance assignments.',
    additionalInfo: [
      { question: 'Age', answer: '32' },
      { question: 'Employment Status', answer: 'Freelancer - Full availability' },
      { question: 'Marital Status', answer: 'Single' },
      { question: 'Vehicle Ownership', answer: 'Car (Honda Civic 2020) + Motorcycle (Yamaha)' },
      { question: 'Driver License', answer: 'Yes, clean record' },
      { question: 'Long Trip Flexibility', answer: 'Fully flexible, no constraints' }
    ],
    notes: 'Perfect fit for operational role. Very motivated and reliable.',
    cvUrl: '#',
    createdAt: new Date('2024-11-18'),
    // EXAMPLE: New answers received 3 seconds ago
    newAnswersAt: new Date(Date.now() - 3000),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hi Yossi! 👋 This is Talently bot. Thanks for your application! Can I ask you a few quick questions?', timestamp: new Date('2024-11-19T14:00:00') },
        { sender: 'user', text: 'Sure!', timestamp: new Date('2024-11-19T14:00:30') },
        { sender: 'bot', text: 'Great! Do you remember which job you applied for?', timestamp: new Date('2024-11-19T14:00:45') },
        { sender: 'user', text: 'Yes, Operational Worker position', timestamp: new Date('2024-11-19T14:01:10') },
        { sender: 'bot', text: 'Perfect! ✓ Are you a native Israeli?', timestamp: new Date('2024-11-19T14:01:25') },
        { sender: 'user', text: 'Yes', timestamp: new Date('2024-11-19T14:01:40') },
        { sender: 'bot', text: 'Excellent! ✓ Do you currently live in Europe?', timestamp: new Date('2024-11-19T14:01:55') },
        { sender: 'user', text: 'No, I live in Tel Aviv', timestamp: new Date('2024-11-19T14:02:15') },
        { sender: 'bot', text: 'Got it! ✓ Do you speak good English?', timestamp: new Date('2024-11-19T14:02:30') },
        { sender: 'user', text: 'Yes, fluent', timestamp: new Date('2024-11-19T14:02:50') },
        { sender: 'bot', text: 'Excellent! ✓ Thank you Yossi! Our team will be in touch. Have a great day! 😊', timestamp: new Date('2024-11-19T14:03:05') }
      ],
      startedAt: new Date('2024-11-19T14:00:00'),
      completedAt: new Date('2024-11-19T14:03:05')
    }
  },
  {
    id: '3',
    fullName: 'Emma Rodriguez',
    fullNameHebrew: 'אמה רודריגז',
    email: 'emma.rodriguez@email.com',
    phone: '+34-612-345-678',
    age: 36,
    citizenship: 'Spanish',
    campaignSource: 'X (Twitter) Tech Hiring',
    status: 'bot_interview',
    jobType: 'training_instruction',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY1MDkxNjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-22'), note: 'New application via X campaign' },
      { status: 'bot_interview', timestamp: new Date('2024-11-23'), note: 'WhatsApp interview in progress' }
    ],
    primaryGroup: {
      groupName: 'Training/Instruction',
      matchScore: 91
    },
    alternativeGroups: [
      { groupName: 'Sales', matchScore: 75 }
    ],
    matchedParameters: [
      { name: 'Not an Israeli citizen', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Teaching experience', matched: true },
      { name: 'English fluency', matched: true },
      { name: 'Presentation skills', matched: true }
    ],
    aiSkillsSummary: 'Experienced trainer and educator with 8 years in corporate training. Spanish citizen residing in Barcelona. Excellent presentation and communication skills. Background in tech education and professional development programs.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Spanish' },
      { question: 'Current Location', answer: 'Barcelona, Spain' },
      { question: 'Teaching Experience', answer: '8 years - Corporate training & workshops' },
      { question: 'Languages', answer: 'Spanish (native), English (fluent), French (intermediate)' }
    ],
    notes: 'Strong candidate for training role. Need to complete parameter collection.',
    cvUrl: '#',
    createdAt: new Date('2024-11-22'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Emma! 👋 Thank you for applying! This is Talently recruitment bot. Do you have a moment for some questions?', timestamp: new Date('2024-11-23T09:00:00') },
        { sender: 'user', text: 'Hi! Yes, of course', timestamp: new Date('2024-11-23T09:01:00') },
        { sender: 'bot', text: 'Perfect! Do you remember which position you applied for?', timestamp: new Date('2024-11-23T09:01:15') },
        { sender: 'user', text: 'Training/Instruction position', timestamp: new Date('2024-11-23T09:01:45') },
        { sender: 'bot', text: 'Great! ✓ Are you an Israeli citizen?', timestamp: new Date('2024-11-23T09:02:00') },
        { sender: 'user', text: 'No, I\'m Spanish', timestamp: new Date('2024-11-23T09:02:20') },
        { sender: 'bot', text: 'Perfect! ✓ Do you currently live in Europe?', timestamp: new Date('2024-11-23T09:02:35') },
        { sender: 'user', text: 'Yes, in Barcelona, Spain', timestamp: new Date('2024-11-23T09:03:00') },
        { sender: 'bot', text: 'Excellent! ✓ Can you travel within Europe for work?', timestamp: new Date('2024-11-23T09:03:15') },
        { sender: 'user', text: 'Yes, absolutely. I travel regularly for training workshops.', timestamp: new Date('2024-11-23T09:03:50') },
        { sender: 'bot', text: 'Wonderful! ✓ And do you speak good English?', timestamp: new Date('2024-11-23T09:04:05') },
        { sender: 'user', text: 'Yes, fluent. I conduct all my trainings in English.', timestamp: new Date('2024-11-23T09:04:35') }
      ],
      startedAt: new Date('2024-11-23T09:00:00')
    }
  },
  {
    id: '4',
    fullName: 'Marcus Weber',
    fullNameHebrew: 'מרקוס וובר',
    email: 'marcus.weber@email.com',
    phone: '+49-151-234-5678',
    citizenship: 'German',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_recruit',
    jobType: 'sales',
    profileImage: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTA3NDExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-10'), note: 'CV received from LinkedIn' },
      { status: 'bot_interview', timestamp: new Date('2024-11-11'), note: 'Initial conversation completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-12'), note: 'All information verified' }
    ],
    primaryGroup: {
      groupName: 'Sales',
      matchScore: 89
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 72 }
    ],
    matchedParameters: [
      { name: 'European residency', matched: true },
      { name: 'Business experience', matched: true },
      { name: 'Stable financial status', matched: true },
      { name: 'B2B sales experience', matched: true },
      { name: 'Language skills', matched: true }
    ],
    aiSkillsSummary: 'Senior Sales Executive with 10 years of B2B sales experience. German citizen based in Frankfurt. Strong track record in technology sales with proven revenue growth. Financially stable with excellent business network across Europe.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'German' },
      { question: 'Current Location', answer: 'Frankfurt, Germany' },
      { question: 'Sales Experience', answer: '10 years - B2B Tech Sales' },
      { question: 'Financial Status', answer: 'Stable - Own property, no debts' },
      { question: 'Languages', answer: 'German (native), English (fluent), Dutch (basic)' }
    ],
    notes: 'Excellent sales background. High potential for European market.',
    cvUrl: '#',
    createdAt: new Date('2024-11-10'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Guten Tag Marcus! 👋 This is the Talently recruitment assistant. Thank you for applying! May I ask you some questions?', timestamp: new Date('2024-11-11T11:00:00') },
        { sender: 'user', text: 'Hello! Yes, of course.', timestamp: new Date('2024-11-11T11:00:45') },
        { sender: 'bot', text: 'Excellent! Which position did you apply for?', timestamp: new Date('2024-11-11T11:01:00') },
        { sender: 'user', text: 'The Sales position', timestamp: new Date('2024-11-11T11:01:25') },
        { sender: 'bot', text: 'Perfect! ✓ Are you currently living in Europe?', timestamp: new Date('2024-11-11T11:01:40') },
        { sender: 'user', text: 'Yes, I live in Frankfurt, Germany', timestamp: new Date('2024-11-11T11:02:10') },
        { sender: 'bot', text: 'Great! ✓ Do you speak good English?', timestamp: new Date('2024-11-11T11:02:25') },
        { sender: 'user', text: 'Yes, fluent. I work with international clients daily.', timestamp: new Date('2024-11-11T11:02:55') },
        { sender: 'bot', text: 'Wonderful! ✓ Thank you Marcus! Our recruitment team will review your application and contact you soon. Best regards! 😊', timestamp: new Date('2024-11-11T11:03:10') },
        { sender: 'user', text: 'Thank you!', timestamp: new Date('2024-11-11T11:03:25') }
      ],
      startedAt: new Date('2024-11-11T11:00:00'),
      completedAt: new Date('2024-11-11T11:03:25')
    }
  },
  {
    id: '5',
    fullName: 'David Levi',
    fullNameHebrew: 'דוד לוי',
    email: 'david.levi@email.com',
    phone: '+972-50-345-6789',
    campaignSource: 'Facebook Tech Jobs',
    status: 'submitted',
    jobType: 'operational_worker',
    profileImage: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG1hbnxlbnwxfHx8fDE3NjUxMDM3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-24'), note: 'New submission - awaiting contact' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 88
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: true },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: true },
      { name: 'Owns a vehicle', matched: true },
      { name: 'Motorcycle', matched: false },
      { name: 'Single', matched: false },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: 'Operational worker candidate. 38 years old, currently employed part-time with high availability. Lives in Haifa. Owns car, licensed driver. Married with family support for flexible schedule.',
    additionalInfo: [],
    notes: 'Awaiting WhatsApp interview to collect additional parameters.',
    cvUrl: '#',
    createdAt: new Date('2024-11-24')
  },
  {
    id: '6',
    fullName: 'Sophie Laurent',
    fullNameHebrew: 'סופי לורן',
    email: 'sophie.laurent@email.com',
    phone: '+33-6-12-34-56-78',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_bot_interview',
    jobType: 'headquarters_staff',
    profileImage: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDk5OTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-20'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-21'), note: 'In conversation' },
      { status: 'ready_for_bot_interview', timestamp: new Date('2024-11-22'), note: 'Bot interview completed - ready for review' }
    ],
    primaryGroup: {
      groupName: 'Headquarters Staff',
      matchScore: 87
    },
    alternativeGroups: [
      { groupName: 'Training/Instruction', matchScore: 80 }
    ],
    matchedParameters: [
      { name: 'Israeli origin', matched: true },
      { name: 'Ability to travel to Israel', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Management experience', matched: false },
      { name: 'English fluency', matched: true }
    ],
    aiSkillsSummary: 'Israeli-French professional with 5 years of experience in project coordination. Currently living in Paris. Strong administrative and organizational skills. Frequent visitor to Israel with family connections.',
    additionalInfo: [
      { question: 'Israeli Citizenship', answer: 'Yes, dual (Israel & France)' },
      { question: 'Availability to Travel', answer: 'Yes, travels to Israel regularly' },
      { question: 'Current Location', answer: 'Paris, France' }
    ],
    notes: 'Good candidate, collecting more information about management experience.',
    cvUrl: '#',
    createdAt: new Date('2024-11-20'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Bonjour Sophie! 👋 Talently recruitment assistant here. Thank you for your application! Can we chat for a moment?', timestamp: new Date('2024-11-21T15:00:00') },
        { sender: 'user', text: 'Hello! Yes, sure', timestamp: new Date('2024-11-21T15:00:50') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-21T15:01:05') },
        { sender: 'user', text: 'Headquarters Staff', timestamp: new Date('2024-11-21T15:01:30') },
        { sender: 'bot', text: 'Perfect! ✓ Are you originally from Israel?', timestamp: new Date('2024-11-21T15:01:45') },
        { sender: 'user', text: 'Yes, I was born in Israel but live in France now', timestamp: new Date('2024-11-21T15:02:15') },
        { sender: 'bot', text: 'Wonderful! ✓ So you currently live in Europe?', timestamp: new Date('2024-11-21T15:02:30') },
        { sender: 'user', text: 'Yes, in Paris', timestamp: new Date('2024-11-21T15:02:50') },
        { sender: 'bot', text: 'Great! ✓ Can you travel to Israel if needed?', timestamp: new Date('2024-11-21T15:03:05') },
        { sender: 'user', text: 'Yes of course! I visit regularly', timestamp: new Date('2024-11-21T15:03:30') }
      ],
      startedAt: new Date('2024-11-21T15:00:00')
    }
  },
  {
    id: '7',
    fullName: 'Thomas Anderson',
    fullNameHebrew: 'תומס אנדרסון',
    email: 'thomas.anderson@email.com',
    phone: '+44-7700-900123',
    citizenship: 'British',
    campaignSource: 'X (Twitter) Tech Hiring',
    status: 'ready_for_recruit',
    jobType: 'sales',
    profileImage: 'https://images.unsplash.com/photo-1641260774125-04d527b376a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjUwNDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-17'), note: 'CV submitted' },
      { status: 'bot_interview', timestamp: new Date('2024-11-18'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-19'), note: 'All data collected' }
    ],
    primaryGroup: {
      groupName: 'Sales',
      matchScore: 86
    },
    alternativeGroups: [
      { groupName: 'Training/Instruction', matchScore: 68 }
    ],
    matchedParameters: [
      { name: 'European residency', matched: true },
      { name: 'Business experience', matched: true },
      { name: 'Stable financial status', matched: true },
      { name: 'B2B sales experience', matched: true },
      { name: 'Language skills', matched: false }
    ],
    aiSkillsSummary: 'Sales professional with 7 years in SaaS sales. UK resident based in London. Strong business development skills with proven track record. Financially stable with established client network in UK and Ireland.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'British' },
      { question: 'Current Location', answer: 'London, UK' },
      { question: 'Sales Experience', answer: '7 years - SaaS B2B' },
      { question: 'Financial Status', answer: 'Stable' },
      { question: 'Languages', answer: 'English (native)' }
    ],
    notes: 'Strong UK market experience. Limited multilingual capability.',
    cvUrl: '#',
    createdAt: new Date('2024-11-17'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Thomas! 👋 Talently bot here. Thank you for your application! Can I ask a few questions?', timestamp: new Date('2024-11-18T16:30:00') },
        { sender: 'user', text: 'Hi! Sure, go ahead', timestamp: new Date('2024-11-18T16:30:45') },
        { sender: 'bot', text: 'Great! Do you remember which position you applied for?', timestamp: new Date('2024-11-18T16:31:00') },
        { sender: 'user', text: 'Yes, the Sales position', timestamp: new Date('2024-11-18T16:31:30') },
        { sender: 'bot', text: 'Perfect! ✓ Do you currently live in Europe?', timestamp: new Date('2024-11-18T16:31:45') },
        { sender: 'user', text: 'Yes, I live in London, UK', timestamp: new Date('2024-11-18T16:32:15') },
        { sender: 'bot', text: 'Excellent! ✓ And do you speak good English?', timestamp: new Date('2024-11-18T16:32:30') },
        { sender: 'user', text: 'Yes, I\'m a native English speaker', timestamp: new Date('2024-11-18T16:33:00') },
        { sender: 'bot', text: 'Perfect! ✓ Thank you Thomas! Our recruitment team will contact you soon. Best of luck! 😊', timestamp: new Date('2024-11-18T16:33:15') },
        { sender: 'user', text: 'Thanks!', timestamp: new Date('2024-11-18T16:33:30') }
      ],
      startedAt: new Date('2024-11-18T16:30:00'),
      completedAt: new Date('2024-11-18T16:33:30')
    }
  },
  {
    id: '8',
    fullName: 'Rachel Green',
    fullNameHebrew: 'רחל גרין',
    email: 'rachel.green@email.com',
    phone: '+972-54-456-7890',
    campaignSource: 'Indeed Job Board',
    status: 'submitted',
    jobType: 'operational_worker',
    profileImage: 'https://images.unsplash.com/photo-1745434159123-4908d0b9df94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY1MDc4MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-25'), note: 'New application' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 82
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: false },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: false },
      { name: 'Owns a vehicle', matched: true },
      { name: 'Motorcycle', matched: false },
      { name: 'Single', matched: false },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: 'Candidate from Jerusalem, 29 years old. Part-time availability due to other commitments. Owns a car and has valid license. Married with one child. Good reliability record.',
    additionalInfo: [],
    notes: '',
    cvUrl: '#',
    createdAt: new Date('2024-11-25')
  },
  {
    id: '9',
    fullName: 'Alessandro Rossi',
    fullNameHebrew: 'אלסנדרו רוסי',
    email: 'alessandro.rossi@email.com',
    phone: '+39-345-678-9012',
    age: 41,
    citizenship: 'Italian',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_recruit',
    jobType: 'training_instruction',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjUwNDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-14'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-15'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-16'), note: 'Ready for final review' }
    ],
    primaryGroup: {
      groupName: 'Training/Instruction',
      matchScore: 93
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 81 }
    ],
    matchedParameters: [
      { name: 'Not an Israeli citizen', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Teaching experience', matched: true },
      { name: 'English fluency', matched: true },
      { name: 'Presentation skills', matched: true }
    ],
    aiSkillsSummary: 'Senior corporate trainer with 12 years of experience. Based in Milan, Italy. Specializes in leadership development and technical training. Excellent multilingual communication skills.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Italian' },
      { question: 'Current Location', answer: 'Milan, Italy' },
      { question: 'Teaching Experience', answer: '12 years - Corporate & Leadership Training' },
      { question: 'Languages', answer: 'Italian (native), English (fluent), German (intermediate)' }
    ],
    notes: 'Highly experienced trainer. Perfect for European training programs.',
    cvUrl: '#',
    createdAt: new Date('2024-11-14'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Buongiorno Alessandro! 👋 Talently bot here. Thanks for applying! Can I ask some questions?', timestamp: new Date('2024-11-15T10:00:00') },
        { sender: 'user', text: 'Hello! Yes, please go ahead', timestamp: new Date('2024-11-15T10:00:40') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-15T10:00:55') },
        { sender: 'user', text: 'Training/Instruction position', timestamp: new Date('2024-11-15T10:01:25') },
        { sender: 'bot', text: 'Perfect! ✓ Thank you Alessandro! Our team will be in touch soon. 😊', timestamp: new Date('2024-11-15T10:01:40') }
      ],
      startedAt: new Date('2024-11-15T10:00:00'),
      completedAt: new Date('2024-11-15T10:01:40')
    }
  },
  {
    id: '10',
    fullName: 'Maya Goldstein',
    fullNameHebrew: 'מאיה גולדשטיין',
    email: 'maya.goldstein@email.com',
    phone: '+972-52-567-8901',
    age: 28,
    citizenship: 'Israeli',
    campaignSource: 'Facebook Tech Jobs',
    status: 'submitted',
    jobType: 'headquarters_staff',
    canTravelEurope: true,
    canTravelIsrael: true,
    livesInEurope: false,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1MDkxNjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-26'), note: 'New application' },
      { status: 'submitted', timestamp: new Date('2024-11-26'), note: 'Awaiting bot interview' }
    ],
    primaryGroup: {
      groupName: 'Headquarters Staff',
      matchScore: 92
    },
    alternativeGroups: [
      { groupName: 'Sales', matchScore: 76 }
    ],
    matchedParameters: [
      { name: 'Israeli origin', matched: true },
      { name: 'Ability to travel to Israel', matched: true },
      { name: 'European residency', matched: false },
      { name: 'Management experience', matched: true },
      { name: 'English fluency', matched: true }
    ],
    aiSkillsSummary: 'Young professional with strong leadership potential. Israeli citizen from Tel Aviv. Experience in operations management. Bilingual Hebrew-English. Open to relocation.',
    additionalInfo: [
      { question: 'Israeli Citizenship', answer: 'Yes' },
      { question: 'Current Location', answer: 'Tel Aviv, Israel' },
      { question: 'Relocation', answer: 'Open to Europe relocation' }
    ],
    notes: 'High potential candidate. Schedule bot interview.',
    cvUrl: '#',
    createdAt: new Date('2024-11-26'),
    isNew: true
  },
  {
    id: '11',
    fullName: 'Oliver Schmidt',
    fullNameHebrew: 'אוליבר שמידט',
    email: 'oliver.schmidt@email.com',
    phone: '+43-664-123-4567',
    age: 45,
    citizenship: 'Austrian',
    campaignSource: 'X (Twitter) Tech Hiring',
    status: 'bot_interview',
    jobType: 'sales',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTA0MTY3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-23'), note: 'CV received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-24'), note: 'Interview in progress' }
    ],
    primaryGroup: {
      groupName: 'Sales',
      matchScore: 84
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 74 }
    ],
    matchedParameters: [
      { name: 'European residency', matched: true },
      { name: 'Business experience', matched: true },
      { name: 'Stable financial status', matched: true },
      { name: 'B2B sales experience', matched: true },
      { name: 'Language skills', matched: true }
    ],
    aiSkillsSummary: 'Experienced sales director from Vienna. 15+ years in B2B technology sales. Strong European network and proven track record in enterprise sales.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Austrian' },
      { question: 'Current Location', answer: 'Vienna, Austria' },
      { question: 'Sales Experience', answer: '15 years - Enterprise Tech Sales' }
    ],
    notes: 'Collecting additional information via bot interview.',
    cvUrl: '#',
    createdAt: new Date('2024-11-23'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Oliver! 👋 This is Talently. Thank you for applying! May I ask some questions?', timestamp: new Date('2024-11-24T11:00:00') },
        { sender: 'user', text: 'Yes, of course', timestamp: new Date('2024-11-24T11:00:45') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-24T11:01:00') },
        { sender: 'user', text: 'Sales position', timestamp: new Date('2024-11-24T11:01:30') }
      ],
      startedAt: new Date('2024-11-24T11:00:00')
    }
  },
  {
    id: '12',
    fullName: 'Noa Ben David',
    fullNameHebrew: 'נועה בן דוד',
    email: 'noa.bendavid@email.com',
    phone: '+972-54-678-9012',
    age: 30,
    citizenship: 'Israeli',
    campaignSource: 'Indeed Job Board',
    status: 'submitted',
    jobType: 'operational_worker',
    profileImage: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjUwNzgzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-27'), note: 'New application from Indeed' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 90
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: true },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: true },
      { name: 'Owns a vehicle', matched: true },
      { name: 'Motorcycle', matched: true },
      { name: 'Single', matched: true },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: '30 years old, single, freelancer with full availability. Lives in Beer Sheva. Owns both car and motorcycle. Excellent reliability and flexibility.',
    additionalInfo: [],
    notes: '',
    cvUrl: '#',
    createdAt: new Date('2024-11-27'),
    isNew: true
  },
  {
    id: '13',
    fullName: 'Lukas Novak',
    fullNameHebrew: 'לוקאש נובאק',
    email: 'lukas.novak@email.com',
    phone: '+420-777-123-456',
    age: 33,
    citizenship: 'Czech',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_recruit',
    jobType: 'training_instruction',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjUwNDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-12'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-13'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-14'), note: 'All information verified' }
    ],
    primaryGroup: {
      groupName: 'Training/Instruction',
      matchScore: 88
    },
    alternativeGroups: [
      { groupName: 'Sales', matchScore: 72 }
    ],
    matchedParameters: [
      { name: 'Not an Israeli citizen', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Teaching experience', matched: true },
      { name: 'English fluency', matched: true },
      { name: 'Presentation skills', matched: true }
    ],
    aiSkillsSummary: 'Technical trainer with 6 years of experience in software education. Based in Prague. Strong background in IT training and workshop facilitation.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Czech Republic' },
      { question: 'Current Location', answer: 'Prague, Czech Republic' },
      { question: 'Teaching Experience', answer: '6 years - IT & Software Training' }
    ],
    notes: 'Good technical trainer. Strong candidate for IT training programs.',
    cvUrl: '#',
    createdAt: new Date('2024-11-12'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Lukas! 👋 Talently recruitment bot here. Thanks for your application!', timestamp: new Date('2024-11-13T09:00:00') },
        { sender: 'user', text: 'Hi! Thank you', timestamp: new Date('2024-11-13T09:00:30') },
        { sender: 'bot', text: 'Which position did you apply for?', timestamp: new Date('2024-11-13T09:00:45') },
        { sender: 'user', text: 'Training/Instruction', timestamp: new Date('2024-11-13T09:01:10') },
        { sender: 'bot', text: 'Perfect! ✓ Our team will contact you soon. Best regards! 😊', timestamp: new Date('2024-11-13T09:01:25') }
      ],
      startedAt: new Date('2024-11-13T09:00:00'),
      completedAt: new Date('2024-11-13T09:01:25')
    }
  },
  {
    id: '14',
    fullName: 'Hannah Fischer',
    fullNameHebrew: 'חנה פישר',
    email: 'hannah.fischer@email.com',
    phone: '+41-76-123-4567',
    age: 37,
    citizenship: 'Swiss',
    campaignSource: 'X (Twitter) Tech Hiring',
    status: 'bot_interview',
    jobType: 'headquarters_staff',
    canTravelEurope: true,
    canTravelIsrael: true,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NjUwOTE2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-25'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-26'), note: 'Interview in progress' }
    ],
    primaryGroup: {
      groupName: 'Headquarters Staff',
      matchScore: 85
    },
    alternativeGroups: [
      { groupName: 'Sales', matchScore: 79 }
    ],
    matchedParameters: [
      { name: 'Israeli origin', matched: false },
      { name: 'Ability to travel to Israel', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Management experience', matched: true },
      { name: 'English fluency', matched: true }
    ],
    aiSkillsSummary: 'Operations manager with 9 years of experience. Swiss citizen based in Zurich. Strong organizational and leadership skills. Multilingual with excellent international experience.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Swiss' },
      { question: 'Current Location', answer: 'Zurich, Switzerland' },
      { question: 'Management Experience', answer: '9 years - Operations & Project Management' }
    ],
    notes: 'Strong management background. Collecting final information.',
    cvUrl: '#',
    createdAt: new Date('2024-11-25'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Hannah! 👋 Talently bot here. Thank you for applying!', timestamp: new Date('2024-11-26T14:00:00') },
        { sender: 'user', text: 'Hello! Happy to chat', timestamp: new Date('2024-11-26T14:00:40') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-26T14:00:55') },
        { sender: 'user', text: 'Headquarters Staff position', timestamp: new Date('2024-11-26T14:01:25') }
      ],
      startedAt: new Date('2024-11-26T14:00:00')
    }
  },
  {
    id: '15',
    fullName: 'Avi Katz',
    fullNameHebrew: 'אבי כץ',
    email: 'avi.katz@email.com',
    phone: '+972-50-789-0123',
    age: 27,
    citizenship: 'Israeli',
    campaignSource: 'Facebook Tech Jobs',
    status: 'submitted',
    jobType: 'operational_worker',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjUxMDM3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-27'), note: 'Just submitted' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 85
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: true },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: true },
      { name: 'Owns a vehicle', matched: true },
      { name: 'Motorcycle', matched: false },
      { name: 'Single', matched: true },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: 'Young professional, 27 years old, single with high availability. Lives in Netanya. Owns car, licensed driver. Looking for flexible work opportunities.',
    additionalInfo: [],
    notes: '',
    cvUrl: '#',
    createdAt: new Date('2024-11-27'),
    isNew: true
  },
  {
    id: '16',
    fullName: 'Maria Santos',
    fullNameHebrew: 'מריה סנטוס',
    email: 'maria.santos@email.com',
    phone: '+351-912-345-678',
    age: 39,
    citizenship: 'Portuguese',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_recruit',
    jobType: 'sales',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTAzNjM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-16'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-17'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-18'), note: 'Ready for review' }
    ],
    primaryGroup: {
      groupName: 'Sales',
      matchScore: 91
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 77 }
    ],
    matchedParameters: [
      { name: 'European residency', matched: true },
      { name: 'Business experience', matched: true },
      { name: 'Stable financial status', matched: true },
      { name: 'B2B sales experience', matched: true },
      { name: 'Language skills', matched: true }
    ],
    aiSkillsSummary: 'Senior sales professional with 11 years of B2B experience. Portuguese citizen based in Lisbon. Strong track record in pharmaceutical and healthcare sales. Multilingual capabilities.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Portuguese' },
      { question: 'Current Location', answer: 'Lisbon, Portugal' },
      { question: 'Sales Experience', answer: '11 years - B2B Healthcare & Pharma' },
      { question: 'Languages', answer: 'Portuguese (native), English (fluent), Spanish (fluent)' }
    ],
    notes: 'Excellent sales record. Strong multilingual skills.',
    cvUrl: '#',
    createdAt: new Date('2024-11-16'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Olá Maria! 👋 Talently bot here. Thanks for applying!', timestamp: new Date('2024-11-17T10:30:00') },
        { sender: 'user', text: 'Hello! Thank you', timestamp: new Date('2024-11-17T10:30:35') },
        { sender: 'bot', text: 'Which position did you apply for?', timestamp: new Date('2024-11-17T10:30:50') },
        { sender: 'user', text: 'Sales position', timestamp: new Date('2024-11-17T10:31:15') },
        { sender: 'bot', text: 'Perfect! ✓ Our team will be in touch. Best regards! 😊', timestamp: new Date('2024-11-17T10:31:30') }
      ],
      startedAt: new Date('2024-11-17T10:30:00'),
      completedAt: new Date('2024-11-17T10:31:30')
    }
  },
  {
    id: '17',
    fullName: 'Daniel Cohen',
    fullNameHebrew: 'דניאל כהן',
    email: 'daniel.cohen@email.com',
    phone: '+33-7-23-45-67-89',
    age: 31,
    citizenship: 'French / Israeli',
    campaignSource: 'X (Twitter) Tech Hiring',
    status: 'ready_for_recruit',
    jobType: 'headquarters_staff',
    canTravelEurope: true,
    canTravelIsrael: true,
    livesInEurope: true,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzY1MDQxNjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-19'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-20'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-21'), note: 'Verified and ready' }
    ],
    primaryGroup: {
      groupName: 'Headquarters Staff',
      matchScore: 96
    },
    alternativeGroups: [
      { groupName: 'Sales', matchScore: 83 }
    ],
    matchedParameters: [
      { name: 'Israeli origin', matched: true },
      { name: 'Ability to travel to Israel', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Management experience', matched: true },
      { name: 'English fluency', matched: true }
    ],
    aiSkillsSummary: 'Excellent candidate with dual Israeli-French citizenship. Strong management background in tech startups. Based in Paris. Trilingual with extensive international experience.',
    additionalInfo: [
      { question: 'Israeli Citizenship', answer: 'Yes, dual citizenship (Israel & France)' },
      { question: 'Availability to Travel', answer: 'Excellent - travels to Israel monthly' },
      { question: 'Current Location', answer: 'Paris, France' },
      { question: 'Languages', answer: 'Hebrew (native), French (native), English (fluent)' }
    ],
    notes: 'Top candidate. Excellent cultural fit and experience.',
    cvUrl: '#',
    createdAt: new Date('2024-11-19'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Bonjour Daniel! 👋 Talently here. Thanks for your application!', timestamp: new Date('2024-11-20T15:00:00') },
        { sender: 'user', text: 'Shalom! Happy to answer questions', timestamp: new Date('2024-11-20T15:00:30') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-20T15:00:45') },
        { sender: 'user', text: 'Headquarters Staff', timestamp: new Date('2024-11-20T15:01:10') },
        { sender: 'bot', text: 'Perfect! ✓ Are you originally from Israel?', timestamp: new Date('2024-11-20T15:01:25') },
        { sender: 'user', text: 'Yes, born in Tel Aviv, now living in Paris', timestamp: new Date('2024-11-20T15:01:50') },
        { sender: 'bot', text: 'Excellent! ✓ Thank you Daniel! Our team will contact you soon. 😊', timestamp: new Date('2024-11-20T15:02:05') }
      ],
      startedAt: new Date('2024-11-20T15:00:00'),
      completedAt: new Date('2024-11-20T15:02:05')
    }
  },
  {
    id: '18',
    fullName: 'Isabelle Dubois',
    fullNameHebrew: 'איזבל דובואה',
    email: 'isabelle.dubois@email.com',
    phone: '+32-475-12-34-56',
    age: 42,
    citizenship: 'Belgian',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'submitted',
    jobType: 'training_instruction',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFufGVufDF8fHx8MTc2NTA5MTYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-26'), note: 'Application received' },
      { status: 'submitted', timestamp: new Date('2024-11-26'), note: 'Awaiting interview scheduling' }
    ],
    primaryGroup: {
      groupName: 'Training/Instruction',
      matchScore: 89
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 75 }
    ],
    matchedParameters: [
      { name: 'Not an Israeli citizen', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Teaching experience', matched: true },
      { name: 'English fluency', matched: true },
      { name: 'Presentation skills', matched: true }
    ],
    aiSkillsSummary: 'Senior educator with 14 years in corporate training. Based in Brussels, Belgium. Specializes in soft skills and leadership development. Excellent multilingual presenter.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Belgian' },
      { question: 'Current Location', answer: 'Brussels, Belgium' },
      { question: 'Teaching Experience', answer: '14 years - Leadership & Soft Skills Training' }
    ],
    notes: 'Experienced trainer. Schedule bot interview.',
    cvUrl: '#',
    createdAt: new Date('2024-11-26')
  },
  {
    id: '19',
    fullName: 'Ron Amar',
    fullNameHebrew: 'רון אמר',
    email: 'ron.amar@email.com',
    phone: '+972-52-890-1234',
    age: 26,
    citizenship: 'Israeli',
    campaignSource: 'Indeed Job Board',
    status: 'bot_interview',
    jobType: 'operational_worker',
    canTravelEurope: false,
    canTravelIsrael: true,
    livesInEurope: false,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjUxMDM3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-26'), note: 'New application' },
      { status: 'bot_interview', timestamp: new Date('2024-11-27'), note: 'Interview started' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 93
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: true },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: true },
      { name: 'Owns a vehicle', matched: true },
      { name: 'Motorcycle', matched: true },
      { name: 'Single', matched: true },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: 'Young operational worker, 26 years old, single, freelancer. Lives in Ashdod. Owns car and motorcycle. Very high availability and flexibility.',
    additionalInfo: [
      { question: 'Age', answer: '26' },
      { question: 'Employment Status', answer: 'Freelancer' },
      { question: 'Vehicle Ownership', answer: 'Car + Motorcycle' }
    ],
    notes: 'High potential operational worker. Interview in progress.',
    cvUrl: '#',
    createdAt: new Date('2024-11-26'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'היי רון! 👋 זה הבוט של Talently. תודה על הפנייה!', timestamp: new Date('2024-11-27T10:00:00') },
        { sender: 'user', text: 'היי! בשמחה לענות על שאלות', timestamp: new Date('2024-11-27T10:00:30') },
        { sender: 'bot', text: 'מעולה! לאיזו משרה הגשת מועמדות?', timestamp: new Date('2024-11-27T10:00:45') },
        { sender: 'user', text: 'עובד מבצעי', timestamp: new Date('2024-11-27T10:01:10') }
      ],
      startedAt: new Date('2024-11-27T10:00:00')
    }
  },
  {
    id: '20',
    fullName: 'Lars Andersson',
    fullNameHebrew: 'לארס אנדרסון',
    email: 'lars.andersson@email.com',
    phone: '+46-70-123-4567',
    age: 38,
    citizenship: 'Swedish',
    campaignSource: 'Facebook Tech Jobs',
    status: 'ready_for_recruit',
    jobType: 'sales',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTA0MTY3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-13'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-14'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-15'), note: 'Ready for review' }
    ],
    primaryGroup: {
      groupName: 'Sales',
      matchScore: 87
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 71 }
    ],
    matchedParameters: [
      { name: 'European residency', matched: true },
      { name: 'Business experience', matched: true },
      { name: 'Stable financial status', matched: true },
      { name: 'B2B sales experience', matched: true },
      { name: 'Language skills', matched: true }
    ],
    aiSkillsSummary: 'Experienced sales professional from Stockholm. 9 years in Nordic markets B2B sales. Strong technical sales background in software and cloud solutions.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Swedish' },
      { question: 'Current Location', answer: 'Stockholm, Sweden' },
      { question: 'Sales Experience', answer: '9 years - Tech & Cloud Sales' },
      { question: 'Languages', answer: 'Swedish (native), English (fluent), Norwegian (fluent)' }
    ],
    notes: 'Strong Nordic market expertise.',
    cvUrl: '#',
    createdAt: new Date('2024-11-13'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hej Lars! 👋 Talently bot here. Thanks for applying!', timestamp: new Date('2024-11-14T11:00:00') },
        { sender: 'user', text: 'Hello! Happy to chat', timestamp: new Date('2024-11-14T11:00:35') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-14T11:00:50') },
        { sender: 'user', text: 'Sales position', timestamp: new Date('2024-11-14T11:01:15') },
        { sender: 'bot', text: 'Perfect! ✓ Our recruitment team will be in touch. Best regards! 😊', timestamp: new Date('2024-11-14T11:01:30') }
      ],
      startedAt: new Date('2024-11-14T11:00:00'),
      completedAt: new Date('2024-11-14T11:01:30')
    }
  },
  {
    id: '21',
    fullName: 'Natalie Bergman',
    fullNameHebrew: 'נטלי ברגמן',
    email: 'natalie.bergman@email.com',
    phone: '+31-6-12-34-56-78',
    age: 35,
    citizenship: 'Dutch / Israeli',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_recruit',
    jobType: 'headquarters_staff',
    canTravelEurope: true,
    canTravelIsrael: true,
    livesInEurope: true,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTA5MTYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-11'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-12'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-13'), note: 'All information verified' }
    ],
    primaryGroup: {
      groupName: 'Headquarters Staff',
      matchScore: 94
    },
    alternativeGroups: [
      { groupName: 'Training/Instruction', matchScore: 80 }
    ],
    matchedParameters: [
      { name: 'Israeli origin', matched: true },
      { name: 'Ability to travel to Israel', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Management experience', matched: true },
      { name: 'English fluency', matched: true }
    ],
    aiSkillsSummary: 'Experienced HQ staff candidate with dual Israeli-Dutch citizenship. 7 years in operations management. Based in Amsterdam. Excellent travel flexibility and multilingual skills.',
    additionalInfo: [
      { question: 'Israeli Citizenship', answer: 'Yes, dual (Israel & Netherlands)' },
      { question: 'Availability to Travel', answer: 'Excellent - travels frequently' },
      { question: 'Current Location', answer: 'Amsterdam, Netherlands' },
      { question: 'Languages', answer: 'Hebrew (native), Dutch (native), English (fluent)' }
    ],
    notes: 'Excellent candidate for HQ role. Strong background and flexibility.',
    cvUrl: '#',
    createdAt: new Date('2024-11-11'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Natalie! 👋 Talently here. Thank you for your application!', timestamp: new Date('2024-11-12T09:00:00') },
        { sender: 'user', text: 'Hi! Thanks, happy to answer questions', timestamp: new Date('2024-11-12T09:00:40') },
        { sender: 'bot', text: 'Perfect! Which position did you apply for?', timestamp: new Date('2024-11-12T09:00:55') },
        { sender: 'user', text: 'Headquarters Staff', timestamp: new Date('2024-11-12T09:01:20') },
        { sender: 'bot', text: 'Excellent! ✓ Our team will contact you soon. Best regards! 😊', timestamp: new Date('2024-11-12T09:01:35') }
      ],
      startedAt: new Date('2024-11-12T09:00:00'),
      completedAt: new Date('2024-11-12T09:01:35')
    }
  },
  {
    id: '22',
    fullName: 'Elena Popescu',
    fullNameHebrew: 'אלנה פופסקו',
    email: 'elena.popescu@email.com',
    phone: '+40-722-123-456',
    age: 29,
    citizenship: 'Romanian',
    campaignSource: 'X (Twitter) Tech Hiring',
    status: 'submitted',
    jobType: 'training_instruction',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHlvdW5nfGVufDF8fHx8MTc2NTA3ODMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-27'), note: 'New submission' }
    ],
    primaryGroup: {
      groupName: 'Training/Instruction',
      matchScore: 79
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Not an Israeli citizen', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Teaching experience', matched: false },
      { name: 'English fluency', matched: true },
      { name: 'Presentation skills', matched: true }
    ],
    aiSkillsSummary: 'Young professional from Bucharest with education background. 3 years of workshop facilitation experience. Strong communication and presentation skills.',
    additionalInfo: [],
    notes: '',
    cvUrl: '#',
    createdAt: new Date('2024-11-27'),
    isNew: true
  },
  {
    id: '23',
    fullName: 'Eyal Mizrahi',
    fullNameHebrew: 'אייל מזרחי',
    email: 'eyal.mizrahi@email.com',
    phone: '+972-50-234-5678',
    age: 35,
    citizenship: 'Israeli',
    campaignSource: 'Facebook Tech Jobs',
    status: 'ready_for_recruit',
    jobType: 'operational_worker',
    canTravelEurope: false,
    canTravelIsrael: true,
    livesInEurope: false,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY1MTAzNzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-20'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-21'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-22'), note: 'Verified and ready' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 91
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: true },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: true },
      { name: 'Owns a vehicle', matched: true },
      { name: 'Motorcycle', matched: false },
      { name: 'Single', matched: false },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: 'Operational worker, 35 years old from Rishon LeZion. Married with high work availability. Owns car, licensed driver. Reliable and flexible.',
    additionalInfo: [
      { question: 'Age', answer: '35' },
      { question: 'Employment Status', answer: 'Part-time with high availability' },
      { question: 'Vehicle Ownership', answer: 'Car (Toyota 2019)' },
      { question: 'Marital Status', answer: 'Married - spouse supportive of flexible schedule' }
    ],
    notes: 'Good operational worker candidate. Reliable and experienced.',
    cvUrl: '#',
    createdAt: new Date('2024-11-20'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'שלום אייל! 👋 בוט Talently כאן. תודה על הפנייה!', timestamp: new Date('2024-11-21T13:00:00') },
        { sender: 'user', text: 'שלום! בשמחה', timestamp: new Date('2024-11-21T13:00:30') },
        { sender: 'bot', text: 'מעולה! לאיזו משרה הגשת?', timestamp: new Date('2024-11-21T13:00:45') },
        { sender: 'user', text: 'עובד מבצעי', timestamp: new Date('2024-11-21T13:01:10') },
        { sender: 'bot', text: 'מצוין! ✓ הצוות שלנו יצור איתך קשר בקרוב. 😊', timestamp: new Date('2024-11-21T13:01:25') }
      ],
      startedAt: new Date('2024-11-21T13:00:00'),
      completedAt: new Date('2024-11-21T13:01:25')
    }
  },
  {
    id: '24',
    fullName: 'Henrik Nielsen',
    fullNameHebrew: 'הנריק נילסן',
    email: 'henrik.nielsen@email.com',
    phone: '+45-20-12-34-56',
    age: 44,
    citizenship: 'Danish',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'bot_interview',
    jobType: 'sales',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjUwNDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-24'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-25'), note: 'Interview in progress' }
    ],
    primaryGroup: {
      groupName: 'Sales',
      matchScore: 83
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 69 }
    ],
    matchedParameters: [
      { name: 'European residency', matched: true },
      { name: 'Business experience', matched: true },
      { name: 'Stable financial status', matched: true },
      { name: 'B2B sales experience', matched: true },
      { name: 'Language skills', matched: false }
    ],
    aiSkillsSummary: 'Sales director from Copenhagen with 13 years of experience. Strong track record in Scandinavian markets. B2B sales expertise in industrial and manufacturing sectors.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Danish' },
      { question: 'Current Location', answer: 'Copenhagen, Denmark' },
      { question: 'Sales Experience', answer: '13 years - Industrial B2B Sales' }
    ],
    notes: 'Collecting final information via bot interview.',
    cvUrl: '#',
    createdAt: new Date('2024-11-24'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Hello Henrik! 👋 Talently bot here. Thanks for applying!', timestamp: new Date('2024-11-25T10:00:00') },
        { sender: 'user', text: 'Hello! Happy to help', timestamp: new Date('2024-11-25T10:00:40') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-25T10:00:55') },
        { sender: 'user', text: 'Sales position', timestamp: new Date('2024-11-25T10:01:25') }
      ],
      startedAt: new Date('2024-11-25T10:00:00')
    }
  },
  {
    id: '25',
    fullName: 'Tamar Levy',
    fullNameHebrew: 'תמר לוי',
    email: 'tamar.levy@email.com',
    phone: '+972-54-345-6789',
    age: 33,
    citizenship: 'Israeli / Belgian',
    campaignSource: 'Indeed Job Board',
    status: 'ready_for_recruit',
    jobType: 'headquarters_staff',
    canTravelEurope: true,
    canTravelIsrael: true,
    livesInEurope: true,
    nativeIsraeli: true,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTAzNjM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-17'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-18'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-19'), note: 'All data verified' }
    ],
    primaryGroup: {
      groupName: 'Headquarters Staff',
      matchScore: 97
    },
    alternativeGroups: [
      { groupName: 'Training/Instruction', matchScore: 84 }
    ],
    matchedParameters: [
      { name: 'Israeli origin', matched: true },
      { name: 'Ability to travel to Israel', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Management experience', matched: true },
      { name: 'English fluency', matched: true }
    ],
    aiSkillsSummary: 'Top-tier HQ candidate with dual Israeli-Belgian citizenship. 8 years in project management and operations. Based in Brussels. Perfect cultural fit with excellent multilingual skills and management experience.',
    additionalInfo: [
      { question: 'Israeli Citizenship', answer: 'Yes, dual (Israel & Belgium)' },
      { question: 'Availability to Travel', answer: 'Excellent - family in both countries' },
      { question: 'Current Location', answer: 'Brussels, Belgium' },
      { question: 'Languages', answer: 'Hebrew (native), French (fluent), English (fluent), Dutch (intermediate)' }
    ],
    notes: 'Exceptional candidate. Top priority for HQ role.',
    cvUrl: '#',
    createdAt: new Date('2024-11-17'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'שלום תמר! 👋 Talently bot here. Thank you for your application!', timestamp: new Date('2024-11-18T14:00:00') },
        { sender: 'user', text: 'Hi! Happy to answer questions', timestamp: new Date('2024-11-18T14:00:35') },
        { sender: 'bot', text: 'Perfect! Which position did you apply for?', timestamp: new Date('2024-11-18T14:00:50') },
        { sender: 'user', text: 'Headquarters Staff', timestamp: new Date('2024-11-18T14:01:15') },
        { sender: 'bot', text: 'Excellent! ✓ Are you originally from Israel?', timestamp: new Date('2024-11-18T14:01:30') },
        { sender: 'user', text: 'Yes, born in Israel, now living in Brussels', timestamp: new Date('2024-11-18T14:02:00') },
        { sender: 'bot', text: 'Perfect! ✓ Thank you Tamar! Our recruitment team will contact you soon. 😊', timestamp: new Date('2024-11-18T14:02:15') }
      ],
      startedAt: new Date('2024-11-18T14:00:00'),
      completedAt: new Date('2024-11-18T14:02:15')
    }
  },
  {
    id: '26',
    fullName: 'Pablo Martinez',
    fullNameHebrew: 'פבלו מרטינז',
    email: 'pablo.martinez@email.com',
    phone: '+34-678-901-234',
    age: 40,
    citizenship: 'Spanish',
    campaignSource: 'X (Twitter) Tech Hiring',
    status: 'submitted',
    jobType: 'training_instruction',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjUwNDE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-26'), note: 'Application received' },
      { status: 'submitted', timestamp: new Date('2024-11-27'), note: 'Awaiting interview' }
    ],
    primaryGroup: {
      groupName: 'Training/Instruction',
      matchScore: 86
    },
    alternativeGroups: [
      { groupName: 'Sales', matchScore: 73 }
    ],
    matchedParameters: [
      { name: 'Not an Israeli citizen', matched: true },
      { name: 'European residency', matched: true },
      { name: 'Teaching experience', matched: true },
      { name: 'English fluency', matched: true },
      { name: 'Presentation skills', matched: true }
    ],
    aiSkillsSummary: 'Corporate trainer from Madrid with 10 years of experience. Specializes in sales training and customer service programs. Strong presenter with multilingual capabilities.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Spanish' },
      { question: 'Current Location', answer: 'Madrid, Spain' },
      { question: 'Teaching Experience', answer: '10 years - Sales & Customer Service Training' }
    ],
    notes: 'Schedule bot interview for final verification.',
    cvUrl: '#',
    createdAt: new Date('2024-11-26')
  },
  {
    id: '27',
    fullName: 'Shir Peretz',
    fullNameHebrew: 'שיר פרץ',
    email: 'shir.peretz@email.com',
    phone: '+972-52-456-7890',
    age: 25,
    citizenship: 'Israeli',
    campaignSource: 'Facebook Tech Jobs',
    status: 'submitted',
    jobType: 'operational_worker',
    profileImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTA3ODMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-27'), note: 'Fresh application' }
    ],
    primaryGroup: {
      groupName: 'Operational Worker (Israel)',
      matchScore: 87
    },
    alternativeGroups: [],
    matchedParameters: [
      { name: 'Age 25-50', matched: true },
      { name: 'High availability', matched: true },
      { name: 'Israeli living in Israel', matched: true },
      { name: 'Driver\'s license', matched: true },
      { name: 'Flexibility for long trips', matched: true },
      { name: 'Owns a vehicle', matched: false },
      { name: 'Motorcycle', matched: false },
      { name: 'Single', matched: true },
      { name: 'Reliable background', matched: true }
    ],
    aiSkillsSummary: '25 years old, single, high availability. Lives in Kfar Saba. Has driver license but no vehicle currently. Very flexible schedule.',
    additionalInfo: [],
    notes: '',
    cvUrl: '#',
    createdAt: new Date('2024-11-27'),
    isNew: true
  },
  {
    id: '28',
    fullName: 'Francesco Bianchi',
    fullNameHebrew: 'פרנצ\'סקו ביאנקי',
    email: 'francesco.bianchi@email.com',
    phone: '+39-320-123-4567',
    age: 36,
    citizenship: 'Italian',
    campaignSource: 'LinkedIn Campaign Q4',
    status: 'ready_for_recruit',
    jobType: 'sales',
    canTravelEurope: true,
    canTravelIsrael: false,
    livesInEurope: true,
    nativeIsraeli: false,
    speaksEnglish: true,
    remembersPosition: true,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMGl0YWxpYW58ZW58MXx8fHwxNzY1MDQxNjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    statusHistory: [
      { status: 'submitted', timestamp: new Date('2024-11-21'), note: 'Application received' },
      { status: 'bot_interview', timestamp: new Date('2024-11-22'), note: 'Interview completed' },
      { status: 'ready_for_recruit', timestamp: new Date('2024-11-23'), note: 'Ready for final review' }
    ],
    primaryGroup: {
      groupName: 'Sales',
      matchScore: 90
    },
    alternativeGroups: [
      { groupName: 'Headquarters Staff', matchScore: 76 }
    ],
    matchedParameters: [
      { name: 'European residency', matched: true },
      { name: 'Business experience', matched: true },
      { name: 'Stable financial status', matched: true },
      { name: 'B2B sales experience', matched: true },
      { name: 'Language skills', matched: true }
    ],
    aiSkillsSummary: 'Senior sales professional from Rome. 12 years in B2B luxury goods and fashion sales. Strong European network especially in Italy, France, and Spain. Excellent multilingual skills.',
    additionalInfo: [
      { question: 'Citizenship', answer: 'Italian' },
      { question: 'Current Location', answer: 'Rome, Italy' },
      { question: 'Sales Experience', answer: '12 years - Luxury B2B Sales' },
      { question: 'Languages', answer: 'Italian (native), English (fluent), French (fluent), Spanish (intermediate)' }
    ],
    notes: 'Excellent sales professional with strong European network.',
    cvUrl: '#',
    createdAt: new Date('2024-11-21'),
    botConversation: {
      messages: [
        { sender: 'bot', text: 'Ciao Francesco! 👋 Talently bot here. Thanks for your application!', timestamp: new Date('2024-11-22T16:00:00') },
        { sender: 'user', text: 'Hello! Pleased to speak with you', timestamp: new Date('2024-11-22T16:00:40') },
        { sender: 'bot', text: 'Great! Which position did you apply for?', timestamp: new Date('2024-11-22T16:00:55') },
        { sender: 'user', text: 'Sales position', timestamp: new Date('2024-11-22T16:01:20') },
        { sender: 'bot', text: 'Perfect! ✓ Our recruitment team will contact you soon. Arrivederci! 😊', timestamp: new Date('2024-11-22T16:01:35') }
      ],
      startedAt: new Date('2024-11-22T16:00:00'),
      completedAt: new Date('2024-11-22T16:01:35')
    }
  }
];