"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import Logo_img from "../assets/Logo.png";

// Doctor specialties mapping
const symptomToDoctorMap = {
  // Heart related
  "chest pain": "Cardiologist",
  "heart pain": "Cardiologist",
  "shortness of breath": "Cardiologist",
  palpitations: "Cardiologist",
  "irregular heartbeat": "Cardiologist",

  // Skin related
  rash: "Dermatologist",
  acne: "Dermatologist",
  "skin problem": "Dermatologist",
  itching: "Dermatologist",
  "skin infection": "Dermatologist",

  // Bone/Joint related
  "joint pain": "Orthopedist",
  "back pain": "Orthopedist",
  "bone pain": "Orthopedist",
  fracture: "Orthopedist",
  "muscle pain": "Orthopedist",

  // Eye related
  "eye pain": "Ophthalmologist",
  "vision problem": "Ophthalmologist",
  "blurred vision": "Ophthalmologist",
  "eye infection": "Ophthalmologist",

  // Ear/Nose/Throat
  "sore throat": "ENT Specialist",
  "ear pain": "ENT Specialist",
  "hearing problem": "ENT Specialist",
  "nose bleeding": "ENT Specialist",

  // General symptoms
  fever: "General Physician",
  headache: "General Physician",
  cold: "General Physician",
  cough: "General Physician",
  "stomach pain": "Gastroenterologist",
  nausea: "Gastroenterologist",
  vomiting: "Gastroenterologist",
  diarrhea: "Gastroenterologist",

  // Mental health
  depression: "Psychiatrist",
  anxiety: "Psychiatrist",
  stress: "Psychiatrist",
  "panic attack": "Psychiatrist",

  // Women's health
  "period problem": "Gynecologist",
  pregnancy: "Gynecologist",
  menstrual: "Gynecologist",

  // Children
  "child fever": "Pediatrician",
  baby: "Pediatrician",
  infant: "Pediatrician",
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

  // Function to analyze symptoms and suggest doctor
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

    // Check if input contains medical-related keywords
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
    ];

    const containsMedicalKeyword = medicalKeywords.some((keyword) =>
      input.includes(keyword)
    );

    if (!containsMedicalKeyword) {
      return "I apologize, but I can only help with medical symptoms and doctor recommendations. Please describe any symptoms you're experiencing (like pain, fever, cough, etc.), and I'll suggest the appropriate doctor to consult. For example, you can say 'I have chest pain' or 'I'm feeling dizzy'.";
    }

    // Find matching symptoms (rest of the function remains the same)
    const matchedDoctors = new Set();

    for (const [symptom, doctor] of Object.entries(symptomToDoctorMap)) {
      if (input.includes(symptom.toLowerCase())) {
        matchedDoctors.add(doctor);
      }
    }

    if (matchedDoctors.size > 0) {
      const doctors = Array.from(matchedDoctors);
      if (doctors.length === 1) {
        return `Based on your symptoms, I recommend consulting a **${doctors[0]}**. They specialize in treating conditions related to your symptoms. Please book an appointment for proper diagnosis and treatment.`;
      } else {
        return `Based on your symptoms, you may need to consult one of these specialists: **${doctors.join(
          ", "
        )}**. I recommend starting with a **General Physician** who can examine you and refer you to the appropriate specialist if needed.`;
      }
    } else {
      return "Based on your description, I recommend consulting a **General Physician** first. They can perform an initial examination and refer you to a specialist if needed. If you have specific symptoms like chest pain, skin issues, or joint problems, please mention them for more targeted recommendations.";
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
            {/* <img src={Logo_img} alt="Logo" className="h-8 w-8" /> */}
            <Bot className="h-8 w-8 " />
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
