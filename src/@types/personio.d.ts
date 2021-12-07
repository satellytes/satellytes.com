export interface PersonioJobNameValue {
  name: string;
  value: string;
}

export interface PersonioJobPosition {
  id: string;
  office: string;
  department: string;
  name: string;
  jobDescriptions: {
    jobDescription: PersonioJobNameValue[];
  };
  employmentType: string;
  seniority: string;
  schedule: string;
  // comma separated
  keywords: string;

  satellytesPath: string;
  satellytesShortDescription: string;
}
