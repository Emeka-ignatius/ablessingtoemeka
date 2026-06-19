export interface PetName {
  name: string;
  imageUrl: string;
}

export type SceneTheme = 'night' | 'goldenHour' | 'rain' | 'space';

export type Memory = {
  label: string;
  date: string;
  title: string;
  story: string;
  imageUrl?: string;
  videoUrl?: string;
  sceneTheme: SceneTheme;
};
