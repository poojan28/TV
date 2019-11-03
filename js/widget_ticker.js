function showTicker(texts, element, zoneContainer) {
    if (texts.length) {
        // var str = '<ul>'
        // var str = ''

        //     texts.forEach(function (text) {

        //     str += '' + text.padEnd(25, ' ') + '';
        //     // str += '<li><marquee>' + text + '</marquee></li>';
        // });
        str = texts.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⭕&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")

        // str += '</ul>';
        // str += '';
        element.innerHTML = str;
        zoneContainer.classList.add("has-footer");
        element.onend= function(){
            alert('animation complete');
        }
        // window.e2 = element;

        // document.getElementById('text_ticker').children[0].children[1].addEventListener('onend',function(){
        //     alert('dfdfd');

        // })
    } else {
        zoneContainer.classList.remove("has-footer");
    }
}