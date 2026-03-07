'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { TextStyle, FontFamily, FontSize, LineHeight } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useEffect, useState } from 'react';
import { OrderedList } from '@tiptap/extension-list';
import { BulletListWithStyle } from './list-styles';
import { ParagraphSpacing } from './paragraph-spacing';

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
const FONT_FAMILIES = [
  { label: 'Default', value: '' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Palatino', value: 'Palatino Linotype, Book Antiqua, serif' },
  { label: 'Garamond', value: 'Garamond, Baskerville, serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
  { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
  { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { label: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
  { label: 'System UI', value: 'system-ui, sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Monospace', value: 'ui-monospace, monospace' },
];

const LINE_HEIGHTS = [
  { label: 'Line spacing', value: '' },
  { label: 'Single (1)', value: '1' },
  { label: '1.15', value: '1.15' },
  { label: '1.25', value: '1.25' },
  { label: '1.5', value: '1.5' },
  { label: '1.75', value: '1.75' },
  { label: 'Double (2)', value: '2' },
  { label: '2.5', value: '2.5' },
  { label: '3', value: '3' },
];

const PARAGRAPH_SPACINGS = [
  { label: 'Paragraph spacing', value: '' },
  { label: 'Compact (0.5em)', value: '0.5em' },
  { label: 'Normal (0.75em)', value: '0.75em' },
  { label: '1em', value: '1em' },
  { label: '1.25em', value: '1.25em' },
  { label: '1.5em', value: '1.5em' },
  { label: 'Relaxed (1.75em)', value: '1.75em' },
  { label: '2em', value: '2em' },
  { label: 'Loose (2.5em)', value: '2.5em' },
];

const BULLET_STYLES = [
  { label: '• Disc', value: 'disc' },
  { label: '◦ Circle', value: 'circle' },
  { label: '▪ Square', value: 'square' },
  { label: '◆ Diamond', value: 'diamond' },
  { label: '► Arrow', value: 'arrow' },
  { label: '✓ Check', value: 'check' },
  { label: '– Dash', value: 'dash' },
  { label: '★ Star', value: 'star' },
  { label: '▸ Triangle', value: 'triangle' },
  { label: '» Double arrow', value: 'double-arrow' },
  { label: '+ Plus', value: 'plus' },
  { label: '* Asterisk', value: 'asterisk' },
  { label: '♥ Heart', value: 'heart' },
  { label: '— Long dash', value: 'long-dash' },
  { label: '● Filled circle', value: 'circle-filled' },
  { label: '▪ Small square', value: 'square-small' },
  { label: '☐ Outline square', value: 'square-outline' },
  { label: '◦ Ring', value: 'ring' },
  { label: '♦ Diamond outline', value: 'diamond-outline' },
  { label: '→ Right arrow', value: 'arrow-right' },
] as const;

const ORDERED_STYLES = [
  { label: '1. Numbers', value: '1' },
  { label: 'A. Upper alpha', value: 'A' },
  { label: 'a. Lower alpha', value: 'a' },
  { label: 'I. Upper roman', value: 'I' },
  { label: 'i. Lower roman', value: 'i' },
] as const;

const LinkExtension = Link.configure({
  openOnClick: false,
  HTMLAttributes: {
    target: '_blank',
    rel: 'noopener noreferrer',
    class: 'editor-link',
  },
});

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`min-w-[36px] h-9 px-2 rounded border border-border-muted bg-white text-charcoal hover:bg-ivory disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
        active ? 'bg-navy/10 border-navy/30 text-navy' : ''
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = linkUrl.trim() || previousUrl;
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setLinkUrl('');
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const unsetLink = useCallback(() => {
    editor?.chain().focus().unsetLink().run();
    setShowLinkInput(false);
    setLinkUrl('');
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border border-border-muted border-b-0 rounded-t-sm bg-ivory/50">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        disabled={!editor.isEditable}
        title="Bold"
      >
        <span className="font-bold text-sm">B</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        disabled={!editor.isEditable}
        title="Italic"
      >
        <span className="italic text-sm">I</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        disabled={!editor.isEditable}
        title="Underline"
      >
        <span className="underline text-sm">U</span>
      </ToolbarButton>

      <span className="w-px h-6 bg-border-muted mx-1" aria-hidden />

      <select
        title="Font size"
        value={editor.getAttributes('textStyle').fontSize || ''}
        onChange={(e) => {
          const v = e.target.value;
          if (v) editor.chain().focus().setFontSize(v).run();
          else editor.chain().focus().unsetFontSize().run();
        }}
        disabled={!editor.isEditable}
        className="h-9 px-2 rounded border border-border-muted bg-white text-charcoal text-sm min-w-[72px] disabled:opacity-50"
      >
        <option value="">Size</option>
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <select
        title="Font"
        value={editor.getAttributes('textStyle').fontFamily || ''}
        onChange={(e) => {
          const v = e.target.value;
          if (v) editor.chain().focus().setFontFamily(v).run();
          else editor.chain().focus().unsetFontFamily().run();
        }}
        disabled={!editor.isEditable}
        className="h-9 px-2 rounded border border-border-muted bg-white text-charcoal text-sm min-w-[120px] disabled:opacity-50"
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f.value || 'default'} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      <select
        title="Line spacing"
        value={editor.getAttributes('textStyle').lineHeight || ''}
        onChange={(e) => {
          const v = e.target.value;
          if (v) editor.chain().focus().setLineHeight(v).run();
          else editor.chain().focus().unsetLineHeight().run();
        }}
        disabled={!editor.isEditable}
        className="h-9 px-2 rounded border border-border-muted bg-white text-charcoal text-sm min-w-[100px] disabled:opacity-50"
      >
        {LINE_HEIGHTS.map((h) => (
          <option key={h.value || 'default'} value={h.value}>
            {h.label}
          </option>
        ))}
      </select>

      <select
        title="Paragraph spacing"
        value={editor.getAttributes('paragraph').marginBottom || ''}
        onChange={(e) => {
          const v = e.target.value;
          if (v) (editor.chain().focus() as any).setParagraphSpacing(v).run();
          else (editor.chain().focus() as any).unsetParagraphSpacing().run();
        }}
        disabled={!editor.isEditable}
        className="h-9 px-2 rounded border border-border-muted bg-white text-charcoal text-sm min-w-[120px] disabled:opacity-50"
      >
        {PARAGRAPH_SPACINGS.map((s) => (
          <option key={s.value || 'default'} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <span className="w-px h-6 bg-border-muted mx-1" aria-hidden />

      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          disabled={!editor.isEditable}
          title="Bullet list"
        >
          <span className="text-sm">•</span>
        </ToolbarButton>
        {editor.isActive('bulletList') && (
          <select
            title="Bullet style"
            value={(editor.getAttributes('bulletList') as Record<string, string>)?.['data-list-style'] || 'disc'}
            onChange={(e) => (editor.chain().focus() as any).setBulletListStyle(e.target.value).run()}
            disabled={!editor.isEditable}
            className="h-9 px-1.5 rounded border border-border-muted bg-white text-charcoal text-xs min-w-0 max-w-[130px] disabled:opacity-50"
          >
            {BULLET_STYLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          disabled={!editor.isEditable}
          title="Numbered list"
        >
          <span className="text-sm">1.</span>
        </ToolbarButton>
        {editor.isActive('orderedList') && (
          <select
            title="Number style"
            value={editor.getAttributes('orderedList').type || '1'}
            onChange={(e) =>
              editor.chain().focus().updateAttributes('orderedList', { type: e.target.value || null }).run()
            }
            disabled={!editor.isEditable}
            className="h-9 px-1.5 rounded border border-border-muted bg-white text-charcoal text-xs min-w-0 max-w-[100px] disabled:opacity-50"
          >
            {ORDERED_STYLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <span className="w-px h-6 bg-border-muted mx-1" aria-hidden />

      <div className="relative">
        <ToolbarButton
          onClick={() => {
            const attrs = editor.getAttributes('link').href;
            setLinkUrl(attrs || '');
            setShowLinkInput((s) => !s);
          }}
          active={editor.isActive('link')}
          disabled={!editor.isEditable}
          title="Insert link"
        >
          <span className="text-sm">Link</span>
        </ToolbarButton>
        {showLinkInput && (
          <div className="absolute left-0 top-full mt-1 z-10 flex gap-1 p-2 bg-white border border-border-muted rounded shadow-lg">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="w-48 px-2 py-1.5 text-sm border border-border-muted rounded"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setLink();
                if (e.key === 'Escape') setShowLinkInput(false);
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={setLink}
              className="px-2 py-1.5 text-sm bg-navy text-white rounded hover:bg-navy/90"
            >
              OK
            </button>
            <button
              type="button"
              onClick={unsetLink}
              className="px-2 py-1.5 text-sm border border-border-muted rounded hover:bg-ivory"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your blog post content here...',
  disabled = false,
  minHeight = '320px',
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ bulletList: false, orderedList: false }),
      BulletListWithStyle,
      OrderedList,
      Underline,
      LinkExtension,
      TextStyle,
      FontFamily.configure({ types: ['textStyle'] }),
      FontSize.configure({ types: ['textStyle'] }),
      LineHeight.configure({ types: ['textStyle'] }),
      ParagraphSpacing,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[200px] px-4 py-3 focus:outline-none text-charcoal',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  return (
    <div className="rounded-sm border border-border-muted overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        style={{ minHeight }}
        className="block border-t-0 bg-white"
      />
    </div>
  );
}
