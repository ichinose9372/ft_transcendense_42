from web3 import Web3
import json


infura_url = "https://sepolia.infura.io/v3/cef9ebe0beac4c8dabccdc71ef259312"
# Connect to local Ethereum node (e.g., Ganache)
w3 = Web3(Web3.HTTPProvider(infura_url))

# Check if connected
if w3.is_connected():
    print("Connected to Ethereum node")
else:
    print("Failed to connect to Ethereum node")

# Check connection
if not w3.isConnected():
    raise Exception("Connection failed")

# Your Ethereum account and private key
account = "0xYourAccountAddress"
private_key = "YourPrivateKey"

# Load the compiled contract
with open('compiled_code.json', 'r') as file:
    compiled_sol = json.load(file)

# Get bytecode and ABI
bytecode = compiled_sol['contracts']['SimpleStorage.sol']['SimpleStorage']['evm']['bytecode']['object']
abi = compiled_sol['contracts']['SimpleStorage.sol']['SimpleStorage']['abi']

# Create the contract in Python
SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

# Build the transaction
nonce = w3.eth.getTransactionCount(account)
transaction = SimpleStorage.constructor().buildTransaction({
    'chainId': 11155111,  # Sepolia chain ID
    'gas': 2000000,
    'gasPrice': w3.toWei('20', 'gwei'),
    'nonce': nonce,
})

# Sign the transaction
signed_txn = w3.eth.account.signTransaction(transaction, private_key=private_key)

# Send the transaction
tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

# Wait for the transaction to be mined
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
print(f"Contract deployed at address: {tx_receipt.contractAddress}")