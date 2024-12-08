import {
  layer,
  map, Modifier,
  NumberKeyValue,
  rule, simlayer, ToEvent, ToKeyCode,
  withMapper,
  writeToProfile,
} from 'karabiner.ts'


// const keys: Record<string, ToEvent> = {
//   delete: { key_code: 'delete_or_backspace' },
//   return: { key_code: 'return_or_enter' },
//   tilde: { key_code: 'grave_accent_and_tilde' },
//
//   // Named Symbols
//   open_brace: { key_code: 'open_bracket', modifiers: ['shift'] },
//   close_brace: { key_code: 'close_bracket', modifiers: ['shift'] },
//   open_paren: { key_code: '9', modifiers: ['shift'] },
//   close_paren: { key_code: '0', modifiers: ['shift'] },
//   less_than: { key_code: 'comma', modifiers: ['shift'] },
//   greater_than: { key_code: 'period', modifiers: ['shift'] },
// };


// Hilfsfunktion zur Erstellung eines gültigen ToEvent
function createToEvent(key_code: string, modifiers?: string[]): ToEvent {
  return {
    key_code: key_code as ToKeyCode,
    modifiers: modifiers?.map(mod => mod as Modifier),
  };
}

// Deine Mapping-Definition mit Strings und deklarativer Syntax
const keys = {
  delete: createToEvent('delete_or_backspace'),
  return: createToEvent('return_or_enter'),
  tilde: createToEvent('grave_accent_and_tilde'),

  // Named Symbols
  open_brace: createToEvent('open_bracket', ['shift']),
  close_brace: createToEvent('close_bracket', ['shift']),
  open_paren: createToEvent('9', ['shift']),
  close_paren: createToEvent('0', ['shift']),
  less_than: createToEvent('comma', ['shift']),
  greater_than: createToEvent('period', ['shift']),
};

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('karabiner.ts', [
  // It is not required, but recommended to put symbol alias to layers,
  // (If you type fast, use simlayer instead, see https://evan-liu.github.io/karabiner.ts/rules/simlayer)
  // to make it easier to write '←' instead of 'left_arrow'.
  // Supported alias: https://github.com/evan-liu/karabiner.ts/blob/main/src/utils/key-alias.ts
  // layer('/', 'symbol-mode').manipulators([
  //   //     / + [ 1    2    3    4    5 ] =>
  //   withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
  //     map((i + 1) as NumberKeyValue).toPaste(k),
  //   ),
  //   withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
  //     map(k).toPaste(k),
  //   ),
  // ]),


  rule('Caps Lock → Hyper').manipulators([
    map('caps_lock').toHyper().toIfAlone('caps_lock'),
  ]),

  simlayer('spacebar', 'spacebar-mode').manipulators([
    map('a').to('open_bracket'), // [
    map('s').to('close_bracket'), // ]
    map('d').to({key_code: 'open_bracket', modifiers: ['shift']}), // {
    map('f').to({key_code: 'close_bracket', modifiers: ['shift']}), // }
    map('j').to(keys.open_paren),    // {
    map('k').to(keys.close_paren),   // }
    map('l').to(keys.less_than),     // <
    map('semicolon').to(keys.greater_than), // >

  ]),
])
