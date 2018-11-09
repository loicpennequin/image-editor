const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function init() {
    const canvas = $('#rendered')
    const image = $('.image');
    const link = $('#download');
    const fileUploader = $('#file-uploader');

    function bindFilterInputs(){
        const values = {};

        const getValue = input => input.value + input.dataset.suffix;

        function bindListener(input){
            input.addEventListener('change', e => {
                const key = input.id;
                values[key] = getValue(e.target);
                computeFilter();
            })
        }

        function computeFilter(){
            const filter = Object.keys(values).reduce((filterString, key) => filterString + `${key}(${values[key]}) `, '');
            // have to reselect image for some reason...
            document.querySelector('.image').style.filter = filter;
        }

        $$('.filter-input').forEach(input => {
            values[input.id] = getValue(input);
            bindListener(input);
        });
    }

    function upload(e){
        const fr = new FileReader();
        fr.onload = () => {
            document.querySelector('.image').src = fr.result;
        }
        fr.readAsDataURL(e.target.files[0]);
    }

    function download(e) {
        canvas.setAttribute('height', image.offsetHeight);
        canvas.setAttribute('width', image.offsetWidth);
        const ctx = canvas.getContext('2d');
        const filter = window
            .getComputedStyle(image)
            .getPropertyValue('filter');
        ctx.filter = filter;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const url = canvas.toDataURL('image/jpeg');
        this.href = url;
    }

    bindFilterInputs();

    fileUploader.addEventListener('change', upload);
    link.addEventListener('click', download);
}

document.addEventListener('DOMContentLoaded', init);

/*
var ctx = canvas.getContext('2d');
ctx.filter = "sepia(20%)";
var img = document.getElementById("dataimage");
ctx.drawImage(img,0,0, canvas.width, canvas.height);

var downloadFile = document.getElementById('download');
downloadFile.addEventListener('click', download, false);


function download() {
   var dt = canvas.toDataURL('image/jpeg');
   this.href = dt;
};
*/
