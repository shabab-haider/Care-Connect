import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Body parts and associated specialists
const bodyPartsDatabase = {
  // Head region
  head: ["Neurologist", "ENT Specialist"],
  brain: ["Neurologist"],
  eye: ["Ophthalmologist"],
  ear: ["ENT Specialist", "Audiologist"],
  nose: ["ENT Specialist", "Allergist"],
  throat: ["ENT Specialist", "Gastroenterologist"],
  mouth: ["Dentist", "ENT Specialist"],
  jaw: ["Dentist", "Maxillofacial Surgeon"],

  // Chest region
  chest: ["Cardiologist", "Pulmonologist"],
  heart: ["Cardiologist"],
  lung: ["Pulmonologist"],
  breast: ["Gynecologist", "Oncologist"],

  // Abdominal region
  abdomen: ["Gastroenterologist"],
  stomach: ["Gastroenterologist"],
  intestine: ["Gastroenterologist"],
  liver: ["Hepatologist", "Gastroenterologist"],
  kidney: ["Nephrologist", "Urologist"],
  bladder: ["Urologist"],

  // Back region
  back: ["Orthopedist", "Neurologist"],
  spine: ["Orthopedist", "Neurologist"],

  // Limbs
  arm: ["Orthopedist"],
  hand: ["Orthopedist", "Rheumatologist"],
  leg: ["Orthopedist"],
  foot: ["Podiatrist", "Orthopedist"],
  joint: ["Rheumatologist", "Orthopedist"],
  muscle: ["Orthopedist", "Rheumatologist"],

  // Skin
  skin: ["Dermatologist"],

  // Mental health
  mental: ["Psychiatrist", "Psychologist"],

  // General
  general: ["General Practitioner"],

  // Common symptoms and conditions
  fever: ["General Practitioner", "Infectious Disease Specialist"],
  cough: ["Pulmonologist", "ENT Specialist", "General Practitioner"],
  headache: ["Neurologist", "General Practitioner"],
  pain: ["General Practitioner", "Pain Management Specialist"],
  fatigue: ["General Practitioner", "Endocrinologist"],
  nausea: ["Gastroenterologist", "General Practitioner"],
  dizziness: ["Neurologist", "ENT Specialist", "General Practitioner"],
  rash: ["Dermatologist", "Allergist"],
  infection: ["Infectious Disease Specialist", "General Practitioner"],
  allergy: ["Allergist", "Immunologist"],
  cold: ["General Practitioner", "ENT Specialist"],
  flu: ["General Practitioner", "Infectious Disease Specialist"],
  diabetes: ["Endocrinologist", "General Practitioner"],
  hypertension: ["Cardiologist", "General Practitioner"],
  asthma: ["Pulmonologist", "Allergist"],
  arthritis: ["Rheumatologist", "Orthopedist"],
  depression: ["Psychiatrist", "Psychologist"],
  anxiety: ["Psychiatrist", "Psychologist"],
  insomnia: ["Sleep Specialist", "Psychiatrist"],
};

// Common symptoms by body region
const bodyRegions = [
  {
    name: "Head & Neck",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 10c3.2 0 6 2.5 6 7 0 1.3-.3 2.6-.8 3.8" />
        <path d="M8 10c-3.2 0-6 2.5-6 7 0 1.3.3 2.6.8 3.8" />
        <path d="M12 19c0-1.7 1.3-3 3-3h1" />
        <path d="M9 19c0-1.7-1.3-3-3-3H5" />
        <path d="M12 19v-9" />
        <path d="M8 15h8" />
        <path d="M2 9.5V9a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v.5" />
        <path d="M18 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M6 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M11 5h2" />
      </svg>
    ),
    parts: [
      {
        name: "Head",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 21v-2a4 4 0 0 1 4-4h.5" />
            <path d="M17.5 15H18a4 4 0 0 1 4 4v2" />
            <path d="M7 8v2" />
            <path d="M17 8v2" />
            <path d="M12 17v-2" />
            <path d="M8 15h8" />
            <path d="M12 4C8.5 4 7 2.5 7 2h10s-1.5 2-5 2Z" />
            <path d="M19 9V6.5a3.5 3.5 0 0 0-7 0v0a3.5 3.5 0 0 0-7 0V9" />
            <path d="M12 18a4 4 0 0 0 4-4" />
            <path d="M8 14a4 4 0 0 0 4 4" />
          </svg>
        ),
      },
      {
        name: "Eye",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
            <path d="M10 9a1 1 1 0 1 1-1" />
          </svg>
        ),
      },
      {
        name: "Ear",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
            <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
            <path d="M10 13.5a2 2 0 0 1 4 0" />
          </svg>
        ),
      },
      {
        name: "Nose",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22a8 8 0 0 0 8-8" />
            <path d="M12 22a8 8 0 0 1-8-8" />
            <path d="M12 22V8" />
            <path d="M8.5 10c.2-1 .7-2 1.5-3" />
            <path d="M15.5 10c-.2-1-.7-2-1.5-3" />
            <path d="M10 11.5c.5.5 1.5.5 2 0" />
            <path d="M10 17c1 1 3 1 4 0" />
          </svg>
        ),
      },
      {
        name: "Mouth",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10h10" />
            <path d="M7 14h10" />
            <path d="M7 7.5c3 .667 5 .667 10 0" />
            <path d="M7 16.5c3 .667 5 .667 10 0" />
            <path d="M3.5 10v4c0 5 3.5 8 8.5 8s8.5-3 8.5-8v-4" />
            <path d="M2 10V7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v3" />
          </svg>
        ),
      },
      {
        name: "Throat",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 8v13" />
            <path d="M14 8v13" />
            <path d="M8 18h8" />
            <path d="M7 14h10" />
            <path d="M10 3c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
            <path d="M14 3H8" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Chest",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6h8" />
        <path d="M8 18h8" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <path d="M18 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6z" />
        <path d="M12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
      </svg>
    ),
    parts: [
      {
        name: "Chest",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 6h8" />
            <path d="M8 18h8" />
            <path d="M3 12h3" />
            <path d="M18 12h3" />
            <path d="M18 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6z" />
            <path d="M12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
          </svg>
        ),
      },
      {
        name: "Heart",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
            <path d="m18 15-2-2" />
            <path d="m15 18-2-2" />
          </svg>
        ),
      },
      {
        name: "Lung",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3a2 2 0 0 1 2 2v5.5c0 .94-.5 1.8-1.29 2.29l-1.9 1.21c-.32.2-.51.55-.51.93V17a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2.07c0-.38-.19-.74-.51-.93l-1.9-1.21A2.5 2.5 0 0 1 14 10.5V5a2 2 0 0 1 2-2" />
            <path d="M12 3v18" />
            <path d="M9 12.83v2.67a4 4 0 0 1-8 0v-2.67A2.83 2.83 0 0 1 3.83 10H5a3 3 0 0 0 3-3V4" />
            <path d="M15 12.83v2.67a4 4 0 0 0 8 0v-2.67A2.83 2.83 0 0 0 20.17 10H19a3 3 0 0 1-3-3V4" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Abdomen",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 11c0 2 1 3 3 3s3-1 3-3 1-3 3-3 3 1 3 3" />
        <path d="M15 2c-1.35.14-2.64.67-3.75 1.5C10.14 2.67 8.85 2.14 7.5 2" />
        <path d="M2 13c1.35.14 2.64.67 3.75 1.5.36-.33.74-.6-1.13-.82" />
        <path d="M22 13c-1.35.14-2.64.67-3.75 1.5-.36-.33-.74-.6-1.13-.82" />
        <path d="M15 22c-1.35-.14-2.64-.67-3.75-1.5-1.11.83-2.4 1.36-3.75 1.5" />
        <path d="M12 7v5" />
        <path d="M10 9h4" />
      </svg>
    ),
    parts: [
      {
        name: "Stomach",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 14c.67 0 1.33.33 2 1s1 1.67 1 3c0 .67-.17 1.5-.5 2.5-.33 1-1 1.83-2 2.5-1 .67-2.17 1-3.5 1-1.33 0-2.5-.33-3.5-1s-1.67-1.5-2-2.5c-.33-1-.5-1.83-.5-2.5 0-1.33.33-2.33 1-3s1.33-1 2-1" />
            <path d="M16 14c-.67-1.33-1.67-2-3-2s-2.33.67-3 2" />
            <path d="M13 12V4a2 2 0 0 1 2-2" />
            <path d="M11 12V4a2 2 0 0 0-2-2" />
          </svg>
        ),
      },
      {
        name: "Intestine",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 9c0-1 .6-4 4-4a6 6 0 0 1 6 6v10c0 1-.6 2-2 2H7c-1.4 0-2-1-2-2v-4" />
            <path d="M5 5c0-1 .6-2 2-2h10c1.4 0 2 1 2 2v3c0 1-.6 2-2 2H7c-1.4 0-2-1-2-2V5Z" />
            <path d="M5 9c0-1 .6-4 4-4a6 6 0 0 1 6 6v10c0 1-.6 2-2 2H7c-1.4 0-2-1-2-2v-4" />
            <path d="M5 5c0-1 .6-2 2-2h10c1.4 0 2 1 2 2v3c0 1-.6 2-2 2H7c-1.4 0-2-1-2-2V5Z" />
            <path d="M5 14h4" />
            <path d="M9 14h4" />
            <path d="M13 14h2" />
            <path d="M17 14h2" />
            <path d="M5 18h2" />
            <path d="M7 18h4" />
            <path d="M11 18h4" />
          </svg>
        ),
      },
      {
        name: "Liver",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 22H9a2 2 0 0 1-2-2v-7.4a2 2 0 0 1 .6-1.4l.7-.7a2 2 0 0 0 .6-1.4V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4.1a2 2 0 0 0 .6 1.4l.7.7a2 2 0 0 1 .6 1.4V20a2 2 0 0 1-2 2z" />
            <path d="M12 17v-5" />
            <path d="M8 15h8" />
            <path d="M8 19h8" />
            <path d="M8 11h8" />
            <path d="M8 7h8" />
          </svg>
        ),
      },
      {
        name: "Kidney",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 7.1A5.82 5.82 0 0 0 6 12a5.82 5.82 0 0 0 2 4.9C9.2 18.3 10.6 19 12 19s2.8-.7 4-2.1a5.82 5.82 0 0 0 2-4.9 5.82 5.82 0 0 0-2-4.9C14.8 5.7 13.4 5 12 5s-2.8.7-4 2.1z" />
            <path d="M12 5v14" />
            <path d="M5 12h14" />
            <path d="M14.5 7.5a4 4 0 0 0-5 0" />
            <path d="M14.5 16.5a4 4 0 0 1-5 0" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Back",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21h6" />
        <path d="M12 21v-4" />
        <path d="M7 8v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8" />
        <path d="M6 11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2z" />
        <path d="M11 5a2 2 0 1 0 2 0V3h-2v2z" />
      </svg>
    ),
    parts: [
      {
        name: "Back",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21h6" />
            <path d="M12 21v-4" />
            <path d="M7 8v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8" />
            <path d="M6 11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2z" />
            <path d="M11 5a2 2 0 1 0 2 0V3h-2v2z" />
          </svg>
        ),
      },
      {
        name: "Spine",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v18" />
            <path d="M8 7h8" />
            <path d="M8 12h8" />
            <path d="M8 17h8" />
            <path d="M16 3c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
            <path d="M16 21c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
            <path d="M16 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Limbs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5v3a3 3 0 0 0 3 3h5" />
        <path d="M12 7v5a3 3 0 0 0 6 0v-1a3 3 0 0 0-3-3h-3" />
        <path d="M20 6v12a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2Z" />
      </svg>
    ),
    parts: [
      {
        name: "Arm",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5v3a3 3 0 0 0 3 3h5" />
            <path d="M12 7v5a3 3 0 0 0 6 0v-1a3 3 0 0 0-3-3h-3" />
            <path d="M20 6v12a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2Z" />
          </svg>
        ),
      },
      {
        name: "Hand",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            <path d="M7 15 5 13" />
            <path d="M19 15l-2-2" />
          </svg>
        ),
      },
      {
        name: "Leg",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 5v16" />
            <path d="M10 5v16" />
            <path d="M7 7h9" />
            <path d="M7 12h9" />
            <path d="M7 17h9" />
            <path d="M17 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
            <path d="M7 5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
          </svg>
        ),
      },
      {
        name: "Foot",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.74 2 11 3.15 11 5c0 2.1-1 2.9-1 5v1" />
            <path d="M4 16h16" />
            <path d="M4 19h16" />
            <path d="M20 16v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2" />
            <path d="M6 16v1" />
            <path d="M10 16v1" />
            <path d="M14 16v1" />
            <path d="M18 16v1" />
          </svg>
        ),
      },
      {
        name: "Joint",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m17.7 7.7-.7.7" />
            <path d="m7 17.4-.7.7" />
            <path d="m17 17.4.7.7" />
            <path d="m7 7.4.7.7" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Skin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z" />
        <path d="M5 9h14" />
        <path d="M9 21V9" />
        <path d="M9 3v2" />
        <path d="M9 14h6" />
        <path d="M15 14v7" />
        <path d="M15 3v6" />
      </svg>
    ),
    parts: [
      {
        name: "Skin",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z" />
            <path d="M5 9h14" />
            <path d="M9 21V9" />
            <path d="M9 3v2" />
            <path d="M9 14h6" />
            <path d="M15 14v7" />
            <path d="M15 3v6" />
            <path d="M7 6h2" />
            <path d="M7 12h2" />
            <path d="M7 18h2" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Mental Health",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12h2a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2" />
        <path d="M3 18h2a2 2 0 0 0 2-2v-3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
    parts: [
      {
        name: "Mental",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h2a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2" />
            <path d="M3 18h2a2 2 0 0 0 2-2v-3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <circle cx="12" cy="10" r="2" />
          </svg>
        ),
      },
    ],
  },
];

// Common symptoms associated with body parts
const commonSymptoms = {
  head: ["Headache", "Dizziness", "Migraine"],
  eye: ["Blurred vision", "Eye pain", "Redness"],
  ear: ["Ear pain", "Hearing loss", "Ringing"],
  nose: ["Runny nose", "Congestion", "Sneezing"],
  throat: ["Sore throat", "Difficulty swallowing", "Hoarseness"],
  chest: ["Chest pain", "Shortness of breath", "Palpitations"],
  heart: ["Palpitations", "Chest pain", "Irregular heartbeat"],
  lung: ["Cough", "Shortness of breath", "Wheezing"],
  stomach: ["Stomach pain", "Nausea", "Vomiting"],
  intestine: ["Diarrhea", "Constipation", "Bloating"],
  back: ["Back pain", "Stiffness", "Limited mobility"],
  arm: ["Arm pain", "Weakness", "Numbness"],
  leg: ["Leg pain", "Swelling", "Difficulty walking"],
  joint: ["Joint pain", "Stiffness", "Swelling"],
  skin: ["Rash", "Itching", "Discoloration"],
  mental: ["Anxiety", "Depression", "Mood changes"],
};

const AiChatbot = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            sender: "bot",
            text: "Hello! I'm your AI health assistant. Please describe your symptoms or select a body part from the left panel, and I'll help you find the right specialist.",
          },
        ];
  });
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Clear chat history when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem("chatMessages");
    };
  }, []);

  // Function to analyze symptoms and recommend a specialist
  const analyzeSymptoms = (text) => {
    const lowerText = text.toLowerCase();

    // Check for common conditions first
    for (const [condition, specialists] of Object.entries(bodyPartsDatabase)) {
      if (lowerText.includes(condition)) {
        return {
          found: true,
          bodyParts: [condition],
          specialists: specialists,
        };
      }
    }

    // Check for body parts mentioned in the text
    const detectedBodyParts = [];
    const detectedSpecialists = new Set();

    // Look for body part keywords in the input
    Object.keys(bodyPartsDatabase).forEach((bodyPart) => {
      if (lowerText.includes(bodyPart)) {
        detectedBodyParts.push(bodyPart);
        // Add all specialists for this body part
        bodyPartsDatabase[bodyPart].forEach((specialist) => {
          detectedSpecialists.add(specialist);
        });
      }
    });

    // If we have selected body parts from the UI, add those too
    if (
      selectedBodyPart &&
      !detectedBodyParts.includes(selectedBodyPart.toLowerCase())
    ) {
      detectedBodyParts.push(selectedBodyPart.toLowerCase());
      bodyPartsDatabase[selectedBodyPart.toLowerCase()]?.forEach(
        (specialist) => {
          detectedSpecialists.add(specialist);
        }
      );
    }

    // If we have detected body parts and specialists
    if (detectedBodyParts.length > 0 && detectedSpecialists.size > 0) {
      return {
        found: true,
        bodyParts: detectedBodyParts,
        specialists: Array.from(detectedSpecialists),
      };
    }

    return { found: false };
  };

  // Check if the message is an affirmative response
  const isAffirmativeResponse = (text) => {
    const lowerText = text.toLowerCase().trim();
    const affirmativeWords = [
      "yes",
      "yeah",
      "yep",
      "sure",
      "ok",
      "okay",
      "definitely",
      "absolutely",
      "please",
      "book",
      "appointment",
    ];

    return affirmativeWords.some((word) => lowerText.includes(word));
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === "" && !selectedBodyPart) return;

    // Create message text based on input and/or selected body part
    let messageText = inputValue.trim();

    if (selectedBodyPart && selectedSymptoms.length > 0) {
      if (messageText) {
        messageText += ` (${selectedBodyPart}: ${selectedSymptoms.join(", ")})`;
      } else {
        messageText = `${selectedBodyPart}: ${selectedSymptoms.join(", ")}`;
      }
    } else if (selectedBodyPart) {
      if (messageText) {
        messageText += ` (${selectedBodyPart})`;
      } else {
        messageText = `Pain or discomfort in my ${selectedBodyPart}`;
      }
    }

    // Add user message
    const userMessage = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);

    // Reset input and selections
    setInputValue("");
    setSelectedBodyPart(null);
    setSelectedSymptoms([]);

    // Show typing indicator
    setIsTyping(true);

    // Check if this is a response to a booking question
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      lastMessage.sender === "bot" &&
      lastMessage.followUp &&
      isAffirmativeResponse(messageText)
    ) {
      // User said yes to booking
      setTimeout(() => {
        const botResponse = {
          sender: "bot",
          text: "Great! I'll help you book an appointment. Let me redirect you to our appointment booking page.",
          action: "book",
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);

        // Redirect to booking page after a short delay
        setTimeout(() => {
          navigate("/book-appointment");
        }, 1500);
      }, 1000);
      return;
    }

    // Analyze symptoms and respond after a short delay
    setTimeout(() => {
      const analysis = analyzeSymptoms(messageText);
      let botResponse;

      if (analysis.found) {
        const primarySpecialist = analysis.specialists[0];
        const otherSpecialists = analysis.specialists.slice(1);

        let responseText = `Based on your description involving ${analysis.bodyParts.join(
          ", "
        )}, I recommend consulting a ${primarySpecialist}.`;

        if (otherSpecialists.length > 0) {
          responseText += ` Alternatively, you might also consider seeing ${otherSpecialists.join(
            " or "
          )}.`;
        }

        responseText += ` These specialists can properly evaluate your symptoms and provide appropriate medical advice.`;

        botResponse = {
          sender: "bot",
          text: responseText,
          followUp: `Would you like me to help you book an appointment with a ${primarySpecialist.toLowerCase()}?`,
        };
      } else {
        botResponse = {
          sender: "bot",
          text: "I need more specific information to recommend the right specialist. Could you please describe your symptoms in more detail or select a body part from the left panel? Alternatively, if you're experiencing general symptoms like fever or fatigue, please mention those specifically.",
          followUp:
            "If you prefer, I can help you book an appointment with a general practitioner who can provide an initial assessment and refer you to a specialist if needed. Would you like to do that?",
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Handle selecting a body part
  const handleBodyPartSelect = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    // Reset selected symptoms when changing body part
    setSelectedSymptoms([]);
  };

  // Handle selecting a symptom
  const handleSymptomSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms((prev) => prev.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms((prev) => [...prev, symptom]);
    }
  };

  // Handle starting a new chat
  const handleNewChat = () => {
    localStorage.removeItem("chatMessages");
    setMessages([
      {
        sender: "bot",
        text: "Hello! I'm your AI health assistant. Please describe your symptoms or select a body part from the left panel, and I'll help you find the right specialist.",
      },
    ]);
    setSelectedBodyPart(null);
    setSelectedSymptoms([]);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("chatMessages");
    navigate("/sign-in"); // Redirect to sign-in page
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    localStorage.removeItem("chatMessages");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-800 text-sm md:text-base"
            >
              Dashboard
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-blue-600 font-medium text-sm md:text-base">
              AI Chatbot
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 text-sm md:text-base">
                John Doe
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
              title="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - Body Parts */}
          <div className="hidden sm:block md:w-64 md:h-[calc(100vh-180px)] md:overflow-y-auto pr-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Where is your concern?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select a body region to help us identify the right specialist
                for you.
              </p>

              {/* Body Regions */}
              {bodyRegions.map((region, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-md font-medium text-gray-700 mb-2 flex items-center">
                    <span className="mr-2 flex items-center justify-center w-6 h-6 text-blue-600">
                      {region.icon}
                    </span>
                    {region.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {region.parts.map((part, partIndex) => (
                      <button
                        key={partIndex}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          selectedBodyPart === part.name.toLowerCase()
                            ? "bg-blue-50 border-blue-500 shadow-sm"
                            : "bg-white border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() =>
                          handleBodyPartSelect(part.name.toLowerCase())
                        }
                      >
                        <span className="text-blue-600 mb-1 flex items-center justify-center w-8 h-8">
                          {part.icon}
                        </span>
                        <span className="text-xs text-gray-700">
                          {part.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Common Symptoms for Selected Body Part */}
            {selectedBodyPart && commonSymptoms[selectedBodyPart] && (
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Common Symptoms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms[selectedBodyPart].map((symptom, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                      }`}
                      onClick={() => handleSymptomSelect(symptom)}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Chat Interface */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-180px)] flex flex-col">
              {/* Chat Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium text-gray-800">
                    AI Health Assistant
                  </span>
                </div>
                <button
                  onClick={handleNewChat}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Start New Chat
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                          />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p>{message.text}</p>
                      {message.followUp && (
                        <p className="mt-2 text-sm opacity-90">
                          {message.followUp}
                        </p>
                      )}
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                    <div className="bg-gray-100 py-2 px-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Selected Body Part Indicator */}
              {selectedBodyPart && (
                <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-blue-700 font-medium">
                      Selected: {selectedBodyPart}
                    </span>
                    {selectedSymptoms.length > 0 && (
                      <span className="text-sm text-blue-600 ml-2">
                        ({selectedSymptoms.join(", ")})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBodyPart(null);
                      setSelectedSymptoms([]);
                    }}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={
                      selectedBodyPart
                        ? `Describe your ${selectedBodyPart} symptoms...`
                        : "Describe your symptoms or select a body part..."
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg"
                    onClick={handleSendMessage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-6 flex flex-col-reverse gap-4 md:flex justify-between">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </button>
        <Link
          to="/book-appointment"
          className="bg-blue-600 hover:bg-blue-700 text-white justify-center px-4 py-2 rounded-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default AiChatbot;
