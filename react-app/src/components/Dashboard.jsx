import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import euroBetAbi from '../abis/euroBet.abi.json';

const euroBetContractAddress = `0xa530D2026341B720ec367CD52df49417aA861225`;
let web3 = undefined;

export default function Dashboard() {
	const [wallet, setWallet] = useState('');
	const [teams, setTeams] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState({ name: '', odd: '' });
	const [connectedAccount, setConnectedAccount] = useState();
	const [ethAmount, setEthAmount] = useState(0);
	const [euroBetContract, setEuroBetContract] = useState({});
	const [txHash, setTxHash] = useState('');

	useEffect(() => {
		fetch(`https://chainlinkapi.herokuapp.com/teams/`)
			.then((res) => res.json())
			.then((res) => setTeams(res));
	});

	useEffect(() => {
		if (!web3) {
			setWallet('Connect Metamask');
		} else {
			web3.eth.getAccounts((error, accounts) => {
				if (!error) formatWalletText(accounts[0]);
			});
		}
	}, [web3]);

	useEffect(() => {
		connectMetamask();
	});

	const connectMetamask = async () => {
		if (!window.ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await window.ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3(window.ethereum);

				const EuroBetContract = new web3.eth.Contract(
					euroBetAbi,
					euroBetContractAddress
				);

				setEuroBetContract(EuroBetContract);

				web3.eth.getAccounts((error, accounts) => {
					if (!error) formatWalletText(accounts[0]);
				});
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}
	};

	const formatWalletText = (account) => {
		setConnectedAccount(account);
		const accText = `${account.substring(0, 6)}...${account.substring(38)}`;
		web3.eth.getBalance(account, (err, result) => {
			if (result) {
				const balance = web3.utils.fromWei(result.toString(), 'ether');
				const accBalance = `${balance.substring(0, 5)} ETH`;
				setWallet(`${accText} - ${accBalance}`);
			}
			if (err) {
				console.log(err);
			}
		});
	};

	const placeBet = () => {
		euroBetContract.methods
			.placeBet(selectedTeam.name)
			.send(
				{ from: connectedAccount, value: web3.utils.toWei(ethAmount, 'ether') },
				(err, txHash) => {
					setTxHash(`https://kovan.etherscan.io/tx/${txHash}`);
					console.log(txHash);
					console.log(err);
				}
			);
	};

	return (
		<div style={{ backgroundColor: '#469FB1', height: '100vh' }}>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<div
					style={{
						width: 350,
						height: 50,
						border: '2px solid white',
						borderRadius: 5,
						display: 'flex',
						justifyContent: 'center',
						cursor: 'pointer',
					}}
					onClick={() => connectMetamask()}>
					<p style={{ alignSelf: 'center', color: 'white' }}>{wallet}</p>
				</div>
			</div>
			<div style={{ width: 900, margin: 'auto', cursor: 'pointer' }}>
				{teams.map((team) => (
					<img
						onClick={() => setSelectedTeam({ name: team.id, odd: team.odd })}
						src={`./assets/${team.id.toLowerCase().replace(/\s/g, '-')}.png`}
						style={{ height: 150, width: 150 }}
						alt={`${team.id.toLowerCase().replace(/\s/g, '-')}`}
					/>
				))}
			</div>
			<div
				style={{
					width: 900,
					margin: 'auto',
					display: 'flex',
					justifyContent: 'space-between',
					paddingTop: 20,
				}}>
				{txHash !== '' ? (
					<h3 style={{ alignSelf: 'center', color: 'white' }}>
						Transaction hash: <a href={txHash}>{txHash}</a>
					</h3>
				) : (
					<div style={{ color: 'white' }}>
						<h2>
							ETH Amount:{' '}
							<input
								type='number'
								value={ethAmount}
								style={{
									height: 35,
									width: 100,
									fontFamily: 'Helvetica Neue',
									fontSize: 20,
									fontWeight: 'bold',
								}}
								onChange={(ev) => setEthAmount(ev.target.value)}
							/>
						</h2>
						<h2>Team: {selectedTeam.name}</h2>
						<h2>Odd: {selectedTeam.odd}</h2>
					</div>
				)}
				{txHash === '' && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}>
						<button
							style={{
								width: 300,
								height: 70,
								fontSize: 30,
								fontWeight: 'bold',
							}}
							disabled={selectedTeam.name === '' || !web3 || ethAmount === 0}
							onClick={() => placeBet()}>
							Place Bet
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
