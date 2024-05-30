from web3 import Web3

# Connect to local Ethereum node (e.g., Ganache)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

# Check if connected
if w3.isConnected():
    print("Connected to Ethereum node")
else:
    print("Failed to connect to Ethereum node")

# Replace with your contract ABI and address
contract_address = 'YOUR_CONTRACT_ADDRESS'
contract_abi = [
    # Your contract ABI goes here
]

# Create a contract object
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

from web3.middleware import geth_poa_middleware

# Add PoA middleware if needed (e.g., for Rinkeby)
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# Example function to add a score
def add_score(tournament_id, player_id, score, private_key):
    account = w3.eth.account.privateKeyToAccount(private_key)
    tx = contract.functions.addScore(tournament_id, player_id, score).buildTransaction({
        'chainId': 1337,  # Chain ID for Ganache
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei'),
        'nonce': w3.eth.getTransactionCount(account.address),
    })

    signed_tx = w3.eth.account.signTransaction(tx, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return tx_hash.hex()

# Example function to get a score
def get_score(index):
    return contract.functions.getScore(index).call()
	