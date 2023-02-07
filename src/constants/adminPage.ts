import { MentoListRequestKindOption } from '@api/mentor/types';

export type AdminMentoMenusKey = 'pending' | 'approved';

export const APPROVED = 'approved';
export const PENDING = 'pending';
export const MENTO_APPLICANTS_PAGE = 0;
export const MENTO_APPLICANTS_SIZE = 8;

export const ADMIN_MENTO_MENUS: Record<
  AdminMentoMenusKey,
  { to: string; title: string }
> = {
  pending: { to: 'mento/pending', title: '멘토 수락 대기' },
  approved: { to: 'mento/approved', title: '멘토 명단' },
};

export const MENTO_APPLICANTS_KINDS: Record<
  MentoListRequestKindOption,
  MentoListRequestKindOption
> = {
  all: 'all',
  pending: 'pending',
  approved: 'approved',
};
