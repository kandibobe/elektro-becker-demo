export const electricianConfig = {
  name: 'Elektro Becker GmbH',
  tagline: 'Ihr zuverlässiger Elektriker in Gelsenkirchen',
  // FIKTIVE Adresse — existiert nicht
  address: 'Musterstraße 12, 45881 Gelsenkirchen [fiktiv]',
  addressDisplay: 'Musterstraße 12, 45881 Gelsenkirchen',
  city: 'Gelsenkirchen, NRW',
  // FIKTIVE Telefonnummer (erkennbar fiktiv)
  phone: '0209 123 456 7',
  phoneHref: 'tel:+4920912345670',
  // FIKTIVE E-Mail
  email: 'info@elektro-becker-demo.example',
  founded: '2004',
  certifications: ['Meisterbetrieb', 'ZVEH-Mitglied', 'TÜV-geprüft'],
  openingHours: {
    weekdays: 'Mo – Fr: 7:00 – 18:00 Uhr',
    saturday: 'Sa: 8:00 – 13:00 Uhr',
    emergency: 'Notdienst: 24/7',
  },
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39665.71!2d7.0857!3d51.5177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e63ba5d34bad%3A0x47a700cb3fc58ce!2sGelsenkirchen!5e0!3m2!1sde!2sde!4v1234567890',
  social: {
    instagram: 'https://kobiakov.dev',
    facebook: 'https://kobiakov.dev',
  },
} as const;

export const services = [
  {
    id: 'installation',
    icon: 'Zap',
    titleKey: 'service1Title',
    descKey: 'service1Desc',
    color: 'blue',
  },
  {
    id: 'repair',
    icon: 'Wrench',
    titleKey: 'service2Title',
    descKey: 'service2Desc',
    color: 'yellow',
  },
  {
    id: 'smarthome',
    icon: 'Wifi',
    titleKey: 'service3Title',
    descKey: 'service3Desc',
    color: 'blue',
  },
  {
    id: 'solar',
    icon: 'Sun',
    titleKey: 'service4Title',
    descKey: 'service4Desc',
    color: 'yellow',
  },
  {
    id: 'emergency',
    icon: 'AlertTriangle',
    titleKey: 'service5Title',
    descKey: 'service5Desc',
    color: 'blue',
  },
  {
    id: 'emobility',
    icon: 'Car',
    titleKey: 'service6Title',
    descKey: 'service6Desc',
    color: 'yellow',
  },
] as const;

export const stats = [
  { value: '500+', labelKey: 'stat1', icon: 'Briefcase' },
  { value: '20+', labelKey: 'stat2', icon: 'Clock' },
  { value: '24/7', labelKey: 'stat3', icon: 'Zap' },
  { value: '4.9★', labelKey: 'stat4', icon: 'Star' },
] as const;

export const processSteps = [
  { step: 1, icon: 'FileText', titleKey: 'step1Title', descKey: 'step1Desc' },
  { step: 2, icon: 'MapPin', titleKey: 'step2Title', descKey: 'step2Desc' },
  { step: 3, icon: 'ClipboardList', titleKey: 'step3Title', descKey: 'step3Desc' },
  { step: 4, icon: 'CheckCircle', titleKey: 'step4Title', descKey: 'step4Desc' },
] as const;

export const testimonials = [
  {
    id: 1,
    name: 'Klaus M.',
    location: 'Gelsenkirchen',
    rating: 5,
    text: 'Schnelle Reaktionszeit beim Notdienst. Elektro Becker war innerhalb einer Stunde da und hat das Problem professionell behoben. Klare Empfehlung!',
  },
  {
    id: 2,
    name: 'Familie Hoffmann',
    location: 'Bochum',
    rating: 5,
    text: 'Wir haben unser Smart Home komplett durch Elektro Becker nachrüsten lassen. Alles lief reibungslos, der Preis war fair und das Ergebnis begeistert uns täglich.',
  },
  {
    id: 3,
    name: 'Thomas W.',
    location: 'Essen',
    rating: 5,
    text: 'Wallbox für unser E-Auto — von der Beratung bis zur Inbetriebnahme top. Sehr freundliches Team, pünktlich und sauber gearbeitet.',
  },
] as const;

export const projects = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
    alt: 'Electrical panel installation',
    caption: 'Zählerschrank-Upgrade, Gelsenkirchen 2024',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Smart home installation',
    caption: 'Smart Home Nachrüstung, Bochum 2024',
    span: '',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
    alt: 'EV charging station installation',
    caption: 'Wallbox-Installation 22 kW, Essen 2024',
    span: '',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    alt: 'Solar panel installation',
    caption: 'Photovoltaik 9.6 kWp, Gelsenkirchen 2023',
    span: '',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    alt: 'Electrical wiring work',
    caption: 'Komplettsanierung EFH, Gelsenkirchen 2023',
    span: '',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
    alt: 'Professional electrician at work',
    caption: 'Gewerbe Neuinstallation, Herne 2022',
    span: '',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    alt: 'Modern office lighting installation',
    caption: 'Außenbeleuchtung LED, Recklinghausen 2023',
    span: 'col-span-2',
  },
] as const;

export const serviceOptions = [
  'Elektroinstallation',
  'Reparatur / Fehlersuche',
  'Smart Home',
  'Photovoltaik / Wallbox',
  'Notdienst',
  'Sonstiges',
] as const;
