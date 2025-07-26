import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoEmbedProps {
  url: string;
  thumbnail?: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  url,
  thumbnail,
  title,
  className = '',
  autoplay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getVideoId = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return { platform: 'youtube', id: youtubeMatch[1] };
    }

    // TikTok
    const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
    if (tiktokMatch) {
      return { platform: 'tiktok', id: tiktokMatch[1] };
    }

    // Instagram
    const instagramMatch = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
    if (instagramMatch) {
      return { platform: 'instagram', id: instagramMatch[1] };
    }

    return null;
  };

  const videoInfo = getVideoId(url);

  const getEmbedUrl = () => {
    if (!videoInfo) return '';

    switch (videoInfo.platform) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoInfo.id}${autoplay ? '?autoplay=1' : ''}`;
      case 'tiktok':
        return `https://www.tiktok.com/embed/v2/${videoInfo.id}`;
      case 'instagram':
        return `https://www.instagram.com/p/${videoInfo.id}/embed/`;
      default:
        return '';
    }
  };

  const getThumbnail = () => {
    if (thumbnail) return thumbnail;
    
    if (videoInfo?.platform === 'youtube') {
      return `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg`;
    }
    
    return '/placeholder.svg';
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setShowModal(true);
  };

  if (!videoInfo) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Invalid video URL</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`cursor-pointer hover:shadow-lg transition-shadow ${className}`} onClick={handlePlay}>
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <img
              src={getThumbnail()}
              alt={title || 'Video thumbnail'}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <Button
                size="icon"
                className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-black"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold truncate">{title}</h3>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setShowModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="aspect-video">
              <iframe
                src={getEmbedUrl()}
                title={title || 'Video'}
                className="w-full h-full rounded-lg"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoEmbed;