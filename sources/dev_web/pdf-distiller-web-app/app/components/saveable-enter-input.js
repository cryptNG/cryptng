import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';


export default class SaveableEnterInput extends Component {

    constructor() {
        super(...arguments);
        this.inputContent = this.args.inputContent;
        this.onParentContentChange = this.args.onContentChange;
        this.contentType = this.args.contentType;
        this.loadFromSessionIfSaved();
    }

    @tracked isSessionSave = false;
    @tracked inputContent = '';
    onParentContentChange = null;
    contentType = '';


    @action onContentChange(e) {
        this.inputContent = e.target.value;
        if (this.isSessionSave) {
            sessionStorage.setItem('distiller_' + this.contentType, this.inputContent);
        }
        this.onParentContentChange(e);
    }

    @action toggleSessionSave() {
        this.isSessionSave = !this.isSessionSave;
        if (this.isSessionSave) {
            console.log('Saving to Session: [distiller_' + this.contentType + ' : ' + this.inputContent + ']');
            sessionStorage.setItem('distiller_' + this.contentType, this.inputContent);
            sessionStorage.setItem('distiller_hassaved_' + this.contentType, true);
        }
        else {
            sessionStorage.setItem('distiller_' + this.contentType, '');
            sessionStorage.setItem('distiller_hassaved_' + this.contentType, false);
        }
    }

    loadFromSessionIfSaved() {
        if (sessionStorage.getItem('distiller_hassaved_' + this.contentType) == 'true') {
            console.log('session save is active for ' + 'distiller_hassaved_' + this.contentType);
            this.inputContent = sessionStorage.getItem('distiller_' + this.contentType);
            console.log('value: ' + this.inputContent);
            this.isSessionSave = true;
        }
    }

}
