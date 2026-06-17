import dynamic from 'next/dynamic';

const ExperienceOrchestrator = dynamic(
  () => import('@/phases/ExperienceOrchestrator'),
  { ssr: false }
);

export default function Home() {
  return <ExperienceOrchestrator />;
}
