import Image from 'next/image';
import type { ReactNode } from 'react';

import cn from '../../utils/className';

// Types.
interface Preview {
  name: string;
  size?: { width?: string; height?: string };
  render: () => ReactNode;
}

////////////////////////////////////////////////////////////

// Components.
import CalendarPrimary from '../../assets/images/calendar-icon-primary.svg';
import CheckboxPrimary from '../../assets/images/checkbox-icon-primary.svg';
import DashboardPrimary from '../../assets/images/dashboard-icon-primary.svg';
import FolderPrimary from '../../assets/images/folder-icon-primary.svg';
import FolderWhite from '../../assets/images/folder-icon-white.svg';
import AIButton from '../../components/AIButton';
import AITaskCard from '../../components/AITaskCard';
import BrandLogo from '../../components/BrandLogo';
import Button from '../../components/Button';
import Chips from '../../components/Chips';
import ColoredIcon from '../../components/ColoredIcon';
import Comment from '../../components/Comment';
import CommentField from '../../components/CommentField';
import DateField from '../../components/DateField';
import Dropdown from '../../components/Dropdown';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import Link from '../../components/Link';
import MenuItem from '../../components/MenuItem';
import Modal from '../../components/Modal';
import AITaskCreateModal from '../../components/modals/AITaskCreateModal';
import AITaskListModal from '../../components/modals/AITaskListModal';
import CreateProjectModal from '../../components/modals/CreateProjectModal';
import CreateTaskModal from '../../components/modals/CreateTaskModal';
import EditProjectModal from '../../components/modals/EditProjectModal';
import EditTaskModal from '../../components/modals/EditTaskModal';
import PromptBar from '../../components/modals/PromptBar';
import ProjectCard from '../../components/ProjectCard';
import Tag from '../../components/Tag';
import TaskCard from '../../components/TaskCard';
import TaskInfo from '../../components/TaskInfo';
import UserIcon from '../../components/UserIcon';

// Preview list.
const previews: Preview[] = [
  {
    name: 'Brand Logo Primary',
    size: { width: '147px', height: '19px' },
    render: () => <BrandLogo />
  },
  {
    name: 'Brand Logo Black',
    size: { width: '101px', height: '13px' },
    render: () => <BrandLogo variant='black' />
  },
  {
    name: 'Button',
    size: { width: '200px', height: '50px' },
    render: () => <Button label='Se connecter' />
  },
  {
    name: 'Button Outline',
    size: { width: '200px', height: '50px' },
    render: () => <Button label='Se connecter' variant='outline' />
  },
  {
    name: 'Button Disabled',
    size: { width: '200px', height: '50px' },
    render: () => <Button label='+ Ajouter une tâche' disabled />
  },
  {
    name: 'AI Button',
    size: { width: '94px', height: '50px' },
    render: () => <AIButton value='IA' />
  },
  {
    name: 'AI Button Compact',
    size: { width: '24px', height: '24px' },
    render: () => <AIButton compact={true} />
  },
  {
    name: 'Input',
    size: { width: '300px', height: '80px' },
    render: () => <Input label='Email' placeholder='Input' />
  },
  {
    name: 'Date Picker',
    size: { width: '300px', height: '80px' },
    render: () => <DateField label='Échéance*' value={new Date(2026, 2, 9)} />
  },
  {
    name: 'Dropdown',
    size: { width: '300px', height: '80px' },
    render: () => <Dropdown
      label='Assigné à :'
      placeholder='Choisir un collaborateur'
      options={['Alice Dupont', 'Bertrand Legrand', 'Anne Bournes', 'Camille Vidal']}
    />
  },
  {
    name: 'Dropdown Multiple',
    size: { width: '300px', height: '80px' },
    render: () => <Dropdown
      label='Assigné à :'
      multiple
      placeholder='Choisir un ou plusieurs collaborateurs'
      multiplePlaceholder='collaborateurs'
      options={['Alice Dupont', 'Bertrand Legrand', 'Anne Bournes', 'Camille Vidal']}
    />
  },
  {
    name: 'Link',
    size: { width: '142px', height: '25px' },
    render: () => <Link label='Mot de passe oublié?' />
  },
  {
    name: 'Icon Button Back',
    size: { width: '57px', height: '57px' },
    render: () => <IconButton icon='back' />
  },
  {
    name: 'Icon Button See More',
    size: { width: '57px', height: '57px' },
    render: () => <IconButton icon='see-more' />
  },
  {
    name: 'Tags',
    size: { width: '584px', height: '29px' },
    render: () => (
      <div className='flex flex-wrap gap-2'>
        <Tag color='green' label='Terminée' />
        <Tag color='red' label='À faire' />
        <Tag color='orange' label='En cours' />
        <Tag color='blue' label='Info' />
        <Tag color='brand' label='Propriétaire' />
        <Tag color='grey' label='Anne Dupont' />
      </div>
    )
  },
  {
    name: 'Tags Muted',
    size: { width: '584px', height: '29px' },
    render: () => (
      <div className='flex flex-wrap gap-2'>
        <Tag color='green' label='Terminée' muted={true} />
        <Tag color='red' label='À faire' muted={true} />
        <Tag color='orange' label='En cours' muted={true} />
        <Tag color='blue' label='Info' muted={true} />
        <Tag color='brand' label='Propriétaire' muted={true} />
        <Tag color='grey' label='Anne Dupont' muted={true} />
      </div>
    )
  },
  {
    name: 'Tags Compact',
    size: { width: '213px', height: '29px' },
    render: () => (
      <div className='flex flex-wrap gap-2'>
        <Tag color='green' label='Terminée' compact={true} />
        <Tag color='red' label='À faire' compact={true} />
        <Tag color='orange' label='En cours' compact={true} />
        <Tag color='blue' label='Info' compact={true} />
        <Tag color='brand' label='Propriétaire' compact={true} />
        <Tag color='grey' label='Anne Dupont' compact={true} />
      </div>
    )
  },
  {
    name: 'Chips Active / Inactive',
    size: { width: '214px', height: '49px' },
    render: () => (
      <div className='flex w-full h-full gap-2'>
        <Chips label='Liste' active icon={<ColoredIcon src={CheckboxPrimary} color='var(--color-brand-dark)' />} />
        <Chips label='Kanban' icon={<ColoredIcon src={CalendarPrimary} color='var(--color-brand-dark)' />} />
      </div>
    )
  },
  {
    name: 'User Icon',
    size: { width: '65px', height: '65px' },
    render: () => <UserIcon initials='AD' />
  },
  {
    name: 'User Icon Focus',
    size: { width: '65px', height: '65px' },
    render: () => <UserIcon initials='AD' active />
  },
  {
    name: 'User Icon Small',
    size: { width: '28px', height: '28px' },
    render: () => <UserIcon initials='BD' size='sm' />
  },
  {
    name: 'Menu Item',
    size: { width: '248px', height: '80px' },
    render: () => <MenuItem className='w-full h-full' label='Tableau de bord' href='' icon={
      <Image className='w-6 h-6' alt='' src={DashboardPrimary} />
    } />
  },
  {
    name: 'Menu Item Active',
    size: { width: '248px', height: '80px' },
    render: () => <MenuItem className='w-full h-full' label='Projets' href='' icon={
      <Image className='w-6 h-6' alt='' src={FolderWhite} />
    } active />
  },
  {
    name: 'Comment Outgoing',
    size: { width: '720px', height: '96px' },
    render: () => (
      <Comment
        initials='BD'
        author='Bertrand Dupont'
        timestamp='23 mars, 11:20'
        text='Attention à bien gérer l’expiration des tokens et le refresh automatique côté client.'
      />
    )
  },
  {
    name: 'Comment Incoming',
    size: { width: '720px', height: '96px' },
    render: () => (
      <Comment
        incoming
        initials='AD'
        timestamp='23 mars, 11:24'
        text='Bien noté, je prévois un refresh token avec rotation côté serveur.'
      />
    )
  },
  {
    name: 'Comment Field',
    size: { width: '720px', height: '55px' },
    render: () => <CommentField initials='AD' />
  },
  {
    name: 'Colored Icon',
    size: { width: '24px', height: '24px' },
    render: () => <ColoredIcon src={FolderPrimary} color='var(--color-info)' />
  },
  {
    name: 'Project Card',
    size: { width: '380px', height: '380px' },
    render: () => <ProjectCard
      name= 'Nom du projet'
      description= "Développement de la nouvelle version de l'API REST avec authentification JWT"
      progress={0}
      tasksDone={0}
      tasksTotal={2}
      teamSize={3}
      owner='AD'
      members= {['BD', 'CV']}
    />
  },
  {
    name: 'Task Card',
    size: { width: '1097px', height: '169px' },
    render: () => <TaskCard
      status='todo'
      title='Nom de la tâche'
      description='Description de la tâche'
      projectName='Nom du projet'
      date='9 mars'
      commentsCount={2}
    />
  },
  {
    name: 'Task Info',
    size: { width: '1017px', height: '275px' },
    render: () => <TaskInfo
      title='Authentification JWT'
      description='Implémenter le système d’authentification avec tokens JWT'
      dueDate='9 mars'
      assignees={[{ initials: 'BD', name: 'Bertrand Dupont' }, { initials: 'AD', name: 'Anne Dupont' }]}
      comments={[{ initials: 'BD', author: 'Bertrand Dupont', timestamp: '23 mars, 11:20', text: 'Attention à bien gérer l’expiration des tokens et le refresh automatique côté client.' }]}
      currentUserInitials='AD'
    />
  },
  {
    name: 'AI Task Card',
    size: { width: '494px', height: '157px' },
    render: () => <AITaskCard
      title='Nom de la tâche'
      description='Description de la tâche'
    />
  },
  {
    name: 'AI Prompt Bar',
    size: { width: '600px', height: '64px' },
    render: () => <PromptBar placeholder='Décrivez les tâches que vous souhaitez ajouter...' />
  },
  {
    name: 'Modal Empty',
    size: { width: '598px', height: '813px' },
    render: () => <Modal
      mock
      title='Example empty modal'
      bottom={<div className='h-13 w-full sm:max-w-60'><Button label='Valider' disabled /></div>}
      showStar
    >
      <div className='w-full min-h-20 bg-red-500/20'></div>
      <div className='w-full min-h-20 bg-blue-500/20'></div>
      <div className='w-full min-h-20 bg-red-500/20'></div>
      <div className='w-full min-h-20 bg-blue-500/20'></div>
      <div className='w-full min-h-20 bg-red-500/20'></div>
      <div className='w-full min-h-20 bg-blue-500/20'></div>
      <div className='w-full min-h-20 bg-red-500/20'></div>
      <div className='w-full min-h-20 bg-blue-500/20'></div>
      <div className='w-full min-h-20 bg-red-500/20'></div>
      <div className='w-full min-h-20 bg-blue-500/20'></div>
    </Modal>
  },
  {
    name: 'Modal — Create Task',
    size: { width: '598px', height: '813px' },
    render: () => <CreateTaskModal />
  },
  {
    name: 'Modal — Edit Task',
    size: { width: '598px', height: '813px' },
    render: () => <EditTaskModal />
  },
  {
    name: 'Modal — Create Project',
    size: { width: '598px', height: '616px' },
    render: () => <CreateProjectModal />
  },
  {
    name: 'Modal — Edit Project',
    size: { width: '598px', height: '616px' },
    render: () => <EditProjectModal />
  },
  {
    name: 'Modal — AI Task Create',
    size: { width: '598px', height: '654px' },
    render: () => <AITaskCreateModal />
  },
  {
    name: 'Modal — AI Task List',
    size: { width: '598px', height: '952px' },
    render: () => <AITaskListModal />
  },
];

////////////////////////////////////////////////////////////

// Component preview frame.
function PreviewFrame({ name, size, children }: {
  name: string,
  size?: { width?: string; height?: string },
  children: ReactNode
}) {
  return (
    <section className='flex flex-col gap-3'>
      <h5 className='font-heading text-h5 text-grey-600 uppercase tracking-widest'>{name}</h5>
      <div
        className='preview-frame relative overflow-hidden p-6' style={{
          resize: 'both',
          minWidth: 'calc(1.5rem + 1.5rem + 4px + 4px)',
          minHeight: 'calc(1.5rem + 1.5rem + 4px + 4px)',
          maxWidth: '100%',
          width: `calc(1.5rem + 1.5rem + 4px + 4px + (${size?.width ?? '0px'}))`,
          height: `calc(1.5rem + 1.5rem + 4px + 4px + (${size?.height ?? '0px'}))`
        }}
      >
        <div className='size-full border-4 border-dashed border-grey-200 rounded-xl bg-white'>
          {children}
        </div>
        <div className={cn(
          'pointer-events-none absolute bottom-0 right-0 size-4 rounded-full',
          'bg-white border-2 border-grey-600 shadow-sm flex items-center justify-center'
        )}>
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M3.5 3.5L8.5 8.5' stroke='#6B7280' strokeWidth='1.5' strokeLinecap='round' />
            <path d='M3.5 6V3.5H6' stroke='#6B7280' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M8.5 6V8.5H6' stroke='#6B7280' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
      </div>
    </section>
  );
}

// Component preview page.
export default function ComponentsPage() {
  return (
    <div className='min-h-screen bg-grey-50 p-8 md:p-12'>
      <div className='max-w-4xl mx-auto flex flex-col gap-10'>

        {/* Page header */}
        <header className='flex flex-col gap-2 pb-6 border-b border-grey-200'>
          <h1 className='text-h1 text-grey-950'>Components</h1>
          <p className='text-body-m text-grey-600'>
            Dev-only component preview. Drag the bottom-right corner of each frame to resize.
          </p>
        </header>

        {/* Component preview area */}
        <div className='flex flex-col gap-10'>
          {previews.map(({ name, render, size }, index) => (
            <PreviewFrame key={`${index}-${name}`} name={name} size={size}>
              {render()}
            </PreviewFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
