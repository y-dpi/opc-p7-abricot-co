import DeleteIcon from '../assets/images/delete-icon-black.svg';
import PencilGrey from '../assets/images/pencil-icon-grey.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Task info block.
function TitleBlock({ title, description }: { title: string, description: string }) {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-heading text-h5 text-grey-950 wrap-break-word'>{title}</h3>
      <p className='font-body text-body-s text-grey-600 wrap-break-word'>{description}</p>
    </div>
  );
}

// AI-generated task card component.
export default function AITaskCard(props: {
  title?: string,
  description?: string,
  className?: string
}) {
  const title = props.title ?? 'Tâche sans nom';
  const description = props.description ?? '';

  const shell = 'w-full rounded-xl border border-grey-200 bg-white px-10 py-[25px]';

  return (
    <article className={cn('@container flex items-center justify-between gap-8', shell, props.className)}>
      <div className='flex flex-col gap-8 min-w-0'>
        <TitleBlock title={title} description={description} />
        <div className='flex items-center gap-4 text-grey-600 @max-[220px]:flex-col @max-[220px]:items-start @max-[220px]:gap-2'>
          <button className='flex items-center gap-2 transition-colors hover:cursor-pointer hover:text-error'>
            <ColoredIcon src={DeleteIcon} color='currentColor' className='w-4 h-4' />
            <span className='font-body text-body-xs'>Supprimer</span>
          </button>
          <span className='h-3 w-px bg-grey-400 @max-[220px]:hidden' />
          <button className='flex items-center gap-2 transition-colors hover:cursor-pointer hover:text-info'>
            <ColoredIcon src={PencilGrey} color='currentColor' className='w-3 h-4' />
            <span className='font-body text-body-xs'>Modifier</span>
          </button>
        </div>
      </div>
    </article>
  );
}
