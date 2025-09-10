export const PHONE = {
  display: '(201) 927-3649',
  tel: '2019273649',
};

export const EMAIL = {
  user: 'info',
  domain: 'fix-it-right.us',
  get address() {
    return `${this.user}@${this.domain}`;
  }
};

export const SITE = {
  name: 'Fix it Right',
  domain: 'fix-it-right.us',
};

// Approximate service area: towns within ~25 miles of ZIP 07075 (Totowa, NJ)
export const SERVICE_AREA = [
  'Totowa',
  'Paterson',
  'Clifton',
  'Wayne',
  'Passaic',
  'Fair Lawn',
  'Paramus',
  'Hackensack',
  'Rutherford',
  'East Rutherford',
  'Bloomfield',
  'Montclair',
  'Nutley',
  'Elmwood Park',
  'Garfield',
  'Little Falls',
  'Secaucus',
  'Hoboken',
  'Jersey City',
  'Kearny'
  , 'Wood-Ridge', 'Hasbrouck Heights', 'Lyndhurst', 'Carlstadt', 'Moonachie', 'Ridgefield Park', 'Bogota'
];

