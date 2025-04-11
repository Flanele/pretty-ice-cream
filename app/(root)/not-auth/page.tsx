import { InfoBlock } from '@/shared/components';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access denied"
        text="This page is only available to authorized users"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}