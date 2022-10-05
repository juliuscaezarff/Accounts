import inquirer from 'inquirer'
import chalk from 'chalk'

import fs from 'fs'

operation()

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar Conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair'
        ]
      }
    ])
    .then(answer => {
      const action = answer['action']

      if (action === 'Criar Conta') {
        createAccount()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar Saldo') {
      } else if (action === 'Sacar') {
      } else if (action === 'Sair') {
        console.log(chalk.black('Obrigado por usar o Accounts'))
        process.exit()
      }
    })
    .catch(err => console.log(err))
}

// create account

function createAccount() {
  console.log(chalk.bgGreen.black('Obrigado por escolher o nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir:'))

  buildAccount()
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta:'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      console.log(accountName)

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Essa conta já existe, escolha outro nome!')
        )
        buildAccount()
        return
      }

      fs.writeFile(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err)
        }
      )

      console.log(chalk.green('Parabéns sua conta foi criada!'))
      operation()
    })
    .catch(err => console.error(err))
}

//

function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      //verify if account exist
    })
    .catch()
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log('Essa conta não existe!')
    return false
  }

  return true
}
