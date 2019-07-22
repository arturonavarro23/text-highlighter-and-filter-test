import React, { useRef } from 'react';
import { useStateValue } from '../../store/providers/textProvider';
import { setText, modifyRanges } from '../../store/actions';
import { getRanges, highlightText } from '../../utils';

import './TextHighlighter.scss';

const TextHighlighter = () => {
  const [{ selectedColor, ranges, text }, dispatch] = useStateValue();
  const editorRef = useRef(null);
  const textAreaRef = useRef(null);

  const onScroll = e => {
    editorRef.current.scrollTop = e.target.scrollTop;
  };

  const onChange = e => {
    dispatch(setText(e.target.value));
  };

  const onMouseUp = () => {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    // Check if user just click the textarea
    if (selectionStart !== selectionEnd && selectedColor) {
      setRange(selectionStart, selectionEnd);
    }
  };

  const setRange = (start, end) => {
    const newRanges = getRanges({ start, end, color: selectedColor }, ranges);
    dispatch(modifyRanges(newRanges));
  };

  return (
    <div className="text-highlighter">
      <textarea
        className="text-editor"
        ref={textAreaRef}
        value={text}
        onChange={onChange}
        onMouseUp={onMouseUp}
        onScroll={onScroll}
      />
      <div
        ref={editorRef}
        className="text-editor display"
        dangerouslySetInnerHTML={{
          __html: highlightText(text, ranges),
        }}
      />
    </div>
  );
}

export default TextHighlighter;
