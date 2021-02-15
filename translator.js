class Translator {
    constructor(config) {
        this.keys = [];

        config.forEach(item => {
            const style = document.createElement('style');
            const entries = Object.entries(item.locales);

            style.innerHTML = this._createStyleString(item.lang, entries);
            document.head.appendChild(style);
        });

        const style = document.createElement('style');
        let innerHtml = '';
        this.keys.forEach(key => innerHtml += `.t-${key}::after {content: var(--${key})}`);
        style.innerHTML = innerHtml;
        document.head.appendChild(style);
    }

    setLanguage(lang) {
        document.body.setAttribute('lang', lang);
    }

    _createStyleString(lang, entries) {
        const str = `body[lang=${lang}] {${entries.map(([ key, value ]) => {
            this.keys.indexOf(key) === -1 && this.keys.push(key);
            return `--${key}: '${value}'`;
        })}}`;
        return str.replaceAll(',', '');
    }
}
