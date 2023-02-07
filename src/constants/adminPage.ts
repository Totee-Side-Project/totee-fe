import { MentoListRequestKindOption } from '@api/mentor/types';

export type AdminMentoMenusKey = 'pending' | 'approved';

export const APPROVED = 'approved';
export const PENDING = 'pending';
export const MENTO_APPLICANTS_PAGE = 0;
export const MENTO_APPLICANTS_SIZE = 8;

export const ADMIN_MENTO_MENUS = {
  pending: { to: 'mento/pending?page=1', title: '멘토 수락 대기' },
  approved: { to: 'mento/approved?page=1', title: '멘토 명단' },
} as const;

export const MENTO_APPLICANTS_KINDS: Record<
  MentoListRequestKindOption,
  MentoListRequestKindOption
> = {
  all: 'all',
  pending: 'pending',
  approved: 'approved',
};
