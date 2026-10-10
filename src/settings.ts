import { App, DropdownComponent, PluginSettingTab, Setting } from 'obsidian';
import type AndroidSafeFilenames from './main';
import type { AndroidSafeFilenamesSettings } from './main';
import { t, TranslationKey } from './i18n';

// Settings that hold a replacement option for a group of characters
type ReplacementSettingKey = Exclude<
	keyof AndroidSafeFilenamesSettings,
	'autoLint'
>;

export default class AndroidSafeFilenamesSettingTab extends PluginSettingTab {
	plugin: AndroidSafeFilenames;

	constructor(app: App, plugin: AndroidSafeFilenames) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		this.intro();
		this.autoLint();
		this.obsidianChars();
		this.androidChars();
		this.otherChars();
	}

	intro(): void {
		const { containerEl } = this;

		containerEl.createEl('p', {
			text: t('settings.intro'),
		});
	}

	autoLint(): void {
		const { containerEl } = this;

		// Setting for automatic linting
		new Setting(containerEl)
			.setName(t('settings.auto-lint.name'))
			.setDesc(t('settings.auto-lint.desc'))
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.autoLint);
				toggle.onChange(async (value) => {
					this.plugin.settings.autoLint = value;
					await this.plugin.saveSettings();
				});
			});
	}

	addReplacementOptions(dropdown: DropdownComponent): void {
		dropdown.addOption('off', t('option.off'));
		dropdown.addOption('blank', t('option.blank'));
		dropdown.addOption('space', t('option.space'));
		dropdown.addOption('hyphen', t('option.hyphen'));
		dropdown.addOption('hyphen-space', t('option.hyphen-space'));
	}

	addReplacementSetting(
		key: ReplacementSettingKey,
		name: TranslationKey,
		chars: string,
	): void {
		new Setting(this.containerEl)
			.setName(t('settings.replacement.name', { name: t(name) }))
			.setDesc(t('settings.replacement.desc', { chars }))
			.addDropdown((dropdown) => {
				this.addReplacementOptions(dropdown);
				dropdown.setValue(this.plugin.settings[key]);
				dropdown.onChange(async (value) => {
					this.plugin.settings[key] = value;
					await this.plugin.saveSettings();
				});
			});
	}

	obsidianChars(): void {
		const { containerEl } = this;

		containerEl.createEl('h2', { text: t('settings.obsidian.heading') });
		containerEl.createEl('p', {
			text: t('settings.obsidian.desc'),
		});

		this.addReplacementSetting(
			'squareBrackets',
			'char.square-brackets',
			t('settings.replacement.and', { a: '[', b: ']' }),
		);
		this.addReplacementSetting('numberSign', 'char.number-sign', '#');
		this.addReplacementSetting('caret', 'char.caret', '^');
		this.addReplacementSetting('pipe', 'char.pipe', '|');
		this.addReplacementSetting('colon', 'char.colon', ':');
	}

	androidChars(): void {
		const { containerEl } = this;

		containerEl.createEl('h2', { text: t('settings.android.heading') });
		containerEl.createEl('p', {
			text: t('settings.android.desc'),
		});

		this.addReplacementSetting('asterisk', 'char.asterisk', '*');
		this.addReplacementSetting('questionMark', 'char.question-mark', '?');
		this.addReplacementSetting('doubleQuote', 'char.double-quote', '"');
		this.addReplacementSetting(
			'angleBrackets',
			'char.angle-brackets',
			t('settings.replacement.and', { a: '<', b: '>' }),
		);
	}

	otherChars(): void {
		const { containerEl } = this;

		containerEl.createEl('h2', { text: t('settings.other.heading') });
		containerEl.createEl('p', {
			text: t('settings.other.desc'),
		});

		this.addReplacementSetting('equal', 'char.equal', '=');
	}
}
