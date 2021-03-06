var boys = ["Peter", "lars", "Ole"];
var girls = ["Janne", "hanne", "Sanne"];
const boysDiv = document.getElementById("boys");
const girlsDiv = document.getElementById("girls");
const allDiv = document.getElementById("all");
const boyButton = document.getElementById("addboy");
const girlButton = document.getElementById("addgirl");
const boyInput = document.getElementById("newboy");
const girlInput = document.getElementById("newgirl");
const removeBoyButton = document.getElementById("removeboy");
const removeGirlButton = document.getElementById("removegirl");
const first = document.getElementById("first");
const last = document.getElementById("last");
const reverse = document.getElementById("reverse");
const sortAllId = document.getElementById("sort");

var createBoys = function (boyArray) {
    var boysHTML = boyArray.map(boy => "<li>" + boy + "</li>");
    boysHTML.unshift("<ul id=\'boyslist\'>");
    boysHTML.push("</ul>");
    return boysHTML;
}
var boysList = createBoys(boys);
boysDiv.innerHTML = boysList.join('');

var createGirls = function (girlArray) {
    var girlsHTML = girlArray.map(girl => "<li>" + girl + "</li>");
    girlsHTML.unshift("<ul id=\'girlslist\'>");
    girlsHTML.push("</ul>");
    return girlsHTML;
}
var girlsList = createGirls(girls);
girlsDiv.innerHTML = girlsList.join('');

var createAllList = function (array1, array2) {
    var allList = array1.concat(array2);
    //Splice to remove the </ul> tag at the end of the boys list.
    allList.splice(array1.length - 1, 1);
    //splice to remove the <ul> tag at the head of the girls list.
    allList.splice(array1.length - 1, 1);
    return allList;
}

var allList = createAllList(boysList, girlsList);
allDiv.innerHTML = allList.join('');

//Add boy on click
boyButton.addEventListener("click", function () {
    if (boyInput.value !== "") {
        //Add the new name as index 1 without removing elements.
        boysList.splice(1, 0, "<li>" + boyInput.value + "</li>");
        boysDiv.innerHTML = boysList.join('');
        boyInput.value = "";
        allDiv.innerHTML = createAllList(boysList, girlsList).join('');
    }
    else {
        return;
    }
});

//Add girl on click
girlButton.addEventListener("click", function () {
    if (girlInput.value !== "") {
        //Add the new name as index 1 without removing elements.
        girlsList.splice(1, 0, "<li>" + girlInput.value + "</li>");
        girlsDiv.innerHTML = girlsList.join('');
        girlInput.value = "";
        allDiv.innerHTML = createAllList(boysList, girlsList).join('');
    }
    else {
        return;
    }
});

var removeGirl = function () {
    if (last.checked) {
        girlsList.splice(girlsList.length - 2, 1);
    }
    else if (first.checked) {
        girlsList.splice(1, 1);
    }
    else {
        girlsList.splice(1, 1);
    }
    girlsDiv.innerHTML = girlsList.join('');
    allDiv.innerHTML = createAllList(boysList, girlsList).join('');
}
removeGirlButton.addEventListener("click", removeGirl);

var removeBoy = function () {
    if (last.checked) {
        boysList.splice(boysList.length - 2, 1);
    }
    else if (first.checked) {
        boysList.splice(1, 1);
    }
    else {
        boysList.splice(1, 1);
    }
    boysDiv.innerHTML = boysList.join('');
    allDiv.innerHTML = createAllList(boysList, girlsList).join('');
}

removeBoyButton.addEventListener("click", removeBoy);

var sortAll = function () {
    var sortedAllList = createAllList(boysList, girlsList);
    sortedAllList.shift();
    sortedAllList.splice(sortedAllList.length - 1);
    sortedAllList.sort(function (a, b) {
        //Making sure that we don't touch the list tags
        if ((!a.includes("<ul") && !b.includes("<ul")) && !a.includes("</ul>") && !b.includes("</ul>")) {
            var nameA = a.toLowerCase().substring(4, a.length - 5);
            var nameB = b.toLowerCase().substring(4, b.length - 5);
            console.log(nameA);
            console.log(nameB);
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        }
    })
    sortedAllList.unshift("<ul id=\"allList\">");
    sortedAllList.push("</ul>");
    return sortedAllList;
}

sortAllId.addEventListener("click", function () {
    var sortedAllList = sortAll();
    allDiv.innerHTML = sortedAllList.join('');
});
var reverseAll = function () {
    var reversedList = createAllList(boysList, girlsList);
    reversedList.shift();
    reversedList.splice(reversedList.length - 1);
    reversedList.sort(function (a, b) {
        //Making sure that we don't touch the list tags
        if ((!a.includes("<ul") && !b.includes("<ul")) && !a.includes("</ul>") && !b.includes("</ul>")) {
            var nameA = a.toLowerCase().substring(4, a.length - 5);
            var nameB = b.toLowerCase().substring(4, b.length - 5);
            console.log(nameA);
            console.log(nameB);
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
        }
    })
    reversedList.unshift("<ul id=\"allList\">");
    reversedList.push("</ul>");

    return reversedList;
}

reverse.addEventListener("click", function () {
    var reversedList = reverseAll();
    allDiv.innerHTML = reversedList.join('');
});
