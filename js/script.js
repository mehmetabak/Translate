const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
copy = document.getElementById("copy");
var lastFrom ;
var lastTo ;

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "tr-TR" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchageIcon.addEventListener("click", () => {
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = "";
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
    let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

    if(!text) return;

    lastFrom = fromText.value;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
                lastTo = toText.value;
                copy.style.visibility = "visible";
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});

fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
        copy.style.visibility = "hidden";
    }else{
    let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    
    lastFrom = fromText.value;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
                lastTo = toText.value;
                copy.style.visibility = "visible";
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
    }
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                jSuites.notification({
                    name: 'Information',
                    message: 'Copied',
                })
                navigator.clipboard.writeText(fromText.value);
            } else {
                jSuites.notification({
                    name: 'Information',
                    message: 'Copied',
                })
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});

copy.addEventListener("click", () => {
    toText.value = "";
    fromText.value = "";
    copy.style.visibility = "hidden";
    jSuites.notification({
        name: 'Information',
        message: 'Cleared',
    })
})

setInterval(time, 500)

function time(){
    if(fromText.value != "" ){
        if(lastFrom != fromText.value || lastTo != toText.value){
            let text = fromText.value.trim(),
            translateFrom = selectTag[0].value,
            translateTo = selectTag[1].value;
            if(!text) return;
    
            lastFrom = fromText.value;
            toText.setAttribute("placeholder", "Translating...");
            let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
            fetch(apiUrl).then(res => res.json()).then(data => {
                toText.value = data.responseData.translatedText;
                data.matches.forEach(data => {
                    if(data.id === 0) {
                        toText.value = data.translation;
                        lastTo = toText.value;
                        copy.style.visibility = "visible";
                    }
                });
                toText.setAttribute("placeholder", "Translation");
            });
        }
    }
}