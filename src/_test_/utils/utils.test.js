import { highlightText, getRanges } from '../../utils';

describe('Utils test', () => {
  describe('highlightText', () => {
    it('Should highlight text', () => {
      const ranges = [{ start: 0, end: 11, color: 'green' }];
      const text = 'Hello world test text';
      const highlightedText = highlightText(text, ranges);
      expect(highlightedText).toBe('<span class="green">Hello world</span> test text');
    });
  });
  describe('getRanges', () => {
    it('Should add the new range', () => {
      const ranges = [];
      const range = { start: 0, end: 2, color: 'red' };
      const newRanges = getRanges(range, ranges);
      expect(newRanges.length).toBe(1);
      expect(range).toEqual(newRanges[0]);
    });
    it('Should move existing range to the left', () => {
      const ranges = [{ start: 0, end: 10, color: 'red' }];
      const range = { start: 8, end: 15, color: 'green' };
      const newRanges = getRanges(range, ranges);
      expect(newRanges.length).toBe(2);
      expect({ start: 0, end: range.start, color: 'red' }).toEqual(newRanges[0]);
    });
    it('Should move existing range to the right', () => {
      const ranges = [{ start: 13, end: 22, color: 'red' }];
      const range = { start: 0, end: 15, color: 'green' };
      const newRanges = getRanges(range, ranges);
      expect(newRanges.length).toBe(2);
      expect({ start: range.end, end: 22, color: 'red' }).toEqual(newRanges[0]);
    });
    it('Should remove inner ranges', () => {
      const ranges = [{ start: 10, end: 20, color: 'red' }, { start: 22, end: 40, color: 'red' }];
      const range = { start: 0, end: 50, color: 'green' };
      const newRanges = getRanges(range, ranges);
      expect(newRanges.length).toBe(1);
      expect(range).toEqual(newRanges[0]);
    });
    it('Should split existing range when new range is inside', () => {
      const ranges = [{ start: 0, end: 22, color: 'red' }];
      const range = { start: 10, end: 15, color: 'green' };
      const newRanges = getRanges(range, ranges);
      expect(newRanges.length).toBe(3);
      expect({ start: 0, end: range.start, color: 'red' }).toEqual(newRanges[0]);
      expect({ start: range.end, end: 22, color: 'red' }).toEqual(newRanges[1]);
    });
  });
});