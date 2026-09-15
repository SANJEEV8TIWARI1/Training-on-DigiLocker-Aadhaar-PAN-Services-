import React, { useState } from 'react';
import { 
  Laptop, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  QrCode, 
  AlertCircle, 
  KeyRound, 
  Download, 
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface PracticeSimulatorProps {
  language: Language;
  isHighContrast: boolean;
}

export const PracticeSimulator: React.FC<PracticeSimulatorProps> = ({ isHighContrast }) => {
  const [activeSimulation, setActiveSimulation] = useState<'digilocker' | 'pan-link' | 'eaadhaar'>('digilocker');

  // --- DigiLocker Simulation State ---
  const [dlDocType, setDlDocType] = useState<'driving-license' | 'cbse-marksheet'>('driving-license');
  const [dlName, setDlName] = useState('Rahul Sharma');
  const [dlNumber, setDlNumber] = useState('DL-0420190012345');
  const [dlDob, setDlDob] = useState('1994-08-15');
  const [dlRollNo, setDlRollNo] = useState('6124890');
  const [dlYear, setDlYear] = useState('2018');
  const [dlStep, setDlStep] = useState<1 | 2 | 3>(1);
  const [dlIsLoading, setDlIsLoading] = useState(false);
  const [dlFetchedDoc, setDlFetchedDoc] = useState<any>(null);

  // --- PAN-Aadhaar Simulation State ---
  const [panInput, setPanInput] = useState('ABCDE1234F');
  const [panAadhaarInput, setPanAadhaarInput] = useState('2345 6789 0123');
  const [panNameAsPerAadhaar, setPanNameAsPerAadhaar] = useState('Anita Sharma');
  const [panNameAsPerPan, setPanNameAsPerPan] = useState('Anita Sharma');
  const [panLinkStep, setPanLinkStep] = useState<1 | 2 | 3 | 4>(1);
  const [panChallanPaid, setPanChallanPaid] = useState(false);
  const [panOtp, setPanOtp] = useState('');
  const [panErrorMsg, setPanErrorMsg] = useState('');

  // --- e-Aadhaar Download Simulation State ---
  const [adhUidInput, setAdhUidInput] = useState('5432 9876 1234');
  const [adhMaskedChoice, setAdhMaskedChoice] = useState(false);
  const [adhOtpInput, setAdhOtpInput] = useState('');
  const [adhApplicantName, setAdhApplicantName] = useState('RAMESH PATEL');
  const [adhBirthYear, setAdhBirthYear] = useState('1991');
  const [adhStep, setAdhStep] = useState<1 | 2 | 3>(1);
  const [adhPdfPasswordGuess, setAdhPdfPasswordGuess] = useState('');
  const [adhPdfUnlocked, setAdhPdfUnlocked] = useState(false);
  const [adhPasswordError, setAdhPasswordError] = useState('');

  // Helper trigger confetti
  const fireCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  // DigiLocker Fetch Simulation Handler
  const handleFetchDigiLockerDoc = () => {
    setDlIsLoading(true);
    setTimeout(() => {
      setDlIsLoading(false);
      setDlStep(2);
      if (dlDocType === 'driving-license') {
        setDlFetchedDoc({
          title: "Driving License",
          issuer: "Ministry of Road Transport and Highways (MoRTH)",
          holderName: dlName.toUpperCase(),
          docNo: dlNumber,
          dob: dlDob,
          validity: "Valid till 14-Aug-2039",
          vehicleClass: "MCWG, LMV (Motorcycle & Car)",
          dateFetched: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        });
      } else {
        setDlFetchedDoc({
          title: "Class X Secondary School Certificate",
          issuer: "Central Board of Secondary Education (CBSE)",
          holderName: dlName.toUpperCase(),
          rollNo: dlRollNo,
          year: dlYear,
          cgpaResult: "PASS (Overall 88.4%)",
          dateFetched: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        });
      }
      fireCelebration();
    }, 1200);
  };

  // PAN Link Simulation Handler
  const handlePanLinkSubmit = () => {
    // Check demographic consistency
    if (panNameAsPerAadhaar.trim().toLowerCase() !== panNameAsPerPan.trim().toLowerCase()) {
      setPanErrorMsg(`Demographic Mismatch Error: Name in PAN ('${panNameAsPerPan}') does not match Name in Aadhaar ('${panNameAsPerAadhaar}'). You must correct this in PAN or Aadhaar before linking.`);
      return;
    }
    setPanErrorMsg('');
    setPanLinkStep(4);
    fireCelebration();
  };

  // e-Aadhaar PDF Unlock Handler
  const handleUnlockAadhaarPdf = () => {
    const cleanName = adhApplicantName.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
    const correctPassword = `${cleanName.slice(0, 4)}${adhBirthYear.slice(0, 4)}`;
    
    if (adhPdfPasswordGuess.trim().toUpperCase() === correctPassword) {
      setAdhPdfUnlocked(true);
      setAdhPasswordError('');
      fireCelebration();
    } else {
      setAdhPasswordError(`Incorrect Password! Remember the formula: First 4 letters of name in CAPITAL (${cleanName.slice(0, 4)}) + Birth Year (${adhBirthYear}) = '${correctPassword}'`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Sandbox Header */}
      <div className={`p-6 rounded-2xl border ${
        isHighContrast 
          ? 'bg-neutral-950 border-yellow-400 text-yellow-300' 
          : 'bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-blue-900 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Safe Practice Lab • Zero Risk Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Interactive Digital Citizen Practice Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Gain hands-on confidence! Test out realistic simulations of fetching documents in DigiLocker, linking your PAN card, and opening encrypted e-Aadhaar PDFs.
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Track Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          id="sim-track-digilocker-btn"
          onClick={() => setActiveSimulation('digilocker')}
          className={`p-4 rounded-xl border text-left transition flex items-center gap-3 ${
            activeSimulation === 'digilocker'
              ? isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold'
                : 'bg-blue-800 text-white border-blue-800 shadow-md'
              : isHighContrast
                ? 'bg-neutral-900 text-yellow-300 border-neutral-700'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeSimulation === 'digilocker' ? 'bg-white/20' : 'bg-blue-100 text-blue-800'}`}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">1. DigiLocker Fetch</h4>
            <p className={`text-xs ${activeSimulation === 'digilocker' ? 'text-blue-100' : 'text-slate-500'}`}>
              Pull Marksheet / Driving License
            </p>
          </div>
        </button>

        <button
          id="sim-track-pan-btn"
          onClick={() => setActiveSimulation('pan-link')}
          className={`p-4 rounded-xl border text-left transition flex items-center gap-3 ${
            activeSimulation === 'pan-link'
              ? isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold'
                : 'bg-indigo-800 text-white border-indigo-800 shadow-md'
              : isHighContrast
                ? 'bg-neutral-900 text-yellow-300 border-neutral-700'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeSimulation === 'pan-link' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-800'}`}>
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">2. PAN-Aadhaar Link</h4>
            <p className={`text-xs ${activeSimulation === 'pan-link' ? 'text-indigo-100' : 'text-slate-500'}`}>
              Test challan & demographic check
            </p>
          </div>
        </button>

        <button
          id="sim-track-eaadhaar-btn"
          onClick={() => setActiveSimulation('eaadhaar')}
          className={`p-4 rounded-xl border text-left transition flex items-center gap-3 ${
            activeSimulation === 'eaadhaar'
              ? isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold'
                : 'bg-emerald-800 text-white border-emerald-800 shadow-md'
              : isHighContrast
                ? 'bg-neutral-900 text-yellow-300 border-neutral-700'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeSimulation === 'eaadhaar' ? 'bg-white/20' : 'bg-emerald-100 text-emerald-800'}`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">3. e-Aadhaar & Password</h4>
            <p className={`text-xs ${activeSimulation === 'eaadhaar' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Download & unlock PDF password
            </p>
          </div>
        </button>
      </div>

      {/* TRACK 1: DIGILOCKER SIMULATION */}
      {activeSimulation === 'digilocker' && (
        <div className={`p-6 rounded-2xl border ${
          isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                DigiLocker Mock Simulator
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Simulate Fetching an Issued Government Document
              </h3>
            </div>
            <button
              onClick={() => {
                setDlStep(1);
                setDlFetchedDoc(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Simulator</span>
            </button>
          </div>

          {dlStep === 1 ? (
            <div className="space-y-5 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Document to Fetch:
                  </label>
                  <select
                    value={dlDocType}
                    onChange={(e) => setDlDocType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="driving-license">Driving License (Ministry of Road Transport)</option>
                    <option value="cbse-marksheet">Class X Marksheet (CBSE Examination Board)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Name as per Aadhaar (Pre-filled):
                  </label>
                  <input
                    type="text"
                    value={dlName}
                    onChange={(e) => setDlName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              {dlDocType === 'driving-license' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Driving License Number:
                    </label>
                    <input
                      type="text"
                      value={dlNumber}
                      onChange={(e) => setDlNumber(e.target.value)}
                      placeholder="e.g. DL-0420190012345"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Include state code prefix</span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth (as in RTO Records):
                    </label>
                    <input
                      type="date"
                      value={dlDob}
                      onChange={(e) => setDlDob(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CBSE Roll Number:
                    </label>
                    <input
                      type="text"
                      value={dlRollNo}
                      onChange={(e) => setDlRollNo(e.target.value)}
                      placeholder="e.g. 6124890"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Year of Passing:
                    </label>
                    <input
                      type="text"
                      value={dlYear}
                      onChange={(e) => setDlYear(e.target.value)}
                      placeholder="e.g. 2018"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Consent: I provide my consent to DigiLocker to fetch my authentic record from the issuing authority.
                </span>
              </div>

              <button
                id="sim-fetch-digilocker-doc-btn"
                disabled={dlIsLoading}
                onClick={handleFetchDigiLockerDoc}
                className="w-full py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                {dlIsLoading ? (
                  <span>Querying Issuing Authority Database...</span>
                ) : (
                  <>
                    <span>Get Document (Simulate Fetch)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Successful Fetch Visual Certificate Preview */
            <div className="space-y-6 pt-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Document successfully fetched into your 'Issued Documents'!</span>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  Legally Verified
                </span>
              </div>

              {/* Realistic Digital Certificate Mockup */}
              <div className="max-w-xl mx-auto p-6 rounded-2xl border-2 border-slate-300 bg-white shadow-md text-slate-900 space-y-4 relative overflow-hidden">
                {/* Government Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none font-black text-6xl rotate-[-25deg]">
                  DIGILOCKER
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-800 text-white flex items-center justify-center font-black text-sm">
                      GOI
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{dlFetchedDoc.issuer}</h4>
                      <p className="text-[11px] text-slate-500 font-semibold">{dlFetchedDoc.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 block">
                      ✓ Digitally Signed
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{dlFetchedDoc.dateFetched}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Document Holder Name</span>
                    <strong className="text-slate-900 text-sm font-extrabold">{dlFetchedDoc.holderName}</strong>
                  </div>

                  {dlFetchedDoc.docNo && (
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Driving License Number</span>
                      <strong className="text-blue-900 font-mono text-sm font-bold">{dlFetchedDoc.docNo}</strong>
                    </div>
                  )}

                  {dlFetchedDoc.rollNo && (
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">CBSE Roll Number</span>
                      <strong className="text-blue-900 font-mono text-sm font-bold">{dlFetchedDoc.rollNo} (Year: {dlFetchedDoc.year})</strong>
                    </div>
                  )}

                  {dlFetchedDoc.validity && (
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">License Validity</span>
                      <span className="text-slate-800 font-medium">{dlFetchedDoc.validity}</span>
                    </div>
                  )}

                  {dlFetchedDoc.vehicleClass && (
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Vehicle Authorized</span>
                      <span className="text-slate-800 font-medium">{dlFetchedDoc.vehicleClass}</span>
                    </div>
                  )}

                  {dlFetchedDoc.cgpaResult && (
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Passing Status</span>
                      <span className="text-emerald-700 font-bold">{dlFetchedDoc.cgpaResult}</span>
                    </div>
                  )}
                </div>

                {/* QR Code and IT Act Section 9A Badge */}
                <div className="pt-3 border-t border-dashed flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-slate-100 border border-slate-300">
                      <QrCode className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      <strong className="text-slate-800 block">UIDAI / MeitY Encrypted QR</strong>
                      <span>Scan with official DigiLocker app to verify authenticity</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      IT Act 2000 Rule 9A
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setDlStep(1)}
                  className="px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs"
                >
                  Fetch Another Document
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TRACK 2: PAN-AADHAAR LINK SIMULATION */}
      {activeSimulation === 'pan-link' && (
        <div className={`p-6 rounded-2xl border ${
          isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Income Tax e-Filing Simulation
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                PAN - Aadhaar Linkage & Challan Validation Simulator
              </h3>
            </div>
            <button
              onClick={() => {
                setPanLinkStep(1);
                setPanChallanPaid(false);
                setPanErrorMsg('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Stepper Header */}
          <div className="grid grid-cols-3 gap-2 pt-4">
            <div className={`p-2.5 rounded-lg text-center text-xs font-bold border ${
              panLinkStep >= 1 ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}>
              1. Enter Identifiers
            </div>
            <div className={`p-2.5 rounded-lg text-center text-xs font-bold border ${
              panLinkStep >= 2 ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}>
              2. Challan (₹1000)
            </div>
            <div className={`p-2.5 rounded-lg text-center text-xs font-bold border ${
              panLinkStep >= 3 ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}>
              3. OTP & Confirmation
            </div>
          </div>

          {/* Step 1: Enter PAN & Aadhaar */}
          {panLinkStep === 1 && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter PAN Number (10 characters):
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={panInput}
                    onChange={(e) => setPanInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter Aadhaar Number (12 digits):
                  </label>
                  <input
                    type="text"
                    value={panAadhaarInput}
                    onChange={(e) => setPanAadhaarInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Demographic Consistency Test Fields */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <AlertCircle className="w-4 h-4 text-indigo-600" />
                  <span>Demographic Mismatch Simulation Test:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Applicant Name in PAN records:
                    </label>
                    <input
                      type="text"
                      value={panNameAsPerPan}
                      onChange={(e) => setPanNameAsPerPan(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Applicant Name in Aadhaar records:
                    </label>
                    <input
                      type="text"
                      value={panNameAsPerAadhaar}
                      onChange={(e) => setPanNameAsPerAadhaar(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Tip: Try typing different names (e.g., 'Anita Sharma' vs 'Anita Kumari') to see how the system detects demographic mismatches before submitting!
                </p>
              </div>

              <button
                id="sim-pan-validate-btn"
                onClick={() => setPanLinkStep(2)}
                className="w-full py-2.5 rounded-xl bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Validate Identifiers & Check Challan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Challan Payment Simulator */}
          {panLinkStep === 2 && (
            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Late Fee Challan Required (Section 234H)</span>
                </div>
                <p>
                  As per Income Tax regulations, linking PAN after the statutory deadline requires a ₹1,000 challan payment under Minor Head 500.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400">e-Pay Tax Challan Breakdown</span>
                  <span className="text-[11px] text-emerald-400 font-mono">Major Head: 0021</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Tax Head</span>
                    <span>Income Tax (0021)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Minor Head</span>
                    <span className="text-amber-300 font-bold">Fee for delay (500)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Assessment Year</span>
                    <span>Current AY</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Challan Amount</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm">₹1,000.00</span>
                  </div>
                </div>
              </div>

              <button
                id="sim-pan-pay-challan-btn"
                onClick={() => {
                  setPanChallanPaid(true);
                  setPanLinkStep(3);
                }}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Simulate Successful ₹1,000 Challan Payment</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 3: Final Link Submission & OTP */}
          {panLinkStep === 3 && (
            <div className="space-y-4 pt-4">
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span>Challan Realized: <strong>BSR Code: 0210045, Challan No: 884920 (₹1,000 Paid)</strong></span>
                <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold text-[10px]">Verified</span>
              </div>

              {panErrorMsg && (
                <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-300 text-xs text-rose-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Submission Blocked</span>
                  </div>
                  <p>{panErrorMsg}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Enter 6-Digit Aadhaar OTP sent to registered mobile:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={panOtp}
                  onChange={(e) => setPanOtp(e.target.value)}
                  placeholder="e.g. 482910"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono tracking-widest text-center"
                />
                <span className="text-[11px] text-slate-500 block text-center">
                  (In simulator, you can type any 6 digits like 123456)
                </span>
              </div>

              <button
                id="sim-pan-final-submit-btn"
                onClick={handlePanLinkSubmit}
                className="w-full py-3 rounded-xl bg-indigo-800 hover:bg-indigo-900 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Submit Linkage Request to UIDAI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 4: Success Acknowledgement */}
          {panLinkStep === 4 && (
            <div className="space-y-4 pt-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                PAN - Aadhaar Link Request Successfully Submitted!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your request has been sent to UIDAI for demographic verification. Your PAN status will update to 'Operative & Linked' within 48 hours.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-600 max-w-xs mx-auto border">
                Acknowledgement Ref: <strong>ACK-ITD-2026-948102</strong>
              </div>
              <button
                onClick={() => {
                  setPanLinkStep(1);
                  setPanChallanPaid(false);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-800 text-white font-bold text-xs"
              >
                Run Another Link Test
              </button>
            </div>
          )}
        </div>
      )}

      {/* TRACK 3: e-AADHAAR DOWNLOAD & PASSWORD TESTER */}
      {activeSimulation === 'eaadhaar' && (
        <div className={`p-6 rounded-2xl border ${
          isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                myAadhaar e-Aadhaar Simulation
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Download e-Aadhaar & Unlock Encrypted PDF Simulator
              </h3>
            </div>
            <button
              onClick={() => {
                setAdhStep(1);
                setAdhPdfUnlocked(false);
                setAdhPdfPasswordGuess('');
                setAdhPasswordError('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {adhStep === 1 && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name (As registered in Aadhaar):
                  </label>
                  <input
                    type="text"
                    value={adhApplicantName}
                    onChange={(e) => setAdhApplicantName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-medium uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Year of Birth (YYYY):
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={adhBirthYear}
                    onChange={(e) => setAdhBirthYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  12-Digit Aadhaar Number:
                </label>
                <input
                  type="text"
                  value={adhUidInput}
                  onChange={(e) => setAdhUidInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="mask-aadhaar-check"
                  checked={adhMaskedChoice}
                  onChange={(e) => setAdhMaskedChoice(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="mask-aadhaar-check" className="text-xs text-slate-700 cursor-pointer font-medium">
                  Do you want a <strong>Masked Aadhaar</strong>? (Hides first 8 digits as XXXX-XXXX-1234 for privacy)
                </label>
              </div>

              <button
                id="sim-adh-send-otp-btn"
                onClick={() => setAdhStep(2)}
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Send OTP to Registered Mobile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {adhStep === 2 && (
            <div className="space-y-4 pt-4">
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                OTP successfully sent to mobile ending in ••••9842.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 6-Digit OTP:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={adhOtpInput}
                  onChange={(e) => setAdhOtpInput(e.target.value)}
                  placeholder="e.g. 592814"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono tracking-widest text-center"
                />
              </div>

              <button
                id="sim-adh-download-pdf-btn"
                onClick={() => setAdhStep(3)}
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Verify OTP & Download Protected PDF</span>
              </button>
            </div>
          )}

          {/* Step 3: Password Challenge on the PDF */}
          {adhStep === 3 && (
            <div className="space-y-5 pt-4">
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3 max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200">e-Aadhaar_Document.pdf</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                    Password Protected
                  </span>
                </div>

                {!adhPdfUnlocked ? (
                  <div className="space-y-3 py-2">
                    <p className="text-xs text-slate-300">
                      This file is protected by UIDAI standard encryption. Enter the 8-character password to unlock:
                    </p>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">
                        Password (Case Sensitive):
                      </label>
                      <input
                        type="text"
                        value={adhPdfPasswordGuess}
                        onChange={(e) => setAdhPdfPasswordGuess(e.target.value.toUpperCase())}
                        placeholder="e.g. RAME1990"
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-amber-300 font-mono text-sm uppercase tracking-wider text-center font-bold"
                      />
                    </div>

                    {adhPasswordError && (
                      <div className="p-2.5 rounded bg-rose-950/80 border border-rose-700 text-rose-300 text-xs">
                        {adhPasswordError}
                      </div>
                    )}

                    <button
                      id="sim-adh-unlock-pdf-btn"
                      onClick={handleUnlockAadhaarPdf}
                      className="w-full py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Submit Password to Unlock PDF</span>
                    </button>

                    <div className="text-[11px] text-slate-400 text-center pt-1">
                      Formula: <strong>[First 4 Letters of '{adhApplicantName}']</strong> + <strong>['{adhBirthYear}']</strong>
                    </div>
                  </div>
                ) : (
                  /* PDF Unlocked Document Display */
                  <div className="space-y-4 pt-2">
                    <div className="p-2.5 rounded bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-xs font-bold text-center">
                      ✓ Document Unlocked Successfully!
                    </div>

                    {/* Aadhaar Card Simulated Preview */}
                    <div className="p-4 rounded-xl bg-white text-slate-900 space-y-3 border-2 border-emerald-500">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-extrabold text-xs text-blue-900">Government of India - UIDAI</span>
                        <span className="text-[10px] font-bold text-emerald-700">e-Aadhaar</span>
                      </div>
                      <div className="flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <strong className="block text-sm font-extrabold text-slate-900">{adhApplicantName.toUpperCase()}</strong>
                          <span className="text-slate-600 text-[11px] block">DOB: 12/06/{adhBirthYear}</span>
                          <span className="text-slate-600 text-[11px] block">Gender: Male / Female</span>
                        </div>
                        <div className="w-14 h-16 bg-slate-200 rounded border flex items-center justify-center text-[10px] text-slate-500">
                          Photo
                        </div>
                      </div>
                      <div className="p-2 rounded bg-slate-100 text-center font-mono font-extrabold text-sm tracking-wider text-slate-900">
                        {adhMaskedChoice ? "XXXX XXXX 1234" : "5432 9876 1234"}
                      </div>
                    </div>

                    <button
                      onClick={() => setAdhStep(1)}
                      className="w-full py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                    >
                      Practice Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
