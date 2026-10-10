import { getLanguage } from 'obsidian';

const en = {
	'command.lint-current': 'Lint the current filename',
	'command.lint-all': 'Lint all filenames in the vault',

	'notice.renamed': '"{old}" renamed to "{new}"',
	'notice.rename-failed':
		'Unable to rename "{old}" to "{new}". There probably already exists a file with this name',
	'notice.linting-all': 'Linting all filenames...',
	'notice.linted-all': 'Linted all filenames',

	'settings.intro':
		'Note that Obsidian will automatically truncate multiple spaces in filenames and [[links]] into one space.',
	'settings.auto-lint.name': 'Lint automatically',
	'settings.auto-lint.desc':
		'Lint filenames automatically when files are created or renamed, including files added by sync.',

	'option.off': 'off',
	'option.blank': 'empty string',
	'option.space': 'space',
	'option.hyphen': 'hyphen',
	'option.hyphen-space': 'hyphen surrounded by spaces',

	'settings.obsidian.heading': 'Obsidian troublesome characters',
	'settings.obsidian.desc':
		"Obsidian itself won't let you use these in filenames and will remove them automatically. However, if you create files via external means they can creep in. These characters wreak havoc with [[links]] syntax.",
	'settings.android.heading': 'Android invalid characters',
	'settings.android.desc':
		'Obsidian for Android will not allow you to create filenames with these characters, but external programs and other Obsidian platforms will. If you sync your vault between Android and non-Android systems using git or other means, these may cause you issues.',

	'settings.replacement.name': 'Replacement for {name}',
	'settings.replacement.desc': 'Specify the replacement for {chars}',
	'settings.replacement.and': '{a} and {b}',

	'char.square-brackets': 'square brackets',
	'char.number-sign': 'number sign',
	'char.caret': 'caret',
	'char.pipe': 'pipe',
	'char.colon': 'colon',
	'char.asterisk': 'asterisk',
	'char.question-mark': 'question mark',
	'char.double-quote': 'double quote',
	'char.angle-brackets': 'angle brackets',
};

export type TranslationKey = keyof typeof en;

const ca: Record<TranslationKey, string> = {
	'command.lint-current': 'Corregeix el nom de la nota actual',
	'command.lint-all': "Corregeix tots els noms d'arxiu del vault",

	'notice.renamed': "«{old}» s'ha reanomenat a «{new}»",
	'notice.rename-failed':
		"No s'ha pogut reanomenar «{old}» a «{new}». Probablement ja existeix un arxiu amb aquest nom",
	'notice.linting-all': "S'estan corregint tots els noms d'arxiu...",
	'notice.linted-all': "S'han corregit tots els noms d'arxiu",

	'settings.intro':
		"Tingues en compte que Obsidian redueix automàticament els espais repetits dels noms d'arxiu i dels [[enllaços]] a un sol espai.",
	'settings.auto-lint.name': 'Corregeix automàticament',
	'settings.auto-lint.desc':
		"Corregeix els noms d'arxiu automàticament quan es crea o es reanomena un arxiu, també quan arriba per sincronització.",

	'option.off': 'desactivat',
	'option.blank': 'eliminar',
	'option.space': 'espai',
	'option.hyphen': 'guionet',
	'option.hyphen-space': 'guionet entre espais',

	'settings.obsidian.heading': 'Caràcters problemàtics per a Obsidian',
	'settings.obsidian.desc':
		"Obsidian no et deixa fer servir aquests caràcters als noms d'arxiu i els elimina automàticament. Però si crees arxius per altres mitjans, s'hi poden colar. Aquests caràcters trenquen la sintaxi dels [[enllaços]].",
	'settings.android.heading': 'Caràcters no vàlids a Android',
	'settings.android.desc':
		"Obsidian per a Android no et deixa crear noms d'arxiu amb aquests caràcters, però els programes externs i Obsidian en altres plataformes sí. Si sincronitzes el vault entre Android i altres sistemes amb git o per altres mitjans, et poden donar problemes.",

	'settings.replacement.name': 'Substitució: {name}',
	'settings.replacement.desc': 'Indica per què se substitueix {chars}',
	'settings.replacement.and': '{a} i {b}',

	'char.square-brackets': 'claudàtors',
	'char.number-sign': 'coixinet',
	'char.caret': 'accent circumflex',
	'char.pipe': 'barra vertical',
	'char.colon': 'dos punts',
	'char.asterisk': 'asterisc',
	'char.question-mark': "signe d'interrogació",
	'char.double-quote': 'cometes dobles',
	'char.angle-brackets': 'parèntesis angulars',
};

// Language codes as returned by getLanguage().
// See https://github.com/obsidianmd/obsidian-translations#existing-languages
const translations: Record<string, Record<TranslationKey, string>> = { en, ca };

// Translate a key into the app language, falling back to English.
// Placeholders such as {name} are replaced with the matching value in vars.
export function t(
	key: TranslationKey,
	vars: Record<string, string> = {},
): string {
	const strings = translations[getLanguage()] ?? en;
	return strings[key].replace(/\{(\w+)\}/g, (match, name) =>
		name in vars ? vars[name] : match,
	);
}
