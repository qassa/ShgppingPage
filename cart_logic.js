//var div = document.createElement('div');
var div;

function createNewDiv() {
    div = document.createElement('div');
}

var data = [{ id: "1", name: "ACER 4521 4GB", count: "10", cost: "3000" }, { id: "2", name: "Asus 550 Pro", count: "2", cost: "2500" }, { id: "3", name: "HP Pavilion dv6", count: "50", cost: "3700" }, { id: "4", name: "PHILIPS FGt45", count: "1", cost: "1100" }];

//функция - adder для элемента в списке на складе
var addProd = function() {
    //find node with id == product_table
    var storageNode = document.getElementById("product_table");

    data.forEach(element => {
        //insert new prod_element node including all childs
        createNewDiv();
        var prodElemNode = storageNode.appendChild(div);
        prodElemNode.setAttribute("class", 'prod_element');
        prodElemNode.setAttribute("idd", element.id);
        prodElemNode.onclick = addToCart;

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

        //set innerHTML for new subnodes
        nameNode.innerHTML = element.name;
        countNode.innerHTML = element.count;
        costNode.innerHTML = element.cost;
    });

}

function addToCart() {
    id_node = this.getAttribute("idd");
    //alert(id_node);

    name_node = this.getElementsByClassName("prod_name")[0];
    count_node = this.getElementsByClassName("prod_count")[0];
    cost_node = this.getElementsByClassName("prod_cost")[0];

    var cartNode = document.getElementById("cart_table");

    var idExists = false;

    //убрать товар из списка при кол-ве 1
    if (parseInt(count_node.innerHTML) == 1) {
        this.remove();
    }

    //проверить существование узла с данным idd
    //cartNode.forEach(element => {
    //});
    Array.from(cartNode.children).forEach(function(element) {
        if ((element.getAttribute("idd") !== undefined) && (element.getAttribute("idd") == id_node)) {
            idExists = true;
            //инкремент существующей записи
            var record_count_node = element.getElementsByClassName("cart_count");
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
        var cartElemNode = cartNode.appendChild(div);
        cartElemNode.setAttribute("class", 'cart_element');
        cartElemNode.setAttribute("idd", id_node);
        cartElemNode.addEventListener("click", removeFromCart);

        createNewDiv();
        var nameNode = cartElemNode.appendChild(div);
        nameNode.setAttribute("class", "cart_name");
        nameNode.innerHTML = name_node.innerHTML;

        createNewDiv();
        var countNode = cartElemNode.appendChild(div);
        countNode.setAttribute("class", "cart_count");
        countNode.innerHTML = 1;
        var number = parseInt(count_node.innerHTML);
        number--;
        count_node.innerHTML = number;

        createNewDiv();
        var costNode = cartElemNode.appendChild(div);
        costNode.setAttribute("class", "cart_cost");
        costNode.innerHTML = cost_node.innerHTML;

        idExists = false;
    }
}

function removeFromCart() {
    id_node = this.getAttribute("idd");
    //alert(id_node);

    name_node = this.getElementsByClassName("cart_name")[0];
    count_node = this.getElementsByClassName("cart_count")[0];
    cost_node = this.getElementsByClassName("cart_cost")[0];

    var prodNode = document.getElementById("product_table");

    var idExists = false;

    //убрать товар из списка при кол-ве 1
    if (parseInt(count_node.innerHTML) == 1) {
        this.remove();
    }

    //проверить существование узла с данным idd
    //cartNode.forEach(element => {
    //});
    Array.from(prodNode.children).forEach(function(element) {
        if ((element.getAttribute("idd") !== undefined) && (element.getAttribute("idd") == id_node)) {
            idExists = true;
            //инкремент существующей записи
            var record_count_node = element.getElementsByClassName("prod_count");
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
        var prodElemNode = prodNode.appendChild(div);
        prodElemNode.setAttribute("class", 'prod_element');
        prodElemNode.setAttribute("idd", id_node);
        prodElemNode.addEventListener("click", addToCart);

        createNewDiv();
        var nameNode = prodElemNode.appendChild(div);
        nameNode.setAttribute("class", "prod_name");
        nameNode.innerHTML = name_node.innerHTML;

        createNewDiv();
        var countNode = prodElemNode.appendChild(div);
        countNode.setAttribute("class", "prod_count");
        countNode.innerHTML = 1;
        var number = parseInt(count_node.innerHTML);
        number--;
        count_node.innerHTML = number;

        createNewDiv();
        var costNode = prodElemNode.appendChild(div);
        costNode.setAttribute("class", "prod_cost");
        costNode.innerHTML = cost_node.innerHTML;

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
            //count = element.getAttribute("cart_count");
            if (child.getAttribute("class") == "cart_cost")
                cost = parseInt(child.innerHTML);
        });
        total_sum += count * cost;
    });
    alert(total_sum);
}