
import { ref } from 'vue';
import { enable as enableDarkMode, disable as disableDarkMode } from 'darkreader';

export function useDarkMode() {
    const isDarkMode = ref(false);

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        if (isDarkMode.value) {
            enableDarkMode({
                brightness: 100,
                contrast: 90,
                sepia: 0,
            });
            localStorage.setItem('darkMode', 'true');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'false');

        }
    };

    const setDarkMode = (value) => {
        isDarkMode.value = value;
        if (isDarkMode.value) {
            enableDarkMode({
                brightness: 100,
                contrast: 90,
                sepia: 10,
            });
        } else {
            disableDarkMode();
        }
    };

    return {
        isDarkMode,
        toggleDarkMode,
        setDarkMode,
    };
}
