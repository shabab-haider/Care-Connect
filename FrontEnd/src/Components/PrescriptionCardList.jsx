import React from "react";
import { Bell } from "lucide-react";

const PrescriptionCardList = ({ prescriptions }) => {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {prescriptions.map((prescription) => (
        <div
          key={prescription.prescriptionId}
          className="border rounded-xl p-4 shadow hover:shadow-md bg-white"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {prescription.doctorName}
              </h2>
              <p className="text-sm text-gray-600">
                Valid: {prescription.validTill}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {prescription.medicines.map((med, idx) => (
              <div
                key={idx}
                className="border border-gray-200 p-3 rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{med.name}</span>
                  <span className="text-xs text-gray-600">{med.dosage}</span>
                </div>
                <div className="font-medium text-blue-600">
                  Time:{" "}
                  {Array.isArray(med.frequency)
                    ? med.frequency.join(", ")
                    : med.frequency}
                </div>
                <div className="mt-2 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded flex items-center gap-1">
                  <Bell className="w-4 h-4" />
                  {med.instructions || "No special instructions"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionCardList;
