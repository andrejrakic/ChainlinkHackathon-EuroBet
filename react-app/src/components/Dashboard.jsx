import React, {useEffect, useState} from 'react'
import { testWeb3Connection, web3 } from '../config';
import Web3 from 'web3';

let metamask = undefined;

export default function Dashboard() {
  const [wallet, setWallet] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({name: '', odd: ''});

  useEffect(() => {
    fetch(`https://chainlinkapi.herokuapp.com/teams/`).then(res => res.json()).then(res => setTeams(res))
  });

  useEffect(() => {
    testWeb3Connection();
  }, [web3.currentProvider]);

  useEffect(() => {
    if(!metamask) {
      setWallet('Connect Metamask');
    } else {
      metamask.eth.getAccounts((error, accounts) => {
        if(!error) formatWalletText(accounts[0]);
      })
    }
  }, [metamask]);


  useEffect(() => {
    connectMetamask();
  }, [web3.currentProvider])

  const connectMetamask = async () => {
    if (!window.ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

    if (!metamask) {
			try {
				// Request account access if needed
				await window.ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				metamask = new Web3(window.ethereum);
        metamask.eth.getAccounts((error, accounts) => {
          if(!error) formatWalletText(accounts[0]);
        })
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}
  }

  const formatWalletText = (account) => {
    const accText = `${account.substring(0, 6)}...${account.substring(38)}`;
    web3.eth.getBalance(account, (err, result) => {
      if(result) {
        const balance = web3.utils.fromWei(result.toString(), 'ether');
        const accBalance = `${balance.substring(0, 5)} ETH`;
        setWallet(`${accText} - ${accBalance}`)
      }
      if(err) {
        console.log(err);
      }
    });
  }

  return (
    <div style={{backgroundColor: "#469FB1", height: "100vh"}}>
      <div style={{display: "flex", justifyContent: 'flex-end'}}>
        <div style={{width: 350, height: 50, border: "2px solid white", borderRadius: 5, display: "flex", justifyContent: 'center', cursor: 'pointer'}} onClick={() => connectMetamask()}>
            <p style={{alignSelf: 'center', color: 'white'}}>{wallet}</p>
        </div>
      </div>
      <div style={{width: 900, margin: 'auto', cursor: "pointer"}}>
        {teams.map(team => <img onClick={() => setSelectedTeam({name: team.id, odd: team.odd})} src={`./assets/${team.id.toLowerCase().replace(/\s/g, '-')}.png`} style={{ height: 150, width: 150}}/>)}
      </div>
      <div style={{width: 900, margin: 'auto', display: "flex", justifyContent: 'space-between', paddingTop: 20}}>
        <div style={{color: "white"}}>
          <h1>Team: {selectedTeam.name}</h1>
          <h1>Odd: {selectedTeam.odd}</h1>
        </div>
        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center'}}>
          <button style={{width: 300, height: 70, fontSize: 30, fontWeight: 'bold'}} disabled={selectedTeam.name === '' || !metamask}>Place Bet</button>
        </div>
      </div>
    </div>
  )
}
