function inputEle(tagname, clslist, attrname, attrvalue) {
    var ele = document.createElement(tagname);
    for (let i in clslist) {
        ele.classList.add(clslist[i]);
    }
    for (let i in attrname) {
        ele.setAttribute(attrname[i], attrvalue[i]);
    }
    return ele;
}

function inputEleWOattr(tagname, clslist) {
    var ele = document.createElement(tagname);

    for (let i in clslist) {
        ele.classList.add(clslist[i]);
    }
    return ele;
}


function onlyele(element) {
    var ele = document.createElement(element);
    return ele;
}

function eleWithcontent(tagname, attrname, attrvalue, content) {
    var ele = document.createElement(tagname);
    for (let i in attrname) {
        ele.setAttribute(attrname[i], attrvalue[i]);
    }
    ele.innerHTML = content;
    return ele;
}


function createTableRow(id, name, email) {
    let tr = document.createElement("tr")
    tr.classList.add("table-light")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    td1.innerHTML = id
    td2.innerHTML = name
    td3.innerHTML = email
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tbody.append(tr)
}

let title = eleWithcontent("h1", ["id"], ["title"], "Pagination Task")
let des = eleWithcontent("p", ["id"], ["description"], "This is a Pagination Task And styled according to test cases")

//creating container
let div1 = inputEleWOattr("div", ["container", "table-responsive", "mt-5", "p-1"]);
let div1_2 = inputEleWOattr("div", ["row"]);
let div1_2_1 = inputEleWOattr("div", ["col-12"]);

//creating table
let table1 = inputEle("table", ["table", "table-striped"], ["id"], ["table"]);

//creating table_head
let thead = inputEleWOattr("thead", ["table", "table-dark"]);
let tr1 = onlyele("tr")

//creating table_head_content
let thtr1 = eleWithcontent("th", ["scope"], ["row"], "Id");
let thtr2 = eleWithcontent("th", ["scope"], ["row"], "Name");
let thtr3 = eleWithcontent("th", ["scope"], ["row"], "Email");

//creating table body
let tbody = eleWithcontent("tbody", ["id"], ["tblBody"], "");


tr1.append(thtr1, thtr2, thtr3);
thead.append(tr1);
table1.append(thead, tbody);

div1_2_1.append(table1);
div1_2.append(div1_2_1);
div1.append(div1_2);

//creating pagination
let pagi_div = inputEle("div", ["container-fluid", "d-flex", "justify-content-center", "p-1"], ["id"], ["buttons"]);

document.body.append(title, des, div1, pagi_div);

// let xhr = new XMLHttpRequest();
// xhr.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
// xhr.send();
// xhr.responseType = "json";
// xhr.onload = (function loaddata() {


//url showing typo error therefore data's of pagination file are imported using import statement from pagination_data.json file

import details from "./pagination_data.json" assert {    type: "json"};

const tblbody = document.getElementById("tblBody");
const pagination = document.getElementById("buttons");

let currentPage = 1;
let rows = 10;



function displaylist(details, wrapper, rows_per_page, page) {
    wrapper.innerHTML = " ";
    page--;
    //console.log(page);
    let loop_start = rows_per_page * page;
    let paginated_items = details.slice(loop_start, (rows_per_page + (loop_start)));

    for (let i = 0; i < paginated_items.length; i++) {
        createTableRow(paginated_items[i].id, paginated_items[i].name, paginated_items[i].email);
    }

}

function setupPagination(details, wrapper, rows_per_page) {
    wrapper.innerHTML = " ";
    let page_count = Math.ceil(details.length / rows_per_page);


    for (let i = 1; i <= page_count; i++) {
        let btn = paginationButton(i);
        wrapper.appendChild(btn);
    }


}

function paginationButton(page) {

    let button = document.createElement("button");
    button.setAttribute("value", page);
    button.classList.add("btn", "btn-outline-secondary");
    button.innerText = page;
    if (currentPage == page) button.classList.add("active");
    button.addEventListener("click", () => {
        let currentPage = page;
        displaylist(details, tblbody, rows, currentPage);

        let current_btn = document.querySelector("#buttons button.active");
        current_btn.classList.remove("active");

        button.classList.add("active");
    });
    return button;
}
displaylist(details, tblbody, rows, currentPage);
setupPagination(details, pagination, rows);

//})