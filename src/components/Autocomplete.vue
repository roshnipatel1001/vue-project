<template>
  <header>
    <div>
      <h1>Auto-complete...</h1>
      <div
        contenteditable="true"
        id="input"
        @input="handleInput"
        @keydown="keydown"
      >
        <span v-if="popularText">{{ popularText }}</span>
      </div>
      <div id="time"></div>
      <div id="fake-div" class="div"></div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import trie from "../autocomplete.js";
export default {
  data() {
    return {
      data: null,
      words: null,
      popular: null,
      rest: null,
      suggestion: null,
      popularText: null,
      query: null,
      input: null,
      time: null,
      fakeDiv: null,
      r: null,
      INPUT_DEBOUNCE: null,
      span: null,
      name: "roshni",
    };
  },
  methods: {
    handleInput(e) {
      console.log(e);
      this.query = e.target.innerText.toLowerCase();
      if (this.query !== "") {
        const find_start = new Date().getTime();
        let parts = this.query.split(" ");
        const wordToComplete = parts.pop();
        this.rest = parts.join(" ") + " ";
        if (wordToComplete !== "") {
          this.suggestion = this.getBestMatch(trie.complete(wordToComplete));
          if (this.suggestion) {
            this.fakeDiv.innerText = this.query;
            this.span.style.left =
              this.r.left + this.fakeDiv.clientWidth + "px";
            this.popularText = this.suggestion.slice(wordToComplete.length);
            this.query = this.popularText;
            trie.clear();
            this.span.textContent = this.popularText;
          }
        } else {
          this.span.textContent = "";
        }
      } else {
        this.span.textContent = "";
      }
    },

    getBestMatch(suggestions) {
      let bestMatch = null,
        bestScore = -100;
      for (const suggestion of suggestions) {
        if (
          suggestion in this.popular &&
          this.popular[suggestion] > bestScore
        ) {
          bestMatch = suggestion;
          bestScore = this.popular[suggestion];
        }
      }
      if (!bestMatch) bestMatch = suggestions[0];

      return bestMatch;
    },
    keydown(e) {
      console.log(e);
      if (e.key === "ArrowRight") {
        // this.query = "";
        // this.query = this.rest + this.suggestion;
        this.span.textContent = "";
        this.input.textContent = this.rest + this.suggestion;

        this.setEndOfContenteditable(document.getElementById("input"));
      }
    },

    setEndOfContenteditable(contentEditableElement) {
      let range, selection;
      if (document.createRange) {
        //Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange(); //Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection(); //get the selection object (allows you to change selection)
        selection.removeAllRanges(); //remove any selections already made
        selection.addRange(range); //make the range you have just created the visible selection
      } else if (document.selection) {
        //IE 8 and lower
        range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        range.select(); //Select the range (make it the visible selection
      }
    },
  },

  created() {
    axios
      .get(
        "https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary_compact.json?_limit=10"
      )
      .then((res) => {
        this.data = res.data;
        this.words = Object.keys(res.data).sort();
        this.words.forEach((word) => trie.add(word.toLowerCase()));
      });
    axios
      .get(
        `https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt?_limit=10`
      )
      .then((response) => {
        const popular = {};
        let text;
        text = response.data.split("\n");
        const TOTAL = text.length;
        text.forEach((word, freq) => {
          if (word !== "") {
            popular[word.toLowerCase()] = TOTAL - freq;
          }
        });
        this.popular = popular;
      });
  },
  mounted() {
    this.input = document.getElementById("input");
    this.time = document.getElementById("time");
    this.fakeDiv = document.getElementById("fake-div");
    this.r = this.input.getBoundingClientRect();
    this.span = document.createElement("span");
    this.css = getComputedStyle(this.input);
    this.span.style.cssText = `
    width: ${this.r.width}px;
    height: ${this.r.height}px;
    left: ${this.r.left}px;
    top: ${this.r.top}px;
    z-index: -10;
    opacity: 0.4;
    position: absolute;
    white-space: pre-wrap;
    font-size: ${parseInt(this.css.fontSize)}px;
    padding-left: ${parseInt(this.css.paddingLeft)}px;
    padding-top: ${parseInt(this.css.paddingTop) + 1}px;
`;
    document.body.appendChild(this.span);
  },
};
</script>
