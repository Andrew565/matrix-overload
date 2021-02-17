interface PhrasesObject {
  [x: string]: Phrase;
}

interface Phrase {
  [locale: string]: string | ((...args: string[]) => string);
}

const Phrases: PhrasesObject = {
  hello: { "en-us": "Hello World!", "es-mx": "Hola Mundo!" },
  complicated: { "en-us": (add) => `${add} is complicated.`, "es-mx": (add) => `${add} es complicado.` },
};

const l = Phrases;

let locale = window.navigator.language;
const localize = (key: Phrase, ...args: string[]) => {
  const phrase = key?.[locale];
  return typeof phrase === "function" ? phrase(...args) : phrase;
};

console.log(localize(l.hello));
console.log(localize(l.complicated, "Localization"));

// Testing Spanish
locale = "es-mx";
console.log(localize(l.hello));
console.log(localize(l.complicated, "El taco bonito"));
