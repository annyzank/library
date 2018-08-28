startUI = {
    id: "main",
    type:"space",
    rows: [
        {
            view:"toolbar",
            height: 55,
            elements:[
                {view:"label",  template: "Система учета книг библиотеки"},{}
            ]

        },

        {cols: [
            {
                width: 1100,
                view:"tabview",
                id:"tabview",
                cells:[
                {
                    header:"Главная",
                    body:{

                        id:"main",
                        rows:[
                            {
                                view:"label",
                                id:"labelBooks"

                            },
                            {
                                view:"label",
                                id:"labelReaders"

                            },
                            {
                                view:"label",
                                id:"labelOrders"

                            }
                        ]
                    }
                },              
                {
                    header:"Список читателей",
                    body:{
                        view:"datatable",
                        id:"readers",
                        select:true
                    }
                },
                {
                    header:"Список книг",
                    body:{
                        view:"datatable",
                        id:"books",
                        select:true,
                    }
                },
                {
                    header:"Список действующих заказов",
                    body:{
                        view:"treetable",
                        id:"orders",
                        select:true,
                    }
                }
                ],
                tabbar:{
                    height:80,
                    id:"tabbar"
                }
            },
            {},
            {
                width:160,
                rows: [
                    { height:80 },
                    {
                        view:"button",
                        id:"add-button",
                        height: 100,
                        value: "Добавить"
                    },
                    {height:60},                 
                    {
                        view:"button",
                        id:"delete-button",
                        height: 100,
                        value: "Удалить"
                    },
                    {height:60},
                    {
                        view:"button",
                        id:"change-button",
                        height: 100,
                        value: "Редактировать"
                    },
                    {}
                ]
            },
            {}
        ]}
    ]
};


var readerForm = {
    view:"form",
    id:"readerForm",
    elements: [
        { view:"text", label:"Имя", name:"readerName", id:"readerName", invalidMessage:"Поле не может быть пустым" },
        { view:"text", label:"Фамилия", name:"readerSurname", id:"readerSurname", invalidMessage:"Поле не может быть пустым" }, 
        { view:"text", label:"Год рождения", name:"year", id:"year", invalidMessage:"Поле не может быть пустым" },
        {
            view:"button", 
            id:"addReaderConfirm",
            value:"Добавить читателя в базу",
        },
        {
            view:"button", 
            id:"changeReaderConfirm",
            height:50,
            value:"Редактировать информацию о читателе"
        },
        {
            view:"button", 
            click:"newReaderWin.hide()",
            value:"Отмена"
        }
    ],
    elementsConfig:{
        labelPosition:"top",
    },
    rules:{
        "readerName":webix.rules.isNotEmpty,
        "readerSurname":webix.rules.isNotEmpty,
        "year":webix.rules.isNotEmpty
    }
};


var newReaderWin = webix.ui({
    view:"window",
    id:"readers-form",
    width:300,
    position:"center",
    modal:true,
    body:webix.copy(readerForm)
});

var bookForm = {
    view:"form",
    id:"bookForm",
    elements: [
        { view:"text", label:"Наименование", name:"bookName", id:"bookName", invalidMessage:"Поле не может быть пустым" },
        { view:"text", label:"Автор(ы)", name:"author", id:"author", invalidMessage:"Поле не может быть пустым" }, 
        { view:"text", label:"Год выпуска", name:"bookYear", id:"bookYear", invalidMessage:"Поле не может быть пустым" },
        {
            view:"button", 
            id:"addBookConfirm",
            value:"Добавить книгу в базу", 

        },
        {
            view:"button", 
            id:"changeBookConfirm",
            value:"Редактировать информацию о книге"
        },
        {
            view:"button", 
            value:"Отмена",
            click: "newBookWin.hide()"
        }
    ],
    elementsConfig:{
        labelPosition:"top",
    },
    rules:{
        "bookName":webix.rules.isNotEmpty,
        "author":webix.rules.isNotEmpty,
        "bookYear":webix.rules.isNotEmpty,
    }
};

var newBookWin = webix.ui({
    view:"window",
    id:"books-form",
    width:300,
    position:"center",
    modal:true,
    body:webix.copy(bookForm)
});


var orderForm = {
    view:"form",
    id:"orderForm",
    elements: [{
        cols: [
            {
                rows: [
                {
                    view:"label", 
                    label: "Книги",
                    align:"center"
                },
                { 
                    view:"datatable", 
                    height:200,
                    width:600,
                    id:"booksForOrder", 
                    multiselect:true,
                    select:true
                }]
            },
            {width:20},
            {
                rows: [
                {
                    view:"label", 
                    label: "Читатели",
                    align:"center"
                },
                { 
                    view:"datatable", 
                    height:200,
                    width:600,
                    id:"readersForOrder", 
                    select:true
                }]
            }            
        ]},
        { view:"text", label:"Крайняя дата возвращения книги", name:"lastDay", id:"lastDay", invalidMessage:"Поле не может быть пустым" }, 
        {cols: [
            {},
            {
                view:"button", 
                id:"addOrderConfirm",
                value:"Добавить заказ в базу",
                width:250,
                height:50
            },
            {
                view:"button", 
                id:"changeOrderConfirm",
                value:"Редактировать информацию о заказе",
                width:250,
                height:50
            },
            {},
            {
                view:"button",
                value:"Отмена",
                click:"newOrderWin.hide()",
                width:250,
                height:50
            },
            {}
        ]}
    ],
    elementsConfig:{
        labelPosition:"top",
    },
    rules:{
        "lastDay":webix.rules.isNotEmpty
    }
};

var newOrderWin = webix.ui({
    view:"window",
    id:"orders-form",
    //width:900,
    //height:900,
    position:"center",
    modal:true,
    body:webix.copy(orderForm)
});

