!function(){var t=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]"),n=document.querySelector("body");function e(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}var c=!1,r=null;t.addEventListener("click",(function(){if(c)return;r=setInterval((function(){console.log("current color: ".concat(e())),n.style.backgroundColor="".concat(e())}),1e3),c=!0,console.log("Поехали!")})),o.addEventListener("click",(function(){if(!c)return;console.log("Стоп!"),clearInterval(r),c=!1}))}();
//# sourceMappingURL=01-color-switcher.dc7ef11f.js.map
