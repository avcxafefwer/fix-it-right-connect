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
