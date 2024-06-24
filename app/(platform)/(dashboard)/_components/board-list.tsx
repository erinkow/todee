import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { HelpCircle, User2 } from 'lucide-react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { FormPopover } from '@/components/form/form-popover';
import { MAX_FREE_BOARDS } from '@/constants/boards';
import { getAvailableCount } from '@/constants/org-limit';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';

export const BoardList = async () => {
  const { orgId } = auth();

  console.log(orgId)

  if (!orgId) {
    console.log('no orgId found.')
    return redirect('/select-org');
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const availableCount = await getAvailableCount();

  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        Your board
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className='group relative aspect-auto bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full pb-20 overflow-hidden'
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className='absolute inset-0 bg-black/40 group-hover:bg-white/10 transition' />
            <p className='relative ml-2 mt-1 pl-1 font-semibold text-neutral-200/80'>
              {board.title}
            </p>
          </Link>
        ))}
        <FormPopover side='right' sideOffset={10}>
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs'>{`${
              MAX_FREE_BOARDS - availableCount
            } remaining`}</span>
            <Hint
              sideOffset={40}
              description={`
                                Free workspace can have up to 5 open boards. For unlimited boards upgrade this workspace.
                            `}
            >
              <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
    </div>
  );
};
