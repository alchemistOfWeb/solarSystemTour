import $ from 'jquery';
// import pug from 'pug';

export class ChoiceManagerAbstract {
    constructor(options) {
        // this.options = config.options || [];
        this.displayingSelector = options.displayingSelector; // элемент для вывода 
        this.eventSelector = options.eventSelector; // элемент для назначения обработчика события
        this.idAttr = options.idAttr ?? 'data-choiceid'; // аттрибут из которого берем айдишник нашего выбора
        this.choices = options.choices; // массив объектов которые мы можем выбрать

        // this.containerSelector = options.containerSelector || '.selected-items-container'; // TODO
        this.max = options.max || 1;
        this.min = options.min || 0;
        this.selectedItems = [];

        this.reselectForOne = options.reselectForOne ?? true;
        this.setup();
    }

    setup() {
        console.log("binding events");
        this.bindEvents();
    }

    bindEvents() {
        // uses this.eventSelector
        $(this.eventSelector).on('click', (e) => this.handleItemClick(e));
    }

    handleItemClick(event) {
        console.log("test");
        const itemId = $(event.target).attr(this.idAttr);
        let alreadySelected = this.selectedItems.includes(itemId);
        let reselectCondition = (this.reselectForOne && this.selectedItems.length == 1);

        if (alreadySelected) {
            this.deselectItem(event, itemId);
        } else if (this.selectedItems.length < this.max || reselectCondition) {
            this.selectItem(event, itemId);
        } else {
            this.onLimitExceeded();
        }

        this.updateDisplay();
    }

    selectItem(event, itemId) {
        // Override in subclass if necessary
        // this.selectedItems.push(itemId);
        console.log(`Item ${itemId} selected`);
    }

    deselectItem(event, itemId) {
        // Override in subclass if necessary
        // this.selectedItems = this.selectedItems.filter(id => id !== itemId);
        console.log(`Item ${itemId} deselected`);
    }

    onLimitExceeded() {
        // Override in subclass if necessary
        console.log(`Selection limit exceeded. Only ${this.max} items can be selected.`);
    }

    updateDisplay() {
        // uses this.displayingSelector and this.selectedItems
        console.log('updating display in infobar', this.displayingSelector, this.selectedItems)
        // Change html in some places to show changes after some action (select, deselect)
        // Override in subclass if necessary
    }
}


export class StarshipChoiceManager extends ChoiceManagerAbstract {
    constructor(options) {
        super(options);
        this.max = 1;
        this.min = 1;
    }

    selectItem(event, itemId) {
        console.log("selected: ", this.selectedItems.length);
        if (this.selectedItems.length !== 0) {
            let prevId = this.selectedItems[0];
            console.log(`selector ${this.eventSelector}[${this.idAttr}=${prevId}]`);
            let el = $(`${this.eventSelector}[${this.idAttr}=${prevId}]`);
            el.removeClass('chosen');
        }
        this.selectedItems = [itemId];
        $(event.target).addClass('chosen')
    }

    updateDisplay() {
        super.updateDisplay();
        let choiceId = this.selectedItems[0];
        let selectedChoice = this.choices.find(choice => choice.id == choiceId);
        $(this.displayingSelector).text(selectedChoice.title_ru);
    }
}



export class EquipmentChoiceManager extends ChoiceManagerAbstract {
    constructor(options) {
        super(options);
        this.max = 1;
        this.min = 1;
    }

    selectItem(event, itemId) {
        console.log("selected: ", this.selectedItems.length);
        if (this.selectedItems.length !== 0) {
            let prevId = this.selectedItems[0];
            console.log(`selector ${this.eventSelector}[${this.idAttr}=${prevId}]`);
            let el = $(`${this.eventSelector}[${this.idAttr}=${prevId}]`);
            el.removeClass('chosen');
        }
        this.selectedItems = [itemId];
        $(event.target).addClass('chosen')
    }

    updateDisplay() {
        super.updateDisplay();
        let choiceId = this.selectedItems[0];
        console.log("choceID: ", choiceId);
        let selectedChoice = this.choices.find(choice => choice.id == choiceId);
        $(this.displayingSelector).text(selectedChoice.title_ru);
    }
}


export class FlightpathChoiceManager extends ChoiceManagerAbstract {
    constructor(options) {
        super(options);
        this.max = 1;
        this.min = 1;
    }
    updateDisplay() {
        super.updateDisplay();
        console.log('updateDisplay in FlightpathChoiceManager')
    }
}


export class CrewChoiceManager extends ChoiceManagerAbstract {
    constructor(options) {
        super(options);
        this.max = options.max || 5;
        this.min = options.min || 5;
    }

    updateDisplay() {
        super.updateDisplay();
        console.log('updateDisplay in CrewChoiceManager')
    }
}
