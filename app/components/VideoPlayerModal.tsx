
import React from 'react';
import { GeneratedVideo } from '../types';

interface VideoPlayerModalProps {
  video: GeneratedVideo;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
        <div className="w-full max-w-4xl bg-magic-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
            >
                <i className="fa-solid fa-times"></i>
            </button>
            
            <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video 
                    src={video.videoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
                <p className="text-gray-400">Created on {video.formattedDate || new Date(video.date).toLocaleDateString("en-US", { timeZone: "UTC" })}</p>
            </div>
        </div>
    </div>
  );
};
