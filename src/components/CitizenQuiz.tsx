import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  FileCheck2,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizData';

interface CitizenQuizProps {
  language: Language;
  isHighContrast: boolean;
}

export const CitizenQuiz: React.FC<CitizenQuizProps> = ({ isHighContrast }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [citizenName, setCitizenName] = useState('Rahul Sharma');

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // safe fallback
      }
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isHighContrast 
          ? 'bg-neutral-950 border-yellow-400 text-yellow-300' 
          : 'bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white border-amber-700 shadow-md'
      }`}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Awareness & Safety Check</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Digital Citizen Literacy & Safety Quiz
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl">
            Test your understanding of digital IDs, e-Aadhaar passwords, DigiLocker validity, and how to protect yourself from common cyber scams.
          </p>
        </div>
      </div>

      {!isCompleted ? (
        /* Active Quiz Card */
        <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 max-w-3xl mx-auto ${
          isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Current Score: <strong className="text-emerald-700">{score}</strong></span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = isAnswerSubmitted && idx === currentQ.correctAnswer;
              const isWrong = isAnswerSubmitted && isSelected && idx !== currentQ.correctAnswer;

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                      : isWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                        : isSelected
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isWrong && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Submit */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl text-xs space-y-1 ${
              selectedOption === currentQ.correctAnswer 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' 
                : 'bg-rose-50 border border-rose-200 text-rose-950'
            }`}>
              <strong className="block font-bold">
                {selectedOption === currentQ.correctAnswer ? "✓ Correct!" : "✗ Incorrect."}
              </strong>
              <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Select an option and click Submit Answer
            </span>

            {!isAnswerSubmitted ? (
              <button
                id="quiz-submit-answer-btn"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition disabled:opacity-40 disabled:pointer-events-none"
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="quiz-next-question-btn"
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "View Results & Certificate"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed & Certificate Generator */
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className={`p-6 sm:p-8 rounded-2xl border text-center space-y-4 ${
            isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Quiz Completed!
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                You scored <strong className="text-emerald-700 text-base">{score} / {QUIZ_QUESTIONS.length}</strong> on the Digital Citizen Awareness Assessment.
              </p>
            </div>

            <div className="max-w-xs mx-auto text-left space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Name on Certificate:
              </label>
              <input
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="print-certificate-btn"
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Badge</span>
              </button>
              <button
                onClick={handleResetQuiz}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Official Printable Certificate Layout */}
          <div className="p-8 rounded-2xl border-4 border-double border-amber-600/40 bg-gradient-to-b from-amber-50/40 to-white text-slate-900 shadow-md text-center space-y-4 relative overflow-hidden">
            {/* Top Emblem */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="text-left">
                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">National Initiative</span>
                <strong className="text-xs font-bold text-slate-900">Digital India Citizen Literacy</strong>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-black text-[10px]">
                GOI
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500">ID: CERT-2026-{Math.floor(1000 + Math.random()*9000)}</span>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block">Certificate of Completion</span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                Digital Citizen Safety & Identity Awareness
              </h4>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              This is to certify that
            </p>

            <div className="py-1">
              <span className="text-xl sm:text-2xl font-extrabold text-blue-950 border-b-2 border-amber-400 px-6 py-1 inline-block">
                {citizenName.toUpperCase() || "RAHUL SHARMA"}
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              has demonstrated comprehensive proficiency in operating DigiLocker digital wallets, e-Aadhaar encryption protocols, PAN-Aadhaar compliance regulations, and cyber safety vigilance.
            </p>

            <div className="pt-6 border-t border-amber-200 flex items-center justify-between text-[11px] text-slate-500">
              <div className="text-left">
                <span className="block font-bold text-slate-800">Date of Award:</span>
                <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Awareness Holder</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
