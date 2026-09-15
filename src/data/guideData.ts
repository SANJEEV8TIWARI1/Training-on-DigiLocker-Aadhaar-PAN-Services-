import { ServiceGuide } from '../types';

export const SERVICE_GUIDES: ServiceGuide[] = [
  // --- DIGILOCKER GUIDES ---
  {
    id: "digilocker-account-creation",
    category: "digilocker",
    title: "How to Create and Set Up a DigiLocker Account",
    summary: "Complete walkthrough on signing up for DigiLocker using your Aadhaar-linked mobile number and securing it with a 6-digit security PIN.",
    estimatedTime: "5 - 7 minutes",
    officialFee: "Free of cost (₹0)",
    prerequisites: [
      "Mobile number registered with Aadhaar (for receiving OTP)",
      "12-digit Aadhaar Number or Virtual ID (VID)",
      "Correct Date of Birth as recorded in Aadhaar"
    ],
    officialPortal: "https://www.digilocker.gov.in",
    officialPortalName: "Official DigiLocker Web & Mobile App (Android/iOS)",
    steps: [
      {
        stepNumber: 1,
        title: "Visit DigiLocker Portal or Open the Official App",
        description: "Go to digilocker.gov.in or download the official DigiLocker app from Google Play Store or Apple App Store. Click on 'Sign Up' located at the top-right corner.",
        actionUrl: "https://www.digilocker.gov.in",
        actionUrlText: "Open DigiLocker Portal",
        subSteps: [
          "Ensure you are on the secure official domain '.gov.in'",
          "Do not download third-party or unofficial APKs"
        ],
        visualType: "web-portal",
        sampleVisualData: {
          screenTitle: "DigiLocker Sign Up Screen",
          fields: [
            { label: "Full Name (as per Aadhaar)", placeholder: "e.g. Rahul Sharma" },
            { label: "Date of Birth (DD/MM/YYYY)", placeholder: "DD/MM/YYYY" },
            { label: "Gender", placeholder: "Male / Female / Other" },
            { label: "Mobile Number", placeholder: "10-digit mobile number" }
          ],
          tips: ["Name must match exact spelling in your Aadhaar card"]
        }
      },
      {
        stepNumber: 2,
        title: "Enter Personal Details & Set 6-Digit Security PIN",
        description: "Fill in your Full Name, Date of Birth, Gender, Mobile Number, Email ID, and choose a strong 6-digit Security PIN. This PIN acts as your password for future logins.",
        importantNote: "Choose a memorable 6-digit PIN that you do not share with anyone. Do not use simple sequences like 123456 or your birth year.",
        subSteps: [
          "Enter your 10-digit Aadhaar-linked mobile number",
          "Enter your personal email address for notifications",
          "Set a confidential 6-digit security PIN and press 'Submit'"
        ],
        visualType: "security-pin",
        sampleVisualData: {
          badge: "Security Setup",
          fields: [
            { label: "Set 6-Digit Security PIN", placeholder: "••••••", type: "password" },
            { label: "Email ID", placeholder: "yourname@example.com" }
          ]
        }
      },
      {
        stepNumber: 3,
        title: "Verify Mobile Number with OTP",
        description: "You will receive a 6-digit One Time Password (OTP) on your entered mobile number. Enter the OTP in the verification box and click 'Submit'.",
        subSteps: [
          "Wait up to 60 seconds if network delay occurs",
          "Click 'Resend OTP' if not received after the countdown"
        ],
        visualType: "otp"
      },
      {
        stepNumber: 4,
        title: "Link 12-Digit Aadhaar Number for Full e-KYC Verification",
        description: "Enter your 12-digit Aadhaar number to verify your identity. An OTP will be sent to the mobile number registered in UIDAI Aadhaar database. Enter this OTP to complete the link.",
        importantNote: "Linking Aadhaar unlocks automatic fetching of verified digital certificates (Mark sheets, Driving License, RC, Vehicle Insurance, etc.).",
        visualType: "form",
        sampleVisualData: {
          screenTitle: "Aadhaar e-KYC Verification",
          fields: [
            { label: "Enter Aadhaar Number", placeholder: "1234 5678 9012" }
          ],
          badge: "UIDAI Verified"
        }
      }
    ],
    troubleshootingTips: [
      {
        issue: "Aadhaar OTP is going to an old/lost phone number",
        solution: "You must visit a nearby Aadhaar Seva Kendra (ASK) or post office to update your active mobile number in Aadhaar. Online mobile number updates are not permitted by UIDAI for security."
      },
      {
        issue: "Forgot 6-Digit Security PIN",
        solution: "Click 'Forgot Security PIN' on login screen, enter your Aadhaar/Mobile number and Date of Birth, and set a new 6-digit PIN via OTP verification."
      },
      {
        issue: "Account already exists with this Aadhaar",
        solution: "Use the 'Sign In' option instead of 'Sign Up'. Enter your Aadhaar or mobile number and use 'Forgot PIN' if you do not remember your password."
      }
    ],
    commonPitfalls: [
      "Mismatch between name spelling entered during registration and the name in Aadhaar records.",
      "Entering mobile number not linked with UIDAI database.",
      "Sharing OTP or 6-digit PIN with third-party agents."
    ]
  },
  {
    id: "digilocker-fetch-documents",
    category: "digilocker",
    title: "How to Fetch & Verify Documents in DigiLocker (Mark sheets, DL, RC, PAN)",
    summary: "Step-by-step tutorial on pulling legally valid digital documents from State and Central Government issuers into your DigiLocker Issued Documents section.",
    estimatedTime: "3 - 5 minutes per document",
    officialFee: "Free of cost (₹0)",
    prerequisites: [
      "Active DigiLocker account with Aadhaar linked",
      "Document registration details (e.g. Roll Number & Year for CBSE, Driving License No & DOB for DL, Vehicle Registration No & Chassis No for RC)"
    ],
    officialPortal: "https://www.digilocker.gov.in",
    officialPortalName: "DigiLocker Issued Documents Section",
    steps: [
      {
        stepNumber: 1,
        title: "Log in and Navigate to 'Search Documents'",
        description: "Sign in to DigiLocker with your Mobile/Aadhaar number and 6-digit PIN. On the dashboard, click on 'Search Documents' or browse by category (Education, Transport, Income Tax, Health).",
        visualType: "web-portal"
      },
      {
        stepNumber: 2,
        title: "Select Issuing Authority (e.g. CBSE, MoRTH, Income Tax)",
        description: "Search for the government body or board that issued your certificate. For example: 'Central Board of Secondary Education' for 10th/12th marksheet, or 'Ministry of Road Transport and Highways' for Driving License / Vehicle RC.",
        visualType: "form",
        sampleVisualData: {
          screenTitle: "Select Document Issuer",
          fields: [
            { label: "Search Issuer / Document", placeholder: "e.g., Driving License, CBSE, PAN" }
          ]
        }
      },
      {
        stepNumber: 3,
        title: "Provide Identification Numbers & Year",
        description: "Enter the required parameters matching your physical document exactly. For Marksheet: Roll Number & Passing Year. For Driving License: DL Number & Date of Birth. For Vehicle RC: Registration Number & Chassis / Engine Number (last 5 digits).",
        importantNote: "Ensure your name in DigiLocker matches the name on the document issuer database.",
        visualType: "form"
      },
      {
        stepNumber: 4,
        title: "Click 'Get Document' and View in 'Issued Documents'",
        description: "DigiLocker will query the issuer database in real-time. Upon successful match, your digitally signed document will be placed in 'Issued Documents'. You can view, download PDF, or show the QR code directly to officials.",
        visualType: "qr",
        sampleVisualData: {
          badge: "IT Act 2000 Section 9A Compliant",
          tips: ["DigiLocker digital documents are treated at par with original physical documents by Traffic Police, Airports, and Universities."]
        }
      }
    ],
    troubleshootingTips: [
      {
        issue: "No Record Found / Document Not Found",
        solution: "Double-check your roll number, registration number, or passing year. Some state education boards have only digitized records from specific years (e.g., 2004 onwards)."
      },
      {
        issue: "Name Mismatch Error",
        solution: "If the name in your Aadhaar differs slightly from your school certificate or DL (e.g., initials expanded or spelling variation), the automated match may fail. In such cases, request a name correction in Aadhaar or issuer records."
      }
    ],
    commonPitfalls: [
      "Uploading a scanned photo into 'Drive' and assuming it has the legal power of an 'Issued Document'. Only 'Issued Documents' have legal parity under Rule 9A.",
      "Entering DL number without proper state code prefix (e.g. DL-04... or RJ14...)."
    ]
  },

  // --- AADHAAR GUIDES ---
  {
    id: "aadhaar-download-eaadhaar",
    category: "aadhaar",
    title: "How to Download e-Aadhaar & Open Password-Protected PDF",
    summary: "Learn how to download your official electronic Aadhaar (e-Aadhaar) from myAadhaar portal and understand the 8-character PDF password structure.",
    estimatedTime: "3 - 5 minutes",
    officialFee: "Free of cost (₹0)",
    prerequisites: [
      "12-digit Aadhaar Number OR 28-digit Enrolment ID (EID) OR 16-digit Virtual ID (VID)",
      "Mobile number registered with Aadhaar to receive OTP"
    ],
    officialPortal: "https://myaadhaar.uidai.gov.in/gen-aeid",
    officialPortalName: "myAadhaar UIDAI Portal",
    steps: [
      {
        stepNumber: 1,
        title: "Visit official myAadhaar Portal",
        description: "Go to myaadhaar.uidai.gov.in and click on the 'Download Aadhaar' tile.",
        actionUrl: "https://myaadhaar.uidai.gov.in",
        actionUrlText: "Open myAadhaar Portal",
        visualType: "web-portal"
      },
      {
        stepNumber: 2,
        title: "Enter 12-Digit Aadhaar / Enrolment ID and Captcha",
        description: "Choose your identifier: Aadhaar Number, Enrolment ID (EID), or Virtual ID (VID). Enter the digits, type the Captcha code shown, and click 'Send OTP'.",
        visualType: "form",
        sampleVisualData: {
          screenTitle: "myAadhaar Download Screen",
          fields: [
            { label: "Enter Aadhaar Number", placeholder: "•••• •••• ••••" },
            { label: "Captcha Code", placeholder: "Type characters shown in image" }
          ]
        }
      },
      {
        stepNumber: 3,
        title: "Enter OTP & Choose Masked Aadhaar (Optional)",
        description: "Enter the 6-digit OTP received on your mobile. Check the box 'Do you want a masked Aadhaar?' if you only want the last 4 digits visible for privacy (e.g., XXXX-XXXX-1234). Then click 'Verify & Download'.",
        importantNote: "Masked Aadhaar is legally valid everywhere except where full UID display is mandated by law.",
        visualType: "otp"
      },
      {
        stepNumber: 4,
        title: "Open the Downloaded PDF using the 8-Character Password",
        description: "Your downloaded e-Aadhaar PDF is encrypted. The password is: FIRST 4 LETTERS OF YOUR NAME IN CAPITAL LETTERS + 4 DIGITS OF YOUR BIRTH YEAR.",
        importantNote: "Example 1: Name = RAMESH KUMAR, Year = 1990 → Password is RAME1990. Example 2: Name = RIA SHAH, Year = 2002 → Password is RIAS2002. Example 3: Name = P. SURESH, Year = 1985 → Password is PSUR1985.",
        visualType: "security-pin",
        sampleVisualData: {
          badge: "PDF Password Formula",
          tips: [
            "Formula: [First 4 Letters in CAPS] + [YYYY of Birth]",
            "If name has fewer than 4 letters (e.g. OM), use OM + Year (OM1990) or follow UIDAI rule"
          ]
        }
      }
    ],
    troubleshootingTips: [
      {
        issue: "Password Incorrect error when opening PDF",
        solution: "Ensure Caps Lock is ON. Check your exact birth year printed on your physical card. Do not include spaces between the name letters and birth year."
      },
      {
        issue: "OTP not arriving on mobile",
        solution: "Ensure mobile network connectivity. If the registered mobile number is no longer active, you must visit an Aadhaar Seva Kendra to update it."
      }
    ],
    commonPitfalls: [
      "Entering lowercase letters for the PDF password.",
      "Downloading from unverified private websites that store your UID illegally."
    ]
  },
  {
    id: "aadhaar-update-details",
    category: "aadhaar",
    title: "How to Update Aadhaar Details (Address Online, Biometrics Offline)",
    summary: "Clear distinction between what can be updated online (Address with valid proof) vs what requires visiting an Aadhaar Seva Kendra (Mobile, Biometrics, Name, DOB).",
    estimatedTime: "Online: 10 mins | Enrolment Center: 15-30 mins",
    officialFee: "Online Address Update: ₹50 | Biometrics at Center: ₹100 | Demographics at Center: ₹50 | Mandatory Kids Biometrics (5 & 15 yrs): Free",
    prerequisites: [
      "For Online Address: Valid Address Proof document (Electricity bill, Rent agreement, Bank statement, Passport, Voter ID) in PDF/JPEG < 2MB",
      "For Offline Updates: Original documents for verification at Kendra"
    ],
    officialPortal: "https://myaadhaar.uidai.gov.in",
    officialPortalName: "myAadhaar Address Update & Appointment Booking",
    steps: [
      {
        stepNumber: 1,
        title: "Identify Which Details Can Be Updated Online vs Offline",
        description: "Online Update: ONLY Address (via document proof or Head of Family consent). Offline Update at ASK: Mobile Number, Email, Name correction, Date of Birth, Gender, Photo, Fingerprints, Iris scan.",
        visualType: "web-portal"
      },
      {
        stepNumber: 2,
        title: "For Online Address Update: Login to myAadhaar",
        description: "Log in with your Aadhaar number and OTP on myaadhaar.uidai.gov.in. Select 'Update Address in Aadhaar'.",
        actionUrl: "https://myaadhaar.uidai.gov.in",
        actionUrlText: "myAadhaar Login",
        visualType: "form"
      },
      {
        stepNumber: 3,
        title: "Fill New Address and Upload Supporting Document",
        description: "Enter your complete new residential address (House No, Street, Locality, Landmark, PIN code, District, State). Select the document type you are uploading (e.g., Bank Passbook or Utility Bill) and upload a clear scan.",
        visualType: "form"
      },
      {
        stepNumber: 4,
        title: "Pay ₹50 Online Fee & Note the Service Request Number (SRN)",
        description: "Complete the ₹50 fee payment via UPI, Net Banking, or Debit Card. Save the generated Acknowledgement Slip with your 14-digit SRN (Service Request Number) to track update status.",
        visualType: "payment",
        sampleVisualData: {
          screenTitle: "Payment & SRN Acknowledgement",
          fields: [
            { label: "SRN (Service Request Number)", placeholder: "S12345678901234" },
            { label: "Amount Paid", placeholder: "₹50.00" }
          ]
        }
      }
    ],
    troubleshootingTips: [
      {
        issue: "Address update rejected by UIDAI verifier",
        solution: "Common rejection reasons: Name on the bill does not match Aadhaar name; Document older than 3 months; Blur scan; Missing seal/signature on certificate. Re-apply with a fresh, clear document."
      },
      {
        issue: "Need to update Mobile Number",
        solution: "Book an appointment at appointments.uidai.gov.in or walk into any Aadhaar Seva Kendra or post office with Aadhaar facility. No document required for mobile number update."
      }
    ],
    commonPitfalls: [
      "Believing fraudulent agents claiming they can update mobile number or biometrics online.",
      "Uploading expired rent agreements or blurry photos."
    ]
  },

  // --- PAN GUIDES ---
  {
    id: "pan-link-aadhaar",
    category: "pan",
    title: "How to Link PAN Card with Aadhaar (Step-by-Step & Fee Payment)",
    summary: "Comprehensive guide to checking PAN-Aadhaar link status, paying the ₹1,000 challan fee on e-Filing portal, and submitting the linkage request.",
    estimatedTime: "Part 1 (Payment): 5 mins | Part 2 (Link Submission): After challan realization (24-48 hrs)",
    officialFee: "₹1,000 Penalty / Late Fee Challan (under Section 234H)",
    prerequisites: [
      "10-character PAN Number",
      "12-digit Aadhaar Number",
      "Exact match of Name, Date of Birth, and Gender on both PAN and Aadhaar records",
      "Active Net Banking, UPI, or Debit Card for paying ₹1,000 fee"
    ],
    officialPortal: "https://www.incometax.gov.in/iec/fposervices/#/pre-login/bl-link-aadhaar",
    officialPortalName: "Income Tax e-Filing Portal (incometax.gov.in)",
    steps: [
      {
        stepNumber: 1,
        title: "Check Existing Link Status First",
        description: "Go to incometax.gov.in, navigate to 'Quick Links' on the left side, and click 'Link Aadhaar Status'. Enter your PAN and Aadhaar to check if already linked.",
        subSteps: [
          "If already linked: 'Your PAN is already linked to given Aadhaar.' No action needed.",
          "If not linked: Proceed to Link Aadhaar."
        ],
        visualType: "web-portal"
      },
      {
        stepNumber: 2,
        title: "Pay ₹1,000 Challan Fee via e-Pay Tax",
        description: "On 'Link Aadhaar' page, enter PAN and Aadhaar. If fee is unpaid, click 'Continue to Pay Through e-Pay Tax'. Enter PAN, confirm PAN, and verify mobile OTP. Select 'Income Tax' tile.",
        importantNote: "Crucial Challan Details: Select Assessment Year as CURRENT AY (e.g., 2024-25 or latest) and Type of Payment (Minor Head) as 'Fee for delay in linking PAN with Aadhaar (500)' or 'Other Receipts (500)'.",
        visualType: "payment",
        sampleVisualData: {
          screenTitle: "e-Pay Tax Challan Selection",
          fields: [
            { label: "Tax Head", placeholder: "Income Tax (0021)" },
            { label: "Assessment Year", placeholder: "Select Latest AY" },
            { label: "Type of Payment", placeholder: "Other Receipts (500) / Fee for delay" },
            { label: "Fee Amount", placeholder: "₹1,000" }
          ],
          tips: ["Do NOT select Advance Tax or Self-Assessment Tax for linking fee."]
        }
      },
      {
        stepNumber: 3,
        title: "Wait for Payment Realization (Usually Instant to 24 Hours)",
        description: "Once the payment is successful, download the BSR code and Challan Serial Number receipt. The Income Tax portal usually registers the payment within a few hours to 24 hours.",
        visualType: "form"
      },
      {
        stepNumber: 4,
        title: "Submit Final Linkage Request",
        description: "Return to 'Link Aadhaar' page on incometax.gov.in. Enter PAN and Aadhaar again. The portal will detect the verified ₹1,000 challan. Click 'Continue', enter Name as per Aadhaar, and submit the OTP to finalize linking.",
        visualType: "otp",
        sampleVisualData: {
          badge: "Challan Verified",
          tips: ["Linking request will be sent to UIDAI for demographic verification."]
        }
      }
    ],
    troubleshootingTips: [
      {
        issue: "Demographic Mismatch (Name, DOB, or Gender differs between PAN & Aadhaar)",
        solution: "UIDAI and Income Tax require an exact match. If your name is 'Anita Devi' in Aadhaar but 'Anita Kumari' in PAN, the link will fail. You must apply for a correction in either PAN (via Protean/UTIITSL) or Aadhaar (via UIDAI) before linking."
      },
      {
        issue: "Payment made but showing 'Payment Details Not Found'",
        solution: "It takes up to 24-48 hours for bank challans to reconcile with the Income Tax portal. Wait 24 hours and retry on the 'Link Aadhaar' page."
      }
    ],
    commonPitfalls: [
      "Selecting wrong Assessment Year or wrong Minor Head (e.g. paying under 100 or 300 instead of 500).",
      "Thinking that paying the ₹1,000 fee automatically links the cards. You MUST return to the portal and click 'Submit' after payment!"
    ]
  },
  {
    id: "pan-new-application-instant-epan",
    category: "pan",
    title: "How to Apply for a New PAN Card (Instant e-PAN vs Physical Card)",
    summary: "Learn how to obtain a free instant e-PAN in 10 minutes using Aadhaar e-KYC, or apply for a physical PVC PAN card via Protean/UTIITSL.",
    estimatedTime: "Instant e-PAN: 10 minutes | Physical PAN: 10 - 15 business days",
    officialFee: "Instant e-PAN: ₹0 (Free) | Physical PAN Card: ₹107 (within India) / ₹1,017 (Foreign address)",
    prerequisites: [
      "For Instant e-PAN: Aadhaar number with active mobile number linked; Applicant must never have been allotted a PAN before; Age 18+; Complete Date of Birth on Aadhaar",
      "For Physical PAN (Form 49A): Identity Proof, Address Proof, Date of Birth Proof, 2 passport photos (if offline/scanned mode)"
    ],
    officialPortal: "https://www.incometax.gov.in/iec/fposervices/#/pre-login/instant-e-pan",
    officialPortalName: "Income Tax Instant e-PAN / Protean (NSDL)",
    steps: [
      {
        stepNumber: 1,
        title: "Method A: Get Free Instant e-PAN (Paperless in 10 Mins)",
        description: "Go to incometax.gov.in → Quick Links → 'Instant e-PAN' → Click 'Get New e-PAN'. Enter your 12-digit Aadhaar number, accept terms, and validate with Aadhaar OTP.",
        visualType: "web-portal"
      },
      {
        stepNumber: 2,
        title: "Validate Aadhaar Details & Generate 10-Digit PAN",
        description: "Your photograph, Name, Date of Birth, and Address will be automatically fetched from UIDAI records. Confirm the details and submit. Your PAN will be generated within minutes and you can download the signed e-PAN PDF.",
        visualType: "form"
      },
      {
        stepNumber: 3,
        title: "Method B: Apply for Physical PVC Card (Form 49A via Protean/UTIITSL)",
        description: "If you want a physical laminated card with your physical signature printed, visit onlineservices.tin.egov-nsdl.com or utiitsl.com. Select 'Application Type: New PAN - Indian Citizen (Form 49A)'.",
        actionUrl: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
        actionUrlText: "Protean (NSDL) PAN Portal",
        visualType: "form"
      },
      {
        stepNumber: 4,
        title: "Pay ₹107 Fee and Track Delivery via Speed Post",
        description: "Complete form filling, pay ₹107 online, and note your 15-digit Acknowledgement Number. The physical PAN card will be delivered to your Aadhaar address within 10-15 days.",
        visualType: "payment"
      }
    ],
    troubleshootingTips: [
      {
        issue: "Instant e-PAN does not have physical signature printed",
        solution: "Instant e-PAN displays 'Signature not received / Not applicable' because it uses Aadhaar biometric e-KYC. It is 100% legally valid everywhere. If a bank insists on a physical signature, apply for a Reprint / Change request with signature upload on Protean."
      },
      {
        issue: "Minor applying for PAN",
        solution: "Instant e-PAN cannot be generated for minors (under 18). Minors must apply through Protean/UTIITSL Form 49A with parent/guardian as Representative Assessee."
      }
    ],
    commonPitfalls: [
      "Applying for a second PAN card. Holding more than one PAN is illegal under Section 272B of Income Tax Act and incurs a ₹10,000 fine.",
      "Paying excessive fees (₹300-₹500) to local cyber cafes when the official fee is only ₹107."
    ]
  }
];
