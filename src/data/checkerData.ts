import { ServiceRequirement } from '../types';

export const SERVICE_REQUIREMENTS: ServiceRequirement[] = [
  {
    id: "aadhaar-address-update",
    serviceCategory: "aadhaar",
    serviceName: "Aadhaar Address Update (Online)",
    shortDesc: "Change or correct your residential address on your Aadhaar card using valid address proof.",
    fee: "₹50 (Online Portal)",
    processingTime: "3 to 15 working days",
    officialPortalUrl: "https://myaadhaar.uidai.gov.in",
    officialPortalLabel: "myAadhaar Online Portal",
    isOnlineAvailable: true,
    requiredDocuments: [
      {
        category: "Proof of Address (PoA) - Any ONE of the following",
        mandatory: true,
        examples: [
          "Electricity / Water / Gas Bill (not older than 3 months)",
          "Bank Account Statement / Passbook with photo & bank stamp",
          "Registered Rent Agreement (active)",
          "Passport / Voter ID / Driving License",
          "Post Office Savings Passbook",
          "Standard Certificate by Gazetted Officer / MP / MLA / Tehsildar (on UIDAI format)"
        ]
      },
      {
        category: "Active Mobile Number",
        mandatory: true,
        examples: ["Mobile number registered with Aadhaar to receive OTP for login & payment"]
      }
    ],
    stepSummary: [
      "Log in to myaadhaar.uidai.gov.in using Aadhaar & OTP",
      "Click 'Address Update' and enter complete new address",
      "Upload scanned copy of valid PoA (PDF or JPEG < 2MB)",
      "Pay ₹50 fee via UPI / Card / NetBanking",
      "Save the 14-digit SRN slip for tracking"
    ],
    cautionPoints: [
      "Document must be in the applicant's own name (or Head of Family with HoF declaration).",
      "Electricity bills or bank statements older than 3 months will be rejected."
    ]
  },
  {
    id: "aadhaar-mobile-update",
    serviceCategory: "aadhaar",
    serviceName: "Aadhaar Mobile Number / Biometrics Update",
    shortDesc: "Link new mobile number, update fingerprints/iris scan, or update photo at Aadhaar Seva Kendra.",
    fee: "₹50 for Demographic / Mobile | ₹100 for Biometrics",
    processingTime: "24 to 72 hours",
    officialPortalUrl: "https://appointments.uidai.gov.in",
    officialPortalLabel: "UIDAI Appointment Booking",
    isOnlineAvailable: false,
    requiredDocuments: [
      {
        category: "Physical Presence",
        mandatory: true,
        examples: ["Citizen must physically visit Aadhaar Seva Kendra for live biometrics / photo / fingerprint scanning."]
      },
      {
        category: "Document for Mobile Update",
        mandatory: false,
        examples: ["NO documentary proof required for mobile number update! Only physical presence and live fingerprint verification."]
      }
    ],
    stepSummary: [
      "Book an online appointment at appointments.uidai.gov.in (or walk into any Kendra / Post Office)",
      "Fill the Aadhaar Enrolment / Update form",
      "Provide live fingerprint scan and new mobile number to the operator",
      "Pay ₹50 cash or digital at the counter",
      "Collect the 28-digit Enrolment ID (EID) acknowledgement receipt"
    ],
    cautionPoints: [
      "UIDAI DOES NOT allow mobile number updates online for security reasons. Beware of scam sites claiming online mobile updates."
    ]
  },
  {
    id: "digilocker-driving-license",
    serviceCategory: "digilocker",
    serviceName: "Fetch Driving License in DigiLocker",
    shortDesc: "Get an authentic, digitally signed Driving License valid for traffic checks across India.",
    fee: "₹0 (Completely Free)",
    processingTime: "Instant (Real-time in 60 seconds)",
    officialPortalUrl: "https://www.digilocker.gov.in",
    officialPortalLabel: "DigiLocker Web / App",
    isOnlineAvailable: true,
    requiredDocuments: [
      {
        category: "Driving License Details",
        mandatory: true,
        examples: [
          "Exact Driving License Number (e.g., DL-0420180012345 or MH0220150098765)",
          "Exact Date of Birth matching the RTO database record"
        ]
      },
      {
        category: "Aadhaar e-KYC Verification",
        mandatory: true,
        examples: ["Aadhaar number linked to your DigiLocker account"]
      }
    ],
    stepSummary: [
      "Open DigiLocker → Search Documents → 'Ministry of Road Transport and Highways'",
      "Select 'Driving License'",
      "Enter exact DL Number and Date of Birth",
      "Click 'Get Document'",
      "Document is stored in 'Issued Documents' with official digital signature & QR code"
    ],
    cautionPoints: [
      "Rule 9A of IT Act 2000 mandates that police & transport authorities MUST accept DigiLocker digital DLs as original physical documents."
    ]
  },
  {
    id: "digilocker-marksheet",
    serviceCategory: "digilocker",
    serviceName: "Fetch Class X / XII Marksheet in DigiLocker",
    shortDesc: "Download verified digital mark sheet from CBSE, ICSE, or State Education Boards.",
    fee: "₹0 (Completely Free)",
    processingTime: "Instant (Real-time)",
    officialPortalUrl: "https://www.digilocker.gov.in",
    officialPortalLabel: "DigiLocker Web / App",
    isOnlineAvailable: true,
    requiredDocuments: [
      {
        category: "Academic Credentials",
        mandatory: true,
        examples: [
          "Roll Number (as printed on original admit card / marksheet)",
          "Passing Year (e.g., 2018, 2021, etc.)",
          "School Code / Center Number (for certain State boards)"
        ]
      }
    ],
    stepSummary: [
      "Log in to DigiLocker → Search Documents → Select your Education Board (e.g. CBSE)",
      "Select 'Class X Marksheet' or 'Class XII Marksheet'",
      "Enter Roll Number and Year of Passing",
      "Click 'Get Document' to fetch authenticated PDF"
    ],
    cautionPoints: [
      "Name in DigiLocker must match the name registered with your exam board."
    ]
  },
  {
    id: "pan-link-aadhaar-service",
    serviceCategory: "pan",
    serviceName: "PAN - Aadhaar Linking Request",
    shortDesc: "Mandatory linking of Permanent Account Number (PAN) with 12-digit Aadhaar to avoid inoperative PAN status.",
    fee: "₹1,000 Late Fee Challan (Section 234H)",
    processingTime: "1 to 3 days (after challan realization)",
    officialPortalUrl: "https://www.incometax.gov.in",
    officialPortalLabel: "Income Tax e-Filing Portal",
    isOnlineAvailable: true,
    requiredDocuments: [
      {
        category: "Primary Identifiers",
        mandatory: true,
        examples: [
          "10-digit PAN Number",
          "12-digit Aadhaar Number",
          "Mobile number for receiving OTP"
        ]
      },
      {
        category: "Demographic Consistency",
        mandatory: true,
        examples: [
          "Applicant Name, Date of Birth, and Gender must be IDENTICAL on both PAN and Aadhaar."
        ]
      }
    ],
    stepSummary: [
      "Check link status on incometax.gov.in under 'Quick Links'",
      "Pay ₹1,000 fee through e-Pay Tax (Assessment Year: Current AY, Minor Head 500)",
      "Wait for payment status to update (within 24 hrs)",
      "Re-visit 'Link Aadhaar' page and submit the final linking request with OTP",
      "Check confirmation status after 48 hours"
    ],
    cautionPoints: [
      "If PAN and Aadhaar have different names or DOB, linking will fail with 'Demographic Mismatch'. You must correct the discrepancy first."
    ]
  },
  {
    id: "pan-new-instant",
    serviceCategory: "pan",
    serviceName: "Instant e-PAN Allotment (via Aadhaar)",
    shortDesc: "Get a fresh 10-digit PAN card allotted instantly online within 10 minutes free of charge.",
    fee: "₹0 (Free instant digital PDF)",
    processingTime: "10 minutes",
    officialPortalUrl: "https://www.incometax.gov.in/iec/fposervices/#/pre-login/instant-e-pan",
    officialPortalLabel: "Income Tax Instant e-PAN",
    isOnlineAvailable: true,
    requiredDocuments: [
      {
        category: "Aadhaar Prerequisites",
        mandatory: true,
        examples: [
          "12-digit Aadhaar Number",
          "Active mobile number linked with Aadhaar for OTP",
          "Must NOT have another PAN already allotted (Duplicate PAN is illegal)",
          "Must be an adult (Age 18+)",
          "Aadhaar must show full Date of Birth (DD/MM/YYYY)"
        ]
      }
    ],
    stepSummary: [
      "Go to incometax.gov.in → 'Instant e-PAN' → 'Get New e-PAN'",
      "Enter Aadhaar number and submit OTP received on mobile",
      "Verify auto-fetched demographic details (Name, Photo, Address)",
      "Submit application to generate 10-digit PAN number",
      "Download digitally signed e-PAN PDF in 10 minutes"
    ],
    cautionPoints: [
      "Instant e-PAN does not have physical signature (shows digital e-sign). If physical signature is needed by a bank, order a reprint via Protean/UTIITSL."
    ]
  }
];
