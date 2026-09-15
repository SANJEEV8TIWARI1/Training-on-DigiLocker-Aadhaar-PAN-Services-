import { FaqItem } from '../types';

export const FAQ_DATA: FaqItem[] = [
  // General & Security
  {
    id: "faq-gen-1",
    category: "general",
    question: "Is it safe to access government services through DigiLocker?",
    answer: "Yes, DigiLocker is an official initiative of the Ministry of Electronics and IT (MeitY), Government of India. It employs 256-bit SSL encryption, ISO 27001 certified data centres, and OTP-based multi-factor authentication. Digital documents in DigiLocker are legally treated at par with original physical documents under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016.",
    tags: ["Security", "Legality", "MeitY", "IT Act"]
  },
  {
    id: "faq-gen-2",
    category: "general",
    question: "What should I do if an agent or cyber cafe asks for my Aadhaar OTP or DigiLocker PIN?",
    answer: "NEVER share your Aadhaar OTP, DigiLocker 6-digit PIN, or banking passwords with anyone—including shopkeepers or people claiming to be government representatives. Government officials will never ask for your private OTP or PIN. If you suspect fraud, immediately call the National Cyber Crime Helpline at 1930 or visit cybercrime.gov.in.",
    tags: ["Safety", "Fraud Prevention", "OTP", "Helpline 1930"]
  },

  // DigiLocker
  {
    id: "faq-dl-1",
    category: "digilocker",
    question: "Are DigiLocker Driving License and RC legally valid when stopped by Traffic Police?",
    answer: "Yes! The Ministry of Road Transport & Highways (MoRTH) issued standard advisories to all state police departments confirming that electronic Driving Licenses and Vehicle RCs presented via the official DigiLocker or mParivahan apps are legally valid and must be accepted as original physical documents.",
    tags: ["Traffic Police", "Driving License", "Vehicle RC", "MoRTH"]
  },
  {
    id: "faq-dl-2",
    category: "digilocker",
    question: "What is the difference between 'Issued Documents' and 'Uploaded Documents in Drive' in DigiLocker?",
    answer: "'Issued Documents' are fetched directly from the government department's database (e.g. CBSE, UIDAI, RTO) with a verifiable digital signature and QR code; they have full legal validity. 'Uploaded Documents' in Drive are self-scanned PDFs/images you upload for personal storage (up to 1GB); these do not carry official verification.",
    tags: ["Issued Documents", "DigiLocker Drive", "Storage", "Digital Signature"]
  },
  {
    id: "faq-dl-3",
    category: "digilocker",
    question: "Why am I getting 'Record Not Found' when fetching my 10th or 12th marksheet?",
    answer: "This usually happens due to one of three reasons: 1) Incorrect Roll Number or Passing Year entered, 2) The examination board has not yet digitized records for your particular graduation year, or 3) Name in DigiLocker (from Aadhaar) has a spelling discrepancy compared to the Board records.",
    tags: ["CBSE", "Marksheet", "Record Not Found", "Troubleshooting"]
  },

  // Aadhaar
  {
    id: "faq-adh-1",
    category: "aadhaar",
    question: "How do I open my downloaded e-Aadhaar PDF? What is the password?",
    answer: "The password for e-Aadhaar PDF is an 8-character code: the FIRST 4 LETTERS of your name in CAPITAL LETTERS followed by your 4-digit BIRTH YEAR. Example: If your name is SURESH PATEL and your year of birth is 1988, your password is 'SURE1988'. If your name is ANIL born in 1995, password is 'ANIL1995'.",
    tags: ["e-Aadhaar", "PDF Password", "UIDAI", "Download"]
  },
  {
    id: "faq-adh-2",
    category: "aadhaar",
    question: "Can I update my mobile number in Aadhaar online without visiting a center?",
    answer: "No. UIDAI does NOT allow online mobile number updates for security and anti-fraud reasons. You MUST physically visit any Aadhaar Seva Kendra or designated Post Office with an Aadhaar desk. The operator will take your live fingerprint scan to authenticate the mobile update (Fee: ₹50).",
    tags: ["Mobile Update", "UIDAI", "Aadhaar Seva Kendra", "Kendra"]
  },
  {
    id: "faq-adh-3",
    category: "aadhaar",
    question: "What is a Masked Aadhaar and where can I use it?",
    answer: "A Masked Aadhaar hides the first 8 digits of your Aadhaar number (showing only XXXX-XXXX-1234) while keeping your photo, QR code, and demographic details intact. It is legally valid for hotel check-ins, airport entry, and identity verification while preventing unauthorized misuse of your full 12-digit UID.",
    tags: ["Masked Aadhaar", "Privacy", "Identity Proof", "Airport Entry"]
  },
  {
    id: "faq-adh-4",
    category: "aadhaar",
    question: "How can I lock my Aadhaar biometrics to prevent unauthorized cloning or misuse?",
    answer: "You can lock your biometrics for free on the myAadhaar portal (myaadhaar.uidai.gov.in) or mAadhaar app. Once locked, no one (including yourself) can perform fingerprint or iris authentication until you temporarily unlock it when you need to authenticate.",
    tags: ["Biometric Lock", "Security", "myAadhaar", "Fraud Prevention"]
  },

  // PAN
  {
    id: "faq-pan-1",
    category: "pan",
    question: "What happens if I do not link my PAN with my Aadhaar?",
    answer: "If not linked, your PAN becomes 'Inoperative'. An inoperative PAN means you cannot file Income Tax returns, pending refunds will be withheld, higher TDS/TCS rates (up to 20%) will apply to your bank transactions, and you may face issues opening bank accounts or executing financial transactions exceeding ₹50,000.",
    tags: ["Inoperative PAN", "TDS Penalty", "Income Tax", "Mandatory Linking"]
  },
  {
    id: "faq-pan-2",
    category: "pan",
    question: "Why does PAN-Aadhaar linking show 'Demographic Mismatch' error?",
    answer: "A demographic mismatch occurs when the Name, Date of Birth, or Gender does not match 100% identically between your PAN card and Aadhaar records. For example, if your PAN has 'R. Kumar' but your Aadhaar has 'Ramesh Kumar'. To fix this, you must apply for a correction in either PAN (via Protean/UTIITSL) or Aadhaar (via UIDAI) so both match exactly before linking.",
    tags: ["Demographic Mismatch", "Name Correction", "Linking Error", "Income Tax"]
  },
  {
    id: "faq-pan-3",
    category: "pan",
    question: "What is the fee to link PAN with Aadhaar, and how is it paid?",
    answer: "The government late fee is ₹1,000 under Section 234H. It must be paid online via the Income Tax e-Filing portal under 'e-Pay Tax' by selecting Assessment Year as Current AY and Type of Payment (Minor Head) as 'Fee for delay in linking PAN with Aadhaar (500)'. After paying, you must wait 24-48 hours and submit the final linking request on the portal.",
    tags: ["Challan 500", "₹1000 Fee", "Section 234H", "e-Pay Tax"]
  },
  {
    id: "faq-pan-4",
    category: "pan",
    question: "Is the Instant e-PAN free, and is it valid everywhere?",
    answer: "Yes, Instant e-PAN generated on incometax.gov.in using Aadhaar e-KYC is 100% free (₹0) and is allotted in about 10 minutes. It holds the same legal validity as a physical PAN card. You can download the digitally signed PDF containing a QR code for instant verification.",
    tags: ["Instant e-PAN", "Free PAN", "Form 49A", "e-KYC"]
  }
];

export const OFFICIAL_HELPLINES = [
  {
    name: "UIDAI Aadhaar Citizen Toll-Free",
    number: "1947",
    email: "help@uidai.gov.in",
    hours: "24x7 (All 365 Days) in 12 Indian Languages",
    category: "Aadhaar"
  },
  {
    name: "Income Tax & PAN Department",
    number: "1800 180 1961 / 1961",
    email: "ask@incometax.gov.in",
    hours: "Mon-Sat: 8:00 AM - 10:00 PM",
    category: "PAN"
  },
  {
    name: "DigiLocker Citizen Support Desk",
    number: "011-24301851 / 1800-111-555",
    email: "support@digitallocker.gov.in",
    hours: "Mon-Fri: 9:30 AM - 6:00 PM",
    category: "DigiLocker"
  },
  {
    name: "National Cyber Crime Helpline (Fraud Prevention)",
    number: "1930",
    email: "cybercrime.gov.in",
    hours: "24x7 Emergency helpline for financial cyber frauds",
    category: "Emergency Safety"
  }
];
