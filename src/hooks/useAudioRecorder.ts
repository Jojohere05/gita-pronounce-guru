import { useState, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioUrlRef = useRef<string | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
        }
        audioUrlRef.current = URL.createObjectURL(audioBlob);
        setHasRecording(true);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording stopped",
        description: "Your pronunciation has been recorded successfully",
      });
    }
  }, [isRecording]);

  const playRecording = useCallback(() => {
    if (audioUrlRef.current) {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      
      const audio = new Audio(audioUrlRef.current);
      audioElementRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        toast({
          title: "Playback failed",
          description: "Could not play the recording",
          variant: "destructive",
        });
      };
      
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
  }, []);

  const playReferenceAudio = useCallback(() => {
    // Mock reference audio playback
    setIsPlaying(true);
    
    toast({
      title: "Playing reference audio",
      description: "Listen carefully to the correct pronunciation",
    });
    
    // Simulate audio duration
    setTimeout(() => {
      setIsPlaying(false);
      toast({
        title: "Reference audio complete",
        description: "Now try recording your pronunciation",
      });
    }, 8000);
  }, []);

  const getRecordingBlob = useCallback((): Blob | null => {
    if (audioChunksRef.current.length > 0) {
      return new Blob(audioChunksRef.current, { type: 'audio/wav' });
    }
    return null;
  }, []);

  return {
    isRecording,
    hasRecording,
    isPlaying,
    startRecording,
    stopRecording,
    playRecording,
    playReferenceAudio,
    getRecordingBlob,
  };
};