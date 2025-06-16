"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow-lg">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        <span className="text-lg font-semibold text-gray-700">
          Loading...
        </span>
      </div>
    </div>
  );
}
