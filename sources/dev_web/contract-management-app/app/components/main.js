import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MainComponent extends Component {


  @service web3service;
  @tracked cptResults = [];
  @tracked betResults = [];
  @tracked enteredData;

  @action createResultCpt()
  {
    this.cptResults.push('TEST-DATA');
    this.cptResults = this.cptResults;
  }

  @action clearDataField()
  {
    this.enteredData = '';
  }

  
  @action clearBetResults()
  {
    this.betResults = [];
    this.betResults = this.betResults;
  }

  
  @action clearCptResults()
  {
    this.cptResults = [];
    this.cptResults = this.cptResults;
  }

  
  @action createResultBet()
  {
    this.betResults.push('TEST-DATA');
    this.betResults = this.betResults;
  }

  @action updateEnteredData(e){
  this.enteredData = e.target.value;
  }
  



}
