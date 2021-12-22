/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import colorNamer from 'color-namer';
const colors = require('tailwindcss/colors');

function hexToRgb(hex) {
  const sanitizedHex = hex.replace('/##/g', '#');
  const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    sanitizedHex
  );

  if (!colorParts) {
    return null;
  }

  const [, r, g, b] = colorParts;

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
}

function rgbToHex(r, g, b) {
  const toHex = (c) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getTextColor(color) {
  const rgbColor = hexToRgb(color);

  if (!rgbColor) {
    return '#333';
  }

  const { r, g, b } = rgbColor;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 120 ? '#FFF' : '#333';
}

function lighten(hex, intensity) {
  const color = hexToRgb(`${hex}`);

  if (!color) {
    return '';
  }

  const r = Math.round(color.r + (255 - color.r) * intensity);
  const g = Math.round(color.g + (255 - color.g) * intensity);
  const b = Math.round(color.b + (255 - color.b) * intensity);

  return rgbToHex(r, g, b);
}

function darken(hex, intensity) {
  const color = hexToRgb(hex);

  if (!color) {
    return '';
  }

  const r = Math.round(color.r * intensity);
  const g = Math.round(color.g * intensity);
  const b = Math.round(color.b * intensity);

  return rgbToHex(r, g, b);
}

export function getColorName(color) {
  const { name } = colorNamer(`#${color}`.replace('##', '#')).ntc[0];
  const sanitizedName = name
    .replace(/['/]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  return sanitizedName;
}

export default function Named(baseColor) {
  let defaultTailwind = {
    D97706: colors.amber,
    EA580C: colors.orange,
    '65A30D': colors.lime,
    '059669': colors.emerald,
    '0D9488': colors.teal,
    '0891B2': colors.cyan,
    '0284C7': colors.sky,
    '4F46E5': colors.indigo,
    '7C3AED': colors.violet,
    E11D48: colors.rose,
    C026D3: colors.fuchsia,
    DB2777: colors.pink,
  };

  if (defaultTailwind[baseColor.replace('#', '')]) {
    for (let color in defaultTailwind[baseColor.replace('#', '')]) {
      document.documentElement.style.setProperty(
        `--base-${color}`,
        defaultTailwind[baseColor.replace('#', '')][color]
      );
    }
  } else {
    const name = getColorName(baseColor);

    const response = {
      name,
      colors: {
        500: `#${baseColor}`.replace('##', '#'),
      },
    };

    const intensityMap = {
      50: 0.95,
      100: 0.9,
      200: 0.75,
      300: 0.6,
      400: 0.3,
      600: 0.9,
      700: 0.75,
      800: 0.6,
      900: 0.49,
    };

    [50, 100, 200, 300, 400].forEach((level) => {
      response.colors[level] = lighten(baseColor, intensityMap[level]);
    });

    [600, 700, 800, 900].forEach((level) => {
      response.colors[level] = darken(baseColor, intensityMap[level]);
    });

    for (let color in response.colors) {
      document.documentElement.style.setProperty(
        `--base-${color}`,
        response.colors[color]
      );
    }
  }
}
