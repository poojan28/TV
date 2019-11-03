async function testAllZones() {

    var pressedKey = "";
    const possibleCases = {
        "tv-only":{"class": "fm-zones has-tv"},
        "tv-with-footer":{"class": "fm-zones has-tv has-footer"},
        "tv-with-footer-sidebar":{"class": "fm-zones has-tv has-footer has-sidebar"},
        "tv-with-footer-right-sidebar":{"class": "fm-zones has-tv has-footer has-sidebar right-sidebar"},
        "tv-with-footer-right-full-sidebar":{"class": "fm-zones has-tv has-footer has-sidebar right-sidebar sidebar-fullheight"},
        "tv-with-footer-left-full-sidebar": { "class": "fm-zones has-tv has-footer has-sidebar left-sidebar sidebar-fullheight" },
        "tv-with-footer-left-sidebar": { "class": "fm-zones has-tv has-footer has-sidebar left-sidebar" },

        "tv-without-footer-sidebar": { "class": "fm-zones has-tv has-sidebar" },
        "tv-without-footer-right-sidebar": { "class": "fm-zones has-tv has-sidebar right-sidebar" },
        "tv-without-footer-right-full-sidebar": { "class": "fm-zones has-tv has-sidebar right-sidebar sidebar-fullheight" },
        "tv-without-footer-left-full-sidebar": { "class": "fm-zones has-tv has-sidebar left-sidebar sidebar-fullheight" },
        "tv-without-footer-left-sidebar": { "class": "fm-zones has-tv has-sidebar left-sidebar" },

        // no tv cases
        "no-tv-only-sidebar": { "class": "fm-zones has-sidebar" },
        "no-tv-only-footer": { "class": "fm-zones has-footer" },
        "no-tv-sidebar-with-footer": { "class": "fm-zones has-sidebar has-footer" },
    }

    const zoneContainer = document.getElementById('fm-zones');


    async function wait(ms = 1000) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('wait complete');
            }, ms);
            if(pressedKey!=""){
                if(pressedKey == 'x' || pressedKey == "X" || pressedKey == "N"||pressedKey == "n"|| pressedKey == 'Escape') {
                    // console.log( pressedKey ,"Not okay")
                    resolve(false);
                }else{
                    resolve(true);
                }
            }
        })
    }

    //listen for user input
    document.addEventListener('keydown', function (event) {
        pressedKey = event.key;  
    });

    async function userAsk(testCase = "") {
        pressedKey = "";
        
        return new Promise(resolve => {
            if(pressedKey!=""){
                if(pressedKey == 'x' || pressedKey == "X" || pressedKey == "N"||pressedKey == "n"|| pressedKey == 'Escape') {
                    // console.log( pressedKey ,"Not okay")
                    resolve(false);
                }else{
                    resolve(true);
                }
            }else{
                //automatic resolve in 1 second
                setTimeout(() => {
                // resolve('wait complete');
                resolve(true);
            }, 1000);
            }

           
        })


        // return confirm(testCase + "looks good?");
    }

    for (caseInstance in possibleCases) {
        // zoneContainer
        zoneContainer.setAttribute('class', possibleCases[caseInstance]['class']);
        await wait(1000);
        let working = await userAsk(caseInstance);
        // let working = confirm(caseInstance);

        if (working) {

            console.log(caseInstance, "✓");
        } else {
            console.error(caseInstance, "✖");
            if (confirm("Stop here?")) {
                console.log('check classes:', possibleCases[caseInstance]['class'])
                break;
            }
        }

        // console.log(caseInstance,casClasses);
    }

}