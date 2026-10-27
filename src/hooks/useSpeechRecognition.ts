import { useCallback, useEffect, useRef, useState } from 'react';

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

export function useSpeechRecognition(options?: {
  lang?: string;
  onTranscript?: (text: string) => void;
}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onTranscriptRef = useRef(options?.onTranscript);
  onTranscriptRef.current = options?.onTranscript;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRec =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSupported(Boolean(SpeechRec));
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(
    (fallbackInputEl?: HTMLInputElement | HTMLTextAreaElement | null) => {
      if (typeof window === 'undefined') return;

      const SpeechRec =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRec) {
        // Fallback: fokusiraj polje kako bi korisnik na mobitelu mogao kliknuti sistemski mikrofon na tipkovnici
        if (fallbackInputEl) {
          fallbackInputEl.focus();
        }
        setStatusMessage(
          'Preglednik ne podržava izravni Web Speech API — polje je fokusirano, upotrijebite ikonu mikrofona na tipkovnici uređaja.'
        );
        setTimeout(() => setStatusMessage(null), 4500);
        return;
      }

      if (isListening) {
        stopListening();
        return;
      }

      try {
        const recognition: SpeechRecognitionInstance = new SpeechRec();
        recognition.lang = options?.lang || 'hr-HR';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const results = event?.results;
          if (results && results.length > 0) {
            const transcript = Array.from(results)
              .map((r: any) => r[0]?.transcript || '')
              .join(' ')
              .trim();
            if (transcript && onTranscriptRef.current) {
              onTranscriptRef.current(transcript);
            }
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
          if (fallbackInputEl) {
            fallbackInputEl.focus();
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        setIsListening(true);
        setStatusMessage(null);
        recognition.start();
      } catch {
        setIsListening(false);
        if (fallbackInputEl) {
          fallbackInputEl.focus();
        }
      }
    },
    [isListening, options?.lang, stopListening]
  );

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  return {
    isListening,
    isSupported,
    statusMessage,
    startListening,
    stopListening,
  };
}
