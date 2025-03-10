export interface DebugResult {
  errors: string[];
  suggestions: string[];
  fixedCode: string;
}

export interface CodeState {
  original: string;
  debug: DebugResult | null;
  isLoading: boolean;
  error: string | null;
}