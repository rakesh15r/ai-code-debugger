import React, { useState } from 'react';
import { Bug, Loader2 } from 'lucide-react';
import { CodeEditor } from './components/CodeEditor';
import { DebugResults } from './components/DebugResults';
import { analyzeCode } from './lib/gemini';
import type { CodeState } from './types';

const INITIAL_STATE: CodeState = {
  original: '',
  debug: null,
  isLoading: false,
  error: null,
};

function App() {
  const [state, setState] = useState<CodeState>(INITIAL_STATE);

  const handleDebug = async () => {
    if (!state.original.trim()) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await analyzeCode(state.original);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        debug: result,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to analyze code. Please try again.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Bug className="text-blue-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">AI Code Debugger</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CodeEditor
              code={state.original}
              onChange={(code) => setState((prev) => ({ ...prev, original: code }))}
              placeholder="Paste your code here..."
              label="Your Code"
            />
            
            <button
              onClick={handleDebug}
              disabled={state.isLoading || !state.original.trim()}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {state.isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Analyzing...
                </>
              ) : (
                'Debug Code'
              )}
            </button>

            {state.error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                {state.error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {state.debug && (
              <>
                <DebugResults result={state.debug} />
                <CodeEditor
                  code={state.debug.fixedCode}
                  onChange={() => {}}
                  label="Fixed Code"
                  readOnly
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;