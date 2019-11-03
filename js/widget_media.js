
class Media_Widget(wid, zid) {

    constructor(uid) {
        this.wid = wid;
        this.widget = document.getElementById(wid)
        this.zid = zid;
        this.zone = document.getElementById(zid);
        
    }

}


    var imgElements = [];

    function getImgElement( uid) {
        // return 
        let img = jQuery('img', widget).attr('uid', uid);
        if (img) {
            console.log(img);
            // debugger;
            return img[0];
        } else {
            // return jQuery('img:not(":visible")',widget)[0];
            return jQuery('img:not(":visible")', widget)[0];
        }
    }

    async function playContent(widget, content) {
        // debugger
        if (content.uid.indexOf('video-') === 0) {
            await sos.video.play(...content.agruments);
        }
        if (content.uid.indexOf('image-') === 0) {
            console.log(content)
            // getImgElement(...content.agruments).style.display = 'block';
            let current = getImgElement(widget, content.uid);
            jQuery(current).addClass('current').show()
        }
        content.playing = true;
    }

    async function stopContent(widget, content) {
        if (content.playing) {
            if (content.uid.indexOf('video-') === 0) {
                await sos.video.stop(...content.agruments);
            }
            if (content.uid.indexOf('image-') === 0) {
                const imgElement = getImgElement(widget, content.uid);
                console.log(imgElement);
                if (imgElement) {
                    imgElement.src = '';
                    // imgElement.setAttribute('data-args', '');
                    imgElement.style.display = 'none';
                    jQuery(imgElement).removeClass('current');
                }
            }
            content.playing = false;
        } else {
            console.log('no previous content');
        }
    }

    async function prepareContent(widget, content) {
        if (content.uid.indexOf('video-') === 0) {
            await sos.video.prepare(...content.agruments);
        }
        if (content.uid.indexOf('image-') === 0) {
            const imgElement = getImgElement(widget, content.uid);
            imgElement.src = content.uri;
            imgElement.setAttribute('data-args', JSON.stringify(content.agruments));
            imgElement.setAttribute('data-uid', content.uid);
        }
    }

    async function waitEndedContent(content) {
        if (content.uid.indexOf('video-') === 0) {
            await sos.video.onceEnded(...content.agruments);
        }
        if (content.uid.indexOf('image-') === 0) {
            await new Promise((resolve) => setTimeout(resolve, 3e3));
        }
    }

    async function displayMedia(contents, widget, zoneContainer) {
        for (const content of contents) {
            content.agruments = [content.uri, 0, 0, document.body.offsetWidth, document.body.offsetHeight];
        }
        for (let i = 0; true; i = (i + 1) % contents.length) {
            const previousContent = contents[(i + contents.length - 1) % contents.length];
            const currentContent = contents[i];
            const nextContent = contents[(i + 1) % contents.length];

            await playContent(widget, currentContent);
            await stopContent(widget, previousContent);
            await prepareContent(widget, nextContent);
            await waitEndedContent(currentContent);
        }
    }
