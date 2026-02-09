import {expect} from 'chai';
import {countUnicode} from './count-unicode.js';

describe('countUnicode', function () {
  describe('basic strings', function () {
    it('should return 0 for empty string', function () {
      expect(countUnicode('')).to.equal(0);
    });

    it('should correctly count ASCII characters', function () {
      expect(countUnicode('hello')).to.equal(5);
      expect(countUnicode('test123')).to.equal(7);
    });

    it('should correctly count string with spaces', function () {
      expect(countUnicode('hello world')).to.equal(11);
    });

    it('should correctly count string with special characters', function () {
      expect(countUnicode('!@#$%^&*()')).to.equal(10);
    });
  });

  describe('Unicode characters', function () {
    it('should correctly count Cyrillic characters', function () {
      expect(countUnicode('привет')).to.equal(6);
      expect(countUnicode('Тест')).to.equal(4);
    });

    it('should correctly count Chinese characters', function () {
      expect(countUnicode('你好')).to.equal(2);
      expect(countUnicode('世界')).to.equal(2);
    });

    it('should correctly count Arabic characters', function () {
      expect(countUnicode('مرحبا')).to.equal(5);
    });
  });

  describe('characters outside BMP (emoji and composite characters)', function () {
    it('should count simple emoji as one character', function () {
      expect(countUnicode('😀')).to.equal(1);
      expect(countUnicode('🎉')).to.equal(1);
      expect(countUnicode('❤️')).to.equal(2); // heart + variation selector
    });

    it('should correctly count string with multiple emoji', function () {
      expect(countUnicode('😀😃😄')).to.equal(3);
    });

    it('should correctly count text with emoji', function () {
      expect(countUnicode('Hello 👋 World')).to.equal(13);
      expect(countUnicode('Тест 🎉')).to.equal(6);
    });

    it('should correctly count composite emoji (ZWJ sequences)', function () {
      expect(countUnicode('👨‍👩‍👧‍👦')).to.equal(7); // family (4 emoji + 3 ZWJ)
      expect(countUnicode('👍🏻')).to.equal(2); // thumbs up + skin tone modifier
    });

    it('should correctly count rare characters outside BMP', function () {
      expect(countUnicode('𠮷')).to.equal(1); // rare Chinese character
      expect(countUnicode('𝕳𝖊𝖑𝖑𝖔')).to.equal(5); // mathematical symbols
    });
  });

  describe('line breaks and special characters', function () {
    it('should count line breaks', function () {
      expect(countUnicode('line1\nline2')).to.equal(11);
      expect(countUnicode('text\r\ntext')).to.equal(10);
    });

    it('should count tabs', function () {
      expect(countUnicode('a\tb\tc')).to.equal(5);
    });

    it('should count mixed whitespace characters', function () {
      expect(countUnicode(' \t\n\r')).to.equal(4);
    });
  });

  describe('edge cases and type coercion', function () {
    it('should handle numbers', function () {
      expect(countUnicode(123)).to.equal(3);
      expect(countUnicode(0)).to.equal(1);
    });

    it('should handle boolean values', function () {
      expect(countUnicode(true)).to.equal(4);
      expect(countUnicode(false)).to.equal(5);
    });

    it('should handle null and undefined', function () {
      expect(countUnicode(null)).to.equal(4);
      expect(countUnicode(undefined)).to.equal(9);
    });

    it('should handle objects', function () {
      expect(countUnicode({})).to.equal(15);
      expect(countUnicode([])).to.equal(0);
    });

    it('should handle very long strings', function () {
      const longString = 'a'.repeat(10000);
      expect(countUnicode(longString)).to.equal(10000);
    });

    it('should handle string consisting only of emoji', function () {
      const emojiString = '😀'.repeat(100);
      expect(countUnicode(emojiString)).to.equal(100);
    });
  });

  describe('mixed cases', function () {
    it('should correctly count mix of different character types', function () {
      expect(countUnicode('Hello世界🌍!')).to.equal(9);
      expect(countUnicode('Привет 😊 мир 🌎')).to.equal(14);
    });

    it('should correctly handle string with surrogate pairs', function () {
      expect(countUnicode('\uD83D\uDE00')).to.equal(1); // 😀
      expect(countUnicode('\uD834\uDD1E')).to.equal(1); // 𝄞 (musical symbol)
    });
  });
});
