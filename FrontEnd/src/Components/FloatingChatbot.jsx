"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";

// Comprehensive disease to body part and doctor mapping
const diseaseMapping = {
  // Heart diseases
  "heart attack": { bodyPart: "heart", doctor: "Cardiologist" },
  angina: { bodyPart: "heart", doctor: "Cardiologist" },
  hypertension: { bodyPart: "heart", doctor: "Cardiologist" },
  "high blood pressure": { bodyPart: "heart", doctor: "Cardiologist" },
  "low blood pressure": { bodyPart: "heart", doctor: "Cardiologist" },
  cardiac: { bodyPart: "heart", doctor: "Cardiologist" },
  palpitation: { bodyPart: "heart", doctor: "Cardiologist" },
  arrhythmia: { bodyPart: "heart", doctor: "Cardiologist" },
  "heart failure": { bodyPart: "heart", doctor: "Cardiologist" },
  "coronary artery": { bodyPart: "heart", doctor: "Cardiologist" },

  // Respiratory diseases
  asthma: { bodyPart: "lungs", doctor: "General Physician" },
  pneumonia: { bodyPart: "lungs", doctor: "General Physician" },
  bronchitis: { bodyPart: "lungs", doctor: "General Physician" },
  copd: { bodyPart: "lungs", doctor: "General Physician" },
  tuberculosis: { bodyPart: "lungs", doctor: "General Physician" },
  "lung cancer": { bodyPart: "lungs", doctor: "General Physician" },
  "respiratory infection": { bodyPart: "lungs", doctor: "General Physician" },

  // Skin diseases
  eczema: { bodyPart: "skin", doctor: "Dermatologist" },
  psoriasis: { bodyPart: "skin", doctor: "Dermatologist" },
  acne: { bodyPart: "skin", doctor: "Dermatologist" },
  dermatitis: { bodyPart: "skin", doctor: "Dermatologist" },
  melanoma: { bodyPart: "skin", doctor: "Dermatologist" },
  "skin cancer": { bodyPart: "skin", doctor: "Dermatologist" },
  vitiligo: { bodyPart: "skin", doctor: "Dermatologist" },
  rosacea: { bodyPart: "skin", doctor: "Dermatologist" },
  "fungal infection": { bodyPart: "skin", doctor: "Dermatologist" },
  hives: { bodyPart: "skin", doctor: "Dermatologist" },
  urticaria: { bodyPart: "skin", doctor: "Dermatologist" },

  // Bone/joint diseases
  arthritis: { bodyPart: "joints", doctor: "Orthopedist" },
  osteoarthritis: { bodyPart: "joints", doctor: "Orthopedist" },
  "rheumatoid arthritis": { bodyPart: "joints", doctor: "Orthopedist" },
  rheumatoid: { bodyPart: "joints", doctor: "Orthopedist" },
  fracture: { bodyPart: "bone", doctor: "Orthopedist" },
  osteoporosis: { bodyPart: "bone", doctor: "Orthopedist" },
  scoliosis: { bodyPart: "spine", doctor: "Orthopedist" },
  "herniated disc": { bodyPart: "spine", doctor: "Orthopedist" },
  "slipped disc": { bodyPart: "spine", doctor: "Orthopedist" },
  tendonitis: { bodyPart: "joints", doctor: "Orthopedist" },
  bursitis: { bodyPart: "joints", doctor: "Orthopedist" },
  gout: { bodyPart: "joints", doctor: "Orthopedist" },
  "carpal tunnel": { bodyPart: "wrist", doctor: "Orthopedist" },

  // Eye diseases
  cataract: { bodyPart: "eyes", doctor: "Ophthalmologist" },
  cataracts: { bodyPart: "eyes", doctor: "Ophthalmologist" },
  glaucoma: { bodyPart: "eyes", doctor: "Ophthalmologist" },
  conjunctivitis: { bodyPart: "eyes", doctor: "Ophthalmologist" },
  "pink eye": { bodyPart: "eyes", doctor: "Ophthalmologist" },
  "macular degeneration": { bodyPart: "eyes", doctor: "Ophthalmologist" },
  "diabetic retinopathy": { bodyPart: "eyes", doctor: "Ophthalmologist" },
  stye: { bodyPart: "eyes", doctor: "Ophthalmologist" },
  "dry eyes": { bodyPart: "eyes", doctor: "Ophthalmologist" },

  // Digestive diseases
  gastritis: { bodyPart: "stomach", doctor: "Gastroenterologist" },
  ulcer: { bodyPart: "stomach", doctor: "Gastroenterologist" },
  "peptic ulcer": { bodyPart: "stomach", doctor: "Gastroenterologist" },
  "stomach ulcer": { bodyPart: "stomach", doctor: "Gastroenterologist" },
  ibs: { bodyPart: "intestines", doctor: "Gastroenterologist" },
  "irritable bowel": { bodyPart: "intestines", doctor: "Gastroenterologist" },
  crohn: { bodyPart: "intestines", doctor: "Gastroenterologist" },
  "crohn's disease": { bodyPart: "intestines", doctor: "Gastroenterologist" },
  colitis: { bodyPart: "intestines", doctor: "Gastroenterologist" },
  "ulcerative colitis": {
    bodyPart: "intestines",
    doctor: "Gastroenterologist",
  },
  hepatitis: { bodyPart: "liver", doctor: "Gastroenterologist" },
  cirrhosis: { bodyPart: "liver", doctor: "Gastroenterologist" },
  "fatty liver": { bodyPart: "liver", doctor: "Gastroenterologist" },
  pancreatitis: { bodyPart: "pancreas", doctor: "Gastroenterologist" },
  "gallbladder stones": {
    bodyPart: "gallbladder",
    doctor: "Gastroenterologist",
  },
  gallstones: { bodyPart: "gallbladder", doctor: "Gastroenterologist" },
  gerd: { bodyPart: "stomach", doctor: "Gastroenterologist" },
  "acid reflux": { bodyPart: "stomach", doctor: "Gastroenterologist" },

  // Neurological diseases
  migraine: { bodyPart: "head", doctor: "Neurologist" },
  migraines: { bodyPart: "head", doctor: "Neurologist" },
  epilepsy: { bodyPart: "brain", doctor: "Neurologist" },
  parkinson: { bodyPart: "brain", doctor: "Neurologist" },
  "parkinson's disease": { bodyPart: "brain", doctor: "Neurologist" },
  alzheimer: { bodyPart: "brain", doctor: "Neurologist" },
  "alzheimer's disease": { bodyPart: "brain", doctor: "Neurologist" },
  dementia: { bodyPart: "brain", doctor: "Neurologist" },
  stroke: { bodyPart: "brain", doctor: "Neurologist" },
  "brain tumor": { bodyPart: "brain", doctor: "Neurologist" },
  "multiple sclerosis": { bodyPart: "brain", doctor: "Neurologist" },
  "ms disease": { bodyPart: "brain", doctor: "Neurologist" },
  neuropathy: { bodyPart: "nerves", doctor: "Neurologist" },
  "peripheral neuropathy": { bodyPart: "nerves", doctor: "Neurologist" },
  "bell's palsy": { bodyPart: "face", doctor: "Neurologist" },
  "trigeminal neuralgia": { bodyPart: "face", doctor: "Neurologist" },

  // Urological diseases
  "kidney stone": { bodyPart: "kidney", doctor: "Urologist" },
  "kidney stones": { bodyPart: "kidney", doctor: "Urologist" },
  "kidney disease": { bodyPart: "kidney", doctor: "Urologist" },
  "kidney failure": { bodyPart: "kidney", doctor: "Urologist" },
  uti: { bodyPart: "bladder", doctor: "Urologist" },
  "urinary tract infection": { bodyPart: "bladder", doctor: "Urologist" },
  "bladder infection": { bodyPart: "bladder", doctor: "Urologist" },
  cystitis: { bodyPart: "bladder", doctor: "Urologist" },
  incontinence: { bodyPart: "bladder", doctor: "Urologist" },
  "urinary incontinence": { bodyPart: "bladder", doctor: "Urologist" },
  prostate: { bodyPart: "prostate", doctor: "Urologist" },
  "enlarged prostate": { bodyPart: "prostate", doctor: "Urologist" },
  "prostate cancer": { bodyPart: "prostate", doctor: "Urologist" },
  bph: { bodyPart: "prostate", doctor: "Urologist" },
  "erectile dysfunction": { bodyPart: "reproductive", doctor: "Urologist" },
  "kidney infection": { bodyPart: "kidney", doctor: "Urologist" },

  // ENT diseases
  sinusitis: { bodyPart: "sinus", doctor: "ENT Specialist" },
  "sinus infection": { bodyPart: "sinus", doctor: "ENT Specialist" },
  tonsillitis: { bodyPart: "throat", doctor: "ENT Specialist" },
  "strep throat": { bodyPart: "throat", doctor: "ENT Specialist" },
  "sore throat": { bodyPart: "throat", doctor: "ENT Specialist" },
  otitis: { bodyPart: "ear", doctor: "ENT Specialist" },
  "ear infection": { bodyPart: "ear", doctor: "ENT Specialist" },
  "hearing loss": { bodyPart: "ear", doctor: "ENT Specialist" },
  tinnitus: { bodyPart: "ear", doctor: "ENT Specialist" },
  vertigo: { bodyPart: "ear", doctor: "ENT Specialist" },
  laryngitis: { bodyPart: "throat", doctor: "ENT Specialist" },
  "nasal polyps": { bodyPart: "nose", doctor: "ENT Specialist" },
  "deviated septum": { bodyPart: "nose", doctor: "ENT Specialist" },

  // Mental health diseases
  depression: { bodyPart: "mind", doctor: "Psychiatrist" },
  anxiety: { bodyPart: "mind", doctor: "Psychiatrist" },
  "panic disorder": { bodyPart: "mind", doctor: "Psychiatrist" },
  "panic attacks": { bodyPart: "mind", doctor: "Psychiatrist" },
  bipolar: { bodyPart: "mind", doctor: "Psychiatrist" },
  "bipolar disorder": { bodyPart: "mind", doctor: "Psychiatrist" },
  schizophrenia: { bodyPart: "mind", doctor: "Psychiatrist" },
  ocd: { bodyPart: "mind", doctor: "Psychiatrist" },
  "obsessive compulsive": { bodyPart: "mind", doctor: "Psychiatrist" },
  ptsd: { bodyPart: "mind", doctor: "Psychiatrist" },
  "post traumatic": { bodyPart: "mind", doctor: "Psychiatrist" },
  adhd: { bodyPart: "mind", doctor: "Psychiatrist" },
  autism: { bodyPart: "mind", doctor: "Psychiatrist" },
  insomnia: { bodyPart: "mind", doctor: "Psychiatrist" },
  "eating disorder": { bodyPart: "mind", doctor: "Psychiatrist" },
  anorexia: { bodyPart: "mind", doctor: "Psychiatrist" },
  bulimia: { bodyPart: "mind", doctor: "Psychiatrist" },

  // Women's health diseases
  endometriosis: { bodyPart: "reproductive", doctor: "Gynecologist" },
  fibroids: { bodyPart: "uterus", doctor: "Gynecologist" },
  "uterine fibroids": { bodyPart: "uterus", doctor: "Gynecologist" },
  pcos: { bodyPart: "ovaries", doctor: "Gynecologist" },
  "ovarian cysts": { bodyPart: "ovaries", doctor: "Gynecologist" },
  "breast cancer": { bodyPart: "breast", doctor: "Gynecologist" },
  "cervical cancer": { bodyPart: "cervix", doctor: "Gynecologist" },
  "yeast infection": { bodyPart: "vagina", doctor: "Gynecologist" },
  "bacterial vaginosis": { bodyPart: "vagina", doctor: "Gynecologist" },
  menopause: { bodyPart: "reproductive", doctor: "Gynecologist" },
  "irregular periods": { bodyPart: "reproductive", doctor: "Gynecologist" },

  // General diseases
  diabetes: { bodyPart: "pancreas", doctor: "General Physician" },
  "type 1 diabetes": { bodyPart: "pancreas", doctor: "General Physician" },
  "type 2 diabetes": { bodyPart: "pancreas", doctor: "General Physician" },
  thyroid: { bodyPart: "thyroid", doctor: "General Physician" },
  "thyroid disease": { bodyPart: "thyroid", doctor: "General Physician" },
  hyperthyroid: { bodyPart: "thyroid", doctor: "General Physician" },
  hypothyroid: { bodyPart: "thyroid", doctor: "General Physician" },
  anemia: { bodyPart: "blood", doctor: "General Physician" },
  "high cholesterol": { bodyPart: "blood", doctor: "General Physician" },
  obesity: { bodyPart: "body", doctor: "General Physician" },
  "food poisoning": { bodyPart: "stomach", doctor: "General Physician" },
};

// Body parts to doctor mapping (single doctor per body part)
const bodyPartsMapping = {
  // Head and neurological
  head: "Neurologist",
  brain: "Neurologist",
  mind: "Psychiatrist",
  nerves: "Neurologist",
  face: "Neurologist",

  // Eyes
  eye: "Ophthalmologist",
  eyes: "Ophthalmologist",
  vision: "Ophthalmologist",

  // ENT
  ear: "ENT Specialist",
  ears: "ENT Specialist",
  nose: "ENT Specialist",
  throat: "ENT Specialist",
  sinus: "ENT Specialist",
  voice: "ENT Specialist",

  // Respiratory
  lungs: "General Physician",
  lung: "General Physician",
  chest: "Cardiologist", // Changed to prioritize heart issues for chest
  breathing: "General Physician",
  respiratory: "General Physician",

  // Heart and cardiovascular
  heart: "Cardiologist",
  cardiovascular: "Cardiologist",

  // Digestive system
  stomach: "Gastroenterologist",
  belly: "Gastroenterologist",
  abdomen: "Gastroenterologist",
  liver: "Gastroenterologist",
  intestine: "Gastroenterologist",
  intestines: "Gastroenterologist",
  bowel: "Gastroenterologist",
  pancreas: "Gastroenterologist",
  gallbladder: "Gastroenterologist",

  // Urinary system
  bladder: "Urologist",
  kidney: "Urologist",
  kidneys: "Urologist",
  prostate: "Urologist",
  urinary: "Urologist",

  // Musculoskeletal
  back: "Orthopedist",
  spine: "Orthopedist",
  neck: "Orthopedist",
  shoulder: "Orthopedist",
  shoulders: "Orthopedist",
  arm: "Orthopedist",
  arms: "Orthopedist",
  elbow: "Orthopedist",
  wrist: "Orthopedist",
  hand: "Orthopedist",
  hands: "Orthopedist",
  finger: "Orthopedist",
  fingers: "Orthopedist",
  hip: "Orthopedist",
  hips: "Orthopedist",
  thigh: "Orthopedist",
  knee: "Orthopedist",
  knees: "Orthopedist",
  leg: "Orthopedist",
  legs: "Orthopedist",
  ankle: "Orthopedist",
  foot: "Orthopedist",
  feet: "Orthopedist",
  toe: "Orthopedist",
  toes: "Orthopedist",
  joint: "Orthopedist",
  joints: "Orthopedist",
  bone: "Orthopedist",
  bones: "Orthopedist",
  muscle: "Orthopedist",
  muscles: "Orthopedist",

  // Skin
  skin: "Dermatologist",
  hair: "Dermatologist",
  scalp: "Dermatologist",
  nail: "Dermatologist",
  nails: "Dermatologist",

  // Women's health
  breast: "Gynecologist",
  breasts: "Gynecologist",
  vagina: "Gynecologist",
  uterus: "Gynecologist",
  ovary: "Gynecologist",
  ovaries: "Gynecologist",
  cervix: "Gynecologist",
  reproductive: "Gynecologist",

  // General
  blood: "General Physician",
  thyroid: "General Physician",
  body: "General Physician",
};

// Common symptoms to body parts
const symptomToBodyPart = {
  // Pain symptoms
  headache: "head",
  "head pain": "head",
  migraine: "head",
  "chest pain": "heart", // Changed to prioritize heart for chest pain
  "stomach pain": "stomach",
  "abdominal pain": "abdomen",
  "back pain": "back",
  "neck pain": "neck",
  "knee pain": "knee",
  "foot pain": "foot",
  "joint pain": "joint",

  // Breathing symptoms
  "shortness of breath": "lungs",
  "breathing difficulty": "lungs",
  "breathing problems": "lungs",
  breathless: "lungs",
  wheezing: "lungs",
  "chest tightness": "lungs",

  // Urinary symptoms
  urine: "bladder",
  urinary: "bladder",
  incontinence: "bladder",
  inconsistency: "bladder",
  leaking: "bladder",
  "frequent urination": "bladder",
  "painful urination": "bladder",
  "blood in urine": "bladder",

  // Digestive symptoms
  nausea: "stomach",
  vomiting: "stomach",
  diarrhea: "intestines",
  constipation: "intestines",
  heartburn: "stomach",
  "acid reflux": "stomach",
  bloating: "stomach",

  // Respiratory symptoms
  cough: "lungs",
  "dry cough": "lungs",
  "wet cough": "lungs",
  "persistent cough": "lungs",

  // Skin symptoms
  rash: "skin",
  itching: "skin",
  "burning skin": "skin",
  "dry skin": "skin",
  acne: "skin",
  hives: "skin",

  // Eye symptoms
  "blurred vision": "eyes",
  "eye pain": "eyes",
  "red eyes": "eyes",
  "dry eyes": "eyes",
  "watery eyes": "eyes",

  // Ear symptoms
  "ear pain": "ears",
  "hearing loss": "ears",
  ringing: "ears",
  "ear discharge": "ears",

  // Mental symptoms
  depression: "mind",
  anxiety: "mind",
  stress: "mind",
  "mood swings": "mind",
  insomnia: "mind",
  "panic attacks": "mind",

  // Heart symptoms
  palpitations: "heart",
  "chest pressure": "heart",
  "irregular heartbeat": "heart",
  "heart racing": "heart",

  // General symptoms
  fever: "body",
  fatigue: "body",
  weakness: "body",
  dizziness: "head",
  "weight loss": "body",
  "weight gain": "body",
};

// Common misspellings
const commonMisspellings = {
  urin: "urine",
  inconsistency: "incontinence",
  stomache: "stomach",
  cheast: "chest",
  hart: "heart",
  hed: "head",
  bak: "back",
  nee: "knee",
  fut: "foot",
  painfull: "painful",
  ache: "pain",
  fver: "fever",
  cogh: "cough",
  sweling: "swelling",
  swolen: "swollen",
  brething: "breathing",
  breathng: "breathing",
  difculty: "difficulty",
  problm: "problem",
};

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your medical assistant. Describe your symptoms and I'll suggest the right doctor for you. How can I help?",
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

  // Function to correct common misspellings
  const correctSpelling = (text) => {
    let correctedText = text.toLowerCase();
    Object.entries(commonMisspellings).forEach(([misspelled, correct]) => {
      const regex = new RegExp(`\\b${misspelled}\\b`, "gi");
      correctedText = correctedText.replace(regex, correct);
    });
    return correctedText;
  };

  // Enhanced function to analyze symptoms and suggest ONE doctor only
  const analyzeSymptomsAndSuggestDoctor = (userInput) => {
    let input = userInput.toLowerCase().trim();
    input = correctSpelling(input);

    // Handle greetings (but exclude medical terms)
    const greetings = [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
    ];
    const medicalTermsInGreeting = [
      "pain",
      "ache",
      "problem",
      "symptom",
      "breathing",
      "chest",
      "heart",
      "stomach",
    ];
    const isGreeting = greetings.some((greeting) => input.includes(greeting));
    const hasMedicalTerm = medicalTermsInGreeting.some((term) =>
      input.includes(term)
    );

    if (isGreeting && !hasMedicalTerm) {
      return "Hello! I'm here to help you find the right doctor. Just tell me your symptoms like 'chest pain', 'headache', 'skin rash', or 'breathing problems' and I'll recommend the best specialist for you.";
    }

    // Handle capability questions
    const capabilityQuestions = [
      "what can you do",
      "how can you help",
      "what do you do",
      "help me",
      "capabilities",
    ];
    if (capabilityQuestions.some((question) => input.includes(question))) {
      return "I can help you find the right doctor based on your symptoms! Just describe what you're feeling - like pain, discomfort, or any health issues. I'll analyze your symptoms and recommend the most suitable specialist. Try saying things like 'stomach pain', 'blurred vision', or 'joint stiffness'.";
    }

    // Handle thank you
    const thankYou = ["thank you", "thanks", "thank u", "thx"];
    if (thankYou.some((thanks) => input.includes(thanks))) {
      return "You're welcome! Take care and get well soon. Feel free to ask if you have more symptoms to discuss!";
    }

    // Handle goodbye
    const goodbyes = ["bye", "goodbye", "see you"];
    if (goodbyes.some((goodbye) => input.includes(goodbye))) {
      return "Goodbye! Remember to book an appointment with the recommended doctor. Stay healthy!";
    }

    // Check for medical keywords
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
      "bleeding",
      "swelling",
      "rash",
      "headache",
      "nausea",
      "vomiting",
      "diarrhea",
      "fatigue",
      "dizzy",
      "chest",
      "stomach",
      "back",
      "skin",
      "eye",
      "ear",
      "throat",
      "heart",
      "burning",
      "itching",
      "sore",
      "stiff",
      "cramp",
      "discharge",
      "allergy",
      "swollen",
      "urine",
      "bladder",
      "breathing",
      "breath",
      "shortness",
      "difficulty",
      "breathless",
      "wheezing",
      "asthma",
      "pneumonia",
      "bronchitis",
    ];

    const hasMedicalKeyword = medicalKeywords.some((keyword) =>
      input.includes(keyword)
    );
    if (!hasMedicalKeyword) {
      return "Please describe your symptoms clearly. For example: 'chest pain', 'headache', 'skin rash', 'breathing problems'. Check your spelling and try again.";
    }

    // Step 1: Check for diseases first (highest priority) - RETURNS IMMEDIATELY
    for (const [disease, info] of Object.entries(diseaseMapping)) {
      if (input.includes(disease)) {
        return `Based on your symptoms related to **${disease}**, I recommend consulting a **${info.doctor}**. Please book an appointment for proper diagnosis.`;
      }
    }

    // Step 2: Check symptoms and map to body parts - RETURNS IMMEDIATELY
    for (const [symptom, bodyPart] of Object.entries(symptomToBodyPart)) {
      if (input.includes(symptom)) {
        const doctor = bodyPartsMapping[bodyPart];
        if (doctor) {
          return `Based on your **${symptom}** symptoms, I recommend consulting a **${doctor}**. Please book an appointment for proper care.`;
        }
      }
    }

    // Step 3: Check for direct body parts - RETURNS IMMEDIATELY
    for (const [bodyPart, doctor] of Object.entries(bodyPartsMapping)) {
      if (input.includes(bodyPart)) {
        return `For **${bodyPart}**-related symptoms, I recommend consulting a **${doctor}**. Please book an appointment for evaluation.`;
      }
    }

    // Step 4: Single keyword-based detection - RETURNS IMMEDIATELY when found
    // Breathing/Respiratory related (high priority)
    if (
      input.includes("breathing") ||
      input.includes("breath") ||
      input.includes("shortness") ||
      input.includes("breathless") ||
      input.includes("wheezing") ||
      input.includes("asthma") ||
      input.includes("pneumonia") ||
      input.includes("bronchitis") ||
      input.includes("lung") ||
      input.includes("respiratory")
    ) {
      return `Based on your symptoms, I recommend consulting a **General Physician**. They are the best specialist for respiratory conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Heart/Chest related
    if (
      input.includes("chest") ||
      input.includes("heart") ||
      input.includes("cardiac") ||
      input.includes("palpitation")
    ) {
      return `Based on your symptoms, I recommend consulting a **Cardiologist**. They are the best specialist for heart and chest conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Skin related
    if (
      input.includes("skin") ||
      input.includes("rash") ||
      input.includes("itch") ||
      input.includes("acne")
    ) {
      return `Based on your symptoms, I recommend consulting a **Dermatologist**. They are the best specialist for skin conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Bone/Joint related
    if (
      input.includes("joint") ||
      input.includes("bone") ||
      input.includes("muscle") ||
      input.includes("arthritis")
    ) {
      return `Based on your symptoms, I recommend consulting an **Orthopedist**. They are the best specialist for bone and joint conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Eye related
    if (
      input.includes("eye") ||
      input.includes("vision") ||
      input.includes("sight")
    ) {
      return `Based on your symptoms, I recommend consulting an **Ophthalmologist**. They are the best specialist for eye conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // ENT related
    if (
      input.includes("ear") ||
      input.includes("nose") ||
      input.includes("throat") ||
      input.includes("sinus")
    ) {
      return `Based on your symptoms, I recommend consulting an **ENT Specialist**. They are the best specialist for ear, nose, and throat conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Digestive related
    if (
      input.includes("stomach") ||
      input.includes("nausea") ||
      input.includes("vomit") ||
      input.includes("diarrhea")
    ) {
      return `Based on your symptoms, I recommend consulting a **Gastroenterologist**. They are the best specialist for digestive conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Neurological related
    if (
      input.includes("headache") ||
      input.includes("migraine") ||
      input.includes("dizzy") ||
      input.includes("seizure")
    ) {
      return `Based on your symptoms, I recommend consulting a **Neurologist**. They are the best specialist for neurological conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Mental health related
    if (
      input.includes("depression") ||
      input.includes("anxiety") ||
      input.includes("stress") ||
      input.includes("mood")
    ) {
      return `Based on your symptoms, I recommend consulting a **Psychiatrist**. They are the best specialist for mental health conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Urological related
    if (
      input.includes("urine") ||
      input.includes("bladder") ||
      input.includes("kidney") ||
      input.includes("incontinence")
    ) {
      return `Based on your symptoms, I recommend consulting a **Urologist**. They are the best specialist for urinary conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Women's health related
    if (
      input.includes("period") ||
      input.includes("breast") ||
      input.includes("pregnancy") ||
      input.includes("vaginal")
    ) {
      return `Based on your symptoms, I recommend consulting a **Gynecologist**. They are the best specialist for women's health conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // General symptoms
    if (
      input.includes("fever") ||
      input.includes("cough") ||
      input.includes("fatigue") ||
      input.includes("tired")
    ) {
      return `Based on your symptoms, I recommend consulting a **General Physician**. They are the best specialist for general health conditions. Please book an appointment for proper diagnosis and treatment.`;
    }

    // Fallback - always returns ONE doctor
    return "I couldn't identify your specific symptoms. Please describe them more clearly (like 'chest pain', 'headache', 'breathing problems'). For general health concerns, I recommend consulting a **General Physician**.";
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

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
    }, 1000);
  };

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
                Tell me your symptoms for doctor recommendations
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingChatbot;
