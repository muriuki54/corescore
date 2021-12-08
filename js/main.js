function getElement(element) {
    return document.querySelector(element);
}

function getElements(elements) {
    return document.querySelectorAll(elements);
}

const questions = getElements(".core_score_pkg_question");
const radios = getElements(".core_score_pkg_radio_input");

Object.keys(radios).forEach(function(key) {
    radios[+key].addEventListener("change", function(e) {
        // resetExpandedQuestions();
        Object.keys(questions).forEach(function(key){
            if(questions[+key].getAttribute("data-question") === e.target.getAttribute("data-expandtarget")) {
                if(e.target.value === "no") {
                    questions[+key].classList.add("core_score_pkg_expand");
                } else {
                    questions[+key].classList.remove("core_score_pkg_expand");
                }
            } 
        })
        
    })
})
function resetExpandedQuestions() {
    Object.keys(questions).forEach(function(key){
        questions[+key].classList.remove("core_score_pkg_expand");
    })
}