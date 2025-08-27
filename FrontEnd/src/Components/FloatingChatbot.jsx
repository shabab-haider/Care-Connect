"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";

// Enhanced symptom to doctor mapping with more comprehensive coverage
const symptomToDoctorMap = {
  // Cardiovascular/Heart related - Cardiologist
  "chest pain": "Cardiologist",
  "heart pain": "Cardiologist",
  "shortness of breath": "Cardiologist",
  "breathing difficulty": "Cardiologist",
  palpitations: "Cardiologist",
  "irregular heartbeat": "Cardiologist",
  "heart pounding": "Cardiologist",
  "chest tightness": "Cardiologist",
  "chest pressure": "Cardiologist",
  "heart racing": "Cardiologist",
  cardiac: "Cardiologist",
  hypertension: "Cardiologist",
  "high blood pressure": "Cardiologist",
  "low blood pressure": "Cardiologist",

  // Dermatology/Skin related - Dermatologist
  rash: "Dermatologist",
  acne: "Dermatologist",
  pimples: "Dermatologist",
  "skin problem": "Dermatologist",
  "skin issue": "Dermatologist",
  itching: "Dermatologist",
  "skin infection": "Dermatologist",
  eczema: "Dermatologist",
  psoriasis: "Dermatologist",
  "skin allergy": "Dermatologist",
  hives: "Dermatologist",
  moles: "Dermatologist",
  "skin cancer": "Dermatologist",
  wrinkles: "Dermatologist",
  "dark spots": "Dermatologist",
  "skin discoloration": "Dermatologist",

  // Orthopedic/Bone/Joint related - Orthopedist
  "joint pain": "Orthopedist",
  "back pain": "Orthopedist",
  "bone pain": "Orthopedist",
  fracture: "Orthopedist",
  "broken bone": "Orthopedist",
  "muscle pain": "Orthopedist",
  "knee pain": "Orthopedist",
  "shoulder pain": "Orthopedist",
  "hip pain": "Orthopedist",
  "ankle pain": "Orthopedist",
  "wrist pain": "Orthopedist",
  "neck pain": "Orthopedist",
  "spine pain": "Orthopedist",
  arthritis: "Orthopedist",
  sprain: "Orthopedist",
  strain: "Orthopedist",
  "sports injury": "Orthopedist",

  // Ophthalmology/Eye related - Ophthalmologist
  "eye pain": "Ophthalmologist",
  "vision problem": "Ophthalmologist",
  "blurred vision": "Ophthalmologist",
  "eye infection": "Ophthalmologist",
  "red eyes": "Ophthalmologist",
  "dry eyes": "Ophthalmologist",
  "watery eyes": "Ophthalmologist",
  "eye discharge": "Ophthalmologist",
  "double vision": "Ophthalmologist",
  "night blindness": "Ophthalmologist",
  cataracts: "Ophthalmologist",
  glaucoma: "Ophthalmologist",
  "eye strain": "Ophthalmologist",

  // ENT/Ear/Nose/Throat - ENT Specialist
  "sore throat": "ENT Specialist",
  "throat pain": "ENT Specialist",
  "ear pain": "ENT Specialist",
  earache: "ENT Specialist",
  "hearing problem": "ENT Specialist",
  "hearing loss": "ENT Specialist",
  "nose bleeding": "ENT Specialist",
  nosebleed: "ENT Specialist",
  sinus: "ENT Specialist",
  sinusitis: "ENT Specialist",
  tonsillitis: "ENT Specialist",
  "voice hoarse": "ENT Specialist",
  "voice loss": "ENT Specialist",
  "ear infection": "ENT Specialist",
  "runny nose": "ENT Specialist",
  "stuffy nose": "ENT Specialist",
  snoring: "ENT Specialist",

  // Gastroenterology/Digestive - Gastroenterologist
  "stomach pain": "Gastroenterologist",
  "abdominal pain": "Gastroenterologist",
  "belly pain": "Gastroenterologist",
  nausea: "Gastroenterologist",
  vomiting: "Gastroenterologist",
  diarrhea: "Gastroenterologist",
  constipation: "Gastroenterologist",
  heartburn: "Gastroenterologist",
  "acid reflux": "Gastroenterologist",
  indigestion: "Gastroenterologist",
  bloating: "Gastroenterologist",
  gas: "Gastroenterologist",
  ulcer: "Gastroenterologist",
  "liver pain": "Gastroenterologist",
  gallbladder: "Gastroenterologist",

  // Neurology/Neurological - Neurologist
  headache: "Neurologist",
  migraine: "Neurologist",
  dizziness: "Neurologist",
  seizure: "Neurologist",
  numbness: "Neurologist",
  tingling: "Neurologist",
  "memory loss": "Neurologist",
  confusion: "Neurologist",
  tremor: "Neurologist",
  weakness: "Neurologist",
  paralysis: "Neurologist",
  stroke: "Neurologist",

  // Psychiatry/Mental health - Psychiatrist
  depression: "Psychiatrist",
  anxiety: "Psychiatrist",
  stress: "Psychiatrist",
  "panic attack": "Psychiatrist",
  "mood swings": "Psychiatrist",
  insomnia: "Psychiatrist",
  "sleep problems": "Psychiatrist",
  bipolar: "Psychiatrist",
  schizophrenia: "Psychiatrist",
  ptsd: "Psychiatrist",
  ocd: "Psychiatrist",

  // Gynecology/Women's health - Gynecologist
  "period problem": "Gynecologist",
  menstrual: "Gynecologist",
  pregnancy: "Gynecologist",
  "pelvic pain": "Gynecologist",
  "vaginal discharge": "Gynecologist",
  "breast pain": "Gynecologist",
  ovarian: "Gynecologist",
  uterine: "Gynecologist",
  menopause: "Gynecologist",

  // Pediatrics/Children - Pediatrician
  "child fever": "Pediatrician",
  baby: "Pediatrician",
  infant: "Pediatrician",
  toddler: "Pediatrician",
  "child cough": "Pediatrician",
  "child cold": "Pediatrician",
  vaccination: "Pediatrician",

  // Urology - Urologist
  "kidney pain": "Urologist",
  "kidney stone": "Urologist",
  urinary: "Urologist",
  bladder: "Urologist",
  prostate: "Urologist",
  "blood in urine": "Urologist",

  // Endocrinology - Endocrinologist
  diabetes: "Endocrinologist",
  thyroid: "Endocrinologist",
  hormone: "Endocrinologist",
  "weight gain": "Endocrinologist",
  "weight loss": "Endocrinologist",

  // General symptoms that could indicate multiple specialties
  fever: "General Physician",
  cold: "General Physician",
  cough: "General Physician",
  fatigue: "General Physician",
  tired: "General Physician",
  weakness: "General Physician",
  "body ache": "General Physician",
  flu: "General Physician",
  infection: "General Physician",
};

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your medical assistant. Please describe your symptoms and I'll suggest which doctor you should consult. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enhanced function to analyze symptoms and suggest doctor
  const analyzeSymptomsAndSuggestDoctor = (userInput) => {
    const input = userInput.toLowerCase().trim();

    // Handle greetings first
    const greetings = [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "greetings",
    ];
    const isGreeting = greetings.some((greeting) => input.includes(greeting));

    if (isGreeting) {
      return "Hello! Welcome to Care Connect. I'm here to help you find the right doctor based on your symptoms. Please describe any symptoms you're experiencing, and I'll suggest which specialist you should consult.";
    }

    // Handle thank you messages
    const thankYouWords = ["thank you", "thanks", "thank u", "thx"];
    const isThankYou = thankYouWords.some((thanks) => input.includes(thanks));

    if (isThankYou) {
      return "You're welcome! I'm glad I could help. If you have any other symptoms or health concerns, feel free to ask. Take care and get well soon!";
    }

    // Handle goodbye messages
    const goodbyes = ["bye", "goodbye", "see you", "take care"];
    const isGoodbye = goodbyes.some((goodbye) => input.includes(goodbye));

    if (isGoodbye) {
      return "Goodbye! Take care of your health. Remember to book an appointment with the recommended doctor. Feel free to come back anytime if you need medical guidance!";
    }

    // Enhanced medical keyword detection
    const medicalKeywords = [
      "pain",
      "ache",
      "hurt",
      "sick",
      "fever",
      "cough",
      "problem",
      "infection",
      "symptom",
      "feel",
      "doctor",
      "treatment",
      "medicine",
      "health",
      "disease",
      "illness",
      "condition",
      "bleeding",
      "swelling",
      "rash",
      "headache",
      "nausea",
      "vomiting",
      "diarrhea",
      "constipation",
      "fatigue",
      "tired",
      "weakness",
      "dizzy",
      "shortness",
      "breath",
      "chest",
      "stomach",
      "back",
      "joint",
      "muscle",
      "bone",
      "skin",
      "eye",
      "ear",
      "nose",
      "throat",
      "heart",
      "burning",
      "itching",
      "sore",
      "tender",
      "stiff",
      "cramp",
      "spasm",
      "discharge",
      "redness",
      "inflammation",
      "allergy",
      "reaction",
    ];

    const containsMedicalKeyword = medicalKeywords.some((keyword) =>
      input.includes(keyword)
    );

    if (!containsMedicalKeyword) {
      return "I apologize, but I can only help with medical symptoms and doctor recommendations. Please describe any symptoms you're experiencing (like pain, fever, cough, etc.), and I'll suggest the appropriate doctor to consult. For example, you can say 'I have chest pain' or 'I'm feeling dizzy'.";
    }

    // Enhanced symptom matching with scoring system
    const matchedDoctors = new Map();

    // Check for exact matches and partial matches
    for (const [symptom, doctor] of Object.entries(symptomToDoctorMap)) {
      if (input.includes(symptom.toLowerCase())) {
        const currentScore = matchedDoctors.get(doctor) || 0;
        // Give higher score for longer/more specific symptom matches
        const score = currentScore + symptom.length;
        matchedDoctors.set(doctor, score);
      }
    }

    // Also check for individual words that might indicate specific conditions
    const words = input.split(/\s+/);
    for (const word of words) {
      for (const [symptom, doctor] of Object.entries(symptomToDoctorMap)) {
        if (symptom.toLowerCase().includes(word) && word.length > 3) {
          const currentScore = matchedDoctors.get(doctor) || 0;
          matchedDoctors.set(doctor, currentScore + 1);
        }
      }
    }

    if (matchedDoctors.size > 0) {
      // Sort doctors by score (highest first)
      const sortedDoctors = Array.from(matchedDoctors.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([doctor]) => doctor);

      if (sortedDoctors.length === 1) {
        return `Based on your symptoms, I recommend consulting a **${sortedDoctors[0]}**. They specialize in treating conditions related to your symptoms. Please book an appointment for proper diagnosis and treatment.`;
      } else if (sortedDoctors.length <= 3) {
        return `Based on your symptoms, you may need to consult one of these specialists: **${sortedDoctors.join(
          ", "
        )}**. I recommend starting with a **${
          sortedDoctors[0]
        }** as they seem most relevant to your symptoms, but they can refer you to another specialist if needed.`;
      } else {
        // If too many matches, show top 3
        const topDoctors = sortedDoctors.slice(0, 3);
        return `Based on your symptoms, the most relevant specialists would be: **${topDoctors.join(
          ", "
        )}**. I recommend starting with a **${
          topDoctors[0]
        }** for initial evaluation.`;
      }
    } else {
      // Enhanced fallback with more specific guidance
      const commonConditions = {
        general: ["tired", "weak", "unwell", "sick", "not feeling well"],
        respiratory: ["breathing", "breath", "lung", "respiratory"],
        digestive: ["eating", "food", "meal", "digest"],
        mental: ["mood", "feeling", "emotional", "mental"],
      };

      for (const [category, keywords] of Object.entries(commonConditions)) {
        if (keywords.some((keyword) => input.includes(keyword))) {
          switch (category) {
            case "respiratory":
              return "For breathing-related concerns, I recommend consulting a **Pulmonologist** or starting with a **General Physician** who can evaluate your respiratory symptoms and provide appropriate referrals.";
            case "digestive":
              return "For digestive or stomach-related issues, I recommend consulting a **Gastroenterologist** or starting with a **General Physician** for initial evaluation.";
            case "mental":
              return "For mental health or emotional concerns, I recommend consulting a **Psychiatrist** or **Psychologist**. You can also start with a **General Physician** who can provide initial support and referrals.";
            default:
              break;
          }
        }
      }

      return "Based on your description, I recommend starting with a **General Physician** for initial evaluation. They can examine you thoroughly and refer you to the appropriate specialist if needed. If you can provide more specific symptoms (like location of pain, type of discomfort, etc.), I can give you a more targeted recommendation.";
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = analyzeSymptomsAndSuggestDoctor(inputText);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <Bot className="h-8 w-8" />
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">Medical Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                      )}
                      {message.sender === "user" && (
                        <User className="h-4 w-4 mt-0.5 text-white" />
                      )}
                      <div className="text-sm">
                        {message.text
                          .split("**")
                          .map((part, index) =>
                            index % 2 === 1 ? (
                              <strong key={index}>{part}</strong>
                            ) : (
                              <span key={index}>{part}</span>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your symptoms..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Describe your symptoms for doctor recommendations
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingChatbot;
