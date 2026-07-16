import type { StaticImageData } from 'next/image';

import cn from '../utils/className';

// Colored icon component.
export default function ColoredIcon(props: {
  src: StaticImageData,
  color: string,
  className?: string
}) {
  return (
    <span
      aria-hidden='true'
      className={cn('block w-full h-full', props.className)}
      style={{
        backgroundColor: props.color,
        maskImage: `url(${props.src.src})`,
        WebkitMaskImage: `url(${props.src.src})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain'
      }}
    />
  );
}
