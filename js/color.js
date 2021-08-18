
function get_hex() {

    let test = document.getElementById("hex-color-1").value;
    let test2 = document.getElementById("hex-color-2").value;
    let rgb1 = new Array(3);
    let rgb2 = new Array(3);
    if (check_entry(test, test2, rgb1, rgb2)) {

        if (test.length == 6) {
            test = '#' + test;
        }
        if (test2.length == 6) {
            test2 = '#' + test2;
        }

        $('#hex-color-1-label').empty().append('Hex-1');
        $('#hex-color-2-label').empty().append('Hex-2');


        $('#hex-1-color-show').css("background-color", test);
        $('#hex-1-color-show').empty().append("Test text").css("color", test2);


        $('#hex-2-color-show').css("background-color", test2);
        $('#hex-2-color-show').empty().append("Test text").css("color", test);

        HEX_to_RGB(test, test2, rgb1, rgb2);
        let contrast = Cal_contrast(rgb1, rgb2);

        console.log("contrast value: " + contrast);

        if (contrast < 3) {
            console.log("contrast : low")
            $('#comment1').empty().append(' Contrast level : low');
        }
        else if (contrast < 4.5) {
            console.log("contrast : normal")
            $('#comment1').empty().append(' Contrast level : normal');
        }
        else if (contrast < 7.0) {
            console.log("contrast : great")
            $('#comment1').empty().append(' Contrast level : great');
        }
        else if (contrast >= 7.0) {
            console.log("contrast: excellent")
            $('#comment1').empty().append('Contrast level : excellent');

        }
        $('#comment2').empty().append('Contrast value:' + Math.round(contrast * 100) / 100);


    }

}
function Cal_contrast(rgb1, rgb2) {
    let c1 = new Array(3);
    let c2 = new Array(3);
    let c1_V, c2_V;
    // let c2 = new Array(3);
    for (let i = 0; i < rgb1.length; i++) {
        let v = rgb1[i] / 255;
        c1[i] = v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);

        let v2 = rgb2[i] / 255;
        c2[i] = v2 <= 0.03928
            ? v2 / 12.92
            : Math.pow((v2 + 0.055) / 1.055, 2.4);
    }
    c1_V = c1[0] * 0.2126 + c1[1] * 0.7152 + c1[2] * 0.0722;
    c2_V = c2[0] * 0.2126 + c2[1] * 0.7152 + c2[2] * 0.0722;
    var brightest = Math.max(c1_V, c2_V);
    var darkest = Math.min(c1_V, c2_V);

    return (brightest + 0.05) / (darkest + 0.05);
}
function HEX_to_RGB(test, test2, rgb1, rgb2) {

    let ind = 0;
    for (let i = 1; i < test.length; i++) {
        if (i % 2 == 0) {
            rgb1[ind] += parseInt(test[i], 16);
            rgb2[ind] += parseInt(test2[i], 16);
            ind++;
        }
        else if (i % 2 == 1) {
            rgb1[ind] = 0;
            rgb2[ind] = 0;
            rgb1[ind] += parseInt(test[i], 16) * 16;
            rgb2[ind] += parseInt(test2[i], 16) * 16;
        }
    }
    // console.log(rgb1);
    // console.log(rgb2);
}
function check_entry(test, test2) //check user input correct or not
{

    let check = 1;

    if (test.length < 6 || test.length > 7) {
        $(document.getElementById("hex-color-1")).addClass('border-danger');
        $('#hex-color-1-label').empty().append('Input length error');
        check = 0;
    }
    else {
        $(document.getElementById("hex-color-1")).removeClass('border-danger');
    }
    if (test2.length < 6 || test2.length > 7) {
        $(document.getElementById("hex-color-2")).addClass('border-danger');
        $('#hex-color-2-label').empty().append('Input length error');
        check = 0;
    }
    else {
        $(document.getElementById("hex-color-2")).removeClass('border-danger');
    }
    let i = 0;
    let j = 0;
    if (test.length == 7) {
        if (test[0] != '#') {
            $(document.getElementById("hex-color-1")).addClass('border-danger');
            $('#hex-color-1-label').empty().append('Input length error');
            check = 0;
        }
        i = 1;
    }
    if (test2.length == 7) {
        if (test2[0] != '#') {
            $(document.getElementById("hex-color-2")).addClass('border-danger');
            $('#hex-color-2-label').empty().append('Input length error');
            check = 0;
        }
        j = 1;
    }

    for (i; i < test.length; i++) {
        if (isNaN(parseInt(test[i], 16))) {
            hide_color();
            $(document.getElementById("hex-color-1")).addClass('border-danger');
            $('#hex-color-1-label').empty().append('0 to f in each digit');
            check = 0;
            break;
        }

    }
    for (j; j < test2.length; j++) {

        if (isNaN(parseInt(test2[j], 16))) {
            hide_color();
            $(document.getElementById("hex-color-2")).addClass('border-danger');
            $('#hex-color-2-label').empty().append('0 to f in each digit');
            check = 0;
            break;
        }

    }
    if (!check) {
        hide_color();
        return false;
    }

    return true;

}
function hide_color() {

    $('#hex-1-color-show').css("background-color", 'white');

    $('#hex-2-color-show').css("background-color", 'white');

    $('#comment1').empty();

    $('#comment2').empty();

    $('#hex-1-color-show').empty();

    $('#hex-2-color-show').empty();

}