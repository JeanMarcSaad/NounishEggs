import logo from './assets/png/egg_preview.png';
import Mint from './Mint';
import './App.css';
import OS from './assets/svg/opensea.svg';
import ES from './assets/svg/etherscan.svg';
import {BsTwitter} from 'react-icons/bs';
import {FaDiscord} from 'react-icons/fa';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Nounish Eggs</h1>
        <p className="App-description"><b>555</b> Nounish Eggs.<br/>Created by <b><a href="https://worldofnoun.com/">World of Noun</a></b></p>
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-description">Supply: <b>555</b>.<br/>344/555 for World of Noun holders.<br/>Rest: <b>0.011Ξ</b><br/></p>
        <Mint></Mint>
        <footer className="App-Footer">
        <img src={OS} onClick={() => window.open("https://opensea.io/collection/nounish-eggs", '_blank').focus()}></img>
        <img src={ES} onClick={() => window.open("https://etherscan.io/address/0x8b5065c5354d1EC05d28cc9Fceafe18783C59F69", '_blank').focus()}></img>
        <BsTwitter onClick={() => window.open("https://twitter.com/nounisheggs", '_blank')}/>
        <FaDiscord onClick={() => window.open("https://discord.gg/RNKzHEx3y6", '_blank')}/>
      </footer>
      </header>
    </div>
  );
}

export default App;
