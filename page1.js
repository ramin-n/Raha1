//------read file from server------
var request = new XMLHttpRequest();
request.open('GET', 'SampleData1.txt', false);
request.send();
let str = request.responseText;
//*document.write(str);


//--------convert to JSON-------
var myArr = JSON.parse(str);


//------sort by property(value)--------??????
myArr = myArr.sort(function (a, b) {
    return a.calories - b.calories;
});

//myArr = myArr.sort(sortByProperty("calories"));
//function sortByProperty(property) {
//    return function (a, b) {
//        //  debugger;
//        if (a[property] > b[property])
//            return 1;
//        else if (a[property] < b[property])
//            return -1;

//        return 0;
//    }
//}


//--------------filtering----------
function filtering() {
    var inputCalories = document.getElementById("caloriesFilter").value;
    var inputName = document.getElementById("nameFilter").value;

    var filteredArr = myArr.filter(function (item) {
        return item.name == inputName;


    });
    getRecordsForPage(filteredArr, 10, 1);

    //for (let i = 0; i < myArr.length; i++) {
    //    if (myArr[i].calories == inputCalories) {
    //        return myArr[i].calories;
    //    }

    //}

}


//-----calculate count of pages if every page include 10 records----
var pageCount = 0;
if ((myArr % 10) != 0) {
    pageCount = (myArr.length / 10) + 1;
    pageCount = Math.round(pageCount);

}
else {
    pageCount = (myArr.length / 10);
}
console.log("page count is: ", pageCount);

//-----add page'es number at the end of pagination if to be pageCount>1-----

if (pageCount > 1) {
    for (var i = 2; i <= pageCount; i++) {
        var aTag = document.createElement("a");
        aTag.href = "#";
        //aTag.addEventListener("click", function () { goToPage(tmp) });
        aTag.setAttribute("onclick", "goToPage(" + i + ")");
        var node = document.createTextNode(i);
        console.log(node);

        aTag.appendChild(node);
        console.log(aTag);

        var div1 = document.getElementById("div1");
        //element.appendChild(aTag);
        var child = document.getElementById("aEndTag");
        div1.insertBefore(aTag, child);
    }
}







//----------create table---------
var tablearea = document.getElementById('tablearea'),
    table1 = document.createElement('table');
table1.id = "myGrid";
table1.classList.add('table');
tablearea.appendChild(table1);




//---------write myArr in webpage for my test-------
/*
var text1 = "";
for (x in myArr) {
    text1 += myArr[x].name + "  " + myArr[x].calories + "  " + myArr[x].fat + "  " + myArr[x].carbs +
        "  " + myArr[x].protein + "  " + myArr[x].sodium + "  " + myArr[x].calcium + "  " + myArr[x].iron +
        "<br/>";
}
document.getElementById("demo").innerHTML = text1;
*/



//----------write elements in table---------
//for (var i = 0; i < myArr.length; i++) {
//    var tr = document.createElement('tr');
//    var th = document.createElement('th');
//    th = (i + 1);

//    for (var j = 0; j < header.length; j++) {
//        var td = document.createElement('td');

//        if (header[j] !== 'rowNumber') {
//            td.innerHTML = myArr[i][header[j]];
//        }
//        else {
//            td.innerHTML = i + 1;
//        }

//        tr.appendChild(td);

//    }
//    table1.appendChild(tr);
//}

//tablearea.appendChild(table1);
//console.log("end of is:" + table1);
//for (var i = (pageCount * pageNumber) - pageCount; i < myArr.length; i++) {

getRecordsForPage(myArr, 10, 1);


function getRecordsForPage(data, pageCount, pageNumber) {

    table1.innerHTML = "";
    setHeader();

    for (var i = (pageCount * pageNumber) - pageCount; i < pageCount * pageNumber; i++) {
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th = (i + 1);

        for (var j = 0; j < header.length; j++) {
            var td = document.createElement('td');

            if (header[j] !== 'rowNumber') {
                td.innerHTML = data[i][header[j]];
            }
            else {
                td.innerHTML = i + 1;
            }

            tr.appendChild(td);

        }
        table1.appendChild(tr);
    }
}

function goToPage(pageNumber) {
    getRecordsForPage(myArr, 10, pageNumber);
}

function setHeader() {
    var table1 = document.getElementById("myGrid");

    //--------export keys from myArr' object for table header--------
    header = Object.keys(myArr[0]);
    console.log(header);


    //-------add ID in first of header for showing rownumbers in table to end user------
    header.unshift("rowNumber");
    console.log(header);

    //----------create iterate header of table---------
    var tr = document.createElement('tr');
    for (let index = 0; index < header.length; index++) {
        var th = document.createElement('th');
        th.innerText = header[index];
        tr.append(th);
    }
    table1.append(tr);
}
