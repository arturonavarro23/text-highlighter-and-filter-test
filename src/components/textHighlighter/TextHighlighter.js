import React, { useRef } from 'react';
import { useStateValue } from '../../store/providers/textProvider';
import { setText, modifyRanges } from '../../store/actions';

import './TextHighlighter.scss';

const TextHighlighter = () => {
  const [{ selectedColor, ranges, text }, dispatch] = useStateValue();
  const editorRef = useRef(null);
  const textAreaRef = useRef(null);

  const onScroll= e => {
    editorRef.current.scrollTop = e.target.scrollTop;
  };

  const onChange = e => {
    dispatch(setText(e.target.value));
  };

  const onMouseUp = () => {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    // Check if user just clic the textarea
    if (selectionStart !== selectionEnd && selectedColor) {
      setRange(selectionStart, selectionEnd);
    }
  };

  const setRange = (start, end) => {
    // Remove all the ranges that are inside the new one
    const newRanges = ranges.filter(r => !(r.start >= start && r.end <= end));

    // Find if we have some intersections
    for (let i = 0; i < newRanges.length; i++) {
      let range = newRanges[i];
      // if the new range is between existing range
      if (range.start <= start && range.end >= end) {
        newRanges.push({
          start: end - 1,
          end: range.end,
          color: newRanges[i].color,
        });
        newRanges[i].end = start;
      // if the new range is before the an existing range
      } else if (range.start < start && range.end >= start) {
        newRanges[i].end = range.end === start ? range.end - 1 : range.end - (range.end - start);
      // if the new range after an existing range
      } else if (range.start <= end && range.end > end) {
        newRanges[i].start = range.start === end ? range.start + 1 : range.start + (end - range.start);
      }
    }

    newRanges.push({ start, end, color: selectedColor });
    dispatch(modifyRanges(newRanges));
  };

  const parseRanges = text => {
    let newText, extraChars = 0;
    const sortedRanges = ranges.slice(0)
      .sort((r, t )=> r.start - t.start);
    sortedRanges.forEach(r => {
      const currentText = extraChars > 0 ? newText : text;
      const wordsToReplace = text.substring(r.start, r.end);
      const textToHighlight = `<span class="${r.color}">${wordsToReplace}</span>`;
      newText = currentText.substr(0, r.start + extraChars) + textToHighlight + currentText.substr(r.end + extraChars);
      extraChars += textToHighlight.length - wordsToReplace.length;
    });
    return newText;
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
          __html: parseRanges(text),
        }}
      />
    </div>
  );
}

export default TextHighlighter;
