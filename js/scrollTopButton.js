const FastUp = {
    // Text
    buttonText: "Top",
    // Position
    btnBottom: "1rem",
    btnRight: "1rem",
    // Button Class Name
    cssClass: "toTheTop",
    // Container Element Class
    containerClass: "returnToTop",
    // Button Element Id
    id: "scrollTop",

    // Show button n% down the page ().
    startPercentage: 0.10,

    // Do not edit
    // class properties 
    target: null,
    clientHeight: 0,
    startPosition: 0,

    init: function() {
        // create the button
        this.appendButton();

        // add a style element to the document head
        this.createCSS();

        // set the positions;
        this.setPositions();

        // add scroll function to the element
        this.clickEvent();

        // tie in the show hide scroll event;
        this.scrollEvent();

    },
    appendButton: function() {
        if (document.querySelector(".returnToTop") == null) {
            this.createButton();
        }
        this.target = document.getElementById(this.id)
    },
    clickEvent: function() {
        this.target.addEventListener("click", function() { FastUp.toTheTop() });
    },
    createButton: function() {
        var div = document.createElement("div");
        div.classList.add(this.containerClass);
        var button = document.createElement("button");
        button.classList.add(this.cssClass);
        button.classList.add("hide");
        button.setAttribute("id", this.id);
        button.innerHTML = this.buttonText;
        div.appendChild(button);
        document.body.appendChild(div);
    },
    createCSS: function() {
        var css = document.createElement("style");
        var rulesets = [];
        // Add a ruleset for each declaration block;
        rulesets.push(".show { display: block;}");
        rulesets.push(".hide { display: none;}");
        rulesets.push("." + this.cssClass + " { background-color: rgb(35 35 35 / 90%); padding: 14px 14px; border: 1px solid #f8f8f8; color: white;border-radius: 6px;box-shadow: 0 0 8px 1px #bcbbbb;}");
        rulesets.push("." + this.containerClass + "{ display: block;position: fixed; bottom: 2rem; right: 2rem;}");

        css.innerHTML = rulesets.join("\n");
        document.head.append(css);
    },
    displayScrollTopButton: function() {
        var c = this.target.classList;
        if (window.pageYOffset >= this.startPosition) {
            c.remove("hide");
            c.add("show");
        } else {
            c.remove("show");
            c.add("hide");
        }
    },
    scrollEvent: function() {
        window.addEventListener("scroll", (event) => {
            FastUp.displayScrollTopButton();
        });
    },
    setPositions: function() {
        this.clientHeight = document.body.clientHeight;
        let n = Math.round(this.clientHeight * this.startPercentage);
        this.startPosition = n;
    },
    toTheTop: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

FastUp.init();