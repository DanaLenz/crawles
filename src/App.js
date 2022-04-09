import logo from './logo.svg';
import './App.css';
import { HeroSection } from './Hero';


function App() {
	
  return (
  <div className="App-flex">
    <div className="App-header">
		Construct a Crawler
	</div>
    <div className="App-body">
	  <HeroSection />
    </div>
	<div className="App-footer">
		Always remember to pack some rope, a couple of lockpicks and a toothbrush.
	</div>
	</div>
  );
}
 
export default App;
