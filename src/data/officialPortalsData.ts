import { OfficialPortalItem } from '../types';

export const OFFICIAL_PORTALS_DATA: OfficialPortalItem[] = [
  // ==================== AADHAAR (UIDAI) SERVICES ====================
  {
    id: 'uidai-download-eaadhaar',
    category: 'aadhaar',
    serviceName: 'Download e-Aadhaar PDF',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://myaadhaar.uidai.gov.in/gen-ae-id/download-aadhaar',
    description: 'Download an authentic, password-protected digital copy of your Aadhaar card with or without masking your 12-digit number.',
    requirements: '12-digit Aadhaar / 28-digit Enrolment ID (EID) + Registered Mobile for OTP',
    feeInfo: 'Free of Cost',
    badgeType: 'OTP Required',
    tags: ['download', 'eaadhaar', 'pdf', 'card', 'uidai', 'myaadhaar']
  },
  {
    id: 'uidai-verify-aadhaar',
    category: 'aadhaar',
    serviceName: 'Verify Aadhaar Number & Validity',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://myaadhaar.uidai.gov.in/verify-aadhaar',
    description: 'Check if an Aadhaar number is active, valid, and view registered age band, gender, state, and masked mobile digits.',
    requirements: '12-digit Aadhaar Number + Captcha',
    feeInfo: 'Free of Cost',
    badgeType: 'Instant',
    tags: ['verify', 'check', 'validity', 'status', 'active', 'uidai']
  },
  {
    id: 'uidai-check-status',
    category: 'aadhaar',
    serviceName: 'Check Aadhaar Enrolment / Update Status',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://myaadhaar.uidai.gov.in/check-aadhaar-status',
    description: 'Track the real-time processing status of your new Aadhaar enrolment or demographic/biometric update request using your 28-digit EID/SRN.',
    requirements: '28-digit Enrolment ID (EID) or Service Request Number (SRN)',
    feeInfo: 'Free of Cost',
    badgeType: 'Instant',
    tags: ['status', 'track', 'update status', 'srn', 'eid', 'enrolment']
  },
  {
    id: 'uidai-order-pvc',
    category: 'aadhaar',
    serviceName: 'Order Aadhaar PVC Card',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://myaadhaar.uidai.gov.in/gen-pvc',
    description: 'Order a durable, wallet-sized synthetic PVC Aadhaar card featuring a hologram, guilloche pattern, and secure QR code delivered by Speed Post.',
    requirements: 'Aadhaar / Virtual ID + Any Mobile Number to receive delivery SMS',
    feeInfo: '₹50 (Speed Post Delivery included)',
    badgeType: 'Paid Service',
    tags: ['pvc', 'plastic card', 'order', 'reprint', 'speed post']
  },
  {
    id: 'uidai-book-appointment',
    category: 'aadhaar',
    serviceName: 'Book Aadhaar Seva Kendra Appointment',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://appointments.uidai.gov.in/bookappointment.aspx',
    description: 'Schedule an advance time slot at an official Aadhaar Seva Kendra (ASK) for mobile number linkage, biometric updates, or name corrections.',
    requirements: 'Mobile number for appointment booking + Valid identity proof',
    feeInfo: 'Free Booking (Service charges as applicable)',
    badgeType: 'In-Person',
    tags: ['appointment', 'seva kendra', 'ask', 'mobile update', 'biometrics']
  },
  {
    id: 'uidai-lock-unlock-biometrics',
    category: 'aadhaar',
    serviceName: 'Lock / Unlock Biometrics & VID',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://myaadhaar.uidai.gov.in/lock-unlock-aadhaar',
    description: 'Protect your identity against unauthorized authentication by locking your fingerprints and iris data, or generating a 16-digit Virtual ID (VID).',
    requirements: '12-digit Aadhaar Number + Registered Mobile OTP',
    feeInfo: 'Free of Cost',
    badgeType: 'OTP Required',
    tags: ['lock', 'unlock', 'biometrics', 'security', 'vid', 'virtual id']
  },
  {
    id: 'uidai-bank-seeding',
    category: 'aadhaar',
    serviceName: 'Check Aadhaar - Bank Account Seeding Status',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://myaadhaar.uidai.gov.in/bank-seeding-status',
    description: 'Verify if your Aadhaar is linked to your active bank account for Direct Benefit Transfer (DBT) and government scheme subsidies.',
    requirements: '12-digit Aadhaar Number + Registered Mobile OTP',
    feeInfo: 'Free of Cost',
    badgeType: 'OTP Required',
    tags: ['bank', 'dbt', 'seeding', 'subsidy', 'npci', 'account']
  },
  {
    id: 'uidai-document-update',
    category: 'aadhaar',
    serviceName: 'Online Address & Document Update (POI / POA)',
    department: 'Unique Identification Authority of India (UIDAI)',
    url: 'https://myaadhaar.uidai.gov.in/document-update',
    description: 'Upload valid Proof of Identity (POI) and Proof of Address (POA) to keep your Aadhaar details updated in the central database.',
    requirements: 'Aadhaar + Mobile OTP + Scanned PDF/JPEG of Address/ID Proof (<2MB)',
    feeInfo: '₹50 (Periodic free windows available on portal)',
    badgeType: 'OTP Required',
    tags: ['address', 'document update', 'poi', 'poa', 'revalidation']
  },

  // ==================== PAN & INCOME TAX SERVICES ====================
  {
    id: 'pan-link-aadhaar-direct',
    category: 'pan',
    serviceName: 'Link Aadhaar with PAN (e-Filing Portal)',
    department: 'Income Tax Department, Ministry of Finance',
    url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar',
    description: 'Direct official portal to link your PAN with your Aadhaar number after verifying ₹1,000 late fee challan payment.',
    requirements: '10-digit PAN + 12-digit Aadhaar + Valid Challan BSR/Reference',
    feeInfo: '₹1,000 (Section 234H Late Fee Challan)',
    badgeType: 'Paid Service',
    tags: ['link pan', 'link aadhaar', 'income tax', 'efiling', 'challan']
  },
  {
    id: 'pan-link-status-direct',
    category: 'pan',
    serviceName: 'Check PAN - Aadhaar Linkage Status',
    department: 'Income Tax Department, Ministry of Finance',
    url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status',
    description: 'Instant official lookup to verify whether your PAN is operative and successfully linked to your Aadhaar without logging in.',
    requirements: '10-digit PAN + 12-digit Aadhaar Number',
    feeInfo: 'Free of Cost',
    badgeType: 'Instant',
    tags: ['link status', 'check linking', 'pan status', 'operative']
  },
  {
    id: 'pan-verify-pan-details',
    category: 'pan',
    serviceName: 'Verify Your PAN Details (Instant Verification)',
    department: 'Income Tax Department, Ministry of Finance',
    url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPAN',
    description: 'Verify if a PAN card is active, valid, and matches the registered Full Name, Date of Birth, and mobile number.',
    requirements: 'PAN + Full Name (as on card) + Date of Birth + Mobile Number for OTP',
    feeInfo: 'Free of Cost',
    badgeType: 'OTP Required',
    tags: ['verify pan', 'pan active', 'check pan', 'pan validity']
  },
  {
    id: 'pan-instant-epan-get',
    category: 'pan',
    serviceName: 'Instant e-PAN Allotment (via Aadhaar e-KYC)',
    department: 'Income Tax Department, Ministry of Finance',
    url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan/getNewEPan',
    description: 'Apply and receive a 100% paperless, free digital PAN card within 10 minutes using Aadhaar e-KYC for first-time applicants.',
    requirements: '12-digit Aadhaar with registered mobile number + No existing PAN',
    feeInfo: '100% Free of Cost',
    badgeType: 'Instant',
    tags: ['instant pan', 'free pan', 'epan', 'allotment', 'paperless']
  },
  {
    id: 'pan-instant-epan-download',
    category: 'pan',
    serviceName: 'Check Instant e-PAN Status / Download e-PAN',
    department: 'Income Tax Department, Ministry of Finance',
    url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan/checkStatusDownloadEPan',
    description: 'Check the status of your instant e-PAN application or re-download your signed e-PAN PDF document.',
    requirements: '12-digit Aadhaar Number + Registered Mobile OTP',
    feeInfo: 'Free of Cost',
    badgeType: 'OTP Required',
    tags: ['download epan', 'check status', 'instant pan download', 'pdf']
  },
  {
    id: 'pan-epay-tax-challan',
    category: 'pan',
    serviceName: 'e-Pay Tax: Pay ₹1,000 PAN-Aadhaar Fee Challan',
    department: 'Income Tax Department, Ministry of Finance',
    url: 'https://eportal.incometax.gov.in/iec/foservices/#/e-pay-tax-prelogin/user-details',
    description: 'Pay the mandatory ₹1,000 late fee under Major Head 0021 (Income Tax other than Companies) and Minor Head 500 (Fee for delay).',
    requirements: '10-digit PAN + Net Banking / UPI / Debit Card / RTGS',
    feeInfo: '₹1,000 Statutory Fee',
    badgeType: 'Paid Service',
    tags: ['epay tax', 'challan', '1000 fee', 'minor head 500', 'bsr code']
  },
  {
    id: 'pan-protean-nsdl-apply',
    category: 'pan',
    serviceName: 'Apply for New PAN / Correction (Protean / NSDL)',
    department: 'Protean eGov Technologies Limited (Formerly NSDL)',
    url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    description: 'Official application portal for Indian citizens (Form 49A), foreign citizens, or demographic changes/corrections in existing PAN data.',
    requirements: 'Proof of Identity, Address, and Date of Birth + Passport photo/signature',
    feeInfo: '₹107 (Physical card within India) / ₹1,017 (Foreign dispatch)',
    badgeType: 'Paid Service',
    tags: ['nsdl', 'protean', 'apply pan', 'form 49a', 'correction', 'change name']
  },
  {
    id: 'pan-utiitsl-portal',
    category: 'pan',
    serviceName: 'UTIITSL PAN Services Portal',
    department: 'UTI Infrastructure Technology And Services Limited (UTIITSL)',
    url: 'https://www.pan.utiitsl.com/PAN/',
    description: 'Apply for fresh PAN, update details, track existing application status, or order physical card reprints through UTIITSL.',
    requirements: 'Proof documents + Aadhaar e-Sign or physical application submission',
    feeInfo: '₹107 (Physical card delivery)',
    badgeType: 'Paid Service',
    tags: ['utiitsl', 'uti pan', 'track pan', 'reprint pan', 'form 49a']
  },
  {
    id: 'pan-download-nsdl-reprint',
    category: 'pan',
    serviceName: 'Download e-PAN / Reprint PAN (Protean NSDL)',
    department: 'Protean eGov Technologies Limited',
    url: 'https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html',
    description: 'Download your e-PAN PDF or request a physical reprint if your PAN was originally processed through NSDL / Protean.',
    requirements: 'PAN + Aadhaar Number + Month & Year of Birth',
    feeInfo: '₹8.26 (e-PAN download) / ₹50 (Physical reprint dispatch)',
    badgeType: 'Paid Service',
    tags: ['download pan', 'reprint nsdl', 'lost pan', 'duplicate pan']
  },

  // ==================== DIGILOCKER & TRANSPORT SERVICES ====================
  {
    id: 'digilocker-official-web',
    category: 'digilocker',
    serviceName: 'DigiLocker Web Portal & Cloud Wallet',
    department: 'Ministry of Electronics & Information Technology (MeitY)',
    url: 'https://www.digilocker.gov.in',
    description: 'Official digital document wallet to access legally authentic issued certificates from over 2,300+ government and academic institutions.',
    requirements: 'Mobile number linked with Aadhaar + 6-digit Security PIN',
    feeInfo: '100% Free of Cost',
    badgeType: 'Free',
    tags: ['digilocker', 'meity', 'cloud', 'wallet', 'marksheet', 'rc', 'driving license']
  },
  {
    id: 'digilocker-signin',
    category: 'digilocker',
    serviceName: 'DigiLocker Account Sign-In / Registration',
    department: 'Ministry of Electronics & Information Technology (MeitY)',
    url: 'https://www.digilocker.gov.in/signin',
    description: 'Direct login page to access your issued documents or register a new citizen account with 1GB secure cloud storage.',
    requirements: 'Aadhaar / Mobile number + 6-digit Security PIN',
    feeInfo: 'Free of Cost',
    badgeType: 'OTP Required',
    tags: ['login', 'signin', 'register', 'account', 'digilocker']
  },
  {
    id: 'parivahan-sarathi-dl',
    category: 'other',
    serviceName: 'Parivahan Driving Licence Services (Sarathi)',
    department: 'Ministry of Road Transport and Highways (MoRTH)',
    url: 'https://parivahan.gov.in/parivahan//en/content/driving-licence-0',
    description: 'Apply for Learner Licence, Driving Licence renewal, duplicate DL, international driving permit, or update address online.',
    requirements: 'State selection + Application number / DL number + DOB',
    feeInfo: 'As per State Motor Vehicle Rules',
    badgeType: 'Paid Service',
    tags: ['parivahan', 'sarathi', 'driving licence', 'dl', 'rto', 'morth']
  },
  {
    id: 'parivahan-vahan-rc',
    category: 'other',
    serviceName: 'Parivahan Vehicle Registration Services (Vahan)',
    department: 'Ministry of Road Transport and Highways (MoRTH)',
    url: 'https://parivahan.gov.in/parivahan//en/content/vehicle-related-services',
    description: 'Online services for Vehicle RC transfer, duplicate RC, NOC, change of address, and road tax payment.',
    requirements: 'Vehicle Registration Number + Chassis Number (last 5 digits)',
    feeInfo: 'As per State MV Rules',
    badgeType: 'Paid Service',
    tags: ['vahan', 'rc', 'vehicle registration', 'transfer rc', 'road tax']
  }
];
