import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import type { DebugResult } from '../types';

interface DebugResultsProps {
  result: DebugResult;
}

export function DebugResults({ result }: DebugResultsProps) {
  return (
    <div className="space-y-4">
      {result.errors.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <h3 className="font-medium text-red-800">Errors Found</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-red-700">
            {result.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {result.suggestions.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            <h3 className="font-medium text-green-800">Suggested Fixes</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-green-700">
            {result.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}