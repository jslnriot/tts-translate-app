const voiceSelect = document.querySelector("#voiceSelect")
const playButton = document.querySelector("#playButton")
const textInput = document.querySelector("#textarea")
const languageSelect = document.querySelector("#languageSelect")
// Array of supported languages with their ISO codes
const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
  ];

  // Populate langueage select box
languages.forEach(({code, lang}) => {
    const option = document.createElement('option')
    option.value = code;
    option.textContent = lang;
    languageSelect.appendChild(option)
})

// Load avaiaable voices
let voices = []
function loadVoices() {
    voices = speechSynthesis.getVoices()
    voiceSelect.innerHTML = voices
        .map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
        .join('')
}

// Trigger loading voices when they become avaiable
speechSynthesis .onvoiceschanged = loadVoices;
loadVoices()

// Play TTS
playButton.addEventListener('click', (value) => {
    console.log("Play TTS .. ", textInput)
    const utterance = new SpeechSynthesisUtterance(textInput.value)
    const selectedVoice = voices[voiceSelect.value]
    if(selectedVoice) {
        utterance.voice = selectedVoice
    }
    speechSynthesis.speak(utterance)
})

