$(document).ready(function(){
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < Math.min(selElmnt.length, 6); j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item: but this will change all custom select*/              
                var all_custom_select = document.getElementsByClassName("custom-select");
                for (var index = 0; index < all_custom_select.length; index++) {
                    const origin_select = all_custom_select[index].getElementsByTagName("select")[0];
                    const selected = all_custom_select[index].getElementsByClassName("select-selected")[0];
                    for (var i = 0; i < origin_select.length; i++) {
                        if (origin_select.options[i].innerHTML == this.innerHTML.trim()) {
                            origin_select.selectedIndex = i;
                            selected.innerHTML = this.innerHTML.trim();
                            const y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (var k = 0; k < y.length; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                }
                // h.click();
            });
            b.appendChild(c);
        }
        //append modal open button
        const see_all = document.createElement("DIV");
        see_all.innerHTML = 'See all activation spaces';
        see_all.setAttribute("id", "see-all-btn");
        see_all.addEventListener("click", function(e) {
            document.getElementsByClassName("activation-spaces-modal")[0].classList.toggle("is-active")
        });        
        b.appendChild(see_all);
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);




    //event for modal
    $(".activation-spaces-modal .close-btn").on('click', function(){
        $(".activation-spaces-modal").toggleClass("is-active");
    })
    $(".activation-spaces-modal .modal-background").on('click', function(){
        $(".activation-spaces-modal").toggleClass("is-active");
    })
    $(".activation-spaces-modal .item-w").on('click', function(){
        $(".activation-spaces-modal").toggleClass("is-active");
        var all_custom_select = document.getElementsByClassName("custom-select");
        for (var index = 0; index < all_custom_select.length; index++) {
            const origin_select = all_custom_select[index].getElementsByTagName("select")[0];
            const selected = all_custom_select[index].getElementsByClassName("select-selected")[0];
            for (var i = 0; i < origin_select.length; i++) {
                if (origin_select.options[i].innerHTML == this.innerHTML.trim()) {
                    origin_select.selectedIndex = i;
                    selected.innerHTML = this.innerHTML.trim();
                    const y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (var k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    break;
                }
            }
        }
    })
})
