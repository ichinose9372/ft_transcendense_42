import solcx
from solcx import compile_standard
import json

# Install the Solidity compiler version
solcx.install_solc('0.8.0')

# Read the Solidity contract
with open('SimpleStorage.sol', 'r') as file:
    simple_storage_file = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "SimpleStorage.sol": {
            "content": simple_storage_file
        }
    },
    "settings": {
        "outputSelection": {
            "*": {
                "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]
            }
        }
    }
})

# Save the compiled contract
with open('compiled_code.json', 'w') as file:
    json.dump(compiled_sol, file)

# Get bytecode and ABI
bytecode = compiled_sol['contracts']['SimpleStorage.sol']['SimpleStorage']['evm']['bytecode']['object']
abi = compiled_sol['contracts']['SimpleStorage.sol']['SimpleStorage']['abi']