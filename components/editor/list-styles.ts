import { BulletList } from '@tiptap/extension-list';

/** All supported bullet styles (Word-like variety). */
export const BULLET_STYLE_VALUES = [
  'disc', 'circle', 'square', 'diamond', 'arrow', 'check', 'dash', 'star',
  'triangle', 'double-arrow', 'plus', 'asterisk', 'heart', 'long-dash',
  'circle-filled', 'square-small', 'square-outline', 'ring', 'diamond-outline', 'arrow-right',
] as const;
export type BulletStyleValue = (typeof BULLET_STYLE_VALUES)[number];

/** Bullet list with Word-like list style variety. */
export const BulletListWithStyle = BulletList.extend({
  addAttributes() {
    return {
      'data-list-style': {
        default: 'disc',
        parseHTML: (el) => (el.getAttribute('data-list-style') as BulletStyleValue) || 'disc',
        renderHTML: (attrs) => (attrs['data-list-style'] ? { 'data-list-style': attrs['data-list-style'] } : {}),
      },
    };
  },
  addCommands() {
    const parent = (this as any).parent?.() ?? {};
    return {
      ...parent,
      setBulletListStyle:
        (style: string) =>
        ({ chain }: { chain: () => { updateAttributes: (a: string, b: object) => { run: () => boolean }; }; }) =>
          chain().updateAttributes('bulletList', { 'data-list-style': style || 'disc' }).run(),
    };
  },
});
