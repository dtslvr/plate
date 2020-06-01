import React, { useMemo, useState } from 'react';
import {
  EditablePlugins,
  HeadingPlugin,
  ParagraphPlugin,
  pipe,
} from '@udecode/slate-plugins/src';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { initialValueHugeDocument, nodeTypes } from '../config/initialValues';

export default {
  title: 'Examples/Huge Document',
};

const plugins = [ParagraphPlugin(nodeTypes), HeadingPlugin(nodeTypes)];

const withPlugins = [withReact, withHistory] as const;

export const Example = () => {
  const [value, setValue] = useState(initialValueHugeDocument);

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <EditablePlugins plugins={plugins} spellCheck autoFocus />
    </Slate>
  );
};
