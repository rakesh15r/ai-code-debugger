import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  placeholder?: string;
  label: string;
  readOnly?: boolean;
}

export function CodeEditor({
  code,
  onChange,
  placeholder,
  label,
  readOnly = false,
}: CodeEditorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative rounded-lg overflow-hidden border border-gray-300">
        {readOnly ? (
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            className="h-[300px] overflow-auto"
          >
            {code || '// No code to display'}
          </SyntaxHighlighter>
        ) : (
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[300px] p-4 font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck="false"
          />
        )}
      </div>
    </div>
  );
}