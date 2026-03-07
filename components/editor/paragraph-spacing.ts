import { Extension } from '@tiptap/core';

/** Adds paragraph spacing (margin-bottom) to paragraph nodes. */
export const ParagraphSpacing = Extension.create({
  name: 'paragraphSpacing',

  addOptions() {
    return {
      types: ['paragraph'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          marginBottom: {
            default: null,
            parseHTML: (element) => {
              const style = element.getAttribute('style');
              if (!style) return null;
              const match = style.match(/margin-bottom:\s*([^;]+)/);
              return match ? match[1].trim() : null;
            },
            renderHTML: (attributes) => {
              if (!attributes.marginBottom) return {};
              return { style: `margin-bottom: ${attributes.marginBottom}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setParagraphSpacing:
        (marginBottom: string | null) =>
        ({ chain }: { chain: () => { updateAttributes: (node: string, attrs: object) => { run: () => boolean } } }) =>
          chain().updateAttributes('paragraph', { marginBottom }).run(),

      unsetParagraphSpacing:
        () =>
        ({ chain }: { chain: () => { updateAttributes: (node: string, attrs: object) => { run: () => boolean } } }) =>
          chain().updateAttributes('paragraph', { marginBottom: null }).run(),
    };
  },
});
