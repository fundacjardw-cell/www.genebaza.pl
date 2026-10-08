
 * @param {string} elementId 
 * @param {HTMLButtonElement} btn 
 */
async function copyToClipboard(elementId, btn) {
    const input = document.getElementById(elementId);
    const announcer = document.getElementById('toast-announcer');

    if (!input) return;

    try {

        await navigator.clipboard.writeText(input.value);

        const originalText = btn.innerText;
        btn.innerText = 'Skopiowano!';
        btn.classList.add('copied');

        if (announcer) {
            announcer.textContent = `Skopiowano do schowka: ${input.value}`;
        }

        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
            if (announcer) announcer.textContent = '';
        }, 2000);

    } catch (err) {
        console.warn('Nie udało się użyć navigator.clipboard, stosuję fallback:', err);
        
        input.select();
        input.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            btn.innerText = 'Skopiowano!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerText = 'Kopiuj';
                btn.classList.remove('copied');
            }, 2000);
        } catch (fallbackErr) {
            alert('Nie udało się automatycznie skopiować tekstu. Skopiuj go ręcznie.');
        }
    }
}