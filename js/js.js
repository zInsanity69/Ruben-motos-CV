document.addEventListener('DOMContentLoaded', function () {
    function getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang') || 'en';
    }

    let currentLanguage = getLanguageFromURL();

    function toggleLanguage() {
        currentLanguage = (currentLanguage === 'en' ? 'es' : 'en');
        loadLanguage(currentLanguage);
    }
    window.toggleLanguage = toggleLanguage;

    function loadLanguage(lang) {
        const url = `json/${lang}.json`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('[data-tkey]').forEach(element => {
                    const key = element.getAttribute('data-tkey');
                    element.textContent = data[key];
                });

                updateURL(currentLanguage);
            })
            .catch(error => {
                window.location.href = '/index.html'
                alert('Language ' + lang + ' not available yet')
            });
    }

    function updateURL(lang) {
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);
    }

    loadLanguage(currentLanguage);
    updateURL(currentLanguage);
});
