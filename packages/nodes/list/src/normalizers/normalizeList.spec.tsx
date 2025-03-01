/** @jsx jsx */

import { createPlateUIEditor } from '@udecode/plate/src';
import { getNode, PlateEditor } from '@udecode/plate-core';
import { jsx } from '@udecode/plate-test-utils';
import { Editor } from 'slate';
import { createListPlugin } from '../createListPlugin';

jsx;

const testNormalize = (input: PlateEditor, output: PlateEditor): void => {
  const editor = createPlateUIEditor({
    editor: input,
    plugins: [createListPlugin()],
  });

  Editor.normalize(editor, { force: true });

  expect(input.children).toEqual(output.children);
};

describe('merge lists', () => {
  it('should not merge lists with different type', () => {
    const input = ((
      <editor>
        <hul>
          <hli>
            <hlic>1</hlic>
          </hli>
        </hul>
        <hol>
          <hli>
            <hlic>2</hlic>
          </hli>
        </hol>
      </editor>
    ) as any) as PlateEditor;

    const output = ((
      <editor>
        <hul>
          <hli>
            <hlic>1</hlic>
          </hli>
        </hul>
        <hol>
          <hli>
            <hlic>2</hlic>
          </hli>
        </hol>
      </editor>
    ) as any) as PlateEditor;

    testNormalize(input, output);
  });

  it('should merge the next list if it has the same type', () => {
    const input = ((
      <editor>
        <hul>
          <hli>
            <hlic>1</hlic>
          </hli>
        </hul>
        <hul>
          <hli>
            <hlic>2</hlic>
          </hli>
        </hul>
      </editor>
    ) as any) as PlateEditor;

    const output = ((
      <editor>
        <hul>
          <hli>
            <hlic>1</hlic>
          </hli>
          <hli>
            <hlic>2</hlic>
          </hli>
        </hul>
      </editor>
    ) as any) as PlateEditor;

    testNormalize(input, output);
  });

  it('should merge the previous list if it has the same type', () => {
    const input = ((
      <editor>
        <hul>
          <hli>
            <hlic>1</hlic>
          </hli>
        </hul>
        <hul>
          <hli>
            <hlic>2</hlic>
          </hli>
        </hul>
      </editor>
    ) as any) as PlateEditor;

    const output = ((
      <editor>
        <hul>
          <hli>
            <hlic>1</hlic>
          </hli>
          <hli>
            <hlic>2</hlic>
          </hli>
        </hul>
      </editor>
    ) as any) as PlateEditor;

    testNormalize(input, output);
  });
});

describe('clean up lists', () => {
  it('should remove list without list items', () => {
    const input = ((
      <editor>
        <hul />
      </editor>
    ) as any) as PlateEditor;

    const output = ((<editor />) as any) as PlateEditor;

    testNormalize(input, output);
  });

  it('should only allow li to be child of ul', () => {
    const input = ((
      <editor>
        <hul>
          <hp>bad</hp>
          <hli>
            <hlic>ok</hlic>
          </hli>
          <hp>bad</hp>
        </hul>
      </editor>
    ) as any) as PlateEditor;

    const output = ((
      <editor>
        <hul>
          <hli>
            <hlic>bad</hlic>
          </hli>
          <hli>
            <hlic>ok</hlic>
          </hli>
          <hli>
            <hlic>bad</hlic>
          </hli>
        </hul>
      </editor>
    ) as any) as PlateEditor;

    testNormalize(input, output);
  });
});
