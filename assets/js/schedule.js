/**
 * Created by theval_s on 30/11/16.
 */

var items;

function changeTab(event, day) {
    var count;
    var onglet;

    onglet = document.getElementsByClassName('onglet');
    for (count = 0; count < onglet.length; count++) {
        onglet[count].className = onglet[count].className.replace(" active", "");
    }

    if (day == 'today')
        document.getElementById('tomorrow').style.display = "none";
    else
        document.getElementById('today').style.display = "none";
    document.getElementById(day).style.display = "block";
    $(document.getElementById(day)).hide().fadeIn(500);
    event.currentTarget.className += " active";
    load_courses(day);
}

function load_courses(day) {
    var url;
    if (day == 'today')
        url = "http://40.115.42.10/api/theval_s/6dbf21a0-ba8c-4f34-88df-83adc567996a/schedule";
    else
        url = "http://40.115.42.10/api/theval_s/6dbf21a0-ba8c-4f34-88df-83adc567996a/classes";

    $.getJSON(url, function(result){
        var tabcontent;
        if (day == 'today') {
            tabcontent = document.getElementsByClassName('tabcontent')[0];
            tabcontent.innerHTML = "";
        } else {
            tabcontent = document.getElementsByClassName('tabcontent1')[0];
            tabcontent.innerHTML = "";
            tabcontent = document.getElementsByClassName('tabcontent1')[1];
            tabcontent.innerHTML = "";
        }
        items = result;
        $.each(result, function(i, item){
            if (day != 'today') {
                if (item.registered == true)
                    tabcontent = document.getElementsByClassName('tabcontent1')[0];
                else
                    tabcontent = document.getElementsByClassName('tabcontent1')[1];
            }
            var course = document.createElement('div');
            course.setAttribute('class', 'item');
            course.setAttribute('id', item.name);
            course.innerText = "Lesson #0" + (i + 1);
            course.appendChild(document.createElement('br'));
            var item_name = document.createElement('h4');
            item_name.innerHTML = item.name;
            course.appendChild(item_name);
            course.appendChild(document.createElement('hr'));
            var item_date = document.createElement('p');
            item_date.innerHTML = "Le cours prendra place le " + item.date;
            course.appendChild(item_date);
            course.setAttribute("onclick", "item_click(this);");
            tabcontent.appendChild(course);
        });
    });
}

function item_click(div) {
    var tmp = div;
    var tc = document.getElementsByClassName('tabcontent1');
    for (var i = 0; i < 2; i++) {
        if (div.parentNode == tc[i]) {
            tc[i].removeChild(div);
            $(div).hide().fadeIn(500);
            if (i == 0) tc[1].appendChild(tmp);
            else if (i == 1) tc[0].appendChild(tmp);
            save_json(div.getAttribute('id'));
            break;
        }
    }
}

function save_json(id) {
    $.each(items, function(i, item){
        if (item.name == id) {
            item.registered = item.registered == false;
        }
    });
}

function post_json() {
    var request = new XMLHttpRequest();
    var url = "http://40.115.42.10/api/theval_s/6dbf21a0-ba8c-4f34-88df-83adc567996a/classes";

    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(JSON.stringify({registered : items}));
}