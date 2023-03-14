import { z } from 'zod';

import i18n from '../../i18n';

export const CodeFormSchema = z.object({
  title: z.string().min(1, i18n.t('codelistTitleTooShort')),
  description: z.string(),
  ref: z.string().uuid(i18n.t('codelistRefNotUuid')),
});

export const CodelistFormSchema = z.object({
  title: z.string().min(1, i18n.t('codelistTitleTooShort')),
  description: z.string(),
  ref: z.string().uuid(i18n.t('codelistRefNotUuid')),
  codes: z.array(CodeFormSchema).nullable().optional(),
});
