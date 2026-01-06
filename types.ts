export type Language = 'ID' | 'EN';

export interface ServicePoint {
  title: string;
  desc: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  points: ServicePoint[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface SiteContent {
  nav: {
    home: string;
    about: string;
    services: string;
    whyUs: string;
    contact: string;
    cta: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  intro: string;
  about: {
    heading: string;
    body: string[];
    vision: {
      title: string;
      text: string;
    };
    mission: {
      title: string;
      items: string[];
    };
  };
  services: {
    heading: string;
    items: Service[];
  };
  whyUs: {
    heading: string;
    items: Feature[];
  };
  contact: {
    heading: string;
    address: string;
    emailLabel: string;
    phoneLabel: string;
    form: {
      name: string;
      institution: string;
      email: string;
      service: string;
      message: string;
      submit: string;
    };
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}