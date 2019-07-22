
/**
 * @params {Number} start
 * @params {Number} end
 * @params {Array} ranges
 * @return {Array<JSON>} ranges
 */
export const getRanges = ({ start, end, color }, ranges) => {
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
  newRanges.push({ start, end, color });
  return newRanges;
};

/**
 * @params {String} start
 * @params {Array} ranges
 * @return {String} highlightText
 */
export const highlightText = (text, ranges) => {
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
