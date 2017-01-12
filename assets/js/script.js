/**
 * Created by theval_s on 28/11/16.
 */

var rot = 0;
var indiv = false;
var incont = false;

document.onkeydown = keydown;
function keydown(e) {
    e = e || window.event;
    if (e.keyCode == '13') {
        connect();
    }
}

function getPasswd() {
    var date = new Date();
    var hours = date.getHours();
    var pass = ['Air', 'Earth', 'Fire', 'Water'];

    if ((hours >= 0) && (hours < 6))
        return (pass[0]);
    else if ((hours >= 6) && (hours < 12))
        return (pass[1]);
    else if ((hours >= 12) && (hours < 18))
        return (pass[2]);
    else
        return (pass[3]);
}

function button_point_enter() {
    var button = document.getElementById('menu');
    if (typeof button !== 'undefined') {
        rot += 180;
        button.style.transform = 'rotate(' + rot + 'deg)';
    }
}
function button_point_leave() {
    var button = document.getElementById('menu');
    if (typeof button !== 'undefined') {
        rot += 180;
        button.style.transform = 'rotate(' + rot + 'deg)';
    }
}

function button_menu_click() {
    var div = document.getElementById('loginform');
    if (typeof div !== 'undefined') {
        if (div.style.visibility == "visible" && indiv == false)
            div.style.visibility = "hidden";
        else
            div.style.visibility = "visible";
        rot = 0;
    }
}

function form_mouse() {
    indiv = indiv == false;
}
function contain_mouse() {
    incont = incont == false;
}

function get_cookie(name) {
    var ck = document.cookie.split('; ');
    for (var i = 0; i < ck.length; i++) {
        var info = ck[i].split("=");
        if (info && info[0] == name) return (info);
    }
    return (false);
}

function connect() {
    var login = document.getElementById('logintext');
    var pw = document.getElementById('password');

    var date = new Date;
    var expiration = date.getTime();
    var hour = date.getHours();
    var next;

    if ((hour >= 0) && (hour < 6)) {
        date.setHours(6, 0, 0, 0);
        next = '6';
    }
    else if ((hour >= 6) && (hour < 12)) {
        date.setHours(12, 0, 0, 0);
        next = '12';
    }
    else if ((hour >= 12) && (hour < 18)) {
        date.setHours(18, 0, 0, 0);
        next = '18';
    }
    else {
        date.setTime(expiration + 86400000);
        date.setHours(0, 0, 0, 0);
        next = '00';
    }

    if (incont && login !== 'undefined' && typeof pw !== 'undefined') {
        var re = new RegExp("^[a-z]{2,8}_[a-z0-9]$");
        var div = document.getElementById('login');

        if (get_cookie('forbidden') !== false) {
            div.textContent = 'Try again at ' + next;
        }
        else if (re.test(login.value) && getPasswd() == pw.value) {
            document.cookie = "student=" + login.value + ";expires=" + date;
            document.location.href = "schedule.html";
        }
        else {
            document.cookie = "forbidden=true;expires=" + date;
        }
    }
}