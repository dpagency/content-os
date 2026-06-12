export type Brand = {
  id: string;
  name: string;
  segment: string;
  primaryColor: string;
  logoUrl?: string;
  toneOfVoice: string;
  persona: string;
  responsible: string;
  socialNetworks: { platform: string; url: string }[];
  website: string;
  competitors: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  ownerId: string;
};

export type ContentIdea = {
  id: string;
  brandId: string;
  title: string;
  objective: string;
  copy: string;
  cta: string;
  hashtags: string[];
  category: 'Institucional' | 'Engajamento' | 'Autoridade' | 'Conversão' | 'Datas Comemorativas' | 'Reels' | 'Stories' | 'Campanhas';
  references: {
    pinterest?: string;
    instagram?: string;
    tiktok?: string;
    behance?: string;
  };
  status: 'Rascunho' | 'Revisão Interna' | 'Cliente' | 'Ajustes' | 'Aprovado' | 'Agendado' | 'Publicado';
  platform: 'Instagram' | 'LinkedIn' | 'TikTok' | 'Facebook' | 'Pinterest';
  format: 'Post Estático' | 'Carrossel' | 'Reels' | 'Stories' | 'Vídeo';
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
};
