from web3 import Web3
import os

infura_url = "https://sepolia.infura.io/v3/cef9ebe0beac4c8dabccdc71ef259312"
w3 = Web3(Web3.HTTPProvider(infura_url))

contract_address =  Web3.to_checksum_address('0x3e3ae41e452125086e3d03196df822d5c595fa40')
caller = os.getenv('CALLER_ADDRESS')
contract_abi = [
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "matchId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "scorerName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "score",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TournamentScores.Score",
                "name": "scoreInput",
                "type": "tuple"
            }
        ],
        "name": "addScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "matchId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "scorerName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "score",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TournamentScores.Score[]",
                "name": "scoreInputs",
                "type": "tuple[]"
            }
        ],
        "name": "addScores",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getScores",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "matchId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "scorerName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "score",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TournamentScores.Score[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "scores",
        "outputs": [
            {
                "internalType": "string",
                "name": "matchId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "scorerName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


# Create a contract object
contract = w3.eth.contract(address=contract_address, abi=contract_abi)
def add_scores(scores):
    try:
        private_key = os.getenv('CALLER_PRIVATEKEY')
        tx = contract.functions.addScores(scores).build_transaction({
            'chainId': 11155111,  # Chain ID for Sepolia
            'gas': 2000000,
            'gasPrice': w3.to_wei('50', 'gwei'),
            'nonce': w3.eth.get_transaction_count(caller),
        })
        signed_tx = w3.eth.account.sign_transaction(tx, private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        return tx_hash.hex()
    except Exception as e:
        return None

