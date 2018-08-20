//var div = document.createElement('div');
var div;

function createNewDiv() {
    div = document.createElement('div');
}

var data = getData();

function ready() {
    //добавление тестовой записи о товарах
    addProd();

    buttonCart = document.getElementById("submit_button");
    //buttonCart.onclick = submitClick;
    buttonCart.addEventListener('click', submitClick);
}

document.addEventListener("DOMContentLoaded", ready);

//функция - adder для элемента в списке на складе
var addProd = function() {
    //find node with id == product_table
    var storageNode = document.getElementById("prod_table");

    data.forEach(element => {
        //insert new prod_element node including all childs
        createNewDiv();
        var prodElemNode = storageNode.appendChild(div);
        prodElemNode.setAttribute("class", 'prod_element');
        prodElemNode.setAttribute("idd", element.id);
        prodElemNode.addEventListener("click", updateDesc);

        //prodElemNode = storageNode.lastChild;

        createNewDiv();
        var nameNode = prodElemNode.appendChild(div);
        nameNode.setAttribute("class", "prod_name");

        createNewDiv();
        var countNode = prodElemNode.appendChild(div);
        countNode.setAttribute("class", "prod_count");

        createNewDiv();
        var costNode = prodElemNode.appendChild(div);
        costNode.setAttribute("class", "prod_cost");


        createNewDiv();
        var addNode = prodElemNode.appendChild(div);
        addNode.setAttribute("class", "prod_add");
        addNode.addEventListener("click", organizeRecord);

        image = document.createElement('img');
        var imgNode = addNode.appendChild(image);
        imgNode.setAttribute("src", "add.jpg");

        //set innerHTML for new subnodes
        nameNode.innerHTML = element.name;
        countNode.innerHTML = element.count;
        costNode.innerHTML = element.cost;
    });

}

function reverseSide(side) {
    return side == "cart" ? "prod" : "cart";
}

function organizeRecord() {
    var parent1 = this.parentNode;
    var side;
    if (parent1.getAttribute("class") == "prod_element")
        side = "prod";
    if (parent1.getAttribute("class") == "cart_element")
        side = "cart";

    if (parent1 != undefined)
        id_node = parent1.getAttribute("idd");

    name_node = parent1.getElementsByClassName(side + "_name")[0];
    count_node = parent1.getElementsByClassName(side + "_count")[0];
    cost_node = parent1.getElementsByClassName(side + "_cost")[0];

    side = reverseSide(side);
    var RecordNode = document.getElementById(side + "_table");

    var idExists = false;

    //убрать товар из списка при кол-ве 1
    if (parseInt(count_node.innerHTML) == 1) {
        parent1.remove();
    }

    //проверить существование узла с данным idd
    //cartNode.forEach(element => {
    //});
    Array.from(RecordNode.children).forEach(function(element) {
        if ((element.getAttribute("idd") !== undefined) && (element.getAttribute("idd") == id_node)) {
            idExists = true;
            //инкремент существующей записи
            var record_count_node = element.getElementsByClassName(side + "_count");
            var value = parseInt(record_count_node[0].innerHTML);
            value++;
            record_count_node[0].innerHTML = value;

            var number = parseInt(count_node.innerHTML);
            number--;
            count_node.innerHTML = number;
        }
    });

    if (idExists == false) {
        //создание нового узла в DOM-дереве
        createNewDiv();
        var RecordElemNode = RecordNode.appendChild(div);
        RecordElemNode.setAttribute("class", side + '_element');
        RecordElemNode.setAttribute("idd", id_node);
        RecordElemNode.addEventListener("click", updateDesc);

        createNewDiv();
        var nameNode = RecordElemNode.appendChild(div);
        nameNode.setAttribute("class", side + "_name");
        nameNode.innerHTML = name_node.innerHTML;

        createNewDiv();
        var countNode = RecordElemNode.appendChild(div);
        countNode.setAttribute("class", side + "_count");
        countNode.innerHTML = 1;
        var number = parseInt(count_node.innerHTML);
        number--;
        count_node.innerHTML = number;

        createNewDiv();
        var costNode = RecordElemNode.appendChild(div);
        costNode.setAttribute("class", side + "_cost");
        costNode.innerHTML = cost_node.innerHTML;

        createNewDiv();
        var removeNode = RecordElemNode.appendChild(div);

        image = document.createElement('img');
        var imgNode = removeNode.appendChild(image);

        if (side == 'cart') {
            removeNode.setAttribute("class", side + "_remove");
            removeNode.addEventListener("click", organizeRecord);
            imgNode.setAttribute("src", "discard.jpg");
        } else if (side == 'prod') {
            removeNode.setAttribute("class", side + "_add");
            removeNode.addEventListener("click", organizeRecord);
            imgNode.setAttribute("src", "add.jpg");
        }

        idExists = false;
    }
}

function submitClick() {
    var cartNodes = document.getElementsByClassName("cart_element");
    var total_sum = 0;

    Array.from(cartNodes).forEach(function(element) {
        //подсчет для каждой отдельной строки
        var count = 0;
        var cost = 0;
        Array.from(element.children).forEach(function(child) {
            if (child.getAttribute("class") == "cart_count")
                count = parseInt(child.innerHTML);
            if (child.getAttribute("class") == "cart_cost")
                cost = parseInt(child.innerHTML);
        });
        total_sum += count * cost;
    });
    alert(total_sum);
}

function updateDesc() {
    var updateNode = document.getElementById("prod_description");
    var id_node = this.getAttribute("idd");

    data.forEach(function(element) {
        if (element.id == id_node)
            updateNode.innerHTML = element.description;
    });

}