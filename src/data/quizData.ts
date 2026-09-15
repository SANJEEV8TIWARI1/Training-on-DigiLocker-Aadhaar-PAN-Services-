import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the correct password format to open a downloaded e-Aadhaar PDF?",
    options: [
      "Your full 12-digit Aadhaar Number",
      "First 4 letters of your name in CAPITAL + 4 digits of your Birth Year (e.g., RAME1990)",
      "Your registered mobile number",
      "Date of birth in DDMMYYYY format"
    ],
    correctAnswer: 1,
    explanation: "UIDAI encrypts e-Aadhaar PDFs with a combination of the first 4 capital letters of your name and your 4-digit birth year (e.g., RAMESH born in 1990 is RAME1990)."
  },
  {
    id: 2,
    question: "Under which law are digital documents stored in DigiLocker treated at par with physical originals?",
    options: [
      "Motor Vehicles Act Section 19",
      "Rule 9A of the Information Technology (IT) Act, 2016",
      "Consumer Protection Act 2019",
      "Right to Information (RTI) Act 2005"
    ],
    correctAnswer: 1,
    explanation: "Rule 9A of the IT Act Rules, 2016 explicitly establishes that electronic documents in DigiLocker are treated at par with physical certificates."
  },
  {
    id: 3,
    question: "Can an Aadhaar mobile number update be completed fully online through an unverified website?",
    options: [
      "Yes, any website can update it for a fee",
      "Yes, if you enter your OTP on WhatsApp",
      "No. UIDAI mandates physical biometric presence at an Aadhaar Seva Kendra for mobile updates to prevent identity theft",
      "Only through private cyber cafes without visiting"
    ],
    correctAnswer: 2,
    explanation: "UIDAI does NOT permit online mobile updates. You must physically visit an authorized Aadhaar center for biometric verification."
  },
  {
    id: 4,
    question: "When paying the ₹1,000 challan fee for PAN-Aadhaar linking, which Minor Head must you select?",
    options: [
      "Advance Tax (100)",
      "Self-Assessment Tax (300)",
      "Fee for delay in linking PAN with Aadhaar / Other Receipts (500)",
      "Tax on Regular Assessment (400)"
    ],
    correctAnswer: 2,
    explanation: "You must select Minor Head 'Other Receipts (500)' or 'Fee for delay in linking PAN with Aadhaar (500)' under Major Head 0021."
  },
  {
    id: 5,
    question: "What is the safest practice if someone calls claiming to be from the Bank or UIDAI asking for an OTP to 'verify your Aadhaar'?",
    options: [
      "Share the OTP immediately so your account isn't blocked",
      "Refuse to share the OTP, hang up, and report the number to 1930 Cyber Fraud Helpline",
      "Ask them to send an SMS and then share",
      "Share half of the OTP digits"
    ],
    correctAnswer: 1,
    explanation: "Government bodies and legitimate banks never ask for OTPs over the phone. Immediately terminate the call and report fraud to the 1930 helpline."
  }
];
