import React from 'react';
import './App.css';
import lines from './lines/basic';
import pc from './lines/pitcrawler';


const lineTypes = new Map([
  ["happy", lines.HappyLines],
  ["work", lines.WorkLines],
  ["hobby", lines.HobbyLines],
  ["wizards", lines.WizardLines],
  ["magic", lines.MagicLines],
  ["vice", lines.VicesLines],
  ["virtue", lines.VirtuesLines],
  ["quirk", lines.QuirkLines]
]);

function getRandomLine(id) {
  
  var lines = [];
  
  const jsonObj = lineTypes.get(id);
  
  for(var i in jsonObj) 
    lines.push(jsonObj[i]);
  
  const size = lines.length; 
  const randomIndex = Math.floor(Math.random() * size);
 
  return lines.at(randomIndex);

}



export class HeroSection extends React.Component {
	
	
	constructor (props){
		
		super(props);
		this.state = {
	currentLines : [
	{id: "happy", line: "Are you content?"},
	{id: "wizards", line: "How do you feel about wizards?"},
	{id: "work", line: "How do you feel about your work?"},
	{id: "magic", line: "How do you feel about magic?"},
	{id: "hobby", line: "How do you like to spend your time?"},
	{id: "vice", line: "What are your vices?"},
	{id: "virtue", line: "What are your virtues?"},
	{id: "quirk", line: "What is your quirk?"}
	],
	
	qualities : [
	{id: "Fists", dice:"d0"}, 
	{id: "Feet", dice:"d0"}, 
	{id: "Fingers", dice:"d0"}, 
	{id: "Face", dice:"d0"}, 
	{id: "Heart", dice:"d0"}
	],
	
	background:"Noone",
	
	expertises:["Being smart","Being funny","Being really cool","Fashion"],
	
	items:["A dream", "A banana", "-", "OFMD Season 2"],
	
	companion:"Your loyal favourite belt",
	
	weapon:"Another, lesser belt",
	
	money:"0"
	}
	
	}
		
	
	
	handleRandomizeItem = (id) => {
		
		
		const updatedList = this.state.currentLines.map( item => {
			if(item.id == id){
				item.line = getRandomLine(id)
			}
			return item
		})
		
		this.setState({currentLines : updatedList})
		
	}
	
	randomize = (attr, source) => {
		
	this.setState({attr : getRandom(source)})
	}
	
	randomizeBackground = () => {}
	
	randomizeExpertise = () => {}
	
	randomizeName = () => {}
	
	handleButtonClick = () => {
		
		const updatedList = this.state.currentLines.map( item => {
			item.line = getRandomLine(item.id)
			return item
		})
		
		this.setState({currentLines : updatedList})
		
		randomizeQualities()
		randomizeBackground()
		
		randomize(this.state.companion, pc.SCompanions)
		randomize(this.state.weapon, pc.Weapons)
		randomizeMoney()
	}	
	
	
	render () {
	return( 
	  <div className="App-heroSection">
		<button className="App-generatorButton" onClick={this.handleButtonClick}>Randomize!</button>
		<div className="column">
		<ul className="hero-list">
	      {this.state.currentLines.map((item) => {
		    return <li key={item.id} onClick={()=>this.handleRandomizeItem(item.id)} >{item.line}</li>//
		  })}
		</ul>
		</div>
		<div className="column">
		  <ul className="small-list">
			{this.state.qualities.map((item) => {
			return <li>{item.id}: {item.dice}</li>
			})}
		  </ul>
		  <p>{this.state.background}</p>
		  <p>Companion: {this.state.companion}</p>
		  <p>Money: {this.state.money}</p>
		  <ul className="small-list">
			{this.state.expertises.map((item) => {return <li>{item}</li>})}
		  </ul>
		  <ul className="small-list">
			{this.state.items.map((item) => {return <li>{item}</li>})}
			<li>{this.state.weapon}</li>
		  </ul>
		</div>
	  </div>
	);
	}
	
};
