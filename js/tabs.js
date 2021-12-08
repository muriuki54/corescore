const tabsWrapper = document.querySelectorAll(".core_score_pkg_tabs_external_wrapper");

Object.keys(tabsWrapper).forEach(function(key) {
    new Tab(tabsWrapper[+key]);
})

function Tab(parentContainer) {
    this.startIndex = 0;
    this.innerContainer = parentContainer.querySelector(".core_score_pkg_tabs_internal_wrapper");
    this.tabs = parentContainer.querySelectorAll(".core_score_pkg_tab");
    this.progressBar = parentContainer.querySelector(".core_score_pkg_tabs_progress_bar");
    this.progressBarIndicator = parentContainer.querySelector(".core_score_pkg_tabs_progress_bar_indicator");
    this.prevControl = parentContainer.querySelector(".core_score_prev_control");
    this.nextControl = parentContainer.querySelector(".core_score_next_control");
    this.size = parentContainer.clientWidth;

    const self = this;

    this.translateX = function() {
        // transform
        self.innerContainer.style.transform = "translate("+ -self.startIndex * self.size+"px)";

        // hide other tabs (display: none)
        Object.keys(self.tabs).forEach(function(key) {
            self.tabs[+key].classList.remove("core_score_pkg_show_tab");
        })

        // display the current tab
        self.tabs[self.startIndex].classList.add("core_score_pkg_show_tab");

        // animate progress bar
        self.progressBar.style.backgroundSize = ""+(self.startIndex/(self.tabs.length - 1)) * 100+"% 100%";

        // progressbar indicator
        self.progressBarIndicator.style.left = ""+(self.startIndex/(self.tabs.length - 1)) * 100 +"%";
        self.progressBarIndicator.innerText = ""+(self.startIndex + 1 ) +"/"+ (self.tabs.length) +"";
    }

    this.prevControl.addEventListener("click", function (){
        if(self.startIndex <= 0) return;
        self.startIndex--;
        self.translateX();
    });

    this.nextControl.addEventListener("click", function (){
        if(self.startIndex >= self.tabs.length - 1) return;
        self.startIndex++;
        self.translateX();
    });

    // listen for window resize
    window.addEventListener("resize", function() {
        self.size = parentContainer.clientWidth;
        self.translateX();
    })

    // translate on initial window load
    this.translateX();
    
}