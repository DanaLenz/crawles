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
      
  firstName: "Jolly",
      
  lastName: "Fellow",
	
	background:"Noone",
	
	expertises:["Being smart","Being funny","Being really cool"],
	
	items:["A dream", "A secret", "A banana", "OFMD Season 2"],
	
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
    
    var lines = [];
        
    for(var i in source)
      lines.push(source[i]);
    
  
  const size = lines.length; 
  const randomIndex = Math.floor(Math.random() * size);
		
	this.setState({[attr] : lines.at(randomIndex)})
	}
	
	randomizeBackground = () => {
    var lines = [];
      
    for(var i in pc.Backgrounds)
      lines.push(pc.Backgrounds[i].id);
  
  
  const size = lines.length; 
  const randomIndex = Math.floor(Math.random() * size);
 
  this.setState({background : lines.at(randomIndex)})
  }
  
  randomizeQualities = () => {
  
    var available = ["d12", "d10", "d8", "d6", "d4"];
    
    for(var i = 0; i < this.state.qualities.length; i++){
      const index = Math.floor(Math.random()*(this.state.qualities.length-i));
      
      const newQualities = this.state.qualities.slice();
      newQualities[i].dice = available[index];
      this.setState({qualities : newQualities});
        
      available.splice(index, 1);
    }
    
  }
	
	randomizeExpertise = (index) => {
    var lines = [];
      
    for(var i in pc.Expertises)
      lines.push(pc.Expertises[i].id);
    
  
  const size = lines.length; 
  const randomIndex = Math.floor(Math.random() * size);
    
    this.setState(prevState => ({expertises : 
                                 [...prevState.expertises.slice(0, index),
                                 lines[randomIndex],
                                  ...prevState.expertises.slice(index+1)]}));
		    
  }
  
  randomizeItem = (index) => {
    var lines = [];
      
    for(var i in pc.Items)
      lines.push(pc.Items[i]);
    
  
  const size = lines.length; 
  const randomIndex = Math.floor(Math.random() * size);
    
    this.setState(prevState => ({items : 
                                 [...prevState.items.slice(0, index),
                                 lines[randomIndex],
                                  ...prevState.items.slice(index+1)]}));
  }
	  
  randomizeMoney = () => {
    const copper = Math.floor(Math.random() * 20) + 1
    this.setState({money : copper})
  }
	
	handleButtonClick = () => {
		
		const updatedList = this.state.currentLines.map( item => {
			item.line = getRandomLine(item.id)
			return item
		})
		
		this.setState({currentLines : updatedList})
		
		this.randomizeQualities();
		this.randomizeBackground();
    this.randomizeExpertise(0);
    this.randomizeExpertise(1);
    this.randomizeExpertise(2);
    
    this.randomizeItem(0);
    this.randomizeItem(1);
    this.randomizeItem(2);
    this.randomizeItem(3);
		
    this.randomize("firstName", pc.FirstNames)
    this.randomize("lastName", pc.LastNames)
		this.randomize("companion", pc.SCompanions)
		this.randomize("weapon", pc.Weapons)
		this.randomizeMoney()
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
      <p key="name" onClick= {() => {this.randomize("firstName", pc.FirstNames); this.randomize("lastName", pc.LastNames);}}>
        {this.state.firstName} {this.state.lastName}
      </p>
		  <ul className="small-list">
			{this.state.qualities.map((item) => {
			return <li key={item.id}>{item.id}: {item.dice}</li>
			})}
		  </ul>
		  <p onClick={()=>this.randomizeBackground()}>{this.state.background}</p>
		  <p>Companion: {this.state.companion}</p>
		  <p onClick={()=>this.randomizeMoney()}>Money: {this.state.money} copper pennies</p>
		  <ul className="small-list" key="expertises">
        <li key="expertise1" onClick={()=>this.randomizeExpertise(0)}>{this.state.expertises[0]}</li>
        <li key="expertise2" onClick={()=>this.randomizeExpertise(1)}>{this.state.expertises[1]}</li>
        <li key="expertise3" onClick={()=>this.randomizeExpertise(2)}>{this.state.expertises[2]}</li>
		  </ul>
		  <ul className="small-list" key="items">
        <li key="item1" onClick={() => this.randomizeItem(0)}>{this.state.items[0]}</li>
        <li key="item2" onClick={() => this.randomizeItem(1)}>{this.state.items[1]}</li>
        <li key="item3" onClick={() => this.randomizeItem(2)}>{this.state.items[2]}</li>
        <li key="item4" onClick={() => this.randomizeItem(3)}>{this.state.items[3]}</li>
			  <li key="weapon" onClick={() => this.randomize("weapon", pc.Weapons)}>{this.state.weapon}</li>
		  </ul>
		</div>
	  </div>
	);
	}
	
};
