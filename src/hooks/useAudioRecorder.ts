import { useState, useRef, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface AudioRecorderState {
  isRecording: boolean;
  hasRecording: boolean;
  isPlaying: boolean;
  audioBlob: Blob | null;
  audioUrl: string | null;
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    hasRecording: false,
    isPlaying: false,
    audioBlob: null,
    audioUrl: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setState(prev => ({
          ...prev,
          isRecording: false,
          hasRecording: true,
          audioBlob,
          audioUrl,
        }));
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      
      setState(prev => ({
        ...prev,
        isRecording: true,
      }));
      
      toast({
        title: "Recording started",
        description: "Speak the Sanskrit verse clearly",
      });
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Please allow microphone access and try again",
        variant: "destructive",
      });
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      toast({
        title: "Recording stopped",
        description: "Your recording is ready for analysis",
      });
    }
  }, [state.isRecording]);

  const playRecording = useCallback(() => {
    if (state.audioUrl) {
      const audio = new Audio(state.audioUrl);
      audioElementRef.current = audio;
      
      audio.onplay = () => {
        setState(prev => ({ ...prev, isPlaying: true }));
      };
      
      audio.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      };
      
      audio.onerror = () => {
        setState(prev => ({ ...prev, isPlaying: false }));
        toast({
          title: "Playback failed",
          description: "Could not play your recording",
          variant: "destructive",
        });
      };
      
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setState(prev => ({ ...prev, isPlaying: false }));
      });
    }
  }, [state.audioUrl]);

  const resetRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    
    setState({
      isRecording: false,
      hasRecording: false,
      isPlaying: false,
      audioBlob: null,
      audioUrl: null,
    });
  }, [state.audioUrl]);

  return {
    ...state,
    startRecording,
    stopRecording,
    playRecording,
    resetRecording,
  };
};